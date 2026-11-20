import React, { useState } from 'react';
import { HelpCircle, Sparkles, CheckCircle2, ArrowRight, RotateCcw, UserPlus, BookOpen, Star } from 'lucide-react';
import { COURSES } from '../data/courses';

interface SmartCourseFinderProps {
  onSelectCourse: (courseTitle: string, mode?: 'enroll' | 'trial') => void;
}

export const SmartCourseFinder: React.FC<SmartCourseFinderProps> = ({ onSelectCourse }) => {
  const [step, setStep] = useState<number>(1);
  const [ageGroup, setAgeGroup] = useState<string>('4-6');
  const [currentLevel, setCurrentLevel] = useState<string>('beginner');
  const [primaryGoal, setPrimaryGoal] = useState<string>('qaida');
  const [recommendedCourseId, setRecommendedCourseId] = useState<string | null>(null);

  const handleCalculate = (finalGoal: string) => {
    // Logic to select course based on age, level, and goal
    let courseId = 'noorani-qaida';

    if (finalGoal === 'hifz' || currentLevel === 'memorize') {
      courseId = 'junior-hifz';
    } else if (finalGoal === 'duas' || currentLevel === 'duas_interest') {
      courseId = 'duas-akhlaq';
    } else if (finalGoal === 'tajweed' || currentLevel === 'knows_letters' || currentLevel === 'can_read') {
      courseId = 'nazira-tajweed';
    } else {
      courseId = 'noorani-qaida';
    }

    setRecommendedCourseId(courseId);
    setStep(4); // Result step
  };

  const handleReset = () => {
    setStep(1);
    setRecommendedCourseId(null);
  };

  const matchedCourse = COURSES.find((c) => c.id === recommendedCourseId) || COURSES[0];

  return (
    <section id="course-finder" className="py-16 sm:py-20 bg-gradient-to-b from-white via-emerald-50/30 to-[#F8FAF9] border-t border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-emerald-800 bg-emerald-100 px-4 py-1.5 rounded-full mb-3 shadow-xs">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <span>স্মার্ট কোর্স যাচাই কুইজ (Smart Assessment)</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight font-display">
            আপনার সোনামনির জন্য কোন কোর্সটি সবচেয়ে সেরা?
          </h2>
          <p className="mt-2.5 text-slate-600 text-sm sm:text-base max-w-2xl mx-auto">
            মাত্র ৩টি সাধারণ প্রশ্নের উত্তর দিন। আমাদের সিস্টেম আপনার সন্তানের বর্তমান মেধা ও বয়সের সাথে মানানসই সেরা কোর্সটি সুপারিশ করবে।
          </p>
        </div>

        {/* Interactive Quiz Box */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border-2 border-emerald-300 shadow-xl relative overflow-hidden">
          {/* Step Progress Dots */}
          {step <= 3 && (
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-100">
              <span className="text-xs sm:text-sm font-black text-emerald-800">
                ধাপ {step} / ৩
              </span>
              <div className="flex items-center gap-2">
                {[1, 2, 3].map((s) => (
                  <div
                    key={s}
                    className={`h-2.5 rounded-full transition-all ${
                      s === step
                        ? 'w-8 bg-emerald-600'
                        : s < step
                        ? 'w-2.5 bg-emerald-400'
                        : 'w-2.5 bg-slate-200'
                    }`}
                  />
                ))}
              </div>
            </div>
          )}

          {/* STEP 1: Child's Age */}
          {step === 1 && (
            <div className="space-y-6 animate-fadeIn">
              <h3 className="text-lg sm:text-2xl font-black text-slate-900 font-display">
                ১. আপনার সন্তানের বয়স কত?
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {[
                  { id: '4-6', label: '৪ থেকে ৬ বছর', sub: 'প্লে, নার্সারি বা কেজি শ্রেণি' },
                  { id: '6-8', label: '৬ থেকে ৮ বছর', sub: '১ম বা ২য় শ্রেণি' },
                  { id: '8-11', label: '৮ থেকে ১১ বছর', sub: '৩য় থেকে ৫ম শ্রেণি' },
                  { id: '11-14', label: '১১ থেকে ১৪ বছর', sub: '৬ষ্ঠ থেকে ৮ম শ্রেণি' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setAgeGroup(item.id);
                      setStep(2);
                    }}
                    className="p-4 rounded-2xl border-2 border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/60 text-left transition-all cursor-pointer group flex items-center justify-between shadow-xs"
                  >
                    <div>
                      <div className="font-extrabold text-base text-slate-900 group-hover:text-emerald-900">
                        {item.label}
                      </div>
                      <div className="text-xs text-slate-500 mt-0.5">{item.sub}</div>
                    </div>
                    <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-1 transition-transform" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 2: Current Knowledge */}
          {step === 2 && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex items-center justify-between">
                <h3 className="text-lg sm:text-2xl font-black text-slate-900 font-display">
                  ২. আরবি হরফ ও কুরআন পড়ার বর্তমান অবস্থা কী?
                </h3>
              </div>
              <div className="grid grid-cols-1 gap-3.5">
                {[
                  { id: 'beginner', label: 'একেবারেই নতুন, হরফ চেনে না', sub: 'শুরু থেকে আলিফ-বা-তা এবং ছবি দেখে হরফ চেনানো প্রয়োজন' },
                  { id: 'knows_letters', label: 'হরফ চেনে কিন্তু বানান করে রিডিং পড়তে পারে না', sub: 'হরকত, তানভীন ও যুক্তাক্ষর দিয়ে রিডিং প্র্যাকটিস দরকার' },
                  { id: 'can_read', label: 'দেখে পড়তে পারে কিন্তু তাজবীদ ও উচ্চারণে ভুল হয়', sub: 'মাদ্দ, গুন্নাহ ও সহীহ তারতীলের সাথে নাজেরা পড়ার প্রশিক্ষণ দরকার' },
                  { id: 'memorize', label: 'আমপারা বা প্রয়োজনীয় সূরা হিফজ (মুখস্থ) করতে চায়', sub: 'সহীহ তিলাওয়াতের পাশাপাশি নিয়মিত মুখস্থ রাখার ইসলামিক মেথড' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setCurrentLevel(item.id);
                      setStep(3);
                    }}
                    className="p-4 rounded-2xl border-2 border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/60 text-left transition-all cursor-pointer group flex items-center justify-between shadow-xs"
                  >
                    <div>
                      <div className="font-extrabold text-base text-slate-900 group-hover:text-emerald-900">
                        {item.label}
                      </div>
                      <div className="text-xs text-slate-500 mt-0.5">{item.sub}</div>
                    </div>
                    <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-1 transition-transform" />
                  </button>
                ))}
              </div>
              <button
                onClick={() => setStep(1)}
                className="text-xs font-bold text-slate-500 hover:text-slate-800 cursor-pointer"
              >
                ← আগের ধাপে ফিরে যান
              </button>
            </div>
          )}

          {/* STEP 3: Primary Goal */}
          {step === 3 && (
            <div className="space-y-6 animate-fadeIn">
              <h3 className="text-lg sm:text-2xl font-black text-slate-900 font-display">
                ৩. সন্তানের জন্য আপনার প্রধান লক্ষ্য কী?
              </h3>
              <div className="grid grid-cols-1 gap-3.5">
                {[
                  { id: 'qaida', label: 'সহজ ও খেলার ছলে নূরানী কায়দার বেসিক হরফ ও মাখরাজ শেখা', sub: 'ভয়ভীতি ছাড়া আনন্দের সাথে হরফ রিডিংয়ের মজবুত ভিত গড়া' },
                  { id: 'tajweed', label: 'বিশুদ্ধ তাজবীদ সহকারে সরাসরি পবিত্র কুরআনুল কারীম নাজেরা খতম', sub: 'সুললিত কণ্ঠে তারতীলের সাথে সুন্দর তিলাওয়াত' },
                  { id: 'hifz', label: 'আমপারা ও বিশেষ বিশেষ প্রয়োজনীয় সূরা মুখস্থ রাখা', sub: 'স্কুলের পড়াশোনা ঠিক রেখে নিয়মিত হিফজ প্রোগ্রাম' },
                  { id: 'duas', label: 'দৈনন্দিন মাসনূন দু’আ, ৫ ওয়াক্ত নামাজ ও ইসলামিক সুন্দর আদব-আখলাক', sub: 'একজন সৎ ও নেক সন্তান হিসেবে গড়ে তোলার স্পেশাল প্যাকেজ' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setPrimaryGoal(item.id);
                      handleCalculate(item.id);
                    }}
                    className="p-4 rounded-2xl border-2 border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/60 text-left transition-all cursor-pointer group flex items-center justify-between shadow-xs"
                  >
                    <div>
                      <div className="font-extrabold text-base text-slate-900 group-hover:text-emerald-900">
                        {item.label}
                      </div>
                      <div className="text-xs text-slate-500 mt-0.5">{item.sub}</div>
                    </div>
                    <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-1 transition-transform" />
                  </button>
                ))}
              </div>
              <button
                onClick={() => setStep(2)}
                className="text-xs font-bold text-slate-500 hover:text-slate-800 cursor-pointer"
              >
                ← আগের ধাপে ফিরে যান
              </button>
            </div>
          )}

          {/* STEP 4: RECOMMENDATION RESULT */}
          {step === 4 && matchedCourse && (
            <div className="text-center space-y-6 animate-fadeIn">
              <div className="inline-flex items-center gap-1.5 bg-amber-400 text-slate-950 px-4 py-1.5 rounded-full text-xs sm:text-sm font-black shadow-md">
                <Star className="w-4 h-4 fill-slate-950" />
                <span>৯৮% পারফেক্ট ম্যাচ! আপনার সন্তানের জন্য সেরা পছন্দ</span>
              </div>

              <div>
                <span className="text-xs font-bold text-emerald-800 uppercase tracking-widest block mb-1">
                  প্রস্তাবিত কোর্স
                </span>
                <h3 className="text-2xl sm:text-4xl font-black text-slate-900 font-display">
                  {matchedCourse.titleBn}
                </h3>
                <p className="text-sm sm:text-base text-emerald-700 font-semibold mt-1">
                  {matchedCourse.subtitleBn}
                </p>
              </div>

              {/* Course Preview Mini Card */}
              <div className="p-5 bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-50 rounded-2xl border-2 border-emerald-300 text-left max-w-xl mx-auto space-y-3">
                <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                  {matchedCourse.description}
                </p>

                <div className="pt-2 border-t border-emerald-200/80 flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm font-bold text-slate-800">
                  <span>উপযোগী বয়স: <b className="text-emerald-900">{matchedCourse.ageGroup}</b></span>
                  <span>মেয়াদ: <b className="text-emerald-900">{matchedCourse.duration}</b></span>
                  <span>ক্লাস: <b className="text-emerald-900">{matchedCourse.classDays}</b></span>
                </div>
              </div>

              {/* Call to Actions */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3.5 max-w-md mx-auto">
                <button
                  onClick={() => onSelectCourse(matchedCourse.titleBn, 'enroll')}
                  className="w-full sm:flex-1 py-4 px-6 text-base sm:text-lg font-black text-white bg-emerald-600 hover:bg-emerald-700 rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                >
                  <UserPlus className="w-5 h-5" />
                  <span>Enroll Now (ভর্তি হন)</span>
                </button>

                <button
                  onClick={() => onSelectCourse(matchedCourse.titleBn, 'trial')}
                  className="w-full sm:w-auto py-4 px-6 text-sm sm:text-base font-bold text-slate-800 bg-amber-100 hover:bg-amber-200 rounded-2xl border border-amber-300 transition-colors cursor-pointer"
                >
                  ফ্রি ট্রায়াল নিন
                </button>
              </div>

              <div>
                <button
                  onClick={handleReset}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-800 cursor-pointer pt-2"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>পুনরায় কুইজ দিতে এখানে চাপুন</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
