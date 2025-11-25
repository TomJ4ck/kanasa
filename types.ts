export interface GradeRow {
  grade: number;
  standard: number;
  min: number;
  max: number;
}

export interface CalculationResult {
  grossSalary: number;
  standardRemuneration: number; // The standardized amount used for lookups
  healthInsurance: number;
  welfarePension: number;
  employmentInsurance: number;
  socialInsuranceTotal: number;
  incomeTaxEstimate: number;
  takeHomePay: number;
  ageCategory: 'under40' | 'over40';
  grade: number;
  dependents: number;
}