import React from 'react';
import { Download } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';

interface PWAInstallButtonProps {
  onOpenModal: () => void;
  className?: string;
  variant?: 'navbar' | 'hero' | 'floating' | 'footer';
}

export const PWAInstallButton: React.FC<PWAInstallButtonProps> = ({
  onOpenModal,
  className = '',
  variant = 'navbar',
}) => {
  const { isInstalled } = usePWAInstall();

  if (isInstalled) {
    return null;
  }

  if (variant === 'navbar') {
    return (
      <button
        onClick={onOpenModal}
        className={`inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 text-xs sm:text-sm font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 rounded-xl transition-all cursor-pointer shadow-xs hover:shadow ${className}`}
        title="অ্যাপস ডাউনলোড ও ইনস্টল করুন"
      >
        <Download className="w-4 h-4 text-emerald-600 animate-bounce" />
        <span>অ্যাপ ডাউনলোড</span>
      </button>
    );
  }

  if (variant === 'hero') {
    return (
      <button
        onClick={onOpenModal}
        className={`inline-flex items-center gap-2 px-5 py-3 text-sm sm:text-base font-bold text-emerald-950 bg-amber-300 hover:bg-amber-400 border border-amber-400 rounded-xl shadow-md transition-all cursor-pointer ${className}`}
      >
        <Download className="w-5 h-5 text-emerald-900" />
        <span>মোবাইল অ্যাপ ডাউনলোড করুন</span>
      </button>
    );
  }

  return (
    <button
      onClick={onOpenModal}
      className={`inline-flex items-center gap-2 px-4 py-2.5 text-sm font-bold text-white bg-emerald-700 hover:bg-emerald-800 rounded-xl transition-colors cursor-pointer ${className}`}
    >
      <Download className="w-4 h-4" />
      <span>অ্যাপস ডাউনলোড করুন</span>
    </button>
  );
};
