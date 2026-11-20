import React from 'react';
import { Mail, Phone, Heart } from 'lucide-react';
import { AcademyLogo } from './AcademyLogo';
import { BkashLogo, NagadLogo, RocketLogo } from './PaymentLogos';

export const Footer: React.FC<{ onOpenBooking: () => void }> = ({ onOpenBooking }) => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          {/* Brand info with Logo Placeholder & Bilingual Wordmark */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <AcademyLogo size="md" showSubtitle={true} className="brightness-125" />
            </div>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
              ছোট সোনামনিদের অন্তরে পবিত্র কুরআন ও সুন্নতের আলো ছড়িয়ে দেওয়ার একটি নির্ভরযোগ্য ওয়ান টু ওয়ান লাইভ শিশু-বান্ধব অনলাইন একাডেমি।
            </p>
            <div className="text-sm text-emerald-400 font-bold">
              মারকাযুল কুরআন একাডেমির একটি বিশেষ শিশু বিভাগ
            </div>
          </div>

          {/* Quick links */}
          <div className="space-y-3">
            <h4 className="text-base font-extrabold text-white uppercase tracking-wider">কোর্সসমূহ</h4>
            <ul className="space-y-2.5 text-sm text-slate-300">
              <li><a href="#courses" className="hover:text-emerald-400 transition-colors">নূরানী কায়দা ফাউন্ডেশন (৪-৭ বছর)</a></li>
              <li><a href="#courses" className="hover:text-emerald-400 transition-colors">সহীহ নাজেরা ও তাজবীদ (৬-১২ বছর)</a></li>
              <li><a href="#courses" className="hover:text-emerald-400 transition-colors">ছোটদের হিফজুল কুরআন</a></li>
              <li><a href="#courses" className="hover:text-emerald-400 transition-colors">মাসনূন দু’আ ও ইসলামিক আদব</a></li>
            </ul>
          </div>

          {/* Features */}
          <div className="space-y-3">
            <h4 className="text-base font-extrabold text-white uppercase tracking-wider">ইন্টারেক্টিভ লার্নিং</h4>
            <ul className="space-y-2.5 text-sm text-slate-300">
              <li><a href="#alphabet" className="hover:text-emerald-400 transition-colors">২৮টি হরফের সাইনবোর্ড</a></li>
              <li><a href="#alphabet" className="hover:text-emerald-400 transition-colors">হরফ খোঁজার কুইজ গেম</a></li>
              <li><a href="#alphabet" className="hover:text-emerald-400 transition-colors">ডিজিটাল হরফ লেখার স্লেট</a></li>
              <li><a href="#duas" className="hover:text-emerald-400 transition-colors">ছোটদের সকাল-সন্ধ্যার দু’আ</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-3">
            <h4 className="text-base font-extrabold text-white uppercase tracking-wider">যোগাযোগ ও ভর্তি</h4>
            <div className="space-y-2.5 text-sm text-slate-300">
              <div className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-emerald-400 shrink-0" />
                <a href="mailto:quranshikhiacademy@gmail.com" className="hover:text-white transition-colors">
                  quranshikhiacademy@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-5 h-5 text-emerald-400 shrink-0" />
                <a
                  href="https://wa.me/8801850172115"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-emerald-400 transition-colors font-medium"
                >
                  +৮৮০ ১৮৫০-১৭২১১৫ (WhatsApp)
                </a>
              </div>
              <div className="pt-2.5 mt-2 border-t border-slate-800/80">
                <div className="text-xs font-bold text-amber-300 uppercase tracking-wider mb-1">
                  ফি পেমেন্ট নম্বর (Send Money):
                </div>
                <div className="text-emerald-400 font-mono font-black text-base flex items-center gap-2">
                  <span>01408440180</span>
                  <span className="text-[11px] font-bold text-slate-400 bg-slate-800 px-2 py-0.5 rounded">Personal</span>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <div className="bg-white px-2 py-1 rounded-md flex items-center justify-center">
                    <BkashLogo size="sm" />
                  </div>
                  <div className="bg-white px-2 py-1 rounded-md flex items-center justify-center">
                    <NagadLogo size="sm" />
                  </div>
                  <div className="bg-white px-1.5 py-1 rounded-md flex items-center justify-center">
                    <RocketLogo size="sm" />
                  </div>
                </div>
              </div>
            </div>
            <div className="pt-2">
              <button
                onClick={onOpenBooking}
                className="w-full py-3 px-4 text-sm sm:text-base font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-xl transition-colors cursor-pointer"
              >
                ১টি ফ্রি ডেমো বুক করুন
              </button>
            </div>
          </div>
        </div>

        {/* Quiet copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} কুরআন শিখি (Quran Shikhi). সর্বস্বত্ব সংরক্ষিত।
          </div>
          <div className="flex items-center gap-1 text-slate-400">
            <span>সোনামনিদের জন্য পরম যত্নে তৈরি</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
          </div>
        </div>
      </div>
    </footer>
  );
};
