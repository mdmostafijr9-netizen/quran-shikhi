import React, { useState } from 'react';
import { Check, ShieldCheck, HelpCircle, Sparkles, Video, Copy, CreditCard, MessageCircle } from 'lucide-react';
import { BkashLogo, NagadLogo, RocketLogo } from './PaymentLogos';
import {
  launchBkashApp,
  launchNagadApp,
  launchRocketApp,
  PAYMENT_ACCOUNT_NUMBER,
} from '../utils/paymentLinks';

interface PricingProps {
  onSelectPlan: (planName: string, mode?: 'enroll' | 'trial') => void;
}

export const PricingSection: React.FC<PricingProps> = ({ onSelectPlan }) => {
  const [currency, setCurrency] = useState<'BDT' | 'USD'>('BDT');
  const [isCopied, setIsCopied] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState('');
  const PAYMENT_NUMBER = PAYMENT_ACCOUNT_NUMBER;

  const handleCopyNumber = () => {
    navigator.clipboard.writeText(PAYMENT_NUMBER);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2500);
  };

  const plans = [
    {
      id: 'plan-2days',
      title: 'বেসিক প্ল্যান',
      tagline: 'ওয়ান টু ওয়ান লাইভ',
      frequency: 'সপ্তাহে ২ দিন',
      classesCount: 'মাসিক ৮টি লাইভ ক্লাস',
      duration: 'প্রতি ক্লাস ৪০ মিনিট সময়',
      priceBDT: '৯৯৯',
      priceUSD: '$১৫',
      badge: null,
      desc: 'নতুন শুরু করা সোনামনিদের জন্য সহজ ও ধীরগতির চমৎকার প্যাকেজ।',
      features: [
        'ওয়ান টু ওয়ান লাইভ ব্যক্তিগত শিক্ষক',
        'প্রতি ক্লাস পূর্ণ ৪০ মিনিট সময়',
        'নূরানী কায়দা ও হরফ মাখরাজ চর্চা',
        'ফ্রি কালারফুল ডিজিটাল কায়দা PDF',
        'মাসিক অভিভাবক অগ্রগতি মূল্যায়ন'
      ]
    },
    {
      id: 'plan-3days',
      title: 'স্ট্যান্ডার্ড প্ল্যান',
      tagline: 'ওয়ান টু ওয়ান লাইভ',
      frequency: 'সপ্তাহে ৩ দিন',
      classesCount: 'মাসিক ১২টি লাইভ ক্লাস',
      duration: 'প্রতি ক্লাস ৪০ মিনিট সময়',
      priceBDT: '১,৪৯৯',
      priceUSD: '$২৫',
      badge: 'সবচেয়ে জনপ্রিয়',
      desc: 'শিশুদের নিয়মিত পড়ার অভ্যাস গড়ে তোলার জন্য আদর্শ ও সবচেয়ে কার্যকর প্ল্যান।',
      features: [
        'ওয়ান টু ওয়ান লাইভ ব্যক্তিগত শিক্ষক',
        'প্রতি ক্লাস পূর্ণ ৪০ মিনিট সময়',
        'কায়দা + তাজবীদ + প্রয়োজনীয় দু’আ',
        'সাপ্তাহিক প্রগ্রেস ট্র্যাকিং রিপোর্ট',
        'ক্লাস মিস হলে মেকআপের সুযোগ',
        'কোর্স সমাপনী সার্টিফিকেট'
      ]
    },
    {
      id: 'plan-5days',
      title: 'ইনটেনসিভ প্ল্যান',
      tagline: 'ওয়ান টু ওয়ান লাইভ',
      frequency: 'সপ্তাহে ৫ দিন',
      classesCount: 'মাসিক ২০টি লাইভ ক্লাস',
      duration: 'প্রতি ক্লাস ৪০ মিনিট সময়',
      priceBDT: '২,৯৯৯',
      priceUSD: '$৪৫',
      badge: 'দ্রুত কুরআন খতম ও হিফজ',
      desc: 'দ্রুত সময়ে কুরআন শিক্ষা বা নিয়মিত হিফজ চালিয়ে নেওয়ার জন্য সেরা পছন্দ।',
      features: [
        'ওয়ান টু ওয়ান লাইভ সিনিয়র হাফেজ/আলিমা',
        'প্রতি ক্লাস পূর্ণ ৪০ মিনিট সময়',
        'দৈনিক সবক ও পেছনের রিভিশন',
        'নাজেরা থেকে পূর্ণ ৩০ পারা কুরআন খতম',
        'আলাদা ইসলামিক আদব ও চরিত্র গঠন পাঠ',
        'বিশেষ সম্মাননা স্মারক ও অ্যাওয়ার্ড'
      ]
    }
  ];

  return (
    <section id="pricing" className="py-20 bg-[#F8FAF9] border-t border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-sm sm:text-base font-bold text-emerald-800 bg-emerald-100/80 px-4 py-2 rounded-full mb-3">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <span>স্বচ্ছ ও সাশ্রয়ী মাসিক ফি প্ল্যান</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight font-display">
            ছোটদের <span className="text-emerald-700">ওয়ান টু ওয়ান লাইভ</span> ক্লাসের অফিসিয়াল ফি
          </h2>
          <p className="mt-4 text-slate-700 text-lg sm:text-xl leading-relaxed">
            এককালীন ভর্তি ফি মাত্র <b>৩০০ টাকা</b>। আপনি সরাসরি <b>Enroll Now (ভর্তি হন)</b> বাটনে ক্লিক করে তথ্য পূরণ ও বিকাশ, নগদ বা রকেটে পেমেন্ট সম্পন্ন করতে পারেন অথবা প্রথমে ১টি ফ্রি ট্রায়াল ক্লাস করে নিশ্চিত হতে পারেন।
          </p>

          {/* Currency Toggle */}
          <div className="mt-8 inline-flex p-1.5 bg-slate-200/80 rounded-2xl border border-slate-300">
            <button
              onClick={() => setCurrency('BDT')}
              className={`px-6 sm:px-8 py-3 text-base sm:text-lg font-black rounded-xl transition-all cursor-pointer ${
                currency === 'BDT' ? 'bg-white text-emerald-900 shadow-sm' : 'text-slate-700 hover:text-slate-900'
              }`}
            >
              🇧🇩 বাংলাদেশ (BDT ৳)
            </button>
            <button
              onClick={() => setCurrency('USD')}
              className={`px-6 sm:px-8 py-3 text-base sm:text-lg font-black rounded-xl transition-all cursor-pointer ${
                currency === 'USD' ? 'bg-white text-emerald-900 shadow-sm' : 'text-slate-700 hover:text-slate-900'
              }`}
            >
              🌍 প্রবাসী শিক্ষার্থী (USD $)
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {plans.map((p) => {
            const isPopular = p.badge === 'সবচেয়ে জনপ্রিয়';
            return (
              <div
                key={p.id}
                className={`rounded-3xl p-7 sm:p-9 flex flex-col justify-between transition-all duration-300 relative bg-white ${
                  isPopular
                    ? 'border-2 border-emerald-600 shadow-2xl scale-102 ring-4 ring-emerald-100'
                    : 'border border-slate-200 shadow-sm hover:shadow-lg'
                }`}
              >
                {p.badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-emerald-600 text-white text-sm sm:text-base font-extrabold px-5 py-1.5 rounded-full shadow-md">
                    {p.badge}
                  </div>
                )}

                <div>
                  <div className="text-center pb-6 border-b border-slate-100">
                    {/* Prominent ওয়ান টু ওয়ান লাইভ Badge on all plans */}
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-emerald-100 text-emerald-900 font-black text-sm sm:text-base rounded-xl mb-2.5">
                      <Video className="w-4 h-4 text-emerald-700" />
                      <span>{p.tagline}</span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">{p.title}</h3>
                    <p className="text-base sm:text-lg font-bold text-emerald-800 mt-1">{p.frequency} · {p.classesCount}</p>

                    <div className="mt-5 flex items-baseline justify-center gap-1.5">
                      <span className="text-4xl sm:text-5xl font-black text-slate-900 font-display tabular-nums">
                        {currency === 'BDT' ? `৳${p.priceBDT}` : p.priceUSD}
                      </span>
                      <span className="text-base sm:text-lg font-bold text-slate-500">/ মাস</span>
                    </div>
                    <div className="flex flex-wrap items-center justify-center gap-2 mt-3">
                      <span className="text-base font-bold text-emerald-900 bg-emerald-50 py-1.5 px-3.5 rounded-xl border border-emerald-200/60">
                        {p.duration}
                      </span>
                      <span className="text-sm font-extrabold text-amber-800 bg-amber-50 py-1.5 px-3.5 rounded-xl border border-amber-200/80">
                        ভর্তি ফি: ৩০০ টাকা (এককালীন)
                      </span>
                    </div>
                  </div>

                  <p className="text-base sm:text-lg text-slate-700 my-6 text-center leading-relaxed font-normal">
                    {p.desc}
                  </p>

                  <ul className="space-y-4 pt-2">
                    {p.features.map((f, i) => (
                      <li key={i} className="flex items-start gap-3 text-base sm:text-lg text-slate-800">
                        <Check className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="font-semibold leading-relaxed">{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-8 mt-8 border-t border-slate-100 space-y-3.5">
                  {/* Primary Enroll Now Button in English and Bangla */}
                  <button
                    onClick={() => onSelectPlan(`${p.title} (${p.frequency}) - ৳${p.priceBDT}`, 'enroll')}
                    className="w-full py-4 text-lg sm:text-xl font-black tracking-wide rounded-xl shadow-md transition-all duration-200 cursor-pointer bg-emerald-600 hover:bg-emerald-700 active:scale-98 text-white shadow-emerald-200 flex items-center justify-center gap-2"
                  >
                    <span>Enroll Now (ভর্তি হন)</span>
                    <span>→</span>
                  </button>

                  {/* Free Trial Button */}
                  <button
                    onClick={() => onSelectPlan(`${p.title} (${p.frequency})`, 'trial')}
                    className="w-full py-3 text-base sm:text-lg font-bold rounded-xl transition-all cursor-pointer bg-slate-50 hover:bg-slate-100 text-slate-800 border border-slate-200"
                  >
                    ১টি ফ্রি ট্রায়াল ক্লাস বুক করুন
                  </button>

                  <p className="text-sm sm:text-base text-center text-slate-600 mt-2 flex items-center justify-center gap-1.5 font-medium">
                    <ShieldCheck className="w-5 h-5 text-emerald-600" />
                    <span>কোনো অগ্রিম ফি ছাড়া ট্রায়ালের সুযোগ</span>
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Dedicated Payment & Admission Fee Section with bKash, Nagad, Rocket */}
        <div id="payment-methods" className="mt-14 bg-white rounded-3xl p-6 sm:p-10 border-2 border-emerald-500 shadow-2xl relative overflow-hidden">
          {/* Top highlight ribbon */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-emerald-100 text-emerald-800">
                <CreditCard className="w-6 h-6 text-emerald-700" />
              </span>
              <div>
                <span className="text-xs sm:text-sm font-black uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-0.5 rounded-full border border-emerald-200">
                  অফিসিয়াল পেমেন্ট গেটওয়ে
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display mt-0.5">
                  বিকাশ, নগদ ও রকেটে ফি পরিশোধের নিয়ম
                </h3>
              </div>
            </div>
            <div className="text-sm sm:text-base font-extrabold text-amber-900 bg-amber-50 px-4 py-1.5 rounded-full border border-amber-300">
              এককালীন ভর্তি ফি: মাত্র ৩০০ টাকা
            </div>
          </div>

          <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-normal mb-8">
            যেকোনো কোর্সে ভর্তি হওয়ার জন্য আপনার বিকাশ, নগদ বা রকেট অ্যাকাউন্ট থেকে <b>Send Money (সেন্ড মানি)</b>-এর মাধ্যমে এককালীন ভর্তি ফি <b>৩০০ টাকা</b> (বা সম্পূর্ণ কোর্স ফিসহ) পরিশোধ করতে পারেন।
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left: 3 Channels & Official Number */}
            <div className="lg:col-span-7 space-y-5">
              {/* 3 Channels Clickable App Launchers with Official Logos */}
              <div className="grid grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={async () => {
                    const res = await launchBkashApp();
                    setIsCopied(true);
                    setFeedbackMsg(res.message);
                    setTimeout(() => {
                      setIsCopied(false);
                      setFeedbackMsg('');
                    }, 3500);
                  }}
                  className="p-3 sm:p-4 bg-white rounded-2xl border-2 border-pink-200 hover:border-pink-500 hover:bg-pink-50/50 text-center shadow-sm flex flex-col items-center justify-between min-h-[96px] transition-all cursor-pointer active:scale-98 group"
                  title="ক্লিক করলেই নম্বর কপি হবে ও বিকাশ অ্যাপ ওপেন হবে"
                >
                  <div className="h-10 flex items-center justify-center group-hover:scale-105 transition-transform">
                    <BkashLogo size="md" />
                  </div>
                  <div className="text-xs font-black text-pink-800 bg-pink-100/80 px-2 py-0.5 rounded-full mt-1.5 w-full flex items-center justify-center gap-1">
                    <span>বিকাশ অ্যাপে যান</span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={async () => {
                    const res = await launchNagadApp();
                    setIsCopied(true);
                    setFeedbackMsg(res.message);
                    setTimeout(() => {
                      setIsCopied(false);
                      setFeedbackMsg('');
                    }, 3500);
                  }}
                  className="p-3 sm:p-4 bg-white rounded-2xl border-2 border-orange-200 hover:border-orange-500 hover:bg-orange-50/50 text-center shadow-sm flex flex-col items-center justify-between min-h-[96px] transition-all cursor-pointer active:scale-98 group"
                  title="ক্লিক করলেই নম্বর কপি হবে ও নগদ অ্যাপ ওপেন হবে"
                >
                  <div className="h-10 flex items-center justify-center group-hover:scale-105 transition-transform">
                    <NagadLogo size="md" />
                  </div>
                  <div className="text-xs font-black text-orange-800 bg-orange-100/80 px-2 py-0.5 rounded-full mt-1.5 w-full flex items-center justify-center gap-1">
                    <span>নগদ অ্যাপে যান</span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={async () => {
                    const res = await launchRocketApp();
                    setIsCopied(true);
                    setFeedbackMsg(res.message);
                    setTimeout(() => {
                      setIsCopied(false);
                      setFeedbackMsg('');
                    }, 3500);
                  }}
                  className="p-3 sm:p-4 bg-white rounded-2xl border-2 border-purple-200 hover:border-purple-500 hover:bg-purple-50/50 text-center shadow-sm flex flex-col items-center justify-between min-h-[96px] transition-all cursor-pointer active:scale-98 group"
                  title="ক্লিক করলেই নম্বর কপি হবে ও রকেট অ্যাপ ওপেন হবে"
                >
                  <div className="h-10 flex items-center justify-center group-hover:scale-105 transition-transform">
                    <RocketLogo size="md" />
                  </div>
                  <div className="text-xs font-black text-purple-800 bg-purple-100/80 px-2 py-0.5 rounded-full mt-1.5 w-full flex items-center justify-center gap-1">
                    <span>রকেট অ্যাপে যান</span>
                  </div>
                </button>
              </div>

              {/* Huge Highlight Box for 01408440180 */}
              <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white p-6 sm:p-7 rounded-3xl shadow-xl">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs sm:text-sm uppercase font-extrabold tracking-wider text-emerald-300">
                    বিকাশ · নগদ · রকেট পার্সোনাল নম্বর (Send Money):
                  </span>
                  <span className="text-xs font-bold text-emerald-200 bg-white/10 px-2.5 py-0.5 rounded-full">
                    সব মাধ্যম একই নম্বরে
                  </span>
                </div>

                <div className="mt-3 flex flex-wrap items-center justify-between gap-4">
                  <div className="text-3xl sm:text-4xl lg:text-5xl font-black font-mono tracking-wider text-amber-300 drop-shadow-sm select-all">
                    01408440180
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      onClick={handleCopyNumber}
                      className={`px-5 py-3 rounded-xl text-base font-black flex items-center gap-2 transition-all cursor-pointer shadow-md ${
                        isCopied
                          ? 'bg-emerald-400 text-slate-950 scale-105 ring-4 ring-emerald-300'
                          : 'bg-white hover:bg-slate-100 text-slate-900 active:scale-95'
                      }`}
                    >
                      {isCopied ? <Check className="w-5 h-5 text-emerald-950" /> : <Copy className="w-5 h-5 text-emerald-800" />}
                      <span>{isCopied ? '✓ নম্বর কপি হয়েছে!' : 'নম্বর কপি করুন'}</span>
                    </button>

                    <button
                      onClick={async () => {
                        const res = await launchBkashApp();
                        setIsCopied(true);
                        setFeedbackMsg(res.message);
                        setTimeout(() => {
                          setIsCopied(false);
                          setFeedbackMsg('');
                        }, 3500);
                      }}
                      className="px-4 py-3 rounded-xl text-sm font-extrabold bg-pink-500 hover:bg-pink-600 text-white flex items-center gap-1.5 transition-all cursor-pointer shadow-md active:scale-98"
                    >
                      <span>📲 বিকাশ অ্যাপে যান</span>
                    </button>
                  </div>
                </div>

                {feedbackMsg && (
                  <div className="mt-3 p-2.5 bg-emerald-400 text-slate-950 font-black text-xs sm:text-sm rounded-xl text-center shadow animate-fadeIn">
                    {feedbackMsg}
                  </div>
                )}

                <div className="mt-4 pt-3 border-t border-emerald-800/80 text-xs sm:text-sm text-emerald-100/90 leading-relaxed">
                  💡 <b>পরামর্শ:</b> উক্ত নম্বরে সেন্ড মানি করার সময় রেফারেন্সে আপনার <b>সন্তানের নাম</b> লিখুন এবং লেনদেন সফল হওয়ার পর প্রাপ্ত <b>TrxID</b> সংগ্রহ করে রাখুন।
                </div>
              </div>
            </div>

            {/* Right: Step-by-Step Instructions */}
            <div className="lg:col-span-5 bg-[#F8FAF9] p-6 sm:p-7 rounded-3xl border border-slate-200 space-y-4">
              <h4 className="font-extrabold text-slate-900 text-lg sm:text-xl flex items-center gap-2">
                <span>পেমেন্ট করার ৪টি সহজ ধাপ:</span>
              </h4>

              <div className="space-y-3 text-sm sm:text-base text-slate-800">
                <div className="flex items-start gap-2.5">
                  <span className="w-6 h-6 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center shrink-0 text-xs mt-0.5">১</span>
                  <span>বিকাশ, নগদ বা রকেট অ্যাপে ঢুকে <b>Send Money (সেন্ড মানি)</b> সিলেক্ট করুন।</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="w-6 h-6 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center shrink-0 text-xs mt-0.5">২</span>
                  <span>প্রাপক নম্বর দিন: <b className="font-mono text-emerald-800 text-base">01408440180</b></span>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="w-6 h-6 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center shrink-0 text-xs mt-0.5">৩</span>
                  <span>টাকার পরিমাণ দিন (ভর্তি ফি <b>৩০০ টাকা</b> বা পূর্ণ কোর্স ফিসহ)।</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="w-6 h-6 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center shrink-0 text-xs mt-0.5">৪</span>
                  <span>লেনদেন সফল হলে <b>TrxID</b> নিয়ে নিচে ভর্তি ফরম পূরণ করুন অথবা WhatsApp এ মেসেজ দিন।</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 space-y-2.5">
                <button
                  onClick={() => onSelectPlan('স্ট্যান্ডার্ড প্ল্যান (সপ্তাহে ৩ দিন) - ১৪৯৯ টাকা', 'enroll')}
                  className="w-full py-3.5 px-4 text-base sm:text-lg font-black text-white bg-emerald-600 hover:bg-emerald-700 active:scale-98 rounded-xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <CreditCard className="w-5 h-5" />
                  <span>Enroll Now (ভর্তি ফর্ম পূরণ ও TrxID দিন)</span>
                </button>

                <a
                  href="https://wa.me/8801850172115?text=%E0%A6%86%E0%A6%B8%E0%A6%B8%E0%A6%BE%E0%A6%B2%E0%A6%BE%E0%A6%AE%E0%A7%81%20%E0%A6%86%E0%A6%B2%E0%A6%BE%E0%A6%87%E0%A6%95%E0%A7%81%E0%A6%AE%E0%A5%A4%20%E0%A6%86%E0%A6%AE%E0%A6%BF%20%E0%A6%95%E0%A7%81%E0%A6%B0%E0%A6%86%E0%A6%A8%20%E0%A6%B6%E0%A6%BF%E0%A6%96%E0%A6%BF%20%E0%A6%8F%E0%A6%95%E0%A6%BE%E0%A6%A1%E0%A7%87%E0%A6%AE%E0%A6%BF%E0%A6%A4%E0%A7%87%20%E0%A7%A6%E0%A7%A7%E0%A7%AA%E0%A7%A6%E0%A7%AE%E0%A7%AA%E0%A7%AA%E0%A7%A6%E0%A7%A7%E0%A7%AE%E0%A7%A6%20%E0%A6%A8%E0%A6%AE%E0%A7%8D%E0%A6%AC%E0%A6%B0%E0%A7%87%20%E0%A6%AD%E0%A6%B0%E0%A7%8D%E0%A6%A4%E0%A6%BF%20%E0%A6%AB%E0%A6%BF%20%E0%A6%AA%E0%A6%BE%E0%A6%A0%E0%A6%BF%E0%A7%9F%E0%A7%87%E0%A6%9B%E0%A6%BF%E0%A5%A4%20TrxID%20%E0%A6%AF%E0%A6%BE%E0%A6%9A%E0%A6%BE%E0%A6%87%20%E0%A6%95%E0%A6%B0%E0%A7%87%20%E0%A6%AD%E0%A6%B0%E0%A7%8D%E0%A6%A4%E0%A6%BF%20%E0%A6%95%E0%A6%A8%E0%A6%AB%E0%A6%BE%E0%A6%B0%E0%A7%8D%E0%A6%AE%20%E0%A6%95%E0%A6%B0%E0%A7%81%E0%A6%A8%E0%A5%A4"
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-3 px-4 text-sm sm:text-base font-bold text-slate-800 bg-white hover:bg-slate-50 border border-slate-300 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-600" />
                  <span>WhatsApp এ সরাসরি TrxID পাঠান</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Note on Free Trial */}
        <div className="mt-10 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 max-w-3xl mx-auto flex items-start sm:items-center gap-4 shadow-sm">
          <HelpCircle className="w-8 h-8 text-emerald-700 shrink-0 mt-0.5" />
          <p className="text-base sm:text-lg text-slate-800 leading-relaxed font-normal">
            <b className="font-extrabold text-slate-900">পারিবারিক সুবিধা:</b> একই পরিবার থেকে দুই বা ততোধিক সন্তান ভর্তি হলে বিশেষ ছাড় রয়েছে। এছাড়া যেকোনো সময় শিক্ষক বা ক্লাসের সুবিধাজনক সময় পরিবর্তনের পূর্ণ স্বাধীনতা রয়েছে।
          </p>
        </div>
      </div>
    </section>
  );
};
