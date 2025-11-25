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
    </>
  );
};

export default Home;