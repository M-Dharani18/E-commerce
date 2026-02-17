// frontend/src/components/AuthLayout.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const AuthLayout = ({ children, title, subtitle }) => {
  return (
    <div className="min-h-screen bg-[#1A1A2E] flex items-center justify-center p-4">
      <div className="w-full max-w-md mx-auto"> {/* Added mx-auto */}
        {/* Logo/Brand */}
        <div className="text-center mb-8"> {/* Already has text-center */}
          <h1 className="text-4xl font-serif text-[#D4AF37] mb-2 tracking-wide">
            TextileHub
          </h1>
          <p className="text-[#FFFFF0] text-sm font-light">
            Royal Textiles & Heritage
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-[#FFFFF0] rounded-lg shadow-2xl p-8 border border-[#D4AF37]/20 mx-auto"> {/* Added mx-auto */}
          <div className="text-center mb-8"> {/* Already has text-center */}
            <h2 className="text-2xl font-serif text-[#1A1A2E] font-semibold">
              {title}
            </h2>
            {subtitle && (
              <p className="text-[#800000] text-sm mt-2 font-medium">
                {subtitle}
              </p>
            )}
          </div>

          {/* Form content - this needs proper alignment */}
          <div className="w-full">
            {children}
          </div>

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-[#D4AF37]/20 text-center">
            <p className="text-xs text-[#1A1A2E]/50">
              © 2025 TextileHub. All Rights Reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;