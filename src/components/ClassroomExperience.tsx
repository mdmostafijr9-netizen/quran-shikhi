import React from 'react';
import { Video, ShieldCheck, Heart, Sparkles, Star, Mic, Monitor, Smile, Users, BookOpen } from 'lucide-react';

interface ClassroomExperienceProps {
  onOpenBooking: () => void;
}

export const ClassroomExperience: React.FC<ClassroomExperienceProps> = ({ onOpenBooking }) => {
  return (
    <section id="classroom" className="py-20 bg-gradient-to-b from-[#F8FAF9] via-white to-[#F8FAF9] border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-emerald-800 bg-emerald-100 px-4 py-1.5 rounded-full mb-3 shadow-xs">
            <Video className="w-4 h-4 text-emerald-600" />
            <span>লাইভ ক্লাসরুম অভিজ্ঞতা • ১-অন-১ ইন্টারঅ্যাক্টিভ</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight font-display">
            ছোটদের ক্লাসরুম কীভাবে চলে?
          </h2>
          <p className="mt-3 text-slate-700 text-base sm:text-lg leading-relaxed">
            কোনো প্রকার ভীতি বা বকাঝকা ছাড়া, স্নেহময় শিক্ষক-শিক্ষিকার সাথে ডিজিটাল স্ক্রিনে ছবি, খেলা ও হরফ ড্রয়িংয়ের মাধ্যমে সন্তান হাসিমুখে কুরআন শেখে।
          </p>
        </div>

        {/* Visual Mockup & Features Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left: Interactive Virtual Classroom Frame (7 cols) */}
          <div className="lg:col-span-7">
            <div className="bg-slate-900 rounded-3xl p-3 sm:p-5 shadow-2xl border-4 border-slate-800 relative overflow-hidden group">
              {/* Window Controls Bar */}
              <div className="flex items-center justify-between pb-3 px-2 border-b border-slate-800 text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-rose-500" />
                  <span className="w-3 h-3 rounded-full bg-amber-500" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500" />
                  <span className="ml-2 font-mono text-slate-300 hidden sm:inline">QuranShikhi-Live-Room • HD 1080p</span>
                </div>
                <div className="flex items-center gap-2 text-emerald-400 font-bold">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  <span>লাইভ ক্লাস চলছে</span>
                </div>
              </div>

              {/* Classroom Screen Area */}
              <div className="mt-3 bg-gradient-to-br from-slate-950 to-slate-900 rounded-2xl p-4 sm:p-6 relative min-h-[340px] sm:min-h-[400px] flex flex-col justify-between overflow-hidden border border-slate-800">
                {/* Top Overlay: Teacher & Student Badge */}
                <div className="flex items-center justify-between gap-2 z-10">
                  {/* Teacher tile */}
                  <div className="bg-slate-900/90 backdrop-blur-md p-2 sm:p-2.5 rounded-xl border border-slate-700 flex items-center gap-2.5 shadow-md">
                    <div className="w-9 h-9 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center text-sm shadow-xs">
                      ক্বারী
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white leading-tight">মুহতারাম উস্তাদজী</div>
                      <div className="text-[10px] text-emerald-300 flex items-center gap-1">
                        <Mic className="w-3 h-3 text-emerald-400" />
                        <span>সরাসরি মশক পড়াচ্ছেন</span>
                      </div>
                    </div>
                  </div>

                  {/* Student tile */}
                  <div className="bg-slate-900/90 backdrop-blur-md p-2 sm:p-2.5 rounded-xl border border-slate-700 flex items-center gap-2.5 shadow-md">
                    <div className="w-9 h-9 rounded-full bg-amber-400 text-slate-950 font-bold flex items-center justify-center text-sm shadow-xs">
                      👦
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white leading-tight">তাহসিন (৬ বছর)</div>
                      <div className="text-[10px] text-amber-300">নূরানী কায়দা শিক্ষার্থী</div>
                    </div>
                  </div>
                </div>

                {/* Central Shared Interactive Board: Arabic Harf Tracing */}
                <div className="my-6 bg-emerald-950/40 border-2 border-emerald-500/40 rounded-2xl p-6 text-center relative z-10 backdrop-blur-xs">
                  <div className="inline-block bg-emerald-900/80 text-amber-300 text-xs font-bold px-3 py-1 rounded-full border border-amber-300/30 mb-2">
                    আজকের পাঠ: হরফ &quot;বা&quot; (ب) এবং সঠিক মাখরাজ
                  </div>

                  {/* Big Glowing Letter */}
                  <div className="text-7xl sm:text-8xl font-black font-amiri text-amber-300 tracking-wider drop-shadow-[0_0_25px_rgba(251,191,36,0.4)] my-1">
                    بَ
                  </div>

                  <p className="text-xs sm:text-sm text-emerald-200 font-semibold max-w-sm mx-auto mt-2">
                    উভয় ঠোঁটের ভিজা জায়গা মিলিয়ে নরম উচ্চারণে: &quot;বা&quot;
                  </p>

                  {/* Interactive Star Reward Strip */}
                  <div className="mt-4 pt-3 border-t border-emerald-800/60 flex items-center justify-center gap-1.5 text-amber-400">
                    <span className="text-xs font-bold text-slate-300 mr-2">উস্তাদজীর রিওয়ার্ড:</span>
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className="w-4 h-4 fill-amber-400 text-amber-400 animate-pulse" />
                    ))}
                    <span className="text-xs font-black text-amber-300 ml-2">মাশাআল্লাহ!</span>
                  </div>
                </div>

                {/* Bottom Control Strip */}
                <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800/80">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1 text-emerald-400">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>১-অন-১ প্রাইভেট ক্লাস</span>
                    </span>
                    <span className="hidden sm:inline">•</span>
                    <span className="hidden sm:inline text-slate-300">ডিজিটাল কায়দা স্লেট সক্রিয়</span>
                  </div>
                  <span className="text-amber-300 font-mono font-bold">ক্লাসের সময়: ৩৫ মিনিট</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Key Classroom Highlights (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="space-y-3.5">
              {[
                {
                  icon: <Users className="w-5 h-5 text-emerald-600" />,
                  title: '১-অন-১ সম্পূর্ণ ব্যক্তিগত যত্ন',
                  desc: 'ব্যাচে অনেক শিশুর মাঝে হারিয়ে যাওয়ার সুযোগ নেই। পুরো ক্লাসে শিক্ষক শুধুমাত্র আপনার সন্তানকেই এককভাবে সময় ও যত্ন দেবেন।',
                },
                {
                  icon: <Heart className="w-5 h-5 text-rose-500" />,
                  title: 'মেয়ে শিশুদের জন্য পর্দানশীন মহিলা শিক্ষিকা',
                  desc: 'মেয়ে শিশুদের জন্য অভিজ্ঞ ও আন্তরিক আলিমা-শিক্ষিকাদের তত্ত্বাবধানে নিরাপদ ও সুন্দর পারিবারিক পরিবেশে পাঠদান।',
                },
                {
                  icon: <Sparkles className="w-5 h-5 text-amber-500" />,
                  title: 'খেলার ছলে ছবি ও ফ্ল্যাশ কার্ড মেথড',
                  desc: 'আরবি হরফকে খেলার সাথে পরিচয় করিয়ে দেওয়া হয়। আকর্ষণীয় ছবি, কুইজ ও ড্রয়িং স্লেটে দাগ দিয়ে বাচ্চারা হাসিমুখে শেখে।',
                },
                {
                  icon: <Monitor className="w-5 h-5 text-blue-500" />,
                  title: 'অভিভাবকের সামনে ক্লাস ও পর্যবেক্ষণ',
                  desc: 'মা-বাবা ঘরে বসেই সন্তানের ক্লাস সরাসরি পর্যবেক্ষণ করতে পারেন। ক্লাসের সাপ্তাহিক অগ্রগতি রিপোর্ট নিয়মিত প্রদান করা হয়।',
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-all flex items-start gap-3.5"
                >
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 shrink-0 mt-0.5">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-black text-slate-900 font-display">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-1">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Trial CTA button */}
            <div className="pt-2">
              <button
                onClick={onOpenBooking}
                className="w-full py-4 px-6 text-base sm:text-lg font-black text-white bg-emerald-600 hover:bg-emerald-700 rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
              >
                <Sparkles className="w-5 h-5 text-amber-300" />
                <span>ফ্রি ট্রায়ালে এই ক্লাসরুম অভিজ্ঞতা নিন</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
