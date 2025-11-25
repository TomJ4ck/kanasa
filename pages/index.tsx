import React from 'react';
import { InputForm } from '../components/InputForm';
import { ResultsCard } from '../components/ResultsCard';

const Home: React.FC = () => {
  return (
    <>
      {/* SEO / Meta Simulation */}
      <title>2025年神奈川县社保计算器</title>
      
      <div className="grid lg:grid-cols-12 gap-6">
        {/* Left Column: Inputs */}
        <div className="lg:col-span-5 animate-fade-in-up">
          <div className="sticky top-24 space-y-6">
            <InputForm />
          </div>
        </div>

        {/* Right Column: Results */}
        <div className="lg:col-span-7" id="result-section">
          <ResultsCard />
        </div>
      </div>

      {/* Disclaimer Section */}
      <div className="mt-8 text-center text-xs text-[#747775] animate-fade-in-up" style={{ animationDelay: '200ms' }}>
        <p className="font-medium">免责声明</p>
        <p className="mt-1 max-w-2xl mx-auto">
          此计算器提供的所有数据仅为预估值，基于公开的2025年税率和保险费率表。计算结果不构成财务或法律建议。实际扣除额可能因个人具体情况（如其他收入、特殊扣除等）而异。请以官方发行的工资单为准。
        </p>
      </div>
    </>
  );
};

export default Home;