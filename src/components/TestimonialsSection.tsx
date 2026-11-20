import React from 'react';
import { Star, Quote } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const reviews = [
    {
      parentName: 'সুমাইয়া আক্তার',
      location: 'উত্তরা, ঢাকা',
      childInfo: 'সাদিয়া তাসনিম (বয়স ৫ বছর)',
      course: 'নূরানী কায়দা ফাউন্ডেশন',
      text: 'আমার মেয়ে খুব চঞ্চল ছিল, সামনাসামনি হুজুর রাখলে ভয় পেতো। কিন্তু কুরআন শিখি-র আপুর সাথে ও এতটাই স্বাচ্ছন্দ্য বোধ করে যে ক্লাসের সময় হলেই ও নিজে থেকেই ট্যাব নিয়ে বসে যায়। আলহামদুলিল্লাহ মাত্র ৩ মাসে ও মাখরাজ সহ হরকত শিখে গেছে!',
      rating: 5
    },
    {
      parentName: 'ইঞ্জিনিয়ার তানভীর আহমেদ',
      location: 'লন্ডন, যুক্তরাজ্য',
      childInfo: 'তাহমিদ আহমেদ (বয়স ৮ বছর)',
      course: 'সহীহ নাজেরা ও তাজবীদ',
      text: 'বিদেশে থাকায় বাচ্চাদের বাংলা বা আরবি উচ্চারণ শেখানো ভীষণ কঠিন ছিল। কুরআন শিখি একাডেমির শিক্ষক মাখরাজের পয়েন্টগুলো স্ক্রিনে ভিজুয়ালি বুঝিয়ে দেন। তাহমিদ এখন চমৎকার সুরে সুরা তিলাওয়াত করে। ধন্যবাদ কুরআন শিখি টিমকে।',
      rating: 5
    },
    {
      parentName: 'ডা. ফারিহা জামান',
      location: 'ধানমন্ডি, ঢাকা',
      childInfo: 'আরিয়ান জামান (বয়স ৭ বছর)',
      course: 'ছোটদের দু’আ ও ইসলামিক আদব',
      text: 'শুধু কুরআন পড়াই না, প্রতিদিনের খাবার দু’আ, পিতামাতার প্রতি ভালোবাসা আর সুন্দর ব্যবহারও শেখে। প্রতিদিন শিক্ষক ওর পড়া শেষে স্টার দেয়, ও এতে ভীষণ উৎসাহ পায়। এমন যত্নশীল একাডেমি সত্যি বিরল।',
      rating: 5
    }
  ];

  return (
    <section className="py-20 bg-white border-t border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-sm font-bold text-emerald-800 bg-emerald-100/70 px-4 py-1.5 rounded-full mb-3">
            আস্থার প্রতীক
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight font-display">
            অভিভাবকদের আন্তরিক অনুভূতি
          </h2>
          <p className="mt-3 text-slate-700 text-base sm:text-lg leading-relaxed">
            দেশ ও বিদেশের অসংখ্য পিতা-মাতা তাঁদের সন্তানের কুরআন শিক্ষার দায়িত্ব দিয়ে আমাদের ওপর নিশ্চিন্তে ভরসা রেখেছেন।
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((r, i) => (
            <div
              key={i}
              className="bg-[#F8FAF9] p-7 sm:p-8 rounded-3xl border border-slate-200 shadow-xs hover:shadow-md transition-shadow relative flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-1.5">
                    {[...Array(r.rating)].map((_, s) => (
                      <Star key={s} className="w-5 h-5 fill-amber-400 text-amber-500" />
                    ))}
                  </div>
                  <Quote className="w-9 h-9 text-emerald-200" />
                </div>

                <p className="text-base sm:text-lg text-slate-800 leading-relaxed font-normal italic">
                  &ldquo;{r.text}&rdquo;
                </p>
              </div>

              <div className="mt-8 pt-5 border-t border-slate-200">
                <div className="font-extrabold text-slate-900 text-base sm:text-lg font-display">{r.parentName}</div>
                <div className="text-sm text-slate-500">{r.location}</div>
                <div className="mt-3 inline-block bg-emerald-50 text-emerald-900 text-xs sm:text-sm font-bold px-3 py-1 rounded-lg border border-emerald-200">
                  শিক্ষার্থী: {r.childInfo} · {r.course}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
