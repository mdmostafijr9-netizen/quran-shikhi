export interface DuaItem {
  id: string;
  category: string;
  titleBn: string;
  arabic: string;
  transliterationBn: string;
  meaningBn: string;
  benefitBn: string;
  audioKeyword: string;
  audioFile: string;
}

export const KIDS_DUAS: DuaItem[] = [
  {
    id: 'before-eating',
    category: 'দৈনন্দিন আদব',
    titleBn: 'খাবার শুরুর দু’আ',
    arabic: 'بِسْمِ اللَّهِ وَعَلَى بَرَكَةِ اللَّهِ',
    transliterationBn: 'বিসমিল্লাহি ওয়া আলা বারাকাতিল্লাহ',
    meaningBn: 'আল্লাহর নামে এবং আল্লাহর বরকতের ওপর ভরসা করে খাওয়া শুরু করছি।',
    benefitBn: 'খাবারে আল্লাহর বরকত নাযিল হয় এবং শয়তান খাবারের কোনো অংশ নিতে পারে না।',
    audioKeyword: 'Bismillahi wa ala barakatillah',
    audioFile: '/audio/duas/before-eating.mp3'
  },
  {
    id: 'after-eating',
    category: 'দৈনন্দিন আদব',
    titleBn: 'খাবার শেষ করার দু’আ',
    arabic: 'الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنَا وَسَقَانَا وَجَعَلَنَا مُسْلِمِينَ',
    transliterationBn: 'আলহামদু লিল্লাহিল্লাযী আত’আমানা ওয়া সাক্বানা ওয়া জা’আলানা মুসলিমীন',
    meaningBn: 'সমস্ত প্রশংসা সেই মহান আল্লাহর জন্য যিনি আমাদের খাওয়ালেন, পান করালেন এবং মুসলিম বানালেন।',
    benefitBn: 'আল্লাহ তায়ালা খাবার গ্রহণকারী বান্দার প্রতি অত্যন্ত সন্তুষ্ট হন এবং গুনাহ ক্ষমা করেন।',
    audioKeyword: 'Alhamdu lillahillazi atamana wa saqana',
    audioFile: '/audio/duas/after-eating.mp3'
  },
  {
    id: 'before-sleeping',
    category: 'ঘুমের শিষ্টাচার',
    titleBn: 'ঘুমানোর আগের দু’আ',
    arabic: 'اللَّهُمَّ بِاسْمِكَ أَمُوتُ وَأَحْيَا',
    transliterationBn: 'আল্লাহুম্মা বিসমিকা আমূতু ওয়া আহ্ইয়া',
    meaningBn: 'হে আল্লাহ! আপনারই পবিত্র নামে আমি মৃত্যুবরণ (ঘুমাই) করছি এবং জীবিত (জাগ্রত) হবো।',
    benefitBn: 'সারা রাত আল্লাহর বিশেষ নিরাপত্তায় থাকা যায় এবং দুঃস্বপ্ন ও ভীতি দূর হয়।',
    audioKeyword: 'Allahumma bismika amootu wa ahya',
    audioFile: '/audio/duas/before-sleeping.mp3'
  },
  {
    id: 'waking-up',
    category: 'ঘুমের শিষ্টাচার',
    titleBn: 'ঘুম থেকে ওঠার দু’আ',
    arabic: 'الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ',
    transliterationBn: 'আলহামদু লিল্লাহিল্লাযী আহ্ইয়ানা বা’দা মা আমাতানা ওয়া ইলাইহিন নুশূর',
    meaningBn: 'সমস্ত প্রশংসা সেই আল্লাহর জন্য যিনি মৃত্যুর পর আমাদের নতুন জীবন দিলেন এবং তাঁর কাছেই ফিরে যেতে হবে।',
    benefitBn: 'নতুন দিনটি আল্লাহর আন্তরিক কৃতজ্ঞতা ও প্রফুল্ল হৃদয়ে শুরু হয়।',
    audioKeyword: 'Alhamdu lillahillazi ahyana baada ma amatana',
    audioFile: '/audio/duas/waking-up.mp3'
  },
  {
    id: 'study-increase-knowledge',
    category: 'পড়াশোনার দু’আ',
    titleBn: 'ইলম ও স্মৃতিশক্তি বৃদ্ধির দু’আ',
    arabic: 'رَبِّ زِدْنِي عِلْمًا',
    transliterationBn: 'রব্বি যিদনী ‘ইলমা',
    meaningBn: 'হে আমার প্রতিপালক! আপনি আমার জ্ঞান, মেধা ও স্মরণশক্তি বৃদ্ধি করে দিন। (সূরা ত্বা-হা: ১১৪)',
    benefitBn: 'কুরআন ও যেকোনো পড়াশোনায় মনোযোগ ও ধারণক্ষমতা বহু গুণ বৃদ্ধি পায়।',
    audioKeyword: 'Rabbi zidni ilma',
    audioFile: '/audio/duas/study-increase-knowledge.mp3'
  },
  {
    id: 'for-parents',
    category: 'পিতা-মাতার সম্মান',
    titleBn: 'পিতা-মাতার জন্য মমতাময় দু’আ',
    arabic: 'رَبِّ ارْحَمْهُمَا كَمَا رَبَّيَانِي صَغِيرًا',
    transliterationBn: 'রব্বির হামহুমা কামা রব্বায়ানী সগীরা',
    meaningBn: 'হে আমার রব! আমার পিতা-মাতার ওপর তেমনি দয়া করুন, যেমন করে শৈশবে তারা আমাকে পরম যত্নে লালন-পালন করেছেন। (সূরা বনী ইসরাঈল: ২৪)',
    benefitBn: 'সন্তান পিতা-মাতার জন্য দু’আ করলে তাঁদের সম্মান ও আখিরাতের মর্যাদা বৃদ্ধি পায়।',
    audioKeyword: 'Rabbir hamhuma kama rabbayani sagheera',
    audioFile: '/audio/duas/for-parents.mp3'
  },
  {
    id: 'entering-home',
    category: 'দৈনন্দিন শিষ্টাচার',
    titleBn: 'ঘরে প্রবেশের দু’আ',
    arabic: 'بِسْمِ اللَّهِ وَلَجْنَا وَبِسْمِ اللَّهِ خَرَجْنَا وَعَلَى رَبِّنَا تَوَكَّلْنَا',
    transliterationBn: 'বিসমিল্লাহি ওয়ালাজনা, ওয়া বিসমিল্লাহি খারাজনা, ওয়া ‘আলা রব্বিনা তাওয়াক্কালনা',
    meaningBn: 'আল্লাহর নামে আমরা প্রবেশ করলাম, আল্লাহর নামেই বের হলাম এবং আমাদের রবের ওপরই ভরসা করলাম।',
    benefitBn: 'ঘরে শান্তি, সম্প্রীতি ও বরকত বৃদ্ধি পায় এবং শয়তানের অনিষ্ট থেকে পরিবার মুক্ত থাকে।',
    audioKeyword: 'Bismillahi walajna wa bismillahi kharajna',
    audioFile: '/audio/duas/entering-home.mp3'
  },
  {
    id: 'leaving-home',
    category: 'দৈনন্দিন শিষ্টাচার',
    titleBn: 'ঘর থেকে বের হওয়ার দু’আ',
    arabic: 'بِسْمِ اللَّهِ تَوَكَّلْتُ عَلَى اللَّهِ لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ',
    transliterationBn: 'বিসমিল্লাহি তাওয়াক্কালতু ‘আলাল্লাহি, লা হাওলা ওয়ালা কুওয়াতা ইল্লা বিল্লাহ',
    meaningBn: 'আল্লাহর নামে বের হচ্ছি, আল্লাহর ওপরই ভরসা করলাম। আল্লাহর সাহায্য ছাড়া কোনো শক্তি নেই।',
    benefitBn: 'পথের যাবতীয় বিপদাপদ, দুর্ঘটনা ও অনিষ্ট থেকে আল্লাহ হেফাজত করেন।',
    audioKeyword: 'Bismillahi tawakkaltu alallah',
    audioFile: '/audio/duas/leaving-home.mp3'
  },
  {
    id: 'after-sneezing',
    category: 'দৈনন্দিন শিষ্টাচার',
    titleBn: 'হাঁচি দেওয়ার পর দু’আ',
    arabic: 'الْحَمْدُ لِلَّهِ، يَرْحَمُكَ اللَّهُ',
    transliterationBn: 'আলহামদু লিল্লাহ (উত্তরে অপরজন বলবে: ইয়ারহামুকাল্লাহ)',
    meaningBn: 'সমস্ত প্রশংসা আল্লাহর জন্য। (আল্লাহ আপনার ওপর রহমত বর্ষণ করুন)।',
    benefitBn: 'আল্লাহর প্রিয় সুন্নত আদায়ের মাধ্যমে পরস্পরের মধ্যে সৌহার্দ্য ও আল্লাহর রহমত লাভ হয়।',
    audioKeyword: 'Alhamdulillah yarhamukallah',
    audioFile: '/audio/duas/after-sneezing.mp3'
  },
  {
    id: 'entering-mosque',
    category: 'মসজিদের আদব',
    titleBn: 'মসজিদে প্রবেশের দু’আ',
    arabic: 'اللَّهُمَّ افْتَحْ لِي أَبْوَابَ رَحْمَتِكَ',
    transliterationBn: 'আল্লাহুম্মাফ তাহলী আবওয়াবা রহমাতিক',
    meaningBn: 'হে আল্লাহ! আপনি আমার জন্য আপনার রহমতের সকল দরজা খুলে দিন।',
    benefitBn: 'মসজিদে প্রবেশের সাথে সাথে আল্লাহর বিশেষ রহমত ও ইবাদতের তাওফিক লাভ হয়।',
    audioKeyword: 'Allahummaf tahli abwaba rahmatik',
    audioFile: '/audio/duas/entering-mosque.mp3'
  },
  {
    id: 'kalima-tayyibah',
    category: 'মৌলিক কালিমা',
    titleBn: 'কালিমা তাইয়্যিবাহ',
    arabic: 'لَا إِلٰهَ إِلَّا اللَّهُ مُحَمَّدٌ رَسُولُ اللَّهِ',
    transliterationBn: 'লা ইলাহা ইল্লাল্লাহু মুহাম্মাদুর রাসুলুল্লাহ',
    meaningBn: 'আল্লাহ ছাড়া কোনো উপাস্য নেই, হযরত মুহাম্মদ (সা.) আল্লাহর প্রেরিত রাসুল।',
    benefitBn: 'ইসলামের মূল ভিত্তি ও জান্নাতের শ্রেষ্ঠ চাবি।',
    audioKeyword: 'La ilaha illallah Muhammadur Rasulullah',
    audioFile: '/audio/duas/kalima-tayyibah.mp3'
  },
  {
    id: 'kalima-shahadat',
    category: 'মৌলিক কালিমা',
    titleBn: 'কালিমা শাহাদাত',
    arabic: 'أَشْهَدُ أَنْ لَا إِلٰهَ إِلَّا اللَّهُ وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ',
    transliterationBn: 'আশহাদু আল্লা ইলাহা ইল্লাল্লাহু ওয়া আশহাদু আন্না মুহাম্মাদান ‘আবদুহু ওয়া রাসুলুহু',
    meaningBn: 'আমি সাক্ষ্য দিচ্ছি যে, আল্লাহ ছাড়া কোনো উপাস্য নেই এবং আরও সাক্ষ্য দিচ্ছি যে, মুহাম্মদ (সা.) তাঁর বান্দা ও রাসুল।',
    benefitBn: 'প্রতিদিন কালিমা শাহাদাত পাঠকারীর ঈমান মজবুত হয় এবং গুনাহসমূহ মাফ হয়।',
    audioKeyword: 'Ashhadu an la ilaha illallah',
    audioFile: '/audio/duas/kalima-shahadat.mp3'
  }
];
