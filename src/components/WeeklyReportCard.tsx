import React, { useState } from 'react';
import { Award, Star, CheckCircle2, TrendingUp, Calendar, BookOpen, ShieldCheck, UserCheck } from 'lucide-react';

export const WeeklyReportCard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'qaida' | 'tajweed' | 'hifz'>('qaida');

  const reportData = {
    qaida: {
      studentName: 'তাহসিন আহমেদ',
      age: '৬ বছর',
      course: 'নূরানী কায়দা ফাউন্ডেশন',
      week: '৪র্থ সপ্তাহ',
      teacher: 'হাফেজ ক্বারী আব্দুর রহমান',
      overallScore: '৯৪%',
      overallGrade: 'A+ (চমৎকার)',
      stars: 5,
      metrics: [
        { label: 'আরবি হরফ চেনা ও মাখরাজ', score: 96, grade: 'A+' },
        { label: 'হরকত ও তানভীন রিডিং', score: 92, grade: 'A+' },
        { label: 'জযম ও যুক্তাক্ষর পাঠ', score: 90, grade: 'A' },
        { label: 'দৈনন্দিন মাসনূন দু’আ মুখস্থ', score: 95, grade: 'A+' },
        { label: 'ক্লাসে উপস্থিতি ও একাগ্রতা', score: 100, grade: 'A+' },
      ],
      remarks: 'আলহামদুলিল্লাহ, বাচ্চাটি হরফের মাখরাজ খুব দ্রুত আয়ত্ত করেছে। ভয়ভীতি ছাড়া আনন্দের সাথে পড়ছে। আগামী সপ্তাহে ইনশাআল্লাহ মাদ্দের কায়দা শুরু হবে।',
      awardTitle: 'সাপ্তাহিক সেরা সোনামনি (Star Student)',
    },
    tajweed: {
      studentName: 'মাইমুনা বিনতে রাশেদ',
      age: '৮ বছর',
      course: 'সহীহ নাজেরা ও তাজবীদ কোর্স',
      week: '৮ম সপ্তাহ',
      teacher: 'আলিমা ফাতিমা বেগম',
      overallScore: '৯৬%',
      overallGrade: 'A+ (অসাধারণ)',
      stars: 5,
      metrics: [
        { label: 'আমপারা সহীহ তিলাওয়াত', score: 98, grade: 'A+' },
        { label: 'নুনে সাকিন ও তানভীন নিয়ম', score: 94, grade: 'A+' },
        { label: 'মাদ্দের সঠিক টান ও গুন্নাহ', score: 95, grade: 'A+' },
        { label: 'ওয়াকফ ও থামার নিয়ম', score: 92, grade: 'A+' },
        { label: 'মধুর সুর ও তারতীল', score: 96, grade: 'A+' },
      ],
      remarks: 'মাশাআল্লাহ! মাইমুনার তিলাওয়াতের সুর ও মাখরাজ খুবই মিষ্টি হয়েছে। নিয়মিত মশকের কারণে প্রতিটি আয়াতে তার গুন্নাহ নিখুঁত হচ্ছে।',
      awardTitle: 'সেরা সুললিত তিলাওয়াতকারী (Best Reciter)',
    },
    hifz: {
      studentName: 'আব্দুল্লাহ আল মাহদী',
      age: '৯ বছর',
      course: 'ছোটদের হিফজুল কুরআন প্রোগ্রাম',
      week: '১২তম সপ্তাহ',
      teacher: 'হাফেজ মাওলানা জুবায়ের',
      overallScore: '৯২%',
      overallGrade: 'A+ (মজবুত হিফজ)',
      stars: 5,
      metrics: [
        { label: 'নতুন সবক ইয়াদ', score: 95, grade: 'A+' },
        { label: 'পেছনের সবকি রিভিশন', score: 90, grade: 'A' },
        { label: 'আয়াত সংযোগ ও ইয়াদ সংরক্ষণ', score: 92, grade: 'A+' },
        { label: 'তাজবীদ নির্ভুলতা', score: 94, grade: 'A+' },
        { label: 'নামাজে পাঠের প্রস্তুতি', score: 96, grade: 'A+' },
      ],
      remarks: 'আলহামদুলিল্লাহ! ৩০তম পারার শেষ ১৫টি সূরা সম্পূর্ণ নির্ভুলভাবে ইয়াদ করেছে। স্মৃতিশক্তি ও একাগ্রতা খুবই প্রশংসনীয়।',
      awardTitle: 'সেরা হিফজ শিক্ষার্থী (Star Hafiz)',
    },
  };

  const current = reportData[activeTab];

  return (
    <section id="report-card" className="py-20 bg-white border-t border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-emerald-800 bg-emerald-100 px-4 py-1.5 rounded-full mb-3 shadow-xs">
            <Award className="w-4 h-4 text-emerald-600" />
            <span>অভিভাবকদের জন্য স্বচ্ছ অগ্রগতি ট্র্যাকিং</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight font-display">
            সন্তানের সাপ্তাহিক ডিজিটাল রিপোর্ট কার্ড
          </h2>
          <p className="mt-3 text-slate-700 text-base sm:text-lg leading-relaxed">
            আপনার সন্তান ক্লাসে কেমন শিখছে, তার জন্য আন্দাজে ভরসা করতে হবে না। প্রতি সপ্তাহে শিক্ষক অভিভাবকের কাছে একটি বিস্তারিত ডিজিটাল পারফরম্যান্স রিপোর্ট কার্ড পাঠান।
          </p>

          {/* Sample Switcher Tabs */}
          <div className="mt-7 inline-flex p-1 bg-slate-100 rounded-2xl border border-slate-200 max-w-md mx-auto">
            <button
              onClick={() => setActiveTab('qaida')}
              className={`px-4 sm:px-5 py-2 text-xs sm:text-sm font-bold rounded-xl transition-all cursor-pointer ${
                activeTab === 'qaida'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              নূরানী কায়দা রিপোর্ট
            </button>
            <button
              onClick={() => setActiveTab('tajweed')}
              className={`px-4 sm:px-5 py-2 text-xs sm:text-sm font-bold rounded-xl transition-all cursor-pointer ${
                activeTab === 'tajweed'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              নাজেরা রিপোর্ট
            </button>
            <button
              onClick={() => setActiveTab('hifz')}
              className={`px-4 sm:px-5 py-2 text-xs sm:text-sm font-bold rounded-xl transition-all cursor-pointer ${
                activeTab === 'hifz'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              হিফজুল কুরআন রিপোর্ট
            </button>
          </div>
        </div>

        {/* The Digital Report Card Preview Frame */}
        <div className="bg-gradient-to-br from-emerald-50/50 via-white to-amber-50/30 rounded-3xl p-6 sm:p-10 border-2 border-emerald-400 shadow-xl max-w-4xl mx-auto relative overflow-hidden animate-fadeIn">
          {/* Top Banner Ribbon */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b-2 border-emerald-200">
            <div>
              <div className="text-xs font-black uppercase tracking-wider text-emerald-800">
                কুরআন শিখি একাডেমি • অফিসিয়াল মূল্যায়ন
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 font-display mt-0.5">
                সাপ্তাহিক প্রগ্রেস কার্ড ({current.week})
              </h3>
            </div>

            <div className="flex items-center gap-2">
              <span className="bg-emerald-600 text-amber-200 font-black text-xs sm:text-sm px-3.5 py-1.5 rounded-xl shadow-xs">
                {current.overallGrade}
              </span>
              <span className="bg-amber-400 text-slate-950 font-black text-xs sm:text-sm px-3 py-1.5 rounded-xl shadow-xs">
                স্কোর: {current.overallScore}
              </span>
            </div>
          </div>

          {/* Student Info Bar */}
          <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 bg-white p-3.5 sm:p-4 rounded-2xl border border-slate-200 text-xs sm:text-sm">
            <div>
              <span className="text-slate-500 block text-[11px] font-bold">শিক্ষার্থী:</span>
              <span className="font-extrabold text-slate-900">{current.studentName}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[11px] font-bold">বয়স:</span>
              <span className="font-bold text-slate-800">{current.age}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[11px] font-bold">কোর্স:</span>
              <span className="font-bold text-emerald-800">{current.course}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[11px] font-bold">শিক্ষক:</span>
              <span className="font-bold text-slate-800">{current.teacher}</span>
            </div>
          </div>

          {/* Detailed Skill Metrics Progress Bars */}
          <div className="mt-6 space-y-4">
            <h4 className="text-sm sm:text-base font-extrabold text-slate-900 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-600" />
              <span>মূল্যায়ন সূচক ও দক্ষতা পরিমাপ:</span>
            </h4>

            <div className="space-y-3">
              {current.metrics.map((m, idx) => (
                <div key={idx} className="bg-white p-3 sm:p-3.5 rounded-xl border border-slate-200 shadow-xs">
                  <div className="flex items-center justify-between text-xs sm:text-sm font-bold text-slate-800 mb-1.5">
                    <span>{m.label}</span>
                    <div className="flex items-center gap-2 font-mono">
                      <span className="text-emerald-800 font-black">{m.score}%</span>
                      <span className="text-[11px] bg-emerald-100 text-emerald-900 px-2 py-0.5 rounded font-black">
                        {m.grade}
                      </span>
                    </div>
                  </div>
                  {/* Progress track */}
                  <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full transition-all duration-700"
                      style={{ width: `${m.score}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Teacher's Remarks Box */}
          <div className="mt-6 bg-emerald-50/70 p-4 sm:p-5 rounded-2xl border border-emerald-300">
            <div className="text-xs font-bold text-emerald-900 uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-700" />
              <span>শিক্ষকের বিশেষ পর্যবেক্ষণ ও মন্তব্য:</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-normal">
              &quot;{current.remarks}&quot;
            </p>

            <div className="mt-3 pt-3 border-t border-emerald-200/80 flex items-center justify-between text-xs font-bold">
              <div className="flex items-center gap-1 text-amber-500">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="w-4 h-4 fill-amber-400" />
                ))}
                <span className="text-slate-700 ml-1.5">রেটিং: ৫/৫</span>
              </div>
              <span className="text-emerald-800 bg-white px-3 py-1 rounded-full border border-emerald-200">
                🏅 {current.awardTitle}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
