import React, { useState, useRef, useEffect } from 'react';
import { ARABIC_LETTERS, ArabicLetter } from '../data/arabicLetters';
import { kidAudio } from '../utils/audio';
import { Volume2, Sparkles, Trophy, RotateCcw, PenTool, Eraser } from 'lucide-react';

export const InteractiveAlphabet: React.FC = () => {
  const [selectedLetter, setSelectedLetter] = useState<ArabicLetter>(ARABIC_LETTERS[0]);
  const [activeTab, setActiveTab] = useState<'board' | 'game' | 'drawing'>('board');
  const [playingLetterId, setPlayingLetterId] = useState<number | null>(null);

  // Quiz game state
  const [quizScore, setQuizScore] = useState(0);
  const [quizQuestionIndex, setQuizQuestionIndex] = useState(0);
  const [quizFeedback, setQuizFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [stars, setStars] = useState<number[]>([]);

  // Drawing canvas state
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [chalkColor, setChalkColor] = useState('#10b981'); // emerald default

  const currentQuizLetter = ARABIC_LETTERS[quizQuestionIndex % ARABIC_LETTERS.length];

  // Generate 4 randomized options for the quiz
  const [quizOptions, setQuizOptions] = useState<ArabicLetter[]>([]);

  useEffect(() => {
    // Generate 4 options: current target letter + 3 random distinct options
    const others = ARABIC_LETTERS.filter((l) => l.id !== currentQuizLetter.id);
    const shuffledOthers = [...others].sort(() => 0.5 - Math.random()).slice(0, 3);
    const combined = [currentQuizLetter, ...shuffledOthers].sort(() => 0.5 - Math.random());
    setQuizOptions(combined);
    setQuizFeedback(null);
  }, [quizQuestionIndex]);

  // Handle letter click in the soundboard - Plays authentic Arabic letter pronunciation
  const handleSelectLetter = (item: ArabicLetter) => {
    setSelectedLetter(item);
    setPlayingLetterId(item.id);
    kidAudio.playLetterPronunciation(
      item.audioFile,
      item.cdnAudio,
      item.pronunciationAr,
      () => {
        setPlayingLetterId((curr) => (curr === item.id ? null : curr));
      }
    );
  };

  // Play audio for current selected letter
  const handlePlaySelectedAudio = () => {
    setPlayingLetterId(selectedLetter.id);
    kidAudio.playLetterPronunciation(
      selectedLetter.audioFile,
      selectedLetter.cdnAudio,
      selectedLetter.pronunciationAr,
      () => {
        setPlayingLetterId((curr) => (curr === selectedLetter.id ? null : curr));
      }
    );
  };

  // Handle quiz option click
  const handleAnswerClick = (option: ArabicLetter) => {
    if (quizFeedback !== null) return;

    // Play letter sound immediately
    kidAudio.playLetterPronunciation(
      option.audioFile,
      option.cdnAudio,
      option.pronunciationAr
    );

    if (option.id === currentQuizLetter.id) {
      // Correct!
      kidAudio.playVictory();
      setQuizFeedback('correct');
      setQuizScore((prev) => prev + 1);
      setStars((prev) => [...prev, Date.now()]);

      setTimeout(() => {
        setQuizQuestionIndex((prev) => (prev + 1) % ARABIC_LETTERS.length);
        setQuizFeedback(null);
      }, 1600);
    } else {
      // Wrong!
      kidAudio.playTryAgain();
      setQuizFeedback('wrong');
      setTimeout(() => {
        setQuizFeedback(null);
      }, 1200);
    }
  };

  // Canvas drawing functions
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    setIsDrawing(true);
    const rect = canvas.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = 'touches' in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = 'touches' in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;

    ctx.lineWidth = 12;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = chalkColor;
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  return (
    <section id="alphabet" className="py-20 bg-white border-t border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading with Large, Legible Typography */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-sm font-bold text-emerald-800 bg-emerald-50 px-4 py-2 rounded-full border border-emerald-200 mb-3">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <span>ছোটদের জন্য স্পেশাল ডিজিটাল কায়দা ও হরফ সাউন্ডবোর্ড</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight font-display">
            হরফ খেলার আসর — খেলার ছলে আরবি বর্ণমালা
          </h2>
          <p className="mt-3 text-slate-700 text-base sm:text-lg leading-relaxed">
            যে কোনো হরফে চাপ দিয়ে শুনুন বড় ও স্পষ্ট আরবি উচ্চারণ ও সঠিক মাখরাজ। রয়েছে মজার কুইজ গেম ও হরফ লেখার ডিজিটাল স্লেট!
          </p>
        </div>

        {/* Mode Selector Tabs (Segmented control) with Enriched Large Headlines */}
        <div className="flex items-center justify-center mb-12">
          <div className="inline-flex flex-wrap items-center justify-center gap-2 p-2 bg-slate-100 rounded-3xl border border-slate-200 shadow-sm max-w-full">
            <button
              onClick={() => setActiveTab('board')}
              className={`px-5 sm:px-8 py-3.5 sm:py-4 text-base sm:text-xl lg:text-2xl font-black rounded-2xl transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
                activeTab === 'board'
                  ? 'bg-emerald-600 text-white shadow-lg ring-2 ring-emerald-300 scale-102'
                  : 'text-slate-700 hover:text-slate-900 hover:bg-slate-200/70'
              }`}
            >
              <span>🔊</span>
              <span>হরফ সাইনবোর্ড</span>
            </button>
            <button
              onClick={() => setActiveTab('game')}
              className={`px-5 sm:px-8 py-3.5 sm:py-4 text-base sm:text-xl lg:text-2xl font-black rounded-2xl transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
                activeTab === 'game'
                  ? 'bg-emerald-600 text-white shadow-lg ring-2 ring-emerald-300 scale-102'
                  : 'text-slate-700 hover:text-slate-900 hover:bg-slate-200/70'
              }`}
            >
              <span>🎮</span>
              <span>হরফ খোঁজার গেম</span>
            </button>
            <button
              onClick={() => setActiveTab('drawing')}
              className={`px-5 sm:px-8 py-3.5 sm:py-4 text-base sm:text-xl lg:text-2xl font-black rounded-2xl transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
                activeTab === 'drawing'
                  ? 'bg-emerald-600 text-white shadow-lg ring-2 ring-emerald-300 scale-102'
                  : 'text-slate-700 hover:text-slate-900 hover:bg-slate-200/70'
              }`}
            >
              <span>✍️</span>
              <span>হরফ লেখার স্লেট</span>
            </button>
          </div>
        </div>

        {/* TAB 1: Soundboard & Makhraj Showcase */}
        {activeTab === 'board' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left 28 Letters Grid - BIG LETTERS FOR KIDS */}
            <div className="lg:col-span-8 bg-[#F8FAF9] p-5 sm:p-7 rounded-3xl border border-slate-200">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-5 pb-3 border-b border-slate-200/80">
                <span className="text-base sm:text-lg font-black text-slate-800 flex items-center gap-2">
                  <span>🔊</span>
                  <span>মোট ২৮টি আরবি হরফ (যেকোনোটিতে ক্লিক করলেই বিশুদ্ধ উচ্চারণ বাজবে)</span>
                </span>
                <span className="text-sm sm:text-base font-bold text-emerald-800 bg-emerald-100/70 px-3 py-1 rounded-xl border border-emerald-200">
                  নির্ভুল অডিও ও মাখরাজ
                </span>
              </div>

              {/* 3 columns on mobile, 4 on tablet, 7 on desktop - Big touch cards with audio feedback */}
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-3 sm:gap-4" dir="rtl">
                {ARABIC_LETTERS.map((item) => {
                  const isSelected = selectedLetter.id === item.id;
                  const isPlaying = playingLetterId === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleSelectLetter(item)}
                      title={`ক্লিক করুন: ${item.nameBn} (${item.transliteration}) এর বিশুদ্ধ উচ্চারণ শুনুন`}
                      className={`relative min-h-[96px] sm:min-h-[110px] rounded-2xl flex flex-col items-center justify-center p-2.5 transition-all duration-200 cursor-pointer ${
                        isPlaying
                          ? 'bg-emerald-800 text-white shadow-2xl scale-110 ring-4 ring-amber-400 z-20'
                          : isSelected
                          ? 'bg-emerald-700 text-white shadow-xl scale-105 ring-4 ring-emerald-300 z-10'
                          : 'bg-white text-slate-900 hover:bg-emerald-50 hover:border-emerald-400 border border-slate-200 shadow-xs'
                      }`}
                    >
                      {/* Active playing sound wave badge */}
                      {isPlaying && (
                        <span className="absolute top-1.5 left-1.5 text-xs bg-amber-400 text-slate-950 px-1.5 py-0.5 rounded-full font-bold shadow animate-pulse">
                          🔊
                        </span>
                      )}

                      {/* Enormous Arabic Letter */}
                      <span className="text-4xl sm:text-5xl font-arabic font-extrabold leading-none mb-1.5 select-none drop-shadow-xs">
                        {item.letter}
                      </span>
                      {/* Clear, Bold Bengali Pronunciation */}
                      <span
                        dir="ltr"
                        className={`text-sm sm:text-base font-black tracking-tight select-none ${
                          isPlaying
                            ? 'text-amber-300'
                            : isSelected
                            ? 'text-amber-200'
                            : 'text-slate-800'
                        }`}
                      >
                        {item.nameBn}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right Selected Letter Details Card - BIG & CLEAR */}
            <div className="lg:col-span-4 bg-white p-6 sm:p-8 rounded-3xl border-2 border-emerald-100 shadow-lg">
              <div className="text-center pb-5 border-b border-slate-100">
                {/* Big Display Box with playing glow */}
                <div
                  className={`w-32 h-32 sm:w-36 sm:h-36 mx-auto rounded-3xl bg-gradient-to-br from-emerald-600 to-teal-800 text-white flex items-center justify-center shadow-xl mb-4 transition-all ${
                    playingLetterId === selectedLetter.id
                      ? 'ring-8 ring-amber-300 scale-105 shadow-amber-200'
                      : 'ring-4 ring-emerald-100'
                  }`}
                >
                  <span className="text-7xl sm:text-8xl font-arabic font-black leading-none drop-shadow-md select-none">
                    {selectedLetter.letter}
                  </span>
                </div>
                
                {/* Letter Name & Authentic Tashkeel */}
                <div className="flex items-center justify-center gap-2">
                  <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display">
                    {selectedLetter.nameBn}
                  </h3>
                  <span className="text-2xl font-arabic font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-xl border border-emerald-200">
                    {selectedLetter.pronunciationAr}
                  </span>
                </div>
                <p className="text-base sm:text-lg font-bold text-slate-600 mt-1">
                  ({selectedLetter.transliteration})
                </p>

                {/* Big Audio Play Button with active audio indicator */}
                <button
                  onClick={handlePlaySelectedAudio}
                  className={`mt-4 w-full inline-flex items-center justify-center gap-2.5 px-6 py-4 text-base sm:text-lg font-black text-white rounded-xl shadow-md transition-all cursor-pointer ${
                    playingLetterId === selectedLetter.id
                      ? 'bg-amber-600 hover:bg-amber-700 ring-4 ring-amber-200 scale-102'
                      : 'bg-emerald-700 hover:bg-emerald-800 active:scale-98'
                  }`}
                >
                  <Volume2
                    className={`w-6 h-6 ${
                      playingLetterId === selectedLetter.id ? 'text-amber-200 animate-bounce' : 'text-amber-200'
                    }`}
                  />
                  <span>
                    {playingLetterId === selectedLetter.id
                      ? 'সঠিক উচ্চারণ বাজছে...'
                      : 'উচ্চারণ শুনুন (Play Audio)'}
                  </span>
                </button>
              </div>

              {/* Makhraj Explanation - Large font */}
              <div className="mt-6 space-y-4">
                <div className="bg-[#F8FAF9] p-5 rounded-2xl border border-slate-200">
                  <span className="text-base sm:text-lg font-black text-emerald-900 block mb-1.5">
                    মাখরাজ (উচ্চারণের স্থান):
                  </span>
                  <p className="text-base sm:text-lg text-slate-800 leading-relaxed font-semibold">
                    {selectedLetter.makhrajBn}
                  </p>
                </div>

                {/* Kid Vocabulary Example */}
                <div className="bg-emerald-50/70 p-5 rounded-2xl border border-emerald-200 flex items-center justify-between">
                  <div className="space-y-1">
                    <span className="text-sm font-bold text-emerald-900 uppercase tracking-wide">
                      ছোটদের উদাহরণ শব্দ:
                    </span>
                    <p className="text-xl sm:text-2xl font-black text-slate-900">
                      {selectedLetter.exampleWord} ({selectedLetter.exampleBn})
                    </p>
                    <p className="text-3xl font-arabic font-bold text-emerald-800" dir="rtl">
                      {selectedLetter.exampleAr}
                    </p>
                  </div>
                  <div className="text-5xl">{selectedLetter.emoji}</div>
                </div>

                <div className="text-center pt-2">
                  <p className="text-base sm:text-lg text-slate-700 font-medium leading-relaxed">
                    💡 আমাদের ওয়ান টু ওয়ান লাইভ ক্লাসে শিক্ষক-শিক্ষিকারা মুখে অঙ্গভঙ্গি ও ছবির মাধ্যমে মাখরাজ নিখুঁতভাবে শিখিয়ে দেন।
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: Quiz Game - Big Visual Touch Buttons */}
        {activeTab === 'game' && (
          <div className="max-w-2xl mx-auto bg-white p-6 sm:p-10 rounded-3xl border-2 border-emerald-100 shadow-xl text-center">
            {/* Score & Stars Header */}
            <div className="flex items-center justify-between pb-6 border-b border-slate-100 mb-6">
              <div className="flex items-center gap-2">
                <Trophy className="w-7 h-7 text-amber-500" />
                <span className="text-base font-bold text-slate-800">
                  স্কোর: <span className="text-emerald-700 text-2xl font-extrabold tabular-nums">{quizScore}</span>
                </span>
              </div>
              <div className="flex items-center gap-1">
                {stars.slice(-5).map((s) => (
                  <span key={s} className="text-2xl animate-bounce">⭐</span>
                ))}
                {stars.length === 0 && (
                  <span className="text-sm font-semibold text-slate-500">স্টার জমিয়ে চ্যাম্পিয়ন হও!</span>
                )}
              </div>
            </div>

            {/* Question prompt */}
            <div className="py-4">
              <p className="text-lg sm:text-xl font-extrabold text-emerald-800 mb-2">বলতো সোনামনি, নিচের কোনটি:</p>
              <h3 className="text-4xl sm:text-5xl font-black text-slate-900 mb-2 font-display">
                &ldquo;{currentQuizLetter.nameBn}&rdquo; ({currentQuizLetter.transliteration})
              </h3>
              <p className="text-base sm:text-lg text-slate-700 font-semibold">সঠিক হরফে ক্লিক করো এবং স্টার উপহার পাও!</p>
            </div>

            {/* Big Quiz Options */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-5 my-8" dir="rtl">
              {quizOptions.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => handleAnswerClick(opt)}
                  className="aspect-square bg-[#F8FAF9] hover:bg-emerald-50 hover:border-emerald-500 border-2 border-slate-200 rounded-3xl p-4 flex items-center justify-center shadow-md active:scale-95 transition-all cursor-pointer group"
                >
                  <span className="text-6xl sm:text-7xl font-arabic font-extrabold text-slate-900 group-hover:text-emerald-700 group-hover:scale-110 transition-transform">
                    {opt.letter}
                  </span>
                </button>
              ))}
            </div>

            {/* Feedback Message */}
            <div className="min-h-14 flex items-center justify-center">
              {quizFeedback === 'correct' && (
                <div className="text-emerald-700 font-black text-2xl sm:text-3xl flex items-center gap-2 animate-bounce">
                  <span>🎉 মাশাআল্লাহ! একদম সঠিক উত্তর!</span>
                  <span>⭐ +১ স্টার</span>
                </div>
              )}
              {quizFeedback === 'wrong' && (
                <div className="text-rose-600 font-extrabold text-xl sm:text-2xl flex items-center gap-2">
                  <span>আবার চেষ্টা করো সোনা! ❤️ তুমি পারবে!</span>
                </div>
              )}
            </div>

            <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-center">
              <button
                onClick={() => {
                  setQuizScore(0);
                  setStars([]);
                  setQuizQuestionIndex((prev) => prev + 1);
                }}
                className="text-base font-bold text-slate-700 hover:text-slate-900 flex items-center gap-2 cursor-pointer py-2 px-4 rounded-xl hover:bg-slate-100"
              >
                <RotateCcw className="w-5 h-5" />
                <span>নতুন করে শুরু করুন</span>
              </button>
            </div>
          </div>
        )}

        {/* TAB 3: Digital Slate / Drawing Canvas */}
        {activeTab === 'drawing' && (
          <div className="max-w-3xl mx-auto bg-slate-900 p-6 sm:p-8 rounded-3xl shadow-2xl text-white">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-5">
              <div>
                <h4 className="text-2xl sm:text-3xl font-black flex items-center gap-2 font-display">
                  <PenTool className="w-7 h-7 text-emerald-400" />
                  <span>হরফ লেখার ডিজিটাল স্লেট</span>
                </h4>
                <p className="text-base sm:text-lg text-slate-300 mt-1 font-medium">স্লেটে আঙুল বা মাউস দিয়ে আরবি হরফ লেখার অনুশীলন করো</p>
              </div>

              {/* Chalk color selection */}
              <div className="flex items-center gap-2.5">
                {[
                  { name: 'সবুজ', color: '#10b981' },
                  { name: 'হলুদ', color: '#f59e0b' },
                  { name: 'সাদা', color: '#ffffff' },
                  { name: 'গোলাপি', color: '#ec4899' },
                ].map((c) => (
                  <button
                    key={c.color}
                    onClick={() => setChalkColor(c.color)}
                    style={{ backgroundColor: c.color }}
                    className={`w-8 h-8 rounded-full border-2 transition-transform cursor-pointer ${
                      chalkColor === c.color ? 'scale-125 border-white ring-2 ring-emerald-400' : 'border-transparent'
                    }`}
                    title={c.name}
                  />
                ))}
                <button
                  onClick={clearCanvas}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-sm sm:text-base font-bold rounded-xl flex items-center gap-1.5 border border-slate-700 ml-2 cursor-pointer"
                >
                  <Eraser className="w-5 h-5 text-rose-400" />
                  <span>মুছে ফেলুন</span>
                </button>
              </div>
            </div>

            {/* Drawing Surface */}
            <div className="relative rounded-2xl overflow-hidden border-2 border-slate-700 bg-slate-950 flex justify-center">
              {/* Reference background watermark letter */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
                <span className="text-[160px] sm:text-[180px] font-arabic font-black text-white select-none">
                  {selectedLetter.letter}
                </span>
              </div>
              <canvas
                ref={canvasRef}
                width={600}
                height={280}
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
                onTouchStart={startDrawing}
                onTouchMove={draw}
                onTouchEnd={stopDrawing}
                className="w-full h-[280px] touch-none cursor-crosshair relative z-10"
              />
            </div>

            <div className="mt-5 flex flex-wrap items-center justify-between text-base sm:text-lg text-slate-200 font-semibold gap-2">
              <span>অনুশীলন হরফ: <b className="text-emerald-400 font-black">{selectedLetter.nameBn} ({selectedLetter.letter})</b></span>
              <span>অন্য হরফ লিখতে সাইনবোর্ড থেকে নির্বাচন করো</span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
