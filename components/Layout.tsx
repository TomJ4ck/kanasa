import React from 'react';
import { Menu, FileText } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#1F1F1F] font-sans flex flex-col">
      {/* Material Top App Bar */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm transition-all duration-300">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button className="p-2 rounded-full hover:bg-slate-100 active:bg-slate-200 transition-colors text-slate-600 ripple">
              <Menu size={24} />
            </button>
            <div className="flex items-center gap-3">
              <div className="text-[#0B57D0]">
                <FileText size={24} strokeWidth={2} />
              </div>
              <h1 className="text-[22px] font-normal text-[#1F1F1F] tracking-normal">
                社保计算器
              </h1>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
             <span className="hidden md:block text-sm font-medium text-[#444746] bg-[#E0E2E0] px-3 py-1 rounded-full">
               神奈川 2025
             </span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow w-full max-w-6xl mx-auto px-4 py-8 mt-16">
        {children}
      </main>

      {/* Footer */}
      <footer className="py-8 mt-auto text-center border-t border-[#E0E2E0]">
        <div className="max-w-5xl mx-auto px-4">
           <p className="text-sm text-[#444746] font-medium">
             &copy; 2025 Kanagawa Social Insurance Calculator
           </p>
        </div>
      </footer>
    </div>
  );
};