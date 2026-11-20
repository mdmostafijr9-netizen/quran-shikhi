import React from 'react';
import { HeartHandshake, Award, Shield, MessageSquareText, Calendar, Sparkles } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const reasons = [
    {
      icon: HeartHandshake,
      title: 'ভয়হীন ও মমতাময়ী পাঠদান',
      desc: 'ছোটদের কোনো প্রকার বকাঝকা না করে বন্ধুসুলভ পরিবেশে ভালোবেসে শেখানো হয়, যাতে তারা কুরআনকে নিজের থেকেই ভালোবাসতে শেখে।',
      color: 'text-rose-600 bg-rose-50'
    },
    {
      icon: Shield,
      title: 'ওয়ান টু ওয়ান লাইভ ব্যক্তিগত কেয়ার',
      desc: 'একটি ক্লাসে শুধুমাত্র একজন শিশু ও একজন শিক্ষক। শিক্ষক পুরো সময়টা শুধু আপনার সন্তানের মেধা ও দুর্বলতার প্রতি একক মনোযোগ দেন।',
      color: 'text-emerald-700 bg-emerald-50'
    },
    {
      icon: Award,
      title: 'অভিজ্ঞ আলিমা ও হাফেজ শিক্ষক',
      desc: 'মেয়ে শিশুদের জন্য স্নেহময়ী আলিমা ও কারিয়া শিক্ষিকা এবং ছেলে শিশুদের জন্য অভিজ্ঞ হাফেজ ও কারী শিক্ষক নিয়োগের সুব্যবস্থা।',
      color: 'text-amber-700 bg-amber-50'
    },
    {
      icon: MessageSquareText,
      title: 'সাপ্তাহিক প্রগ্রেস রিপোর্ট',
      desc: 'আপনার সন্তান কোন কোন হরফ ও সূরা শিখল, তা অভিভাবকের হোয়াটসঅ্যাপে নিয়মিত ভয়েস বা টেক্সট রিপোর্টে আপডেট দেওয়া হয়।',
      color: 'text-blue-700 bg-blue-50'
    },
    {
      icon: Calendar,
      title: 'পছন্দসই সময়সূচি নির্বাচন',
      desc: 'স্কুল বা মাদ্রাসার পড়াশোনার সাথে সমন্বয় করে আপনার পছন্দমতো সকাল, দুপুর, বিকাল বা রাতের সুবিধাজনক স্লটে ক্লাস নির্ধারণ করা যায়।',
      color: 'text-purple-700 bg-purple-50'
    },
    {
      icon: Sparkles,
      title: 'স্টার ও সার্টিফিকেট রিওয়ার্ড',
      desc: 'প্রতিটি স্তর সফলভাবে সম্পন্ন করার পর আকর্ষণীয় ডিজিটাল সার্টিফিকেট ও শিশুদের জন্য উৎসাহমূলক স্টার ব্যাজ প্রদান করা হয়।',
      color: 'text-teal-700 bg-teal-50'
    }
  ];

  return (
    <section id="why-us" className="py-20 bg-white border-t border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          {/* Visual Showcase */}
          <div className="lg:col-span-5 relative order-2 lg:order-1">
            <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-slate-100 bg-white">
              <img
                src="/src/assets/images/feature_kids_certified_mentor_1793806765025.jpg"
                alt="অভিজ্ঞ শিক্ষিকা হাসিমুখে ছোট ছাত্রীকে আরবি উচ্চারণ পড়াচ্ছেন"
                referrerPolicy="no-referrer"
                className="w-full h-auto object-cover"
              />
              <div className="p-6 bg-gradient-to-r from-emerald-800 to-teal-900 text-white rounded-b-2xl">
                <p className="text-xs sm:text-sm text-emerald-200 font-bold uppercase tracking-wide">আমাদের মূল নীতি</p>
                <h4 className="text-xl font-bold mt-1">
                  &ldquo;স্নেহ ও ভালোবাসা দিয়ে কুরআনের আলো ছড়ানো&rdquo;
                </h4>
                <p className="text-sm text-emerald-100 mt-1 leading-relaxed">
                  ছোট শিশুদের কোমল অন্তরে দ্বীনি অনুরাগ সৃষ্টি করাই আমাদের প্রথম ও প্রধান ব্রত।
                </p>
              </div>
            </div>
          </div>

          {/* Heading & Intro */}
          <div className="lg:col-span-7 space-y-4 order-1 lg:order-2">
            <div className="inline-flex items-center gap-2 text-sm font-bold text-emerald-800 bg-emerald-50 px-3.5 py-1.5 rounded-full border border-emerald-200">
              অভিভাবকদের কেন প্রথম পছন্দ
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight font-display">
              কেন আপনার সন্তানের জন্য ‘কুরআন শিখি’ সেরা মাধ্যম?
            </h2>
            <p className="text-lg sm:text-xl text-slate-700 leading-relaxed font-normal">
              অনলাইনে ছোট শিশুদের মনোযোগ ধরে রাখা বিশেষ অভিজ্ঞতার বিষয়। আমাদের শিক্ষক-শিক্ষিকারা বিশেষভাবে প্রশিক্ষিত কীভাবে শিশুদের হাসিখুশি রেখে তাদের অন্তরে কুরআনের প্রতি গভীর ভালোবাসা ও ভালো লাগা তৈরি করতে হয়।
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-6 text-base sm:text-lg font-bold text-slate-800">
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded-full bg-emerald-600" />
                <span>১০০% আন্তর্জাতিক স্ট্যান্ডার্ড ওয়ান টু ওয়ান লাইভ ক্লাস</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded-full bg-emerald-600" />
                <span>প্রবাসী অভিভাবকদের অবিচল আস্থা</span>
              </div>
            </div>
          </div>
        </div>

        {/* 6 Feature Bento Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((r, i) => {
            const Icon = r.icon;
            return (
              <div
                key={i}
                className="bg-[#F8FAF9] p-7 sm:p-8 rounded-3xl border border-slate-200 shadow-xs hover:shadow-md transition-shadow duration-200 space-y-4"
              >
                <div className={`w-14 h-14 rounded-2xl ${r.color} flex items-center justify-center`}>
                  <Icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-display">{r.title}</h3>
                <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-normal">
                  {r.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
