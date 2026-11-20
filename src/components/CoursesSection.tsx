import React, { useState, useRef } from 'react';
import { COURSES, Course } from '../data/courses';
import {
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  X,
  Clock,
  Calendar,
  Users,
  BookOpen,
  Sparkles,
  UserPlus,
  Star,
  Award,
  Heart,
  Check,
  Compass,
  ArrowRight
} from 'lucide-react';

interface CoursesSectionProps {
  onSelectCourse: (courseTitle: string, mode?: 'enroll' | 'trial') => void;
}

const getCourseIcon = (iconName: string) => {
  switch (iconName) {
    case 'Sparkles':
      return <Sparkles className="w-5 h-5 shrink-0" />;
    case 'BookOpen':
      return <BookOpen className="w-5 h-5 shrink-0" />;
    case 'Award':
      return <Award className="w-5 h-5 shrink-0" />;
    case 'Heart':
      return <Heart className="w-5 h-5 shrink-0" />;
    default:
      return <BookOpen className="w-5 h-5 shrink-0" />;
  }
};

const BENGALI_NUMERALS = ['১', '২', '৩', '৪'];

export const CoursesSection: React.FC<CoursesSectionProps> = ({ onSelectCourse }) => {
  const [selectedCourseId, setSelectedCourseId] = useState<string>('noorani-qaida');
  const [activeCourseModal, setActiveCourseModal] = useState<Course | null>(null);
  const showcaseRef = useRef<HTMLDivElement | null>(null);

  const selectedIndex = COURSES.findIndex((c) => c.id === selectedCourseId);
  const activeCourse = COURSES[selectedIndex] || COURSES[0];

  const handleSelectCourseHeadline = (courseId: string) => {
    setSelectedCourseId(courseId);
    if (showcaseRef.current) {
      showcaseRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleNextCourse = () => {
    const nextIdx = (selectedIndex + 1) % COURSES.length;
    handleSelectCourseHeadline(COURSES[nextIdx].id);
  };

  const handlePrevCourse = () => {
    const prevIdx = (selectedIndex - 1 + COURSES.length) % COURSES.length;
    handleSelectCourseHeadline(COURSES[prevIdx].id);
  };

  return (
    <section id="courses" className="py-20 bg-gradient-to-b from-[#F8FAF9] via-white to-[#F8FAF9] relative scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 text-sm sm:text-base font-bold text-emerald-800 bg-emerald-100/90 px-4 py-1.5 rounded-full mb-3 shadow-xs border border-emerald-200">
            <Compass className="w-4 h-4 text-emerald-600" />
            <span>কুরআন একাডেমি বিশেষায়িত পাঠক্রম • ৪টি কোর্স</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight font-display">
            আমাদের বিশেষ কোর্সসমূহ
          </h2>
          <p className="mt-3 text-slate-700 text-base sm:text-lg leading-relaxed">
            যে কোর্সের বিস্তারিত জানতে চান, নিচের হেডলাইনে ক্লিক করুন। ক্লিক করলেই সাথে সাথে সেই কোর্সটি পূর্ণ সিলেবাসসহ আপনার সামনে ভেসে উঠবে:
          </p>
        </div>

        {/* 1. THE 4 COURSE HEADLINES (হেডলাইন টাইপের লেখা বাটন - যাতে ক্লিক করলেই সেই কোর্স সামনে আসবে) */}
        <div className="mb-10 max-w-5xl mx-auto">
          <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3.5">
            {COURSES.map((course, idx) => {
              const isSelected = course.id === selectedCourseId;
              return (
                <button
                  key={course.id}
                  onClick={() => handleSelectCourseHeadline(course.id)}
                  className={`px-5 py-3 sm:px-6 sm:py-3.5 rounded-2xl font-black text-base sm:text-lg transition-all duration-200 cursor-pointer flex items-center gap-2.5 border-2 shadow-xs hover:shadow-md ${
                    isSelected
                      ? 'bg-emerald-700 text-white border-emerald-700 ring-4 ring-emerald-300/50 shadow-lg scale-102'
                      : 'bg-white text-slate-800 hover:text-emerald-900 border-slate-200 hover:border-emerald-400 hover:bg-emerald-50/50'
                  }`}
                >
                  {/* Number Badge */}
                  <span
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-black shrink-0 ${
                      isSelected
                        ? 'bg-amber-400 text-slate-950 shadow-xs'
                        : 'bg-emerald-100 text-emerald-800'
                    }`}
                  >
                    {BENGALI_NUMERALS[idx]}
                  </span>

                  {/* Course Icon */}
                  <span className={isSelected ? 'text-amber-300' : 'text-emerald-600'}>
                    {getCourseIcon(course.icon)}
                  </span>

                  {/* Course Headline Title */}
                  <span className="font-display tracking-tight whitespace-nowrap">
                    {course.titleBn}
                  </span>

                  {/* Active or Click Indicator */}
                  {isSelected ? (
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-300 animate-pulse ml-0.5" />
                  ) : (
                    <ArrowRight className="w-4 h-4 text-slate-400 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. THE ACTIVE SPOTLIGHT FRAME (যেই কোর্সে ক্লিক করবে, সেই কোর্সটা এখানে সামনে ভেসে উঠবে) */}
        <div
          ref={showcaseRef}
          key={activeCourse.id}
          className="bg-white rounded-3xl border-2 border-emerald-500/50 shadow-2xl overflow-hidden transition-all duration-300 max-w-6xl mx-auto animate-fadeIn scroll-mt-24"
        >
          {/* Top Frame Control Bar */}
          <div className="bg-gradient-to-r from-emerald-900 via-slate-900 to-emerald-950 text-white px-5 sm:px-8 py-4 flex flex-wrap items-center justify-between gap-3 border-b border-emerald-800/40">
            <div className="flex items-center gap-3">
              <span className="bg-amber-400 text-slate-950 text-xs sm:text-sm font-black px-3.5 py-1 rounded-full shadow">
                কোর্স নং {BENGALI_NUMERALS[selectedIndex]}
              </span>
              <span className="text-sm sm:text-base font-bold text-emerald-200">
                {activeCourse.highlight}
              </span>
              <span className="hidden md:inline-block text-xs text-emerald-300/80 bg-emerald-950/60 px-2.5 py-0.5 rounded-md border border-emerald-800">
                নির্বাচিত কোর্স প্রদর্শিত হচ্ছে
              </span>
            </div>

            {/* Prev & Next Switcher inside the frame */}
            <div className="flex items-center gap-2 text-xs sm:text-sm font-bold">
              <button
                onClick={handlePrevCourse}
                className="px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white flex items-center gap-1.5 transition-colors cursor-pointer"
                title="পূর্ববর্তী কোর্স"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>পূর্ববর্তী</span>
              </button>
              <span className="text-slate-300 font-normal px-1">
                {selectedIndex + 1} / {COURSES.length}
              </span>
              <button
                onClick={handleNextCourse}
                className="px-3.5 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 flex items-center gap-1.5 transition-colors cursor-pointer"
                title="পরবর্তী কোর্স"
              >
                <span>পরবর্তী</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Main Showcase Body */}
          <div className="p-6 sm:p-8 lg:p-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 lg:gap-9 items-start">
              {/* Left Column: Visual Banner & Key Details (6 cols) */}
              <div className="lg:col-span-6 space-y-5">
                {/* Course Image - Perfect 16:9 Full Uncropped Display on Mobile & Laptop */}
                <div className="rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg border border-slate-200 bg-white group">
                  <div className="w-full aspect-video bg-slate-900 flex items-center justify-center overflow-hidden">
                    <img
                      src={activeCourse.image}
                      alt={activeCourse.titleBn}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-contain block group-hover:scale-[1.02] transition-transform duration-500"
                    />
                  </div>
                  <div className="px-4 py-3 bg-gradient-to-r from-emerald-900 to-teal-900 text-white flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <p className="text-xs text-emerald-200 font-semibold">
                        {activeCourse.titleEn}
                      </p>
                      <h4 className="text-base sm:text-lg font-black font-display text-white">
                        {activeCourse.titleBn}
                      </h4>
                    </div>
                    <span className="bg-amber-400 text-slate-950 text-xs font-black px-2.5 py-1 rounded-lg shadow-xs">
                      {activeCourse.highlight}
                    </span>
                  </div>
                </div>

                {/* Quick Schedule & Info Card */}
                <div className="bg-[#F8FAF9] p-5 rounded-2xl border border-slate-200 space-y-3 shadow-xs">
                  <div className="flex items-center justify-between text-sm sm:text-base font-bold text-slate-800 pb-2.5 border-b border-slate-200">
                    <span className="flex items-center gap-2 text-emerald-800">
                      <Users className="w-4 h-4 text-emerald-600" />
                      <span>উপযোগী বয়স</span>
                    </span>
                    <span className="text-slate-900 bg-white px-3 py-0.5 rounded-lg border border-slate-200">
                      {activeCourse.ageGroup}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-sm sm:text-base font-bold text-slate-800 pb-2.5 border-b border-slate-200">
                    <span className="flex items-center gap-2 text-emerald-800">
                      <Clock className="w-4 h-4 text-emerald-600" />
                      <span>কোর্সের মেয়াদ</span>
                    </span>
                    <span className="text-slate-900 bg-white px-3 py-0.5 rounded-lg border border-slate-200">
                      {activeCourse.duration}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-sm sm:text-base font-bold text-slate-800">
                    <span className="flex items-center gap-2 text-emerald-800">
                      <Calendar className="w-4 h-4 text-emerald-600" />
                      <span>সাপ্তাহিক শিডিউল</span>
                    </span>
                    <span className="text-slate-900 bg-white px-3 py-0.5 rounded-lg border border-slate-200 text-right">
                      {activeCourse.classDays}
                    </span>
                  </div>
                </div>

                {/* Admission Fee & Free Demo Notice */}
                <div className="bg-amber-50 p-4 rounded-2xl border border-amber-300 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-amber-800 block">এককালীন একাউন্ট ফি</span>
                    <span className="text-lg font-black text-amber-950">ভর্তি ফি: ৩০০ টাকা</span>
                  </div>
                  <span className="text-xs font-bold text-emerald-900 bg-emerald-100 px-3 py-1.5 rounded-xl border border-emerald-300">
                    ১টি ফ্রি ট্রায়াল ক্লাস
                  </span>
                </div>
              </div>

              {/* Right Column: Title, Description, Full Syllabus, Outcomes, Actions (6 cols) */}
              <div className="lg:col-span-6 space-y-6">
                {/* Title & Subtitle */}
                <div>
                  <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-emerald-700 mb-1">
                    <span className="bg-emerald-100 text-emerald-900 px-2.5 py-0.5 rounded-md font-bold">
                      কোর্স নং {BENGALI_NUMERALS[selectedIndex]}
                    </span>
                    <span>•</span>
                    <span>{activeCourse.titleEn}</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 font-display tracking-tight">
                    {activeCourse.titleBn}
                  </h3>
                  <p className="text-base sm:text-lg text-emerald-800 font-semibold mt-1">
                    {activeCourse.subtitleBn}
                  </p>
                  <p className="mt-3 text-base sm:text-lg text-slate-700 leading-relaxed bg-[#F8FAF9] p-4 rounded-2xl border border-slate-200">
                    {activeCourse.description}
                  </p>
                </div>

                {/* Step-by-Step Curriculum Preview */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-lg sm:text-xl font-extrabold text-slate-900 flex items-center gap-2">
                      <BookOpen className="w-5 h-5 text-emerald-600" />
                      <span>সিলেবাস ও মূল পাঠ্যসূচি:</span>
                    </h4>
                    <button
                      onClick={() => setActiveCourseModal(activeCourse)}
                      className="text-sm font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 cursor-pointer hover:underline"
                    >
                      <span>সম্পূর্ণ সিলেবাস পপআপ</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="space-y-2.5">
                    {activeCourse.curriculum.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3 bg-[#F8FAF9] hover:bg-emerald-50/50 p-3.5 rounded-xl border border-slate-200 transition-colors"
                      >
                        <span className="w-7 h-7 rounded-lg bg-emerald-600 text-white font-bold text-xs sm:text-sm flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                          {idx + 1}
                        </span>
                        <span className="text-sm sm:text-base font-semibold text-slate-800 leading-relaxed">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Key Outcomes */}
                <div>
                  <h4 className="text-base sm:text-lg font-bold text-slate-900 mb-2.5 flex items-center gap-2">
                    <Star className="w-5 h-5 text-amber-500 fill-amber-400" />
                    <span>এই কোর্স শেষে আপনার সোনামনির অর্জন:</span>
                  </h4>
                  <div className="bg-emerald-50/70 p-4 rounded-2xl border border-emerald-200 space-y-2">
                    {activeCourse.learningOutcomes.map((outcome, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2.5 text-sm sm:text-base text-slate-800 font-semibold"
                      >
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                        <span>{outcome}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Primary Action Buttons: ENROLL NOW (ভর্তি হন) & FREE TRIAL */}
                <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
                  {/* Enroll Now Button */}
                  <button
                    onClick={() => onSelectCourse(activeCourse.titleBn, 'enroll')}
                    className="flex-1 py-4 px-6 text-lg sm:text-xl font-black tracking-wide text-white bg-emerald-600 hover:bg-emerald-700 active:scale-98 rounded-2xl shadow-lg hover:shadow-emerald-200 transition-all cursor-pointer flex items-center justify-center gap-2.5"
                  >
                    <UserPlus className="w-6 h-6" />
                    <span>Enroll Now (ভর্তি হন)</span>
                  </button>

                  {/* Free Trial Button */}
                  <button
                    onClick={() => onSelectCourse(activeCourse.titleBn, 'trial')}
                    className="py-4 px-6 text-base sm:text-lg font-bold text-slate-800 bg-amber-100 hover:bg-amber-200 active:scale-98 rounded-2xl border border-amber-300 transition-colors cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Sparkles className="w-5 h-5 text-amber-700" />
                    <span>ফ্রি ট্রায়াল ক্লাস নিন</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>


      </div>

      {/* Full Syllabus Modal */}
      {activeCourseModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-9 shadow-2xl relative max-h-[92vh] overflow-y-auto border-2 border-emerald-100">
            {/* Close Button */}
            <button
              onClick={() => setActiveCourseModal(null)}
              className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-800 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Modal Header */}
            <div className="pr-8 pb-5 border-b border-slate-100">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="text-xs sm:text-sm font-bold text-emerald-800 bg-emerald-100/80 px-3 py-1 rounded-lg">
                  উপযোগী বয়স: {activeCourseModal.ageGroup}
                </span>
                <span className="text-xs sm:text-sm font-semibold text-slate-500">
                  {activeCourseModal.titleEn}
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
                {activeCourseModal.titleBn}
              </h3>
              <p className="text-sm sm:text-base text-emerald-700 font-semibold mt-1">
                {activeCourseModal.subtitleBn}
              </p>
            </div>

            {/* Modal Body */}
            <div className="mt-6 space-y-6">
              {/* Course Overview */}
              <div>
                <h4 className="text-base font-bold text-slate-900 mb-2">কোর্স বিবরণ ও লক্ষ্য:</h4>
                <p className="text-sm sm:text-base text-slate-700 leading-relaxed bg-[#F8FAF9] p-4 rounded-2xl border border-slate-200">
                  {activeCourseModal.description}
                </p>
              </div>

              {/* Complete Curriculum List */}
              <div>
                <h4 className="text-lg font-extrabold text-slate-900 mb-3 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-emerald-600" />
                  <span>সম্পূর্ণ সিলেবাস সূচি (Step-by-Step Curriculum):</span>
                </h4>
                <ul className="space-y-3">
                  {activeCourseModal.curriculum.map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3.5 p-3.5 bg-white hover:bg-emerald-50/40 rounded-2xl border border-slate-200 transition-colors"
                    >
                      <span className="w-8 h-8 rounded-xl bg-emerald-600 text-white font-bold text-sm flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                        {i + 1}
                      </span>
                      <span className="text-base sm:text-lg text-slate-800 font-medium leading-relaxed">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Learning Outcomes */}
              <div>
                <h4 className="text-base font-bold text-slate-900 mb-2.5">
                  এই কোর্স শেষে আপনার সোনামনির অর্জন:
                </h4>
                <div className="bg-emerald-50/70 p-5 rounded-2xl border border-emerald-200/80 space-y-2.5">
                  {activeCourseModal.learningOutcomes.map((out, i) => (
                    <div key={i} className="flex items-center gap-3 text-sm sm:text-base text-slate-900 font-semibold">
                      <span className="text-amber-500 font-bold text-lg">★</span>
                      <span>{out}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Schedule Info */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex flex-wrap items-center justify-between gap-4 text-xs sm:text-sm text-slate-600">
                <div>
                  <span className="font-bold text-slate-800">ক্লাসের ব্যাপ্তি: </span>
                  <span>{activeCourseModal.duration}</span>
                </div>
                <div>
                  <span className="font-bold text-slate-800">সাপ্তাহিক রুটিন: </span>
                  <span>{activeCourseModal.classDays}</span>
                </div>
              </div>

              {/* Modal Actions */}
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-end gap-3 border-t border-slate-100">
                <button
                  onClick={() => {
                    const title = activeCourseModal.titleBn;
                    setActiveCourseModal(null);
                    onSelectCourse(title, 'trial');
                  }}
                  className="w-full sm:w-auto px-5 py-3.5 text-sm sm:text-base font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
                >
                  ফ্রি ট্রায়াল নিন
                </button>
                <button
                  onClick={() => {
                    const title = activeCourseModal.titleBn;
                    setActiveCourseModal(null);
                    onSelectCourse(title, 'enroll');
                  }}
                  className="w-full sm:w-auto px-8 py-3.5 text-base sm:text-lg font-black tracking-wide text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-md cursor-pointer flex items-center justify-center gap-2"
                >
                  <UserPlus className="w-5 h-5" />
                  <span>Enroll Now (ভর্তি হন)</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
