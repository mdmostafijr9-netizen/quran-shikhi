import React, { useState } from 'react';
import { BookOpen } from 'lucide-react';

/**
 * কুরআন শিখি অফিসিয়াল লোগো
 */
export const ACADEMY_CUSTOM_LOGO_URL = 'https://res.cloudinary.com/vgmdtwb8/image/upload/v1794063203/quran_shikhi.jpg';

interface AcademyLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
}

export const AcademyLogo: React.FC<AcademyLogoProps> = ({
  className = '',
  size = 'md',
  showSubtitle = true,
}) => {
  const [imageError, setImageError] = useState(false);

  // Size styling configurations
  const dimensions = {
    sm: { box: 'w-10 h-10', icon: 'w-5 h-5', title: 'text-xl', subtitle: 'text-xs' },
    md: { box: 'w-12 h-12 sm:w-14 sm:h-14', icon: 'w-7 h-7', title: 'text-2xl sm:text-3xl', subtitle: 'text-xs sm:text-sm' },
    lg: { box: 'w-16 h-16 sm:w-20 sm:h-20', icon: 'w-9 h-9', title: 'text-3xl sm:text-4xl', subtitle: 'text-sm sm:text-base' },
  }[size];

  return (
    <div className={`flex items-center gap-3.5 ${className}`}>
      {/* Official Academy Logo Image */}
      {ACADEMY_CUSTOM_LOGO_URL && !imageError ? (
        <div className={`${dimensions.box} rounded-2xl overflow-hidden shadow-sm border-2 border-emerald-200 bg-white shrink-0 group`}>
          <img
            src={ACADEMY_CUSTOM_LOGO_URL}
            alt="কুরআন শিখি - Quran Shikhi Logo"
            onError={() => setImageError(true)}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      ) : (
        <div
          className={`${dimensions.box} rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-800 flex items-center justify-center text-white shadow-md border-2 border-emerald-300 shrink-0`}
        >
          <BookOpen className={`${dimensions.icon} text-amber-200`} />
        </div>
      )}

      {/* Brand Name: Bangla & English */}
      <div className="flex flex-col justify-center leading-tight">
        <div className="flex items-baseline gap-2">
          <span className={`font-black text-emerald-950 tracking-tight font-display ${dimensions.title}`}>
            কুরআন শিখি
          </span>
        </div>
        {showSubtitle && (
          <span className={`font-extrabold text-emerald-700 font-display tracking-wider uppercase ${dimensions.subtitle}`}>
            Quran Shikhi
          </span>
        )}
      </div>
    </div>
  );
};
