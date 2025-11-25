import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { Wallet, HeartPulse, Building2, Briefcase, Receipt, ArrowDownCircle } from 'lucide-react';
import { RATES } from '../constants';

const formatYen = (num: number) => {
  return new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'JPY', maximumFractionDigits: 0 }).format(num);
};

export const ResultsCard: React.FC = () => {
  const result = useSelector((state: RootState) => state.calculator.result);

  if (!result) {
    return (
      <div className="h-full min-h-[400px] flex flex-col items-center justify-center bg-white rounded-[24px] border border-[#E0E2E0] text-[#444746] p-8 text-center animate-fade-in-up delay-100">
        <div className="w-16 h-16 bg-[#F0F4F8] rounded-full flex items-center justify-center mb-4">
          <Wallet className="w-8 h-8 text-[#0B57D0]" />
        </div>
        <p className="font-medium text-lg">等待计算</p>
        <p className="text-sm mt-2 max-w-xs mx-auto text-[#747775]">输入月薪、年龄及行业信息后点击计算按钮。</p>
      </div>
    );
  }

  // Material Palette Colors
  const COLORS = {
    TAKE_HOME: '#34A853', // Google Green
    HEALTH: '#4285F4',    // Google Blue
    PENSION: '#FBBC05',   // Google Yellow/Amber
    TAX: '#EA4335',       // Google Red
    EMPLOYMENT: '#9AA0A6' // Gray
  };

  const data = [
    { name: '实发工资', value: result.takeHomePay, color: COLORS.TAKE_HOME },
    { name: '健康保险', value: result.healthInsurance, color: COLORS.HEALTH },
    { name: '厚生年金', value: result.welfarePension, color: COLORS.PENSION },
    { name: '所得税(源泉)', value: result.incomeTaxEstimate, color: COLORS.TAX },
    { name: '雇用保险', value: result.employmentInsurance, color: COLORS.EMPLOYMENT },
  ];

  const totalDeduction = result.socialInsuranceTotal + result.incomeTaxEstimate;
  const employmentRatePercent = (RATES.EMPLOYMENT_RATE * 100).toFixed(2) + '%';

  return (
    <div className="bg-white rounded-[24px] shadow-md border border-[#F1F3F4] overflow-hidden animate-fade-in-up">
      
      {/* Header */}
      <div className="px-6 pt-6 flex justify-between items-end">
        <div>
          <h2 className="text-[22px] font-normal text-[#1F1F1F]">计算结果</h2>
          <p className="text-sm text-[#444746]">标准报酬 Grade {result.grade} ({formatYen(result.standardRemuneration)})</p>
        </div>
      </div>

      <div className="p-6 md:p-8">
        {/* Primary Stat Card: Take Home */}
        <div className="bg-[#E6F4EA] rounded-[20px] p-6 md:p-8 text-[#0D652D] mb-8 flex flex-col md:flex-row justify-between items-center md:items-end gap-4 shadow-sm">
          <div>
            <div className="text-sm font-medium uppercase tracking-wide opacity-80 mb-1">最终实发工资 (预估)</div>
            <div className="text-5xl font-bold tracking-tight">{formatYen(result.takeHomePay)}</div>
          </div>
          <div className="bg-white/60 px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm">
            到手率 {((result.takeHomePay / result.grossSalary) * 100).toFixed(1)}%
          </div>
        </div>

        {/* Two Columns */}
        <div className="grid lg:grid-cols-12 gap-8">
          {/* List */}
          <div className="lg:col-span-7 space-y-4">
            <h3 className="text-sm font-medium text-[#444746] px-2">扣除明细</h3>
            
            {/* Health */}
            <div className="flex items-center justify-between p-4 rounded-[16px] bg-[#F8F9FA] border border-transparent hover:border-[#D3E3FD] transition-colors">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-[#D3E3FD] text-[#041E49] rounded-full">
                  <HeartPulse size={20} />
                </div>
                <div>
                  <div className="font-medium text-[#1F1F1F]">健康保险</div>
                  <div className="text-xs text-[#444746]">
                     {result.ageCategory === 'over40' ? '含护理险 (40-64岁)' : '标准费率 (<40岁)'}
                  </div>
                </div>
              </div>
              <span className="font-medium text-[#1F1F1F]">-{formatYen(result.healthInsurance)}</span>
            </div>

            {/* Pension */}
            <div className="flex items-center justify-between p-4 rounded-[16px] bg-[#F8F9FA] border border-transparent hover:border-[#FEF7E0] transition-colors">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-[#FEF7E0] text-[#725C00] rounded-full">
                  <Building2 size={20} />
                </div>
                <div>
                  <div className="font-medium text-[#1F1F1F]">厚生年金</div>
                  <div className="text-xs text-[#444746]">退休金基础</div>
                </div>
              </div>
              <span className="font-medium text-[#1F1F1F]">-{formatYen(result.welfarePension)}</span>
            </div>

            {/* Employment */}
            <div className="flex items-center justify-between p-4 rounded-[16px] bg-[#F8F9FA] border border-transparent hover:border-[#E0E2E0] transition-colors">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-[#E0E2E0] text-[#1F1F1F] rounded-full">
                  <Briefcase size={20} />
                </div>
                <div>
                  <div className="font-medium text-[#1F1F1F]">雇用保险</div>
                  <div className="text-xs text-[#444746]">费率: {employmentRatePercent}</div>
                </div>
              </div>
              <span className="font-medium text-[#1F1F1F]">-{formatYen(result.employmentInsurance)}</span>
            </div>

            {/* Tax */}
            <div className="flex items-center justify-between p-4 rounded-[16px] bg-[#FCE8E6] text-[#8C1D18]">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-white/50 text-[#8C1D18] rounded-full">
                  <Receipt size={20} />
                </div>
                <div>
                  <div className="font-medium">源泉所得税</div>
                  <div className="text-xs opacity-80">扶养亲属: {result.dependents}人</div>
                </div>
              </div>
              <span className="font-medium">-{formatYen(result.incomeTaxEstimate)}</span>
            </div>
            
            <div className="flex justify-end pt-2 px-2">
               <div className="text-sm text-[#444746]">
                 扣除总计: <span className="font-bold text-[#B3261E]">-{formatYen(totalDeduction)}</span>
               </div>
            </div>
          </div>

          {/* Chart */}
          <div className="lg:col-span-5 flex flex-col justify-center items-center bg-[#F8F9FA] rounded-[20px] p-4">
             <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={4}
                    dataKey="value"
                    stroke="none"
                    cornerRadius={4}
                  >
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value: number) => [formatYen(value), '']}
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', padding: '8px 12px' }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="text-center mt-[-140px] mb-[80px]">
                <div className="text-xs text-[#444746] mb-1">到手</div>
                <div className="text-xl font-bold text-[#34A853]">{((result.takeHomePay / result.grossSalary) * 100).toFixed(0)}%</div>
              </div>
              <div className="flex flex-wrap gap-2 justify-center mt-8">
                {data.map((entry, i) => (
                  <div key={i} className="flex items-center gap-1 text-[10px] text-[#444746]">
                    <span className="w-2 h-2 rounded-full" style={{backgroundColor: entry.color}}></span>
                    {entry.name}
                  </div>
                ))}
              </div>
          </div>
        </div>

      </div>
    </div>
  );
};