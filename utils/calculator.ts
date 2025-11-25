import { RATES, REMUNERATION_TABLE, TAX_TABLE } from '../constants';
import { CalculationResult, GradeRow } from '../types';

// Withholding Tax Calculation Logic
const calculateWithholdingTax = (taxableIncome: number, dependents: number): number => {
  if (taxableIncome < 88000) return 0;

  // Clamp dependents to 7 for array lookup (logic for >7 handled by deduction usually, but for simplified app 7 is sufficient max or we treat >7 as 7 for table lookup and subtract extra)
  // The PDF says for >7, subtract 1610 yen per extra person.
  let effectiveDependents = dependents;
  let extraDependents = 0;
  
  if (dependents > 7) {
    effectiveDependents = 7;
    extraDependents = dependents - 7;
  }

  // High Income Calculation (> 740k)
  if (taxableIncome >= 740000) {
    // Find the applicable bracket
    // We iterate backwards to find the highest threshold <= income
    for (let i = TAX_TABLE.HIGH_INCOME_RULES.length - 1; i >= 0; i--) {
      const rule = TAX_TABLE.HIGH_INCOME_RULES[i];
      if (taxableIncome >= rule.threshold) {
        const base = rule.baseTax[effectiveDependents];
        const excess = taxableIncome - rule.threshold;
        const tax = base + (excess * rule.rate);
        const finalTax = Math.floor(tax) - (extraDependents * 1610);
        return Math.max(0, finalTax);
      }
    }
  }

  // Low/Medium Income Calculation (Table Interpolation fallback)
  // In a real app, we would need the full 700+ row table.
  // Here we find the closest anchor below the income.
  const anchors = TAX_TABLE.LOW_INCOME_ANCHORS;
  let anchor = anchors[0];
  
  for (let i = 0; i < anchors.length; i++) {
    if (taxableIncome >= anchors[i].min) {
      anchor = anchors[i];
    } else {
      break;
    }
  }

  // Simple linear interpolation between anchors for smoother estimation in this demo
  // (Actual table is step-based, but we have sparse data)
  // We will just return the anchor value to be conservative/simple, or slightly scale it?
  // Let's just return the anchor value for the given dependents.
  let estimatedTax = anchor.tax[effectiveDependents] || 0;
  
  return Math.max(0, estimatedTax);
};

export const calculatePay = (
  grossSalary: number, 
  ageCategory: 'under40' | 'over40', 
  dependents: number
): CalculationResult => {
  
  // 1. Find Standard Monthly Remuneration (Hyojun Houshu Getsugaku)
  let row: GradeRow | undefined = REMUNERATION_TABLE.find(r => grossSalary < r.max);
  
  // Fallback for very high salary (though max is huge)
  if (!row) {
    row = REMUNERATION_TABLE[REMUNERATION_TABLE.length - 1];
  }

  const standardRemuneration = row.standard;
  const grade = row.grade;

  // 2. Calculate Health Insurance
  const healthRate = ageCategory === 'over40' ? RATES.HEALTH_RATE_OVER_40 : RATES.HEALTH_RATE_UNDER_40;
  const healthInsuranceRaw = standardRemuneration * healthRate;
  const healthInsurance = Math.floor(healthInsuranceRaw);

  // 3. Calculate Welfare Pension (Kousei Nenkin)
  let pensionStandard = standardRemuneration;
  if (pensionStandard < 88000) pensionStandard = 88000;
  if (pensionStandard > 650000) pensionStandard = 650000;

  const welfarePensionRaw = pensionStandard * RATES.PENSION_RATE;
  const welfarePension = Math.floor(welfarePensionRaw);

  // 4. Employment Insurance (Koyou Hoken)
  // Uses General Industry Rate for 2025
  const employmentInsurance = Math.floor(grossSalary * RATES.EMPLOYMENT_RATE);

  // 5. Totals
  const socialInsuranceTotal = healthInsurance + welfarePension + employmentInsurance;

  // 6. Income Tax (Withholding Tax)
  // Taxable Income for Withholding Tax = Gross Salary - Social Insurance
  const taxableIncomeForTax = grossSalary - socialInsuranceTotal;
  
  const incomeTaxEstimate = calculateWithholdingTax(taxableIncomeForTax, dependents);

  const takeHomePay = grossSalary - socialInsuranceTotal - incomeTaxEstimate;

  return {
    grossSalary,
    standardRemuneration,
    healthInsurance,
    welfarePension,
    employmentInsurance,
    socialInsuranceTotal,
    incomeTaxEstimate,
    takeHomePay,
    ageCategory,
    grade,
    dependents
  };
};