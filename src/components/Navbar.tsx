import React, { useState } from 'react';
import { Menu, X, Download } from 'lucide-react';
import { AcademyLogo } from './AcademyLogo';

interface NavbarProps {
  onOpenBooking: () => void;
  onOpenInstall: () => void;
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking, onOpenInstall, activeSection }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'কোর্সসমূহ', href: '#courses' },
    { label: 'হরফ খেলা', href: '#alphabet' },
    { label: 'ছোটদের দু’আ', href: '#duas' },
    { label: 'কেন আমরা', href: '#why-us' },
    { label: 'ফি ও ভর্তি', href: '#pricing' },
  ];

  const handleLinkClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-amber-100 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 lg:gap-8 h-20">
          {/* Zone 1: Brand wordmark & Logo */}
          <a
            href="#"
            className="flex items-center gap-3 whitespace-nowrap shrink-0 group"
          >
            <AcademyLogo size="md" showSubtitle={true} />
          </a>

          {/* Zone 2: 4–5 single-line clean nav links */}
          <nav className="hidden lg:flex items-center gap-7 text-[15px] font-semibold text-slate-700">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleLinkClick(link.href)}
                className={`transition-colors hover:text-emerald-700 hover:underline underline-offset-8 whitespace-nowrap shrink-0 cursor-pointer ${
                  activeSection === link.href.replace('#', '') ? 'text-emerald-700 font-bold underline' : ''
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Zone 3: Primary Actions (App Download & Demo Class) */}
          <div className="hidden sm:flex items-center gap-2.5 shrink-0">
            {/* PWA App Download Button */}
            <button
              onClick={onOpenInstall}
              className="px-3.5 py-2 text-xs sm:text-sm font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer shadow-xs hover:shadow"
              title="মোবাইল বা পিসিতে অ্যাপ ডাউনলোড করুন"
            >
              <Download className="w-4 h-4 text-emerald-600 animate-bounce" />
              <span>অ্যাপ ডাউনলোড</span>
            </button>

            {/* Free Demo Class Button */}
            <button
              onClick={onOpenBooking}
              className="px-5 py-2.5 text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 whitespace-nowrap shrink-0 flex items-center gap-2 cursor-pointer"
            >
              <span>ফ্রি ডেমো ক্লাস</span>
              <span className="text-amber-200">★</span>
            </button>
          </div>

          {/* Mobile menu trigger & Quick App Button */}
          <div className="flex lg:hidden items-center gap-1.5">
            <button
              onClick={onOpenInstall}
              className="px-2.5 py-1.5 text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-300 rounded-lg flex items-center gap-1 cursor-pointer"
              title="অ্যাপ ডাউনলোড"
            >
              <Download className="w-3.5 h-3.5 text-emerald-600" />
              <span>অ্যাপ</span>
            </button>
            <button
              onClick={onOpenBooking}
              className="sm:hidden px-2.5 py-1.5 text-xs font-bold text-white bg-emerald-600 rounded-lg whitespace-nowrap cursor-pointer"
            >
              ফ্রি ক্লাস
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:text-emerald-700 rounded-lg focus:outline-none cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-amber-100 bg-white/98 px-4 pt-3 pb-6 space-y-3 shadow-lg">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleLinkClick(link.href)}
                className="text-left px-3 py-2 text-base font-semibold text-slate-800 hover:bg-emerald-50 hover:text-emerald-700 rounded-lg transition-colors cursor-pointer"
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-100 space-y-2">
            {/* Mobile App Download Button in Drawer */}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenInstall();
              }}
              className="w-full py-3 text-center text-sm font-bold text-emerald-900 bg-emerald-100/80 hover:bg-emerald-200 border border-emerald-300 rounded-xl flex items-center justify-center gap-2 cursor-pointer"
            >
              <Download className="w-4 h-4 text-emerald-700" />
              <span>কুরআন শিখি অ্যাপ ডাউনলোড করুন</span>
            </button>

            {/* Mobile Free Demo Booking Button */}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full py-3.5 text-center text-base font-black text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow transition-colors cursor-pointer"
            >
              ফ্রি ডেমো ক্লাস বুক করুন (ওয়ান টু ওয়ান লাইভ)
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
