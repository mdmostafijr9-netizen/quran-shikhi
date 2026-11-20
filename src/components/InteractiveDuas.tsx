import React, { useState } from 'react';
import { KIDS_DUAS, DuaItem } from '../data/duas';
import { kidAudio } from '../utils/audio';
import { Volume2, BookOpen, Check, Heart, Sparkles } from 'lucide-react';

export const InteractiveDuas: React.FC = () => {
  const [selectedDua, setSelectedDua] = useState<DuaItem>(KIDS_DUAS[0]);
  const [isPlaying, setIsPlaying] = useState<string | null>(null);

  // Play audio immediately when selecting or clicking any dua
  const handleSelectDua = (dua: DuaItem) => {
    setSelectedDua(dua);
    setIsPlaying(dua.id);
    kidAudio.playDuaAudio(dua.audioFile, dua.arabic, () => {
      setIsPlaying((curr) => (curr === dua.id ? null : curr));
    });
  };

  // Play current selected dua
  const handlePlayCurrentDua = () => {
    setIsPlaying(selectedDua.id);
    kidAudio.playDuaAudio(selectedDua.audioFile, selectedDua.arabic, () => {
      setIsPlaying((curr) => (curr === selectedDua.id ? null : curr));
    });
  };

  return (
    <section id="duas" className="py-20 bg-[#F8FAF9] border-t border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Dua Player Card */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center gap-2 text-sm sm:text-base font-bold text-emerald-900 bg-emerald-100/80 px-4 py-2 rounded-full border border-emerald-200/60">
                <Heart className="w-4 h-4 fill-emerald-600 text-emerald-600" />
                <span>ছোটদের মাসনূন দু’আ ও কালিমা</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs sm:text-sm font-extrabold text-amber-900 bg-amber-100/90 px-3.5 py-1.5 rounded-full border border-amber-300 shadow-2xs">
                <span>🎙️</span>
                <span>পুরুষ কারী সাহেবের কণ্ঠে মধুর উচ্চারণ</span>
              </div>
            </div>

            <div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight font-display">
                প্রতিদিনের প্রয়োজনীয় দু’আ ও কালিমা
              </h2>
              <p className="mt-4 text-slate-700 text-lg sm:text-xl leading-relaxed">
                প্রতিটি মাসনূন দু’আ পুরুষ মানুষের গম্ভীর ও সুললিত বিশুদ্ধ কণ্ঠে রেকর্ড করা হয়েছে, যাতে সোনামনিরা সঠিক তাজবীদ ও উচ্চারণে সহজে মুখস্থ করতে পারে।
              </p>
            </div>

            {/* Active Selected Dua Display Card */}
            <div
              className={`bg-white p-6 sm:p-9 rounded-3xl border-2 transition-all shadow-xl relative overflow-hidden ${
                isPlaying === selectedDua.id ? 'border-amber-400 ring-4 ring-amber-100' : 'border-emerald-100'
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-slate-100">
                <span className="text-sm font-bold text-emerald-800 bg-emerald-50 px-3.5 py-1.5 rounded-xl border border-emerald-200">
                  {selectedDua.category}
                </span>
                <span className="text-lg sm:text-xl font-black text-slate-900 flex items-center gap-2">
                  <span>{selectedDua.titleBn}</span>
                  {isPlaying === selectedDua.id && (
                    <span className="text-sm font-bold text-amber-600 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200 animate-pulse">
                      🔊 পুরুষ কণ্ঠে বাজছে...
                    </span>
                  )}
                </span>
              </div>

              {/* Arabic text with Amiri font - Large and Gorgeous */}
              <div className="my-8 text-center">
                <p
                  onClick={handlePlayCurrentDua}
                  title="ক্লিক করে পুরুষ কারীর কণ্ঠে এই দু'আটির উচ্চারণ শুনুন"
                  className="text-3xl sm:text-4xl lg:text-5xl font-arabic font-extrabold text-emerald-900 leading-[2.2] py-2 drop-shadow-xs cursor-pointer hover:text-emerald-700 transition-colors select-none"
                  dir="rtl"
                >
                  {selectedDua.arabic}
                </p>
                <button
                  onClick={handlePlayCurrentDua}
                  className={`mt-5 inline-flex items-center gap-2.5 px-8 py-4 rounded-xl font-black text-base sm:text-lg transition-all cursor-pointer shadow-md ${
                    isPlaying === selectedDua.id
                      ? 'bg-amber-500 hover:bg-amber-600 text-white ring-4 ring-amber-200 scale-102 animate-pulse'
                      : 'bg-emerald-600 hover:bg-emerald-700 text-white active:scale-98'
                  }`}
                >
                  <Volume2 className={`w-6 h-6 ${isPlaying === selectedDua.id ? 'animate-bounce text-white' : 'text-amber-200'}`} />
                  <span>{isPlaying === selectedDua.id ? 'পুরুষ কণ্ঠে সুললিত তিলাওয়াত বাজছে...' : 'পুরুষ কারীর কণ্ঠে শুনুন (Play Audio)'}</span>
                </button>
              </div>

              {/* Pronunciation & Meaning - Big and Easy to Read */}
              <div className="space-y-4 bg-[#F8FAF9] p-6 rounded-2xl border border-slate-200">
                <div className="text-base sm:text-lg">
                  <span className="font-extrabold text-emerald-900">উচ্চারণ: </span>
                  <span className="text-slate-900 font-bold">{selectedDua.transliterationBn}</span>
                </div>
                <div className="text-base sm:text-lg">
                  <span className="font-extrabold text-emerald-900">অর্থ: </span>
                  <span className="text-slate-800 leading-relaxed font-medium">{selectedDua.meaningBn}</span>
                </div>
                <div className="pt-3 border-t border-slate-200 flex items-start gap-2 text-base sm:text-lg text-emerald-950 bg-emerald-50/80 p-4 rounded-xl border border-emerald-200/70">
                  <span className="font-black text-emerald-900 shrink-0">ফজিলত: </span>
                  <span className="font-semibold leading-relaxed">{selectedDua.benefitBn}</span>
                </div>
              </div>
            </div>

            {/* Quick Dua Selector Buttons - Easy Touch with Instant Audio Play */}
            <div>
              <div className="flex items-center gap-2 text-sm sm:text-base font-bold text-slate-700 mb-3">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                <span>যেকোনো দু’আতে ক্লিক করুন (তৎক্ষণাৎ উচ্চারণ বেজে উঠবে):</span>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {KIDS_DUAS.map((dua) => {
                  const isSelected = selectedDua.id === dua.id;
                  const isAudioActive = isPlaying === dua.id;
                  return (
                    <button
                      key={dua.id}
                      onClick={() => handleSelectDua(dua)}
                      title={`ক্লিক করুন: ${dua.titleBn} এর উচ্চারণ শুনতে`}
                      className={`px-4 sm:px-5 py-3 text-base sm:text-lg font-bold rounded-2xl border transition-all cursor-pointer flex items-center gap-2 ${
                        isAudioActive
                          ? 'bg-amber-500 text-white border-amber-600 ring-4 ring-amber-200 shadow-lg scale-105'
                          : isSelected
                          ? 'bg-emerald-700 text-white border-emerald-700 shadow-md ring-2 ring-emerald-300'
                          : 'bg-white text-slate-800 hover:bg-emerald-50 hover:text-emerald-900 border-slate-200 shadow-2xs'
                      }`}
                    >
                      <span>{isAudioActive ? '🔊' : '▶'}</span>
                      <span>{dua.titleBn}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Visual illustration */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-xl border-4 border-white bg-white">
              <img
                src="/src/assets/images/feature_kids_duas_1793806765539.jpg"
                alt="ছোট সোনামনিরা প্রতিদিনের মাসনূন দু'আ ও হাদিস পড়ছে"
                referrerPolicy="no-referrer"
                className="w-full h-auto object-cover"
              />
              <div className="p-6 sm:p-8 bg-white space-y-3.5">
                <div className="flex items-center gap-2 text-emerald-800 font-extrabold text-lg sm:text-xl font-display">
                  <BookOpen className="w-6 h-6 text-emerald-600" />
                  <span>সুন্নত ভিত্তিক আদব ও শিষ্টাচার শিক্ষা</span>
                </div>
                <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-normal">
                  কুরআন শিখি একাডেমিতে শিশুদের প্রতিটি দু’আর পেছনের সুন্দর তাৎপর্য ও ইসলামিক গল্প সহজে শিখিয়ে দেওয়া হয়, যাতে তারা আগ্রহ নিয়ে নিজের জীবনে প্রয়োগ করে।
                </p>
                <div className="pt-4 flex flex-wrap items-center gap-4 text-base font-bold text-slate-800 border-t border-slate-100">
                  <span className="flex items-center gap-1.5">
                    <Check className="w-5 h-5 text-emerald-600" />
                    <span>২০+ মাসনূন দু’আ</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Check className="w-5 h-5 text-emerald-600" />
                    <span>৬টি মূল কালিমা</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Check className="w-5 h-5 text-emerald-600" />
                    <span>ছোটদের সহীহ হাদিস</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
