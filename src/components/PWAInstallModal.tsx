import React, { useState } from 'react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import {
  Download,
  X,
  Smartphone,
  Check,
  Share2,
  PlusSquare,
  Monitor,
  Sparkles,
  ExternalLink,
  Copy,
  Info,
} from 'lucide-react';

interface PWAInstallModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PWAInstallModal: React.FC<PWAInstallModalProps> = ({ isOpen, onClose }) => {
  const { isInstallable, isInstalled, isIOS, isInIframe, install } = usePWAInstall();
  const [justInstalled, setJustInstalled] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [guideHighlighted, setGuideHighlighted] = useState(false);

  if (!isOpen) return null;

  const appUrl = typeof window !== 'undefined' ? window.location.origin : '';

  const handleInstallClick = async () => {
    if (isInstallable) {
      const success = await install();
      if (success) {
        setJustInstalled(true);
        setTimeout(() => {
          onClose();
        }, 2500);
        return;
      }
    }
    setGuideHighlighted(true);
    setTimeout(() => setGuideHighlighted(false), 1800);
  };

  const handleCopyLink = async () => {
    if (!appUrl) return;
    try {
      await navigator.clipboard.writeText(appUrl);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    } catch {
      setCopiedLink(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative border-2 border-emerald-200 overflow-hidden my-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-800 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
          aria-label="বন্ধ করুন"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header with App Logo */}
        <div className="text-center pt-2 pb-4">
          <div className="mx-auto w-20 h-20 rounded-2xl overflow-hidden shadow-md border-2 border-emerald-300 mb-3 bg-white p-1 flex items-center justify-center">
            <img
              src="/pwa-192x192.png"
              alt="কুরআন শিখি অ্যাপ"
              className="w-full h-full object-cover rounded-xl"
            />
          </div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full mb-2">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>অফিসিয়াল ওয়েব অ্যাপ (PWA)</span>
          </div>
          <h3 className="text-2xl font-black text-slate-900 font-display">
            কুরআন শিখি মোবাইল ও ডেস্কটপ অ্যাপ
          </h3>
          <p className="text-sm text-slate-600 mt-1">
            প্লে-স্টোর বা অ্যাপ স্টোরে না গিয়ে সরাসরি আপনার ডিভাইসে ইনস্টল করুন!
          </p>
        </div>

        {/* Status: Already installed */}
        {isInstalled || justInstalled ? (
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 text-center my-4">
            <div className="w-12 h-12 bg-emerald-600 text-white rounded-full flex items-center justify-center mx-auto mb-2 shadow-sm">
              <Check className="w-6 h-6 stroke-[3]" />
            </div>
            <h4 className="text-lg font-bold text-emerald-900">
              অ্যাপটি আপনার ডিভাইসে সফলভাবে ইনস্টল করা আছে!
            </h4>
            <p className="text-sm text-emerald-700 mt-1">
              আপনার ফোনের হোম স্ক্রিন বা অ্যাপ ড্রয়ারে &quot;কুরআন শিখি&quot; আইকন থেকে সরাসরি ওপেন করতে পারেন।
            </p>
          </div>
        ) : (
          <div className="space-y-4 my-3">
            {/* Primary Action Section — NEVER hidden */}
            {isInstallable ? (
              <button
                onClick={handleInstallClick}
                className="w-full py-4 px-6 text-base sm:text-lg font-black text-white bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] rounded-2xl shadow-xl flex items-center justify-center gap-3 transition-all cursor-pointer"
              >
                <Download className="w-6 h-6 shrink-0" />
                <span>সরাসরি অ্যাপস ডাউনলোড ও ইনস্টল করুন</span>
              </button>
            ) : isInIframe ? (
              <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-4 space-y-3">
                <div className="flex items-start gap-2.5 text-xs sm:text-sm text-amber-950">
                  <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <p className="leading-relaxed">
                    <span className="font-extrabold block mb-0.5">
                      প্রিভিউ মোডে ডাউনলোড সীমাবদ্ধ:
                    </span>
                    ব্রাউজার নিরাপত্তার কারণে প্রিভিউ ফ্রেমের ভেতর থেকে সরাসরি অ্যাপ ইনস্টল পপ-আপ আসে না। নিচের বাটনে চাপ দিয়ে মূল ব্রাউজারে খুললেই সরাসরি ডাউনলোড করতে পারবেন।
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-2.5">
                  <a
                    href={appUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 py-3.5 px-4 text-sm sm:text-base font-black text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-md flex items-center justify-center gap-2 transition-all"
                  >
                    <ExternalLink className="w-5 h-5 shrink-0" />
                    <span>মূল ব্রাউজারে ওপেন করে ইনস্টল করুন</span>
                  </a>
                  <button
                    type="button"
                    onClick={handleCopyLink}
                    className="py-3.5 px-4 text-xs sm:text-sm font-bold text-emerald-900 bg-white hover:bg-emerald-50 border border-emerald-300 rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer shrink-0"
                  >
                    {copiedLink ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-600" />
                        <span>লিংক কপি হয়েছে!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 text-emerald-700" />
                        <span>লিংক কপি করুন</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-2.5">
                <button
                  type="button"
                  onClick={handleInstallClick}
                  className="w-full py-3.5 px-5 text-base font-black text-white bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] rounded-2xl shadow-lg flex items-center justify-center gap-2.5 transition-all cursor-pointer"
                >
                  <Download className="w-5 h-5 shrink-0" />
                  <span>
                    {isIOS
                      ? 'iPhone / iPad-এ ইনস্টল পদ্ধতি দেখুন'
                      : 'অ্যাপ ইনস্টল করতে নিচের ধাপ অনুসরণ করুন'}
                  </span>
                </button>
                <div className="flex items-center justify-between gap-2 bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-600">
                  <span>অন্য ব্রাউজার (যেমন Google Chrome) দিয়ে খুলতে চাইলে লিংক কপি করুন:</span>
                  <button
                    type="button"
                    onClick={handleCopyLink}
                    className="font-bold text-emerald-700 hover:text-emerald-800 inline-flex items-center gap-1 shrink-0 cursor-pointer"
                  >
                    {copiedLink ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>কপি হয়েছে</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>লিংক কপি</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* Guided Instructions for Devices */}
            <div
              className={`bg-[#F8FAF9] rounded-2xl p-4 border text-left space-y-3 transition-all ${
                guideHighlighted
                  ? 'border-emerald-500 ring-2 ring-emerald-400/50 bg-emerald-50/40'
                  : 'border-slate-200'
              }`}
            >
              <h4 className="text-sm font-extrabold text-slate-800 flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-emerald-600" />
                <span>কীভাবে ফোনে বা কম্পিউটারে ডাউনলোড করবেন:</span>
              </h4>

              {isIOS ? (
                /* iOS Specific Guide */
                <div className="text-xs sm:text-sm text-slate-700 space-y-2 bg-white p-3.5 rounded-xl border border-slate-200">
                  <div className="font-bold text-emerald-800 flex items-center gap-1.5">
                    <Share2 className="w-4 h-4 text-emerald-600" />
                    <span>iPhone / iPad (Safari) ব্যবহারকারীদের জন্য:</span>
                  </div>
                  <ol className="list-decimal list-inside space-y-1.5 text-slate-600">
                    <li>
                      সাফারি ব্রাউজারের নিচে থাকা <span className="font-bold text-slate-900">Share (শেয়ার)</span> বাটনে চাপুন।
                    </li>
                    <li className="flex items-center gap-1 flex-wrap">
                      <span>মেনু থেকে নিচে গিয়ে</span>
                      <span className="font-bold text-emerald-700 inline-flex items-center gap-1">
                        <PlusSquare className="w-3.5 h-3.5" /> Add to Home Screen
                      </span>
                      <span>নির্বাচন করুন।</span>
                    </li>
                    <li>
                      উপরে <span className="font-bold text-emerald-700">&quot;Add&quot;</span> চাপলেই ফোনের হোম স্ক্রিনে অ্যাপ চলে আসবে।
                    </li>
                  </ol>
                </div>
              ) : (
                /* Android & Chrome/Desktop Guide */
                <div className="space-y-2.5 text-xs sm:text-sm text-slate-700">
                  <div className="bg-white p-3 rounded-xl border border-slate-200">
                    <span className="font-bold text-emerald-800 block mb-1">
                      ১. অ্যান্ড্রয়েড ফোন (Google Chrome):
                    </span>
                    <p className="text-slate-600">
                      ব্রাউজারের উপরের ডানপাশের <span className="font-bold text-slate-900">থ্রি-ডট (⋮)</span> মেনুতে চাপুন → <span className="font-bold text-emerald-700">&quot;Install app&quot;</span> অথবা <span className="font-bold text-emerald-700">&quot;Add to Home screen&quot;</span> এ চাপুন।
                    </p>
                  </div>

                  <div className="bg-white p-3 rounded-xl border border-slate-200">
                    <span className="font-bold text-emerald-800 block mb-1 flex items-center gap-1">
                      <Monitor className="w-3.5 h-3.5" />
                      <span>২. কম্পিউটার বা ল্যাপটপ (Chrome/Edge):</span>
                    </span>
                    <p className="text-slate-600">
                      ব্রাউজারের অ্যাড্রেস বারের ডানপাশে থাকা <span className="font-bold text-emerald-700">&quot;Install App&quot; আইকন</span>-এ ক্লিক করুন অথবা মেনু থেকে Install নির্বাচন করুন।
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* App Features List */}
            <div className="grid grid-cols-2 gap-2 text-xs text-slate-600 pt-1">
              <div className="flex items-center gap-1.5 bg-emerald-50/60 p-2 rounded-xl text-emerald-900 font-semibold">
                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>কোনো মেমরি খরচ নেই</span>
              </div>
              <div className="flex items-center gap-1.5 bg-emerald-50/60 p-2 rounded-xl text-emerald-900 font-semibold">
                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>সুপার ফাস্ট স্পিড</span>
              </div>
              <div className="flex items-center gap-1.5 bg-emerald-50/60 p-2 rounded-xl text-emerald-900 font-semibold">
                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>হরফ অডিও ও দু&apos;আ</span>
              </div>
              <div className="flex items-center gap-1.5 bg-emerald-50/60 p-2 rounded-xl text-emerald-900 font-semibold">
                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>হোম স্ক্রিন থেকে ১-ক্লিক</span>
              </div>
            </div>
          </div>
        )}

        {/* Footer Close */}
        <div className="pt-2 text-center">
          <button
            onClick={onClose}
            className="text-xs sm:text-sm font-bold text-slate-500 hover:text-slate-800 cursor-pointer"
          >
            পরে ইনস্টল করব (বন্ধ করুন)
          </button>
        </div>
      </div>
    </div>
  );
};
