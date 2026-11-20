import React, { useState } from 'react';
import {
  X,
  Printer,
  Download,
  Share2,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
  Check,
} from 'lucide-react';
import { AcademyLogo } from './AcademyLogo';
import { BkashLogo, NagadLogo, RocketLogo } from './PaymentLogos';

export interface AdmissionReceiptData {
  receiptNo: string;
  date: string;
  childName: string;
  childAge: string;
  parentName: string;
  phone: string;
  courseTitle: string;
  selectedPlan: string;
  preferredTime: string;
  teacherPreference: string;
  paymentMethod: string;
  paymentChannelKey?: 'bkash' | 'nagad' | 'rocket';
  senderPhone: string;
  receiverPhone?: string;
  trxId: string;
  paidAmount: string;
  admissionFee: string;
}

interface AdmissionReceiptModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: AdmissionReceiptData | null;
}

export const AdmissionReceiptModal: React.FC<AdmissionReceiptModalProps> = ({
  isOpen,
  onClose,
  data,
}) => {
  const [downloadedMsg, setDownloadedMsg] = useState(false);

  if (!isOpen || !data) return null;

  const receiverNumber = data.receiverPhone || '01408440180';

  const handlePrint = () => {
    window.print();
  };

  // Generate high-res colorful PNG money receipt using HTML5 Canvas
  const handleDownloadImage = () => {
    const canvas = document.createElement('canvas');
    const width = 900;
    const height = 1120;
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const roundRect = (
      x: number,
      y: number,
      w: number,
      h: number,
      r: number
    ) => {
      ctx.beginPath();
      ctx.moveTo(x + r, y);
      ctx.arcTo(x + w, y, x + w, y + h, r);
      ctx.arcTo(x + w, y + h, x, y + h, r);
      ctx.arcTo(x, y + h, x, y, r);
      ctx.arcTo(x, y, x + w, y, r);
      ctx.closePath();
    };

    // Background
    ctx.fillStyle = '#ECFDF5';
    ctx.fillRect(0, 0, width, height);

    // Main Card Container
    roundRect(30, 30, width - 60, height - 60, 28);
    ctx.fillStyle = '#FFFFFF';
    ctx.fill();
    ctx.lineWidth = 5;
    ctx.strokeStyle = '#059669';
    ctx.stroke();

    // Top Gradient Header
    ctx.save();
    roundRect(30, 30, width - 60, 175, 28);
    ctx.clip();
    const grad = ctx.createLinearGradient(30, 30, width - 30, 205);
    grad.addColorStop(0, '#064E3B');
    grad.addColorStop(0.55, '#047857');
    grad.addColorStop(1, '#0F766E');
    ctx.fillStyle = grad;
    ctx.fillRect(30, 30, width - 60, 180);
    ctx.restore();

    // Header Gold Accent Bar
    ctx.fillStyle = '#FBBF24';
    ctx.fillRect(30, 198, width - 60, 7);

    // Header Texts
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 34px "Hind Siliguri", sans-serif';
    ctx.fillText('কুরআন শিখি (Quran Shikhi)', 65, 95);

    ctx.fillStyle = '#A7F3D0';
    ctx.font = 'bold 19px "Hind Siliguri", sans-serif';
    ctx.fillText('মারকাযুল কুরআন একাডেমি · শিশু-বান্ধব অনলাইন কুরআন একাডেমি', 65, 132);
    ctx.font = '16px "Hind Siliguri", sans-serif';
    ctx.fillText('ইমেইল: quranshikhiacademy@gmail.com | WhatsApp: +880 1850-172115', 65, 165);

    // Right Receipt Pill Badge
    roundRect(width - 285, 58, 220, 44, 22);
    ctx.fillStyle = '#FBBF24';
    ctx.fill();
    ctx.fillStyle = '#0F172A';
    ctx.font = 'bold 18px "Hind Siliguri", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('অফিসিয়াল মানি রিসিট', width - 175, 86);

    ctx.fillStyle = '#FEF3C7';
    ctx.font = 'bold 16px monospace';
    ctx.textAlign = 'right';
    ctx.fillText(`রসিদ নং: ${data.receiptNo}`, width - 65, 134);
    ctx.fillStyle = '#D1FAE5';
    ctx.font = '15px "Hind Siliguri", sans-serif';
    ctx.fillText(`তারিখ: ${data.date}`, width - 65, 162);
    ctx.textAlign = 'left';

    // PAID Banner Strip
    roundRect(60, 225, width - 120, 46, 12);
    ctx.fillStyle = '#D1FAE5';
    ctx.fill();
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = '#10B981';
    ctx.stroke();

    ctx.fillStyle = '#065F46';
    ctx.font = 'bold 20px "Hind Siliguri", sans-serif';
    ctx.fillText('✓ পেমেন্ট স্ট্যাটাস: পরিশোধিত ও আবেদন গৃহীত (PAID)', 82, 255);

    // Student & Guardian Card
    roundRect(60, 290, width - 120, 135, 16);
    ctx.fillStyle = '#F8FAFC';
    ctx.fill();
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = '#CBD5E1';
    ctx.stroke();

    ctx.fillStyle = '#047857';
    ctx.font = 'bold 17px "Hind Siliguri", sans-serif';
    ctx.fillText('শিক্ষার্থী ও অভিভাবকের তথ্য', 82, 322);

    ctx.fillStyle = '#334155';
    ctx.font = 'bold 19px "Hind Siliguri", sans-serif';
    ctx.fillText(`শিক্ষার্থীর নাম: ${data.childName} (${data.childAge})`, 82, 360);
    ctx.fillText(`অভিভাবকের নাম: ${data.parentName}`, 82, 396);
    ctx.fillText(`মোবাইল নম্বর: ${data.phone}`, width / 2 + 20, 396);

    // Course Details Card
    roundRect(60, 445, width - 120, 175, 16);
    ctx.fillStyle = '#FFFBEB';
    ctx.fill();
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = '#FCD34D';
    ctx.stroke();

    ctx.fillStyle = '#B45309';
    ctx.font = 'bold 17px "Hind Siliguri", sans-serif';
    ctx.fillText('ভর্তিকৃত কোর্স ও ক্লাসের বিবরণ', 82, 478);

    const drawRow = (label: string, value: string, y: number) => {
      ctx.fillStyle = '#475569';
      ctx.font = 'bold 18px "Hind Siliguri", sans-serif';
      ctx.fillText(label, 82, y);
      ctx.fillStyle = '#0F172A';
      ctx.font = 'bold 18px "Hind Siliguri", sans-serif';
      ctx.fillText(value, 270, y);
    };

    drawRow('কোর্সের নাম:', data.courseTitle, 514);
    drawRow('নির্বাচিত প্ল্যান:', data.selectedPlan, 548);
    drawRow('ক্লাসের সময় ও শিক্ষক:', `${data.preferredTime} · ${data.teacherPreference}`, 582);

    // Payment Breakdown Box
    roundRect(60, 640, width - 120, 255, 18);
    ctx.fillStyle = '#ECFDF5';
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#10B981';
    ctx.stroke();

    ctx.fillStyle = '#065F46';
    ctx.font = 'bold 20px "Hind Siliguri", sans-serif';
    ctx.fillText('পেমেন্ট ও ট্রানজেকশন বিবরণী', 82, 678);

    ctx.strokeStyle = '#A7F3D0';
    ctx.beginPath();
    ctx.moveTo(80, 694);
    ctx.lineTo(width - 80, 694);
    ctx.stroke();

    const drawMoneyRow = (label: string, val: string, y: number, highlight = false) => {
      ctx.fillStyle = highlight ? '#064E3B' : '#1E293B';
      ctx.font = highlight ? 'bold 24px "Hind Siliguri", sans-serif' : 'bold 18px "Hind Siliguri", sans-serif';
      ctx.fillText(label, 82, y);
      ctx.textAlign = 'right';
      ctx.fillText(val, width - 82, y);
      ctx.textAlign = 'left';
    };

    drawMoneyRow('এককালীন একাউন্ট ও ভর্তি ফি', `৳${data.admissionFee} টাকা`, 732);
    drawMoneyRow('পেমেন্ট মাধ্যম (Send Money)', data.paymentMethod, 766);
    drawMoneyRow('প্রাপক নম্বর (Personal)', receiverNumber, 800);
    drawMoneyRow('প্রেরক নম্বর ও TrxID', `${data.senderPhone}  |  TrxID: ${data.trxId}`, 834);

    ctx.strokeStyle = '#10B981';
    ctx.beginPath();
    ctx.moveTo(80, 850);
    ctx.lineTo(width - 80, 850);
    ctx.stroke();

    drawMoneyRow('মোট পরিশোধিত টাকা:', `৳${data.paidAmount} টাকা`, 882, true);

    // Bottom Seal & Signature
    roundRect(60, 925, 340, 88, 16);
    ctx.fillStyle = '#D1FAE5';
    ctx.fill();
    ctx.lineWidth = 2.5;
    ctx.strokeStyle = '#059669';
    ctx.stroke();

    ctx.fillStyle = '#064E3B';
    ctx.font = 'bold 19px sans-serif';
    ctx.fillText('✓ VERIFIED & CONFIRMED', 85, 962);
    ctx.font = 'bold 16px "Hind Siliguri", sans-serif';
    ctx.fillText('ভর্তি ফি ৩০০ টাকা পরিশোধিত', 85, 992);

    ctx.textAlign = 'right';
    ctx.fillStyle = '#064E3B';
    ctx.font = 'italic bold 20px serif';
    ctx.fillText('Quran Shikhi Admission Cell', width - 65, 965);
    ctx.fillStyle = '#475569';
    ctx.font = '15px "Hind Siliguri", sans-serif';
    ctx.fillText('কুরআন শিখি এডমিশন কন্ট্রোলার · ঢাকা', width - 65, 995);
    ctx.textAlign = 'left';

    // Footer Note
    ctx.fillStyle = '#64748B';
    ctx.font = '14px "Hind Siliguri", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(
      'দ্রষ্টব্য: আমাদের প্রতিনিধি দ্রুত আপনার TrxID যাচাই করে WhatsApp-এ ক্লাস লিংক পাঠিয়ে দেবেন।',
      width / 2,
      height - 52
    );
    ctx.textAlign = 'left';

    // Trigger PNG download
    const dataUrl = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = `Quran-Shikhi-Receipt-${data.receiptNo}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setDownloadedMsg(true);
    setTimeout(() => setDownloadedMsg(false), 3500);
  };

  const whatsappShareUrl = `https://wa.me/8801850172115?text=${encodeURIComponent(
    `*কুরআন শিখি একাডেমি - অফিসিয়াল ভর্তি মানি রিসিট*\n\n` +
      `• রসিদ নং: ${data.receiptNo}\n` +
      `• তারিখ: ${data.date}\n` +
      `• শিক্ষার্থীর নাম: ${data.childName} (${data.childAge})\n` +
      `• অভিভাবক: ${data.parentName} (${data.phone})\n` +
      `• কোর্সের নাম: ${data.courseTitle}\n` +
      `• নির্বাচিত প্ল্যান: ${data.selectedPlan}\n` +
      `• ক্লাসের সময়: ${data.preferredTime}\n` +
      `• ভর্তি ফি: ${data.admissionFee} টাকা\n` +
      `• পেমেন্ট মাধ্যম: ${data.paymentMethod}\n` +
      `• প্রাপক নম্বর: ${receiverNumber}\n` +
      `• প্রেরক নম্বর: ${data.senderPhone}\n` +
      `• TrxID: ${data.trxId}\n` +
      `• মোট পরিশোধিত টাকা: ${data.paidAmount} টাকা\n` +
      `• স্ট্যাটাস: পরিশোধিত (PAID)\n\n` +
      `অনুগ্রহ করে ভর্তি কনফার্ম করে ক্লাসের লিংক প্রদান করবেন।`
  )}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-4 sm:p-7 shadow-2xl relative max-h-[96vh] overflow-y-auto border-2 border-emerald-400">
        {/* Top Modal Controls Bar */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 print:hidden">
          <div className="flex items-center gap-2 text-emerald-800 font-black text-sm sm:text-base">
            <Sparkles className="w-5 h-5 text-amber-500" />
            <span>আলহামদুলিল্লাহ! আপনার অফিসিয়াল মানি রিসিট তৈরি হয়েছে</span>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-800 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* COLORFUL PRINTABLE RECEIPT CONTAINER */}
        <div
          id="admission-receipt-print"
          className="mt-4 rounded-3xl border-2 border-emerald-600 bg-white relative overflow-hidden shadow-lg"
        >
          {/* Rich Gradient Header Banner */}
          <div className="bg-gradient-to-r from-emerald-900 via-emerald-700 to-teal-800 text-white p-5 sm:p-6 border-b-4 border-amber-400">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
              <div className="flex items-center gap-3 bg-white/95 px-3.5 py-2 rounded-2xl shadow-md">
                <AcademyLogo size="sm" showSubtitle={true} />
              </div>

              <div className="text-center sm:text-right">
                <span className="inline-block bg-amber-400 text-slate-950 font-black text-xs px-3.5 py-1 rounded-full uppercase tracking-wider shadow-sm mb-1.5">
                  অফিসিয়াল কালারফুল মানি রিসিট
                </span>
                <div className="text-xs sm:text-sm text-amber-100 font-mono">
                  রসিদ নং: <b className="text-white text-sm sm:text-base">{data.receiptNo}</b>
                </div>
                <div className="text-xs text-emerald-100 mt-0.5">
                  তারিখ: {data.date}
                </div>
              </div>
            </div>
          </div>

          {/* Receipt Body */}
          <div className="p-4 sm:p-7 bg-gradient-to-b from-[#F0FDF4]/50 via-white to-amber-50/40 relative">
            {/* Subtle Watermark */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.04]">
              <span className="text-7xl sm:text-9xl font-black font-display text-emerald-900 select-none -rotate-12">
                PAID · কুরআন শিখি
              </span>
            </div>

            {/* Paid Status & Payment Brand Strip */}
            <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 bg-emerald-100/90 border border-emerald-400 rounded-2xl px-4 py-2.5 mb-4">
              <div className="flex items-center gap-2 text-emerald-950 font-black text-xs sm:text-sm">
                <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0" />
                <span>পেমেন্ট স্ট্যাটাস: পরিশোধিত (PAID)</span>
              </div>
              <div className="flex items-center gap-2 bg-white px-2.5 py-1 rounded-xl border border-emerald-200 shadow-xs">
                {data.paymentChannelKey === 'bkash' && <BkashLogo size="sm" />}
                {data.paymentChannelKey === 'nagad' && <NagadLogo size="sm" />}
                {data.paymentChannelKey === 'rocket' && <RocketLogo size="sm" />}
                <span className="text-[11px] font-bold text-slate-700">
                  {data.paymentMethod}
                </span>
              </div>
            </div>

            {/* Academy Contact Strip */}
            <div className="relative z-10 pb-3 mb-4 flex flex-wrap items-center justify-between gap-2 text-[11px] sm:text-xs text-slate-600 border-b border-slate-200">
              <span>প্রতিষ্ঠান: <b className="text-slate-900">মারকাযুল কুরআন একাডেমি (শিশু বিভাগ)</b></span>
              <span>ইমেইল: <b className="text-slate-900">quranshikhiacademy@gmail.com</b></span>
              <span>WhatsApp: <b className="text-emerald-800">+৮৮০ ১৮৫০-১৭২১১৫</b></span>
            </div>

            {/* Student & Guardian Info Grid */}
            <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-3.5 bg-white p-4 rounded-2xl border-2 border-emerald-100 shadow-xs">
              <div>
                <span className="text-[11px] font-bold text-emerald-700 uppercase block">শিক্ষার্থীর নাম ও বয়স</span>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-base sm:text-lg font-black text-slate-900">{data.childName}</span>
                  <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-md">
                    {data.childAge}
                  </span>
                </div>
              </div>
              <div>
                <span className="text-[11px] font-bold text-emerald-700 uppercase block">অভিভাবক ও মোবাইল</span>
                <div className="text-sm sm:text-base font-bold text-slate-900 mt-0.5">{data.parentName}</div>
                <div className="text-xs text-slate-600 font-mono font-bold">{data.phone}</div>
              </div>
            </div>

            {/* Course & Class Details */}
            <div className="relative z-10 mt-3.5 bg-amber-50/70 p-4 rounded-2xl border border-amber-200 space-y-2 text-xs sm:text-sm">
              <div className="flex justify-between gap-2 py-1 border-b border-amber-200/70">
                <span className="font-bold text-amber-900">ভর্তিকৃত কোর্স:</span>
                <span className="font-black text-slate-900 text-right">{data.courseTitle}</span>
              </div>
              <div className="flex justify-between gap-2 py-1 border-b border-amber-200/70">
                <span className="font-bold text-amber-900">নির্বাচিত প্ল্যান:</span>
                <span className="font-bold text-slate-800 text-right">{data.selectedPlan}</span>
              </div>
              <div className="flex justify-between gap-2 py-1 border-b border-amber-200/70">
                <span className="font-bold text-amber-900">ক্লাসের সময়সূচি:</span>
                <span className="font-bold text-slate-800 text-right">{data.preferredTime}</span>
              </div>
              <div className="flex justify-between gap-2 py-1">
                <span className="font-bold text-amber-900">শিক্ষক পছন্দ:</span>
                <span className="font-bold text-slate-800 text-right">{data.teacherPreference}</span>
              </div>
            </div>

            {/* Colorful Payment Breakdown Table */}
            <div className="relative z-10 mt-3.5 bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-50 p-4 rounded-2xl border-2 border-emerald-400">
              <div className="flex items-center justify-between font-black text-xs sm:text-sm text-emerald-950 pb-2 border-b border-emerald-300">
                <span>ফি-এর বিবরণ</span>
                <span>পরিমাণ</span>
              </div>
              <div className="flex justify-between text-xs sm:text-sm py-2 text-slate-800">
                <span className="font-semibold">এককালীন একাউন্ট ও ভর্তি ফি</span>
                <span className="font-bold font-mono">৳{data.admissionFee} টাকা</span>
              </div>
              <div className="flex justify-between items-center text-sm sm:text-base py-2 text-emerald-950 border-t-2 border-dashed border-emerald-300">
                <span className="font-black">মোট পরিশোধিত টাকা (Total Paid)</span>
                <span className="font-black font-mono text-white bg-emerald-700 px-3 py-1 rounded-xl text-base sm:text-lg shadow-xs">
                  ৳{data.paidAmount} টাকা
                </span>
              </div>
            </div>

            {/* Transaction Metadata Strip */}
            <div className="relative z-10 mt-3 p-3 bg-white rounded-xl border border-slate-200 text-xs flex flex-wrap items-center justify-between gap-2 font-mono">
              <div>
                <span className="text-slate-500">প্রাপক নম্বর: </span>
                <b className="text-slate-800">{receiverNumber}</b>
              </div>
              <div>
                <span className="text-slate-500">প্রেরক নম্বর: </span>
                <b className="text-slate-800">{data.senderPhone}</b>
              </div>
              <div>
                <span className="text-slate-500">TrxID: </span>
                <b className="text-emerald-950 bg-amber-200 px-2.5 py-0.5 rounded font-black border border-amber-300">
                  {data.trxId}
                </b>
              </div>
            </div>

            {/* Official Verification Seal & Signature */}
            <div className="relative z-10 mt-5 pt-4 border-t-2 border-emerald-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="border-2 border-emerald-600 bg-emerald-100/80 text-emerald-950 px-4 py-2 rounded-2xl flex items-center gap-2.5 shadow-xs">
                <ShieldCheck className="w-7 h-7 text-emerald-700 shrink-0" />
                <div>
                  <div className="text-xs font-black tracking-widest uppercase">
                    VERIFIED &amp; CONFIRMED
                  </div>
                  <div className="text-[11px] font-bold text-emerald-800">
                    ভর্তি ফি পরিশোধিত · আবেদন গৃহীত
                  </div>
                </div>
              </div>

              <div className="text-center sm:text-right">
                <div className="text-xs sm:text-sm font-serif italic text-emerald-950 border-b border-emerald-900/60 pb-1 px-4 inline-block font-bold">
                  কুরআন শিখি এডমিশন কন্ট্রোলার
                </div>
                <div className="text-[11px] text-slate-500 mt-1">
                  মারকাযুল কুরআন একাডেমি, ঢাকা
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Download feedback banner */}
        {downloadedMsg && (
          <div className="mt-3 p-2.5 bg-emerald-600 text-white text-xs sm:text-sm font-bold rounded-xl text-center flex items-center justify-center gap-2 animate-fadeIn print:hidden">
            <Check className="w-4 h-4" />
            <span>মানি রিসিটটি ছবি (PNG) হিসেবে আপনার ডিভাইসে ডাউনলোড হয়েছে!</span>
          </div>
        )}

        {/* Action Buttons (Download PNG, Print/PDF, WhatsApp Share, Close) */}
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-2.5 print:hidden">
          <button
            type="button"
            onClick={handleDownloadImage}
            className="py-3.5 px-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-sm flex items-center justify-center gap-2 cursor-pointer shadow-md transition-all active:scale-98"
          >
            <Download className="w-4 h-4" />
            <span>ছবি হিসেবে ডাউনলোড করুন (PNG)</span>
          </button>

          <button
            type="button"
            onClick={handlePrint}
            className="py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm flex items-center justify-center gap-2 cursor-pointer shadow-md transition-all active:scale-98"
          >
            <Printer className="w-4 h-4" />
            <span>প্রিন্ট / PDF সেভ করুন</span>
          </button>

          <a
            href={whatsappShareUrl}
            target="_blank"
            rel="noreferrer"
            className="py-3.5 px-4 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-900 font-extrabold text-sm border border-emerald-300 flex items-center justify-center gap-2 cursor-pointer transition-colors"
          >
            <Share2 className="w-4 h-4 text-emerald-700" />
            <span>হোয়াটসঅ্যাপে রসিদ পাঠান</span>
          </a>

          <button
            type="button"
            onClick={onClose}
            className="py-3.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm cursor-pointer transition-colors"
          >
            উইন্ডো বন্ধ করুন
          </button>
        </div>
      </div>
    </div>
  );
};
