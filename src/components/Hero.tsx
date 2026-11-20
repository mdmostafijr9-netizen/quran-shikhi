import React from 'react';
import { PlayCircle, ShieldCheck, Star, BookOpen, Download } from 'lucide-react';

interface HeroProps {
  onOpenBooking: () => void;
  onJumpToCourses: () => void;
  onJumpToAlphabet: () => void;
  onOpenInstall: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenBooking,
  onJumpToCourses,
  onJumpToAlphabet,
  onOpenInstall,
}) => {
  return (
    <section className="relative overflow-hidden pt-10 pb-16 lg:pt-16 lg:pb-24 bg-gradient-to-b from-[#F0FDF4]/60 via-[#F8FAF9] to-[#F8FAF9]">
      {/* Subtle modern ambient background glows */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-emerald-100/50 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-36 right-10 w-96 h-96 bg-teal-100/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          {/* Left Text Block */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Clean unboxed metadata kicker */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 text-base sm:text-lg font-bold text-emerald-950">
              <span className="bg-emerald-100 text-emerald-900 px-3.5 py-1 rounded-xl">
                কুরআন শিখি (Quran Shikhi)
              </span>
              <span aria-hidden="true" className="text-emerald-500">·</span>
              <span>শিশু-বান্ধব অনলাইন একাডেমি</span>
              <span aria-hidden="true" className="text-emerald-500">·</span>
              <span className="flex items-center gap-1.5 text-amber-600">
                <Star className="w-5 h-5 fill-amber-400 text-amber-500 inline" />
                <span>অভিভাবকদের সেরা আস্থা</span>
              </span>
            </div>

            {/* Main Headline - Bold and readable */}
            <h1
              className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.25] font-display"
              style={{ textWrap: 'balance' }}
            >
              ছোটদের <span className="text-emerald-700 relative inline-block">
                আনন্দের সাথে
                <svg className="absolute -bottom-2 left-0 w-full h-3 text-emerald-400/80" viewBox="0 0 100 20" preserveAspectRatio="none">
                  <path d="M0,15 Q50,0 100,15" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
                </svg>
              </span> কুরআন শেখার অনন্য একাডেমি
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-slate-700 leading-relaxed max-w-2xl mx-auto lg:mx-0 font-normal">
              নূরানী কায়দা, সহীহ তাজবীদ, প্রয়োজনীয় দু’আ ও সুন্দর চরিত্র গঠন—কোনো প্রকার ভীতি বা বকাঝকা ছাড়া, স্নেহময় শিক্ষক-শিক্ষিকাদের আন্তরিক তত্ত্বাবধানে ঘরে বসেই ওয়ান টু ওয়ান লাইভ ক্লাসে।
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
              <button
                onClick={onJumpToCourses}
                className="w-full sm:w-auto px-7 py-4 text-base sm:text-lg font-bold text-white bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] rounded-2xl shadow-lg hover:shadow-emerald-200 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer group"
              >
                <BookOpen className="w-5 h-5" />
                <span>আমাদের বিশেষ ৪টি কোর্স দেখুন</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </button>

              <button
                onClick={onOpenBooking}
                className="w-full sm:w-auto px-6 py-4 text-base sm:text-lg font-bold text-emerald-950 bg-amber-300 hover:bg-amber-400 active:scale-[0.98] rounded-2xl border border-amber-400 shadow-sm transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>ফ্রি ট্রায়াল ক্লাস</span>
                <span className="text-emerald-800">★</span>
              </button>

              <button
                onClick={onOpenInstall}
                className="w-full sm:w-auto px-5 py-4 text-base sm:text-lg font-bold text-slate-700 bg-white hover:bg-emerald-50 active:scale-[0.98] rounded-2xl border-2 border-emerald-300 shadow-xs transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
                title="অ্যাপস হিসেবে ডাউনলোড করুন"
              >
                <Download className="w-5 h-5 text-emerald-600" />
                <span>অ্যাপ ডাউনলোড</span>
              </button>
            </div>

            {/* Quick Link to Alphabet Games */}
            <div className="pt-1 flex items-center justify-center lg:justify-start gap-2">
              <button
                onClick={onJumpToAlphabet}
                className="text-sm sm:text-base font-bold text-emerald-800 hover:text-emerald-950 flex items-center gap-1.5 underline underline-offset-4 cursor-pointer"
              >
                <PlayCircle className="w-4 h-4 text-emerald-600" />
                <span>হরফ খেলার আসর (সাইনবোর্ড, খোঁজার গেম ও লেখার স্লেট) খেলুন →</span>
              </button>
            </div>

            {/* Trust points */}
            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-y-2.5 gap-x-6 text-base sm:text-lg font-semibold text-slate-800">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>১টি ফ্রি ট্রায়াল ক্লাস (অগ্রিম ফি নেই)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-emerald-700 font-extrabold">✓</span>
                <span>মেয়ে শিশুদের জন্য মহিলা শিক্ষিকা</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-emerald-700 font-extrabold">✓</span>
                <span>অভিভাবকের পছন্দসই সময়</span>
              </div>
            </div>
          </div>

          {/* Right Visual Image */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-white group">
              <img
                src="/src/assets/images/hero_kids_quran_1793806763657.jpg"
                alt="ছোটরা হাসিমুখে কুরআন ও আরবি হরফ শিখছে - কুরআন শিখি একাডেমি"
                referrerPolicy="no-referrer"
                className="w-full h-auto aspect-[16/10] sm:aspect-[4/3] object-cover group-hover:scale-102 transition-transform duration-500"
              />
              {/* Overlay Badge */}
              <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md rounded-2xl p-4 border border-slate-200 shadow-lg flex items-center justify-between">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-2xl shadow-xs">
                    🌟
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-600 uppercase tracking-wide">শিশুদের প্রিয় কারিকুলাম</p>
                    <p className="text-lg sm:text-xl font-extrabold text-slate-900 font-display">গেম ও ভিজ্যুয়াল মেথডে পাঠদান</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-sm sm:text-base font-extrabold text-emerald-900 bg-emerald-100 px-3.5 py-1.5 rounded-xl whitespace-nowrap">
                    ওয়ান টু ওয়ান লাইভ
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4-Item Proof Strip Row Below Hero */}
        <div className="mt-14 pt-8 border-t border-slate-200 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 text-center shadow-xs">
            <div className="text-2xl sm:text-3xl font-black text-emerald-800 font-display">ওয়ান টু ওয়ান লাইভ</div>
            <div className="text-base sm:text-lg font-bold text-slate-800 mt-2">ব্যক্তিগত যত্ন ও পাঠদান</div>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-200 text-center shadow-xs">
            <div className="text-3xl sm:text-4xl font-black text-emerald-800 font-display tabular-nums">৪-১৪ বছর</div>
            <div className="text-base sm:text-lg font-bold text-slate-800 mt-2">বয়সভিত্তিক বিশেষ সিলেবাস</div>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-200 text-center shadow-xs">
            <div className="text-3xl sm:text-4xl font-black text-emerald-800 font-display tabular-nums">৯৫%+</div>
            <div className="text-base sm:text-lg font-bold text-slate-800 mt-2">অভিভাবকদের সন্তুষ্টির হার</div>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-200 text-center shadow-xs">
            <div className="text-3xl sm:text-4xl font-black text-emerald-800 font-display tabular-nums">২৪/৭</div>
            <div className="text-base sm:text-lg font-bold text-slate-800 mt-2">সপ্তাহে পছন্দের সময় নির্বাচন</div>
          </div>
        </div>
      </div>
    </section>
  );
};
