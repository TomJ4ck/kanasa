import React from 'react';
import { Calculator, Info, JapaneseYen, User, Users } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { setSalary, setAge, setDependents, calculateResult } from '../store/calculatorSlice';

export const InputForm: React.FC = () => {
  const dispatch = useDispatch();
  const { salary, age, dependents } = useSelector((state: RootState) => state.calculator);

  const handleSalaryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (val === '') {
      dispatch(setSalary(''));
      return;
    }
    const num = parseInt(val, 10);
    if (!isNaN(num) && num >= 0) {
      dispatch(setSalary(num));
    }
  };

  const handleAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (val === '') {
      dispatch(setAge(''));
      return;
    }
    const num = parseInt(val, 10);
    if (!isNaN(num) && num >= 0 && num <= 120) {
      dispatch(setAge(num));
    }
  };

  const handleDependentsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (val === '') {
      dispatch(setDependents(0));
      return;
    }
    const num = parseInt(val, 10);
    if (!isNaN(num) && num >= 0 && num <= 15) {
      dispatch(setDependents(num));
    }
  };

  const handleCalculate = () => {
    dispatch(calculateResult());
    setTimeout(() => {
      document.getElementById('result-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  return (
    <div className="bg-white p-6 md:p-8 rounded-[24px] shadow-sm border border-[#E0E2E0] relative overflow-hidden">
      
      <div className="mb-8">
        <h2 className="text-2xl font-normal text-[#1F1F1F] mb-2">计算条件</h2>
        <p className="text-sm text-[#444746]">请输入您的工资详情以估算社保扣除额。</p>
      </div>

      <div className="space-y-6">
        {/* Salary Input */}
        <div className="relative group">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#444746] pointer-events-none z-10">
             <JapaneseYen size={20} />
          </div>
          <input
            type="number"
            id="salary"
            value={salary}
            onChange={handleSalaryChange}
            placeholder=" "
            className="peer block w-full rounded-[4px] border border-[#747775] bg-transparent pl-10 pr-4 py-3.5 text-[16px] text-[#1F1F1F] outline-none transition-colors focus:border-[#0B57D0] focus:ring-1 focus:ring-[#0B57D0]"
          />
          <label
            htmlFor="salary"
            className="absolute left-10 top-3.5 z-10 origin-[0] -translate-y-6 scale-75 transform bg-white px-1 text-sm text-[#444746] duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-[#0B57D0]"
          >
            月薪 (税前)
          </label>
        </div>

        {/* Age Input */}
        <div className="relative group">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#444746] pointer-events-none z-10">
             <User size={20} />
          </div>
          <input
            type="number"
            id="age"
            value={age}
            onChange={handleAgeChange}
            placeholder=" "
            className="peer block w-full rounded-[4px] border border-[#747775] bg-transparent pl-10 pr-4 py-3.5 text-[16px] text-[#1F1F1F] outline-none transition-colors focus:border-[#0B57D0] focus:ring-1 focus:ring-[#0B57D0]"
          />
          <label
            htmlFor="age"
            className="absolute left-10 top-3.5 z-10 origin-[0] -translate-y-6 scale-75 transform bg-white px-1 text-sm text-[#444746] duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-[#0B57D0]"
          >
            年龄
          </label>
          {typeof age === 'number' && age >= 40 && (
             <p className="text-xs text-[#0B57D0] mt-1.5 flex items-center gap-1 pl-1">
               <Info size={14} /> 包含护理保险费
             </p>
          )}
        </div>

        {/* Dependents Input */}
        <div className="relative group">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#444746] pointer-events-none z-10">
             <Users size={20} />
          </div>
          <input
            type="number"
            id="dependents"
            value={dependents}
            onChange={handleDependentsChange}
            placeholder=" "
            min={0}
            className="peer block w-full rounded-[4px] border border-[#747775] bg-transparent pl-10 pr-4 py-3.5 text-[16px] text-[#1F1F1F] outline-none transition-colors focus:border-[#0B57D0] focus:ring-1 focus:ring-[#0B57D0]"
          />
          <label
            htmlFor="dependents"
            className="absolute left-10 top-3.5 z-10 origin-[0] -translate-y-6 scale-75 transform bg-white px-1 text-sm text-[#444746] duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-[#0B57D0]"
          >
            扶养亲属人数
          </label>
        </div>

        {/* Material Filled Button */}
        <button
          onClick={handleCalculate}
          disabled={!salary || age === ''}
          className="ripple w-full bg-[#0B57D0] hover:bg-[#0B57D0]/90 active:bg-[#0B57D0]/80 text-white text-[16px] font-medium py-4 px-6 rounded-full shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:shadow-none flex items-center justify-center gap-2 mt-8"
        >
          <Calculator size={20} />
          开始计算
        </button>
      </div>

      <div className="mt-8 bg-[#F8F9FA] rounded-[12px] p-4 flex gap-3 items-start">
        <Info className="w-5 h-5 text-[#444746] mt-0.5 flex-shrink-0" />
        <div className="text-xs text-[#444746] leading-relaxed">
          <span className="font-medium text-[#1F1F1F] block mb-1">数据基准: 2025年4月</span>
          社保费率基于神奈川县最新标准。雇用保险费率已更新为令和7年度（2025）最新标准。
        </div>
      </div>
    </div>
  );
};