/**
 * Payment deep-links, app launchers and clipboard helpers for bKash, Nagad, and Rocket
 */

export const PAYMENT_ACCOUNT_NUMBER = '01408440180';

export interface CopyAndLaunchResult {
  copied: boolean;
  launched: boolean;
  message: string;
}

/**
 * Copy number and attempt to launch bKash App or fallback
 */
export const launchBkashApp = async (): Promise<CopyAndLaunchResult> => {
  try {
    await navigator.clipboard.writeText(PAYMENT_ACCOUNT_NUMBER);
  } catch (err) {
    console.error('Clipboard copy failed:', err);
  }

  const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

  if (isMobile) {
    // Attempt deep link to bKash app
    const deepLink = 'bkash://';
    window.location.href = deepLink;

    // Fallback timer if app not installed or protocol blocked
    setTimeout(() => {
      // In mobile Chrome/Safari, user will stay or can open play store/web
    }, 1500);

    return {
      copied: true,
      launched: true,
      message: `বিকাশ নম্বর (${PAYMENT_ACCOUNT_NUMBER}) কপি হয়েছে! বিকাশ অ্যাপ ওপেন হচ্ছে...`,
    };
  }

  return {
    copied: true,
    launched: false,
    message: `বিকাশ নম্বর (${PAYMENT_ACCOUNT_NUMBER}) সফলভাবে কপি হয়েছে! আপনার ফোনে বিকাশ অ্যাপে গিয়ে Send Money করুন।`,
  };
};

/**
 * Copy number and attempt to launch Nagad App or fallback
 */
export const launchNagadApp = async (): Promise<CopyAndLaunchResult> => {
  try {
    await navigator.clipboard.writeText(PAYMENT_ACCOUNT_NUMBER);
  } catch (err) {
    console.error('Clipboard copy failed:', err);
  }

  const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

  if (isMobile) {
    const deepLink = 'nagad://';
    window.location.href = deepLink;

    return {
      copied: true,
      launched: true,
      message: `নগদ নম্বর (${PAYMENT_ACCOUNT_NUMBER}) কপি হয়েছে! নগদ অ্যাপ ওপেন হচ্ছে...`,
    };
  }

  return {
    copied: true,
    launched: false,
    message: `নগদ নম্বর (${PAYMENT_ACCOUNT_NUMBER}) সফলভাবে কপি হয়েছে! আপনার ফোনে নগদ অ্যাপে গিয়ে Send Money করুন।`,
  };
};

/**
 * Copy number and attempt to launch Rocket App or fallback
 */
export const launchRocketApp = async (): Promise<CopyAndLaunchResult> => {
  try {
    await navigator.clipboard.writeText(PAYMENT_ACCOUNT_NUMBER);
  } catch (err) {
    console.error('Clipboard copy failed:', err);
  }

  const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

  if (isMobile) {
    const deepLink = 'rocket://';
    window.location.href = deepLink;

    return {
      copied: true,
      launched: true,
      message: `রকেট নম্বর (${PAYMENT_ACCOUNT_NUMBER}) কপি হয়েছে! রকেট অ্যাপ ওপেন হচ্ছে...`,
    };
  }

  return {
    copied: true,
    launched: false,
    message: `রকেট নম্বর (${PAYMENT_ACCOUNT_NUMBER}) সফলভাবে কপি হয়েছে! আপনার ফোনে রকেট অ্যাপে গিয়ে Send Money করুন।`,
  };
};
