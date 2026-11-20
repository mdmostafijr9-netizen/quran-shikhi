import React, { useState, useEffect } from 'react';
import {
  X,
  CheckCircle2,
  MessageCircle,
  Copy,
  Check,
  CreditCard,
  UserPlus,
  Star,
  Sparkles,
  AlertCircle,
  PhoneCall,
  Printer,
  Smartphone,
  ExternalLink
} from 'lucide-react';
import { kidAudio } from '../utils/audio';
import { BkashLogo, NagadLogo, RocketLogo } from './PaymentLogos';
import {
  PAYMENT_ACCOUNT_NUMBER,
  launchBkashApp,
  launchNagadApp,
  launchRocketApp,
} from '../utils/paymentLinks';
import { AdmissionReceiptModal, AdmissionReceiptData } from './AdmissionReceiptModal';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preSelectedCourse?: string;
  preSelectedPlan?: string;
  initialMode?: 'enroll' | 'trial';
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  preSelectedCourse,
  preSelectedPlan,
  initialMode = 'enroll',
}) => {
  const [mode, setMode] = useState<'enroll' | 'trial'>(initialMode);

  // Student & Guardian Info
  const [childName, setChildName] = useState('');
  const [childAge, setChildAge] = useState('৬ বছর');
  const [parentName, setParentName] = useState('');
  const [phone, setPhone] = useState('');
  const [teacherGender, setTeacherGender] = useState<'female' | 'male' | 'any'>('any');
  const [selectedCourse, setSelectedCourse] = useState(preSelectedCourse || 'নূরানী কায়দা ফাউন্ডেশন');
  const [selectedPlan, setSelectedPlan] = useState(
    preSelectedPlan || 'স্ট্যান্ডার্ড প্ল্যান (সপ্তাহে ৩ দিন, ৪০ মিনিট) - ১৪৯৯ টাকা'
  );
  const [preferredTime, setPreferredTime] = useState('সন্ধ্যা (৭:০০ - ৯:০০ টা)');
  const [note, setNote] = useState('');

  // Payment Details
  const [paymentMethod, setPaymentMethod] = useState<'bkash' | 'nagad' | 'rocket'>('bkash');
  const [paymentOption, setPaymentOption] = useState<'admission_only' | 'full_package'>('admission_only');
  const [senderPhone, setSenderPhone] = useState('');
  const [trxId, setTrxId] = useState('');
  const [customAmount, setCustomAmount] = useState('300');
  const [isCopied, setIsCopied] = useState(false);
  const [copyFeedbackMsg, setCopyFeedbackMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // Submission State
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [bookingRefId, setBookingRefId] = useState('');
  const [receiptData, setReceiptData] = useState<AdmissionReceiptData | null>(null);
  const [showReceiptModal, setShowReceiptModal] = useState(false);

  const WHATSAPP_CONTACT_NUMBER = '01850172115';
  const ADMISSION_FEE = 300;

  // Calculate monthly fee from selected plan
  const calculatePlanFee = (planStr: string): number => {
    if (planStr.includes('৯৯৯') || planStr.includes('999')) return 999;
    if (planStr.includes('২,৯৯৯') || planStr.includes('২৯৯৯') || planStr.includes('2999')) return 2999;
    return 1499;
  };

  const monthlyCourseFee = calculatePlanFee(selectedPlan);
  const totalWithAdmission = monthlyCourseFee + ADMISSION_FEE;

  useEffect(() => {
    if (preSelectedCourse) {
      setSelectedCourse(preSelectedCourse);
    }
    if (preSelectedPlan) {
      setSelectedPlan(preSelectedPlan);
    }
    if (initialMode) {
      setMode(initialMode);
    }
    setIsSubmitted(false);
    setShowReceiptModal(false);
    setErrorMsg('');
  }, [preSelectedCourse, preSelectedPlan, initialMode, isOpen]);

  // Update default amount when payment option or plan changes
  useEffect(() => {
    if (paymentOption === 'admission_only') {
      setCustomAmount(String(ADMISSION_FEE));
    } else {
      setCustomAmount(String(totalWithAdmission));
    }
  }, [paymentOption, selectedPlan, totalWithAdmission]);

  if (!isOpen) return null;

  // Handle Copy Payment Number
  const handleCopyNumber = () => {
    navigator.clipboard.writeText(PAYMENT_ACCOUNT_NUMBER);
    setIsCopied(true);
    setCopyFeedbackMsg(`নম্বর (${PAYMENT_ACCOUNT_NUMBER}) কপি হয়েছে!`);
    setTimeout(() => {
      setIsCopied(false);
      setCopyFeedbackMsg('');
    }, 3000);
  };

  // Payment method selection with auto-copy and feedback
  const handleSelectPaymentMethod = (method: 'bkash' | 'nagad' | 'rocket') => {
    setPaymentMethod(method);
    navigator.clipboard.writeText(PAYMENT_ACCOUNT_NUMBER);
    setIsCopied(true);
    const label = method === 'bkash' ? 'বিকাশ' : method === 'nagad' ? 'নগদ' : 'রকেট';
    setCopyFeedbackMsg(`✓ ${label} নম্বর (${PAYMENT_ACCOUNT_NUMBER}) কপি হয়েছে!`);
    setTimeout(() => {
      setIsCopied(false);
      setCopyFeedbackMsg('');
    }, 3500);
  };

  // Direct app launcher handler
  const handleLaunchApp = async () => {
    if (paymentMethod === 'bkash') {
      const res = await launchBkashApp();
      setCopyFeedbackMsg(res.message);
    } else if (paymentMethod === 'nagad') {
      const res = await launchNagadApp();
      setCopyFeedbackMsg(res.message);
    } else {
      const res = await launchRocketApp();
      setCopyFeedbackMsg(res.message);
    }
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
      setCopyFeedbackMsg('');
    }, 4000);
  };

  // Submit Handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!childName.trim()) {
      setErrorMsg('অনুগ্রহ করে সন্তানের নাম লিখুন');
      return;
    }
    if (!parentName.trim()) {
      setErrorMsg('অনুগ্রহ করে অভিভাবকের নাম লিখুন');
      return;
    }
    if (!phone.trim() || phone.trim().length < 10) {
      setErrorMsg('অনুগ্রহ করে সঠিক মোবাইল নম্বর লিখুন');
      return;
    }

    if (mode === 'enroll') {
      if (!senderPhone.trim() || senderPhone.trim().length < 10) {
        setErrorMsg('যে বিকাশ, নগদ বা রকেট নম্বর থেকে টাকা পাঠিয়েছেন তা লিখুন');
        return;
      }
      if (!trxId.trim() || trxId.trim().length < 4) {
        setErrorMsg('অনুগ্রহ করে পেমেন্টের ট্রানজেকশন আইডি (TrxID) লিখুন');
        return;
      }
    }

    const ref = `QSA-${Date.now().toString().slice(-6)}`;
    setBookingRefId(ref);

    const teacherLabel =
      teacherGender === 'female'
        ? 'মহিলা শিক্ষিকা'
        : teacherGender === 'male'
        ? 'পুরুষ শিক্ষক'
        : 'যেকোনো দক্ষ শিক্ষক';

    const existing = JSON.parse(localStorage.getItem('quran_shikhi_bookings') || '[]');
    const newBooking = {
      id: Date.now(),
      refId: ref,
      mode,
      childName,
      childAge,
      parentName,
      phone,
      teacherGender: teacherLabel,
      selectedCourse,
      selectedPlan: mode === 'enroll' ? selectedPlan : 'ফ্রি ট্রায়াল ক্লাস',
      admissionFee: mode === 'enroll' ? `${ADMISSION_FEE} টাকা` : '০ টাকা',
      preferredTime,
      note,
      paymentMethod: mode === 'enroll' ? paymentMethod.toUpperCase() : 'none',
      senderPhone: mode === 'enroll' ? senderPhone.trim() : 'N/A (Free Trial)',
      trxId: mode === 'enroll' ? trxId.trim().toUpperCase() : 'FREE-TRIAL',
      paidAmount: mode === 'enroll' ? `${customAmount} টাকা` : '০ টাকা (ফ্রি ট্রায়াল)',
      createdAt: new Date().toISOString(),
    };

    localStorage.setItem('quran_shikhi_bookings', JSON.stringify([newBooking, ...existing]));

    // Generate Official Receipt Data
    if (mode === 'enroll') {
      const generatedReceipt: AdmissionReceiptData = {
        receiptNo: ref,
        date: new Date().toLocaleDateString('bn-BD', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }),
        childName,
        childAge,
        parentName,
        phone,
        courseTitle: selectedCourse,
        selectedPlan,
        preferredTime,
        teacherPreference: teacherLabel,
        paymentMethod: paymentMethod === 'bkash' ? 'বিকাশ (bKash Send Money)' : paymentMethod === 'nagad' ? 'নগদ (Nagad Send Money)' : 'রকেট (Rocket Send Money)',
        paymentChannelKey: paymentMethod,
        senderPhone: senderPhone.trim(),
        receiverPhone: PAYMENT_ACCOUNT_NUMBER,
        trxId: trxId.trim().toUpperCase(),
        paidAmount: customAmount,
        admissionFee: String(ADMISSION_FEE),
      };
      setReceiptData(generatedReceipt);
      setShowReceiptModal(true);
    }

    kidAudio.playVictory();
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    onClose();
  };

  const teacherLabel =
    teacherGender === 'female'
      ? 'মহিলা শিক্ষিকা'
      : teacherGender === 'male'
      ? 'পুরুষ শিক্ষক'
      : 'যেকোনো দক্ষ শিক্ষক';

  // Compose WhatsApp message for confirmation
  const whatsappMsg = encodeURIComponent(
    `আসসালামু আলাইকুম। আমি 'কুরআন শিখি' একাডেমিতে ${
      mode === 'enroll' ? 'কোর্সে ভর্তি ফি পরিশোধ করে ভর্তি আবেদন' : 'ফ্রি ট্রায়াল ক্লাস বুক'
    } করেছি।\n\n` +
    `• রেফারেন্স রসিদ নং: ${bookingRefId}\n` +
    `• সন্তানের নাম: ${childName} (${childAge})\n` +
    `• কোর্সের নাম: ${selectedCourse}\n` +
    (mode === 'enroll'
      ? `• নির্বাচিত প্ল্যান: ${selectedPlan}\n` +
        `• ভর্তি ফি: ৩০০ টাকা\n` +
        `• পেমেন্ট মাধ্যম: ${paymentMethod.toUpperCase()} (Send Money)\n` +
        `• প্রাপক নম্বর: ${PAYMENT_ACCOUNT_NUMBER}\n` +
        `• প্রেরক নম্বর: ${senderPhone}\n` +
        `• TrxID: ${trxId}\n` +
        `• পরিশোধিত টাকা: ${customAmount} টাকা\n`
      : `• ভর্তির ধরন: ফ্রি ট্রায়াল ক্লাস\n`) +
    `• শিক্ষক পছন্দ: ${teacherLabel}\n` +
    `• ক্লাসের সময়: ${preferredTime}\n` +
    `• অভিভাবক: ${parentName} (${phone})\n\n` +
    `অনুগ্রহ করে দ্রুত ভর্তি নিশ্চিত করে ক্লাসের লিংক প্রদান করবেন।`
  );

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
        <div className="bg-white rounded-3xl max-w-xl w-full p-5 sm:p-9 shadow-2xl relative max-h-[95vh] overflow-y-auto border-2 border-emerald-100">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-800 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-6 h-6" />
          </button>

          {!isSubmitted ? (
            <div>
              {/* Mode Switcher Tabs */}
              <div className="flex items-center justify-center mb-5">
                <div className="inline-flex p-1 bg-slate-100 rounded-2xl border border-slate-200">
                  <button
                    type="button"
                    onClick={() => {
                      setMode('enroll');
                      setErrorMsg('');
                    }}
                    className={`px-5 py-2.5 text-sm sm:text-base font-black rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
                      mode === 'enroll'
                        ? 'bg-emerald-600 text-white shadow-sm'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <UserPlus className="w-4 h-4" />
                    <span>Enroll Now (ভর্তি হন)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setMode('trial');
                      setErrorMsg('');
                    }}
                    className={`px-5 py-2.5 text-sm sm:text-base font-bold rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
                      mode === 'trial'
                        ? 'bg-emerald-600 text-white shadow-sm'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <Star className="w-4 h-4" />
                    <span>ফ্রি ট্রায়াল ক্লাস</span>
                  </button>
                </div>
              </div>

              {/* Error Message if any */}
              {errorMsg && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm font-bold flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* PROMINENT PAYMENT ACCOUNT BANNER WITH AUTO-COPY & DIRECT APP LAUNCH */}
              {mode === 'enroll' && (
                <div className="mb-6 bg-gradient-to-r from-emerald-900 via-teal-950 to-slate-900 text-white p-5 sm:p-6 rounded-3xl border-2 border-emerald-500 shadow-xl">
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-2.5 border-b border-emerald-800/80">
                    <div className="flex items-center gap-1.5">
                      <CreditCard className="w-4 h-4 text-emerald-300" />
                      <span className="text-xs uppercase font-extrabold tracking-wider text-emerald-200">
                        ভর্তি ফি পেমেন্ট নম্বর (Send Money):
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="bg-white px-2 py-0.5 rounded-lg flex items-center justify-center shadow-xs">
                        <BkashLogo size="sm" />
                      </div>
                      <div className="bg-white px-2 py-0.5 rounded-lg flex items-center justify-center shadow-xs">
                        <NagadLogo size="sm" />
                      </div>
                      <div className="bg-white px-1.5 py-0.5 rounded-lg flex items-center justify-center shadow-xs">
                        <RocketLogo size="sm" />
                      </div>
                      <span className="text-emerald-200 text-xs font-bold">Personal</span>
                    </div>
                  </div>

                  <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <div className="text-xs text-emerald-300 font-semibold">প্রাপক অ্যাকাউন্ট নম্বর:</div>
                      <div className="text-2xl sm:text-3xl lg:text-4xl font-black font-mono tracking-wider text-amber-300 select-all">
                        {PAYMENT_ACCOUNT_NUMBER}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={handleCopyNumber}
                      className={`px-4 py-2.5 rounded-xl text-sm font-black flex items-center gap-1.5 transition-all cursor-pointer shadow-md ${
                        isCopied
                          ? 'bg-emerald-400 text-slate-950 scale-105'
                          : 'bg-white hover:bg-slate-100 text-slate-900'
                      }`}
                    >
                      {isCopied ? <Check className="w-4 h-4 text-emerald-950" /> : <Copy className="w-4 h-4 text-emerald-800" />}
                      <span>{isCopied ? 'নম্বর কপি হয়েছে!' : 'নম্বর কপি করুন'}</span>
                    </button>
                  </div>

                  {/* Direct App Launch Button */}
                  <div className="mt-3 pt-3 border-t border-emerald-800/80 flex flex-col sm:flex-row items-center justify-between gap-2.5">
                    <button
                      type="button"
                      onClick={handleLaunchApp}
                      className="w-full sm:w-auto px-4 py-2 bg-pink-500 hover:bg-pink-600 text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                    >
                      <Smartphone className="w-4 h-4" />
                      <span>সরাসরি বিকাশ / নগদ অ্যাপে যান</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>

                    <span className="text-xs font-semibold text-emerald-200 text-center sm:text-right">
                      ভর্তি ফি: <b className="text-amber-300 font-bold">৩০০ টাকা</b> (Send Money)
                    </span>
                  </div>

                  {/* Copy Feedback Banner */}
                  {copyFeedbackMsg && (
                    <div className="mt-2.5 p-2 bg-emerald-400 text-slate-950 text-xs font-bold rounded-lg text-center animate-fadeIn">
                      {copyFeedbackMsg}
                    </div>
                  )}
                </div>
              )}

              <div className="text-center pb-4 border-b border-slate-100">
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
                  {mode === 'enroll' ? 'কোর্সে সরাসরি ভর্তি ফরম ও পেমেন্ট' : 'সন্তানের জন্য ফ্রি ট্রায়াল বুক করুন'}
                </h3>
                <p className="text-base sm:text-lg text-slate-700 mt-1 leading-relaxed font-normal">
                  {mode === 'enroll'
                    ? 'তথ্য পূরণ ও TrxID দিয়ে সাবমিট করলেই সাথে সাথে ডিজিটাল ভর্তি রসিদ পাবেন।'
                    : 'কোনো প্রকার অগ্রিম ফি নেই। ১টি ক্লাস করে শিক্ষকের পাঠদান পছন্দ হলে তবেই ভর্তি করাবেন।'}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="mt-5 space-y-4">
                {/* Child's Name & Age */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-slate-800 mb-1.5">
                      সন্তানের নাম *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="যেমন: তাহসিন আহমেদ"
                      value={childName}
                      onChange={(e) => setChildName(e.target.value)}
                      className="w-full px-4 py-3 text-base rounded-xl border border-slate-300 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-800 mb-1.5">
                      সন্তানের বয়স *
                    </label>
                    <select
                      value={childAge}
                      onChange={(e) => setChildAge(e.target.value)}
                      className="w-full px-4 py-3 text-base rounded-xl border border-slate-300 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 outline-none bg-white font-medium"
                    >
                      <option value="৪ বছর">৪ বছর</option>
                      <option value="৫ বছর">৫ বছর</option>
                      <option value="৬ বছর">৬ বছর</option>
                      <option value="৭ বছর">৭ বছর</option>
                      <option value="৮ বছর">৮ বছর</option>
                      <option value="৯ বছর">৯ বছর</option>
                      <option value="১০ বছর">১০ বছর</option>
                      <option value="১১-১৪ বছর">১১ থেকে ১৪ বছর</option>
                    </select>
                  </div>
                </div>

                {/* Course Selection */}
                <div>
                  <label className="block text-sm font-bold text-slate-800 mb-1.5">
                    যে কোর্সে ভর্তি করাতে চান *
                  </label>
                  <select
                    value={selectedCourse}
                    onChange={(e) => setSelectedCourse(e.target.value)}
                    className="w-full px-4 py-3 text-base rounded-xl border border-slate-300 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 outline-none bg-white font-semibold text-slate-900"
                  >
                    <option value="নূরানী কায়দা ফাউন্ডেশন">নূরানী কায়দা ফাউন্ডেশন (হরফ ও মাখরাজ)</option>
                    <option value="সহীহ নাজেরা ও তাজবীদ কোর্স">সহীহ নাজেরা ও তাজবীদ কোর্স (কুরআন রিডিং)</option>
                    <option value="ছোটদের হিফজুল কুরআন প্রোগ্রাম">ছোটদের হিফজুল কুরআন প্রোগ্রাম</option>
                    <option value="ছোটদের দু'আ, নামাজ ও ইসলামিক আদব">ছোটদের দু'আ, নামাজ ও ইসলামিক আদব</option>
                  </select>
                </div>

                {/* Plan Selection for Enrollment */}
                {mode === 'enroll' && (
                  <div>
                    <label className="block text-sm font-bold text-slate-800 mb-1.5">
                      মাসিক প্ল্যান নির্বাচন *
                    </label>
                    <select
                      value={selectedPlan}
                      onChange={(e) => setSelectedPlan(e.target.value)}
                      className="w-full px-4 py-3 text-base rounded-xl border border-emerald-300 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 outline-none bg-emerald-50/50 font-bold text-emerald-950"
                    >
                      <option value="বেসিক প্ল্যান (সপ্তাহে ২ দিন, ৪০ মিনিট) - ৯৯৯ টাকা">
                        বেসিক প্ল্যান: সপ্তাহে ২ দিন (৪০ মিনিট) — ৯৯৯ টাকা
                      </option>
                      <option value="স্ট্যান্ডার্ড প্ল্যান (সপ্তাহে ৩ দিন, ৪০ মিনিট) - ১৪৯৯ টাকা">
                        স্ট্যান্ডার্ড প্ল্যান: সপ্তাহে ৩ দিন (৪০ মিনিট) — ১,৪৯৯ টাকা (জনপ্রিয়)
                      </option>
                      <option value="ইনটেনসিভ প্ল্যান (সপ্তাহে ৫ দিন, ৪০ মিনিট) - ২৯৯৯ টাকা">
                        ইনটেনসিভ প্ল্যান: সপ্তাহে ৫ দিন (৪০ মিনিট) — ২,৯৯৯ টাকা
                      </option>
                    </select>
                  </div>
                )}

                {/* Teacher Gender Preference */}
                <div>
                  <label className="block text-sm font-bold text-slate-800 mb-2">
                    শিক্ষক নির্বাচন *
                  </label>
                  <div className="grid grid-cols-3 gap-2.5">
                    <button
                      type="button"
                      onClick={() => setTeacherGender('female')}
                      className={`py-2.5 px-2 text-sm font-bold rounded-xl border transition-all cursor-pointer ${
                        teacherGender === 'female'
                          ? 'bg-emerald-50 border-emerald-600 text-emerald-900 ring-2 ring-emerald-500 shadow-xs'
                          : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      👩 মহিলা শিক্ষিকা
                    </button>
                    <button
                      type="button"
                      onClick={() => setTeacherGender('male')}
                      className={`py-2.5 px-2 text-sm font-bold rounded-xl border transition-all cursor-pointer ${
                        teacherGender === 'male'
                          ? 'bg-emerald-50 border-emerald-600 text-emerald-900 ring-2 ring-emerald-500 shadow-xs'
                          : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      👨 পুরুষ শিক্ষক
                    </button>
                    <button
                      type="button"
                      onClick={() => setTeacherGender('any')}
                      className={`py-2.5 px-2 text-sm font-bold rounded-xl border transition-all cursor-pointer ${
                        teacherGender === 'any'
                          ? 'bg-emerald-50 border-emerald-600 text-emerald-900 ring-2 ring-emerald-500 shadow-xs'
                          : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      যেকোনো শিক্ষক
                    </button>
                  </div>
                </div>

                {/* Preferred Time Slot */}
                <div>
                  <label className="block text-sm font-bold text-slate-800 mb-1.5">
                    ক্লাসের সুবিধাজনক সময় *
                  </label>
                  <select
                    value={preferredTime}
                    onChange={(e) => setPreferredTime(e.target.value)}
                    className="w-full px-4 py-3 text-base rounded-xl border border-slate-300 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 outline-none bg-white font-medium"
                  >
                    <option value="সকাল (৮:০০ - ১০:৩০ টা)">সকাল (৮:০০ - ১০:৩০ টা)</option>
                    <option value="দুপুর (২:০০ - ৪:০০ টা)">দুপুর (২:০০ - ৪:০০ টা)</option>
                    <option value="বিকাল (৪:৩০ - ৬:০০ টা)">বিকাল (৪:৩০ - ৬:০০ টা)</option>
                    <option value="সন্ধ্যা (৭:০০ - ৯:০০ টা)">সন্ধ্যা (৭:০০ - ৯:০০ টা)</option>
                    <option value="রাত (৯:০০ - ১০:৩০ টা)">রাত (৯:০০ - ১০:৩০ টা)</option>
                  </select>
                </div>

                {/* Parent Name & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-slate-800 mb-1.5">
                      অভিভাবকের নাম *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="আপনার নাম"
                      value={parentName}
                      onChange={(e) => setParentName(e.target.value)}
                      className="w-full px-4 py-3 text-base rounded-xl border border-slate-300 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-800 mb-1.5">
                      মোবাইল / WhatsApp নম্বর *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="017xxxxxxxx"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-4 py-3 text-base rounded-xl border border-slate-300 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 outline-none"
                    />
                  </div>
                </div>

                {/* PAYMENT VERIFICATION SECTION (ONLY FOR ENROLL MODE) */}
                {mode === 'enroll' && (
                  <div className="pt-4 border-t-2 border-emerald-100 space-y-4 bg-emerald-50/40 p-4 sm:p-5 rounded-2xl border">
                    <div className="flex items-center gap-2">
                      <CreditCard className="w-5 h-5 text-emerald-700" />
                      <span className="font-extrabold text-slate-900 text-base">
                        পেমেন্ট নিশ্চিতকরণ তথ্য ({PAYMENT_ACCOUNT_NUMBER} নম্বরে পাঠানো)
                      </span>
                    </div>

                    {/* Payment option: Admission fee vs Full */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        পরিশোধের ধরন:
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => setPaymentOption('admission_only')}
                          className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                            paymentOption === 'admission_only'
                              ? 'bg-white border-emerald-600 ring-2 ring-emerald-500 shadow-xs'
                              : 'bg-white/80 border-slate-200'
                          }`}
                        >
                          <div className="text-xs font-bold text-slate-500">সিট কনফার্মেশন</div>
                          <div className="text-sm font-black text-emerald-950">ভর্তি ফি: ৩০০ টাকা</div>
                        </button>

                        <button
                          type="button"
                          onClick={() => setPaymentOption('full_package')}
                          className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                            paymentOption === 'full_package'
                              ? 'bg-white border-emerald-600 ring-2 ring-emerald-500 shadow-xs'
                              : 'bg-white/80 border-slate-200'
                          }`}
                        >
                          <div className="text-xs font-bold text-slate-500">সম্পূর্ণ প্যাকেজ</div>
                          <div className="text-sm font-black text-emerald-950">ভর্তি ফি + কোর্স ফি: ৳{totalWithAdmission}</div>
                        </button>
                      </div>
                    </div>

                    {/* Select Payment Method with auto copy */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center justify-between">
                        <span>যে মাধ্যমে টাকা পাঠিয়েছেন (ক্লিক করলেই নম্বর কপি হবে):</span>
                        <span className="text-emerald-700 font-bold">অটো কপি সক্রিয়</span>
                      </label>
                      <div className="grid grid-cols-3 gap-2.5">
                        <button
                          type="button"
                          onClick={() => handleSelectPaymentMethod('bkash')}
                          className={`p-2.5 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center justify-between min-h-[72px] ${
                            paymentMethod === 'bkash'
                              ? 'bg-pink-50 border-pink-500 ring-2 ring-pink-400 shadow-sm'
                              : 'bg-white border-slate-200 hover:bg-slate-50'
                          }`}
                        >
                          <div className="h-8 flex items-center justify-center">
                            <BkashLogo size="sm" />
                          </div>
                          <span className="text-xs font-black text-pink-900 mt-1">বিকাশ (bKash)</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => handleSelectPaymentMethod('nagad')}
                          className={`p-2.5 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center justify-between min-h-[72px] ${
                            paymentMethod === 'nagad'
                              ? 'bg-orange-50 border-orange-500 ring-2 ring-orange-400 shadow-sm'
                              : 'bg-white border-slate-200 hover:bg-slate-50'
                          }`}
                        >
                          <div className="h-8 flex items-center justify-center">
                            <NagadLogo size="sm" />
                          </div>
                          <span className="text-xs font-black text-orange-900 mt-1">নগদ (Nagad)</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => handleSelectPaymentMethod('rocket')}
                          className={`p-2.5 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center justify-between min-h-[72px] ${
                            paymentMethod === 'rocket'
                              ? 'bg-purple-50 border-purple-500 ring-2 ring-purple-400 shadow-sm'
                              : 'bg-white border-slate-200 hover:bg-slate-50'
                          }`}
                        >
                          <div className="h-8 flex items-center justify-center">
                            <RocketLogo size="sm" />
                          </div>
                          <span className="text-xs font-black text-purple-900 mt-1">রকেট (Rocket)</span>
                        </button>
                      </div>

                      {/* Direct App Launch trigger */}
                      <div className="mt-3">
                        <button
                          type="button"
                          onClick={handleLaunchApp}
                          className="w-full py-2.5 px-4 bg-white hover:bg-emerald-50 border-2 border-emerald-400 text-emerald-950 font-black text-xs sm:text-sm rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
                        >
                          <Smartphone className="w-4 h-4 text-emerald-600" />
                          <span>
                            {paymentMethod === 'bkash' ? '📲 সরাসরি বিকাশ অ্যাপ খুলুন' : paymentMethod === 'nagad' ? '📲 সরাসরি নগদ অ্যাপ খুলুন' : '📲 সরাসরি রকেট অ্যাপ খুলুন'}
                          </span>
                          <span className="text-emerald-700 font-normal">(অটো কপি হয়ে যাবে)</span>
                        </button>
                      </div>
                    </div>

                    {/* Sender Phone and TrxID inputs */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-slate-800 mb-1">
                          প্রেরক নম্বর (যে নম্বর থেকে পাঠিয়েছেন) *
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder="01xxxxxxxxx"
                          value={senderPhone}
                          onChange={(e) => setSenderPhone(e.target.value)}
                          className="w-full px-3.5 py-2.5 text-sm sm:text-base rounded-xl border border-slate-300 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 outline-none bg-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-800 mb-1">
                          ট্রানজেকশন আইডি (TrxID) *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="যেমন: 9J4K2L8M"
                          value={trxId}
                          onChange={(e) => setTrxId(e.target.value)}
                          className="w-full px-3.5 py-2.5 text-sm sm:text-base rounded-xl border border-slate-300 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 outline-none font-mono uppercase bg-white font-bold"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-800 mb-1">
                        পরিশোধিত টাকার পরিমাণ (টাকা) *
                      </label>
                      <input
                        type="number"
                        required
                        value={customAmount}
                        onChange={(e) => setCustomAmount(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-sm sm:text-base font-bold text-slate-900 rounded-xl border border-slate-300 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 outline-none bg-white"
                      />
                    </div>
                  </div>
                )}

                {/* Optional note */}
                <div>
                  <label className="block text-sm font-bold text-slate-800 mb-1.5">
                    বিশেষ কোনো মন্তব্য বা শিশুর অবস্থা (ঐচ্ছিক)
                  </label>
                  <input
                    type="text"
                    placeholder="যেমন: হরফ চেনে কিন্তু পড়তে ভয় পায়"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    className="w-full px-4 py-3 text-base rounded-xl border border-slate-300 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100 outline-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-4 text-base sm:text-lg font-black tracking-wide text-white bg-emerald-600 hover:bg-emerald-700 active:scale-98 rounded-xl shadow-lg hover:shadow-emerald-200 transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    {mode === 'enroll' ? (
                      <>
                        <CreditCard className="w-5 h-5" />
                        <span>ভর্তি নিশ্চিত করুন ও রসিদ পান</span>
                      </>
                    ) : (
                      <>
                        <Star className="w-5 h-5" />
                        <span>ফ্রি ট্রায়াল ক্লাস কনফার্ম করুন</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          ) : (
            /* Submission Confirmation View with Official Receipt Button */
            <div className="text-center py-6 space-y-5">
              <div className="w-20 h-20 mx-auto rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center animate-bounce">
                <CheckCircle2 className="w-14 h-14" />
              </div>

              <div>
                <div className="text-xs font-black uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3.5 py-1 rounded-full w-fit mx-auto border border-emerald-200 mb-2">
                  রেফারেন্স আইডি: {bookingRefId}
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
                  আলহামদুলিল্লাহ! আপনার আবেদন সফল হয়েছে
                </h3>
              </div>

              <p className="text-base text-slate-700 leading-relaxed max-w-md mx-auto">
                ধন্যবাদ <b>{parentName}</b>! আপনার সন্তান <b>{childName}</b>-এর জন্য{' '}
                <b>{selectedCourse}</b> কোর্সে {mode === 'enroll' ? 'ভর্তি ও পেমেন্ট তথ্য' : 'ফ্রি ট্রায়াল অনুরোধ'} সফলভাবে গৃহীত হয়েছে।
              </p>

              {/* Digital Admission Receipt Action (Shown on Enroll mode) */}
              {mode === 'enroll' && receiptData && (
                <div className="p-4 bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-50 rounded-2xl border-2 border-emerald-400 text-center space-y-3">
                  <div className="flex items-center justify-center gap-2 text-emerald-900 font-black text-base">
                    <Sparkles className="w-5 h-5 text-amber-500" />
                    <span>আপনার ডিজিটাল ভর্তি রসিদ প্রস্তুত!</span>
                  </div>
                  <p className="text-xs text-slate-600">
                    নিচের বাটনে চাপ দিয়ে অফিসিয়াল মানি রিসিটটি সরাসরি প্রিন্ট বা PDF ডাউনলোড করে সংরক্ষণ করুন:
                  </p>
                  <button
                    type="button"
                    onClick={() => setShowReceiptModal(true)}
                    className="w-full py-3 px-5 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm sm:text-base rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                  >
                    <Printer className="w-5 h-5" />
                    <span>📄 অফিসিয়াল ভর্তি রসিদ ডাউনলোড ও প্রিন্ট করুন</span>
                  </button>
                </div>
              )}

              {/* Receipt Summary Card */}
              <div className="p-5 bg-[#F8FAF9] rounded-2xl border border-slate-200 text-sm text-slate-800 space-y-2 text-left">
                <div className="flex justify-between border-b border-slate-200 pb-2">
                  <b>কোর্স:</b> <span>{selectedCourse}</span>
                </div>
                {mode === 'enroll' && (
                  <>
                    <div className="flex justify-between">
                      <b>নির্বাচিত প্ল্যান:</b> <span>{selectedPlan}</span>
                    </div>
                    <div className="flex justify-between">
                      <b>পেমেন্ট মাধ্যম:</b>{' '}
                      <span className="font-bold uppercase text-emerald-800">
                        {paymentMethod === 'bkash' ? 'বিকাশ (bKash)' : paymentMethod === 'nagad' ? 'নগদ (Nagad)' : 'রকেট (Rocket)'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <b>প্রাপক নম্বর:</b> <span className="font-mono font-bold text-emerald-900">{PAYMENT_ACCOUNT_NUMBER}</span>
                    </div>
                    <div className="flex justify-between">
                      <b>প্রেরক নম্বর:</b> <span className="font-mono font-bold">{senderPhone}</span>
                    </div>
                    <div className="flex justify-between">
                      <b>ট্রানজেকশন আইডি:</b> <span className="font-mono font-black text-emerald-900">{trxId}</span>
                    </div>
                    <div className="flex justify-between font-bold text-emerald-950 pt-1 border-t border-slate-200">
                      <b>পরিশোধিত টাকা:</b> <span>৳{customAmount}</span>
                    </div>
                  </>
                )}
                <div className="flex justify-between">
                  <b>শিক্ষক পছন্দ:</b> <span>{teacherLabel}</span>
                </div>
                <div className="flex justify-between">
                  <b>ক্লাসের সময়:</b> <span>{preferredTime}</span>
                </div>
              </div>

              {/* Direct WhatsApp connect */}
              <div className="pt-3 space-y-3">
                <a
                  href={`https://wa.me/88${WHATSAPP_CONTACT_NUMBER}?text=${whatsappMsg}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-4 px-5 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-base sm:text-lg rounded-xl shadow-lg transition-colors"
                >
                  <MessageCircle className="w-6 h-6" />
                  <span>হোয়াটসঅ্যাপে পেমেন্ট কনফার্মেশন পাঠান</span>
                </a>

                <button
                  onClick={handleReset}
                  className="w-full py-3 text-base font-bold text-slate-700 hover:text-slate-900 cursor-pointer"
                >
                  উইন্ডো বন্ধ করুন
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Render Official Admission Money Receipt Modal */}
      <AdmissionReceiptModal
        isOpen={showReceiptModal}
        onClose={() => setShowReceiptModal(false)}
        data={receiptData}
      />
    </>
  );
};
