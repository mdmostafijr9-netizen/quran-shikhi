/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CoursesSection } from './components/CoursesSection';
import { SmartCourseFinder } from './components/SmartCourseFinder';
import { InteractiveAlphabet } from './components/InteractiveAlphabet';
import { ClassroomExperience } from './components/ClassroomExperience';
import { WeeklyReportCard } from './components/WeeklyReportCard';
import { InteractiveDuas } from './components/InteractiveDuas';
import { WhyChooseUs } from './components/WhyChooseUs';
import { PricingSection } from './components/PricingSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { ParentFAQ } from './components/ParentFAQ';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';
import { PWAInstallModal } from './components/PWAInstallModal';
import { usePWAInstall } from './hooks/usePWAInstall';
import { MessageCircle, Download } from 'lucide-react';

export default function App() {
  const { isInstallable, install } = usePWAInstall();
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isPWAInstallOpen, setIsPWAInstallOpen] = useState(false);
  const [bookingMode, setBookingMode] = useState<'enroll' | 'trial'>('trial');
  const [selectedCourseForBooking, setSelectedCourseForBooking] = useState<string | undefined>(undefined);
  const [selectedPlanForBooking, setSelectedPlanForBooking] = useState<string | undefined>(undefined);

  const handleOpenBooking = (mode: 'enroll' | 'trial' = 'trial') => {
    setSelectedCourseForBooking(undefined);
    setSelectedPlanForBooking(undefined);
    setBookingMode(mode);
    setIsBookingOpen(true);
  };

  const handleSelectCourse = (courseTitle: string, mode: 'enroll' | 'trial' = 'enroll') => {
    setSelectedCourseForBooking(courseTitle);
    setSelectedPlanForBooking(undefined);
    setBookingMode(mode);
    setIsBookingOpen(true);
  };

  const handleSelectPlan = (planName: string, mode: 'enroll' | 'trial' = 'enroll') => {
    setSelectedPlanForBooking(planName);
    setBookingMode(mode);
    setIsBookingOpen(true);
  };

  const handleJumpToCourses = () => {
    const el = document.getElementById('courses');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleJumpToAlphabet = () => {
    const el = document.getElementById('alphabet');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenAppDownload = async () => {
    if (isInstallable) {
      const accepted = await install();
      if (accepted) return;
    }
    setIsPWAInstallOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAF9] text-slate-900">
      {/* 3-Zone Clean Header with App Download Option */}
      <Navbar
        onOpenBooking={() => handleOpenBooking('trial')}
        onOpenInstall={handleOpenAppDownload}
        activeSection=""
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 1. Hero Section */}
        <Hero
          onOpenBooking={() => handleOpenBooking('trial')}
          onJumpToCourses={handleJumpToCourses}
          onJumpToAlphabet={handleJumpToAlphabet}
          onOpenInstall={handleOpenAppDownload}
        />

        {/* 2. Specialized Kids Courses with Headlines and Spotlight Frame */}
        <CoursesSection onSelectCourse={handleSelectCourse} />

        {/* 3. Smart Course Finder Quiz (শিশুর মেধা ও বয়স যাচাই করে কোর্স নির্বাচন) */}
        <SmartCourseFinder onSelectCourse={handleSelectCourse} />

        {/* 4. Interactive Alphabet Sandbox (হরফ সাইনবোর্ড, হরফ খোঁজার গেম, হরফ লেখার স্লেট) */}
        <InteractiveAlphabet />

        {/* 5. 1-on-1 Interactive Classroom Experience Showcase */}
        <ClassroomExperience onOpenBooking={() => handleOpenBooking('trial')} />

        {/* 6. Weekly Progress Report Card Preview for Parents */}
        <WeeklyReportCard />

        {/* 7. Everyday Duas & Kalimas */}
        <InteractiveDuas />

        {/* 8. Why Parents Trust Us */}
        <WhyChooseUs />

        {/* 9. Official Tuition Pricing Packages with bKash/Nagad/Rocket App Launchers */}
        <PricingSection onSelectPlan={handleSelectPlan} />

        {/* 10. Parent Testimonials & Outcomes */}
        <TestimonialsSection />

        {/* 11. FAQ for Parents */}
        <ParentFAQ onOpenBooking={() => handleOpenBooking('trial')} />
      </main>

      {/* Quiet Footer */}
      <Footer onOpenBooking={() => handleOpenBooking('trial')} />

      {/* Course Enrollment & Free Trial Booking Modal with Digital Admission Receipt */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        preSelectedCourse={selectedCourseForBooking}
        preSelectedPlan={selectedPlanForBooking}
        initialMode={bookingMode}
      />

      {/* PWA App Download / Installation Modal */}
      <PWAInstallModal
        isOpen={isPWAInstallOpen}
        onClose={() => setIsPWAInstallOpen(false)}
      />

      {/* Floating Action Buttons on Desktop & Mobile */}
      <div className="fixed bottom-6 right-6 z-30 flex flex-col sm:flex-row items-end sm:items-center gap-2.5">
        {/* App Download Floating Button */}
        <button
          onClick={handleOpenAppDownload}
          className="bg-amber-400 hover:bg-amber-300 text-slate-950 p-3 sm:px-4 sm:py-3 rounded-full sm:rounded-2xl shadow-xl flex items-center gap-2 transition-transform hover:scale-105 border border-amber-500 font-bold text-xs sm:text-sm cursor-pointer"
          title="কুরআন শিখি অ্যাপ ডাউনলোড করুন"
        >
          <Download className="w-5 h-5 text-slate-950" />
          <span className="hidden sm:inline">অ্যাপ ডাউনলোড</span>
        </button>

        {/* WhatsApp Fast Action */}
        <a
          href="https://wa.me/8801850172115?text=%E0%A6%86%E0%A6%B8%E0%A6%B8%E0%A6%BE%E0%A6%B2%E0%A6%BE%E0%A6%AE%E0%A7%81%20%E0%A6%86%E0%A6%B2%E0%A6%BE%E0%A6%87%E0%A6%95%E0%A7%81%E0%A6%AE%E0%A5%A4%20%E0%A6%95%E0%A7%81%E0%A6%B0%E0%A6%86%E0%A6%A8%20%E0%A6%B6%E0%A6%BF%E0%A6%96%E0%A6%BF%20%E0%A6%8F%E0%A6%95%E0%A6%BE%E0%A6%A1%E0%A7%87%E0%A6%AE%E0%A6%BF%E0%A6%A4%E0%A7%87%20%E0%A6%AD%E0%A6%B0%E0%A7%8D%E0%A6%A4%E0%A6%BF%20%E0%A6%93%20%E0%A6%AB%E0%A7%8D%E0%A6%B0%E0%A6%BF%20%E0%A6%A1%E0%A7%87%E0%A6%AE%E0%A7%8B%20%E0%A6%95%E0%A7%8D%E0%A6%B2%E0%A6%BE%E0%A6%B8%20%E0%A6%B8%E0%A6%AE%E0%A7%8D%E0%A6%AA%E0%A6%B0%E0%A7%8D%E0%A6%95%E0%A7%87%20%E0%A6%9C%E0%A6%BE%E0%A6%A8%E0%A6%A4%E0%A7%87%20%E0%A6%9A%E0%A6%BE%E0%A6%87%E0%A5%A4"
          target="_blank"
          rel="noreferrer"
          className="bg-emerald-600 hover:bg-emerald-700 text-white p-3.5 sm:px-4 sm:py-3 rounded-full sm:rounded-2xl shadow-xl flex items-center gap-2 transition-transform hover:scale-105"
          title="WhatsApp এ সরাসরি কথা বলুন"
        >
          <MessageCircle className="w-6 h-6 text-white" />
          <span className="hidden sm:inline text-xs sm:text-sm font-bold">WhatsApp যোগাযোগ</span>
        </a>
      </div>
    </div>
  );
}
