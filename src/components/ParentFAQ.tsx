import React, { useState } from 'react';
import { ChevronDown, HelpCircle, PhoneCall, Mail } from 'lucide-react';

export const ParentFAQ: React.FC<{ onOpenBooking: () => void }> = ({ onOpenBooking }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'আমার সন্তানের বয়স মাত্র ৪-৫ বছর, সে কি অনলাইনে মনোযোগ দিতে পারবে?',
      a: 'হ্যাঁ, ইনশাআল্লাহ! ছোটদের জন্য আমাদের পাঠদান পদ্ধতি পুরোপুরি স্ক্রিন-বান্ধব ও ইন্টারেক্টিভ। আমরা একটানা তাত্ত্বিক পড়া না পড়িয়ে কালারফুল ডিজিটাল ফ্ল্যাশ কার্ড, হরফ অ্যানিমেশন, ছড়া ও প্রশংসাসূচক স্টার দিয়ে পড়াই। ক্লাস মাত্র ৩০ মিনিটের হওয়ায় শিশুরা ক্লান্ত বা বিরক্ত হয় না।'
    },
    {
      q: 'মেয়ে শিশুদের জন্য কি আলাদা পর্দাশীল মহিলা শিক্ষিকা রয়েছেন?',
      a: 'জি, আলহামদুলিল্লাহ! আমাদের রয়েছে দক্ষ ও সনদপ্রাপ্ত একদল স্নেহময়ী আলিমা ও কারিয়া শিক্ষিকা। মেয়ে শিশুদের ক্ষেত্রে আমরা সবসময় অগ্রাধিকার ভিত্তিতে অভিজ্ঞ মহিলা শিক্ষিকা নির্ধারণ করে থাকি।'
    },
    {
      q: 'ক্লাসের সময় অভিভাবক কি পাশে বসে পর্যবেক্ষণ করতে পারবেন?',
      a: 'অবশ্যই! বিশেষ করে ৪ থেকে ৭ বছর বয়সী শিশুদের প্রথম কয়েকটি ক্লাসে পিতা বা মাতার পাশে থাকা আমরা আন্তরিকভাবে উৎসাহিত করি। এতে শিশুর জড়তা কাটে এবং অভিভাবকও শিক্ষকের আন্তরিক পাঠদান সরাসরি প্রত্যক্ষ করতে পারেন।'
    },
    {
      q: 'কোনো দিন বাচ্চা অসুস্থ থাকলে বা বিশেষ প্রয়োজনে ক্লাস মিস হলে কি ক্ষতি হবে?',
      a: 'একদমই না। ক্লাসের অন্তত ২ ঘন্টা আগে শিক্ষক বা আমাদের হেল্পলাইনে জানালে ওই ক্লাসের জন্য পরবর্তীতে সুবিধাজনক সময়ে মেকআপ ক্লাস দেওয়ার ব্যবস্থা করা হয়।'
    },
    {
      q: 'অনলাইন ক্লাসে যুক্ত হতে কী কী প্রযুক্তি বা ডিভাইসের প্রয়োজন?',
      a: 'খুব সাধারণ একটি স্মার্টফোন, ট্যাব বা ল্যাপটপ এবং স্বাভাবিক ইন্টারনেট সংযোগই যথেষ্ট। ক্লাসগুলো গুগল মিট (Google Meet) বা জুম (Zoom)-এর মাধ্যমে সহজে অনুষ্ঠিত হয়।'
    }
  ];

  return (
    <section className="py-20 bg-[#F8FAF9] border-t border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 text-sm font-bold text-emerald-800 bg-emerald-100/70 px-4 py-1.5 rounded-full mb-3">
            <HelpCircle className="w-4 h-4 text-emerald-600" />
            <span>সচরাচর জিজ্ঞাসা ও উত্তর</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 font-display">
            অভিভাবকদের সাধারণ প্রশ্নাবলী
          </h2>
          <p className="text-base sm:text-lg text-slate-700 mt-3 leading-relaxed">
            আপনার মনেও কি কোনো প্রশ্ন রয়েছে? নিচে বিস্তারিত জেনে নিন অথবা সরাসরি আমাদের সাথে কথা বলুন।
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-xs transition-colors"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 bg-white hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  <span className="text-base sm:text-lg font-bold text-slate-900 font-display">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-emerald-700 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-emerald-600' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="p-6 pt-0 text-base sm:text-lg text-slate-700 leading-relaxed bg-white border-t border-slate-100 font-normal">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Quick CTA box */}
        <div className="mt-14 bg-gradient-to-r from-emerald-800 to-teal-900 rounded-3xl p-8 sm:p-10 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1.5 text-center sm:text-left">
            <h3 className="text-2xl sm:text-3xl font-extrabold font-display">
              আপনার সন্তানের সুন্দর ভবিষ্যতের সূচনা হোক আজই
            </h3>
            <p className="text-sm sm:text-base text-emerald-100 leading-relaxed font-normal">
              ১টি ক্লাসেই বুঝতে পারবেন আপনার সন্তান কতটা আনন্দ ও আগ্রহের সাথে কুরআন শিখছে।
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onOpenBooking}
              className="px-8 py-3.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-base rounded-xl shadow-lg transition-all active:scale-95 cursor-pointer"
            >
              বিনামূল্যে ট্রায়াল নিন
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
