import React from 'react';

interface PaymentLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const BkashLogo: React.FC<PaymentLogoProps> = ({ className = '', size = 'md' }) => {
  const heightClass = size === 'sm' ? 'h-6' : size === 'lg' ? 'h-12' : 'h-8';
  return (
    <div className={`inline-flex items-center justify-center ${className}`}>
      <img
        src="/images/payments/bkash.png"
        alt="bKash (বিকাশ) লোগো"
        className={`${heightClass} w-auto object-contain select-none`}
        loading="lazy"
        onError={(e) => {
          // Graceful fallback to stylized badge if image fails to load
          const target = e.currentTarget;
          target.style.display = 'none';
          if (target.parentElement) {
            target.parentElement.innerHTML = '<span class="text-[#E2136E] font-black font-display text-base tracking-wide">bKash বিকাশ</span>';
          }
        }}
      />
    </div>
  );
};

export const NagadLogo: React.FC<PaymentLogoProps> = ({ className = '', size = 'md' }) => {
  const heightClass = size === 'sm' ? 'h-6' : size === 'lg' ? 'h-12' : 'h-8';
  return (
    <div className={`inline-flex items-center justify-center ${className}`}>
      <img
        src="/images/payments/nagad.png"
        alt="Nagad (নগদ) লোগো"
        className={`${heightClass} w-auto object-contain select-none`}
        loading="lazy"
        onError={(e) => {
          const target = e.currentTarget;
          target.style.display = 'none';
          if (target.parentElement) {
            target.parentElement.innerHTML = '<span class="text-[#F7941D] font-black font-display text-base tracking-wide">নগদ Nagad</span>';
          }
        }}
      />
    </div>
  );
};

export const RocketLogo: React.FC<PaymentLogoProps> = ({ className = '', size = 'md' }) => {
  const heightClass = size === 'sm' ? 'h-6' : size === 'lg' ? 'h-12' : 'h-8';
  return (
    <div className={`inline-flex items-center justify-center ${className}`}>
      <img
        src="/images/payments/rocket.png"
        alt="Rocket (রকেট) লোগো"
        className={`${heightClass} w-auto object-contain rounded-md select-none`}
        loading="lazy"
        onError={(e) => {
          const target = e.currentTarget;
          target.style.display = 'none';
          if (target.parentElement) {
            target.parentElement.innerHTML = '<span class="text-[#8C3494] font-black font-display text-base tracking-wide">রকেট Rocket</span>';
          }
        }}
      />
    </div>
  );
};
