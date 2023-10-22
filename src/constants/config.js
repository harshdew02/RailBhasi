// Language Key-Text Mapping

const SPEECH_TO_TEXT = {
  bn: "Bangla",
  en: "English",
  gu: "Gujarati",
  hi: "Hindi",
  kn: "Kannada",
  ml: "Malayalam",
  mr: "Marathi",
  or: "Oriya",
  pa: "Panjabi",
  sa: "Sanskrit",
  ta: "Tamil",
  te: "Telugu",
  ur: "Urdu",
};

const TEXT_TO_SPEECH = {
  as: "Assamese",
  bn: "Bangla",
  brx: "Boro",
  en: "English",
  gu: "Gujarati",
  hi: "Hindi",
  kn: "Kannada",
  ml: "Malayalam",
  mni: "Manipuri (Meitei)",
  mni_Beng: "Manipuri (Bengali)",
  mr: "Marathi",
  or: "Oriya",
  pa: "Panjabi",
  raj: "Rajasthani",
  ta: "Tamil",
  te: "Telugu",
};

const TRANSLATION = {
  as: "অসমীয়া (Assamese)",
  bn: "বাংলা (Bangla)",
  brx: "बर (Boro)",
  doi: "डोगरी (Dogri)",
  en: "English",
  gom: "गोंय (Goan-Konkani)",
  gu: "ગુજરાતી (Gujarati)",
  hi: "हिंदी (Hindi)",
  kn: "ಕನ್ನಡ (Kannada)",
  ks: "کاشمیری (Kashmiri (Arabic))",
  ks_Deva: "कश्मीरी (Kashmiri (Devanagari))",
  mai: "मैथिली (Maithili)",
  ml: "മലയാളം (Malayalam)",
  mni: "ꯃꯅꯤꯄꯨꯔꯤ (Manipuri (Meitei))",
  mni_Beng: "মনিপুরী (Manipuri (Bengali))",
  mr: "मराठी (Marathi)",
  ne: "नेपाली (Nepali)",
  or: "ଓରିଆ (Oriya)",
  pa: "ਪੰਜਾਬੀ (Panjabi)",
  sa: "संस्कृतं (Sanskrit)",
  sat: "ᱥᱚᱱᱛᱟᱞᱤ ᱾ (Santali)",
  sd: "سنڌی (Sindhi (Arabic))",
  sd_Deva: "सिंधी (Sindhi (Devanagari))",
  ta: "தமிழ் (Tamil)",
  te: "తెలుగు (Telugu)",
  ur: "اردو (Urdu)",
};

const TYPE_SELECTION = (api_time, late, origin, station) => {
  //calculation part here
  let computed_time;
  let time = computed_time - api_time;

  if (origin == station) return "origination";

  if (time <= 5) {
    return "arrived";
  } else if (time > 5 && time <= 25) {
    return "arriving";
  } else if (time > 25) {
    if (late > 0) return "late";
    else return "ontime";
  } else {
    if (late > 0) return "custom";
    else return "custom_ontime";
  }
};

const LANGUAGE_SELECTION = (code) => {
  let index = -1;
  switch (code) {
    case "en":
      index = 1;
      break;
    case "hi":
      index = 0;
      break;
    case "as":
      index = 2;
      break;
    case "bn":
      index = 3;
      break;
    case "brx":
      index = 4;
      break;
    case "doi":
      index = 5;
      break;
    case "gom":
      index = 6;
      break;
    case "gu":
      index = 7;
      break;
    case "kn":
      index = 8;
      break;
    case "ks":
      index = 9;
      break;
    case "ks_Deva":
      index = 10;
      break;
    case "mai":
      index = 11;
      break;
    case "ml":
      index = 12;
      break;
    case "mni":
      index = 13;
      break;
    case "mni_Beng":
      index = 14;
      break;
    case "mr":
      index = 15;
      break;
    case "ne":
      index = 16;
      break;
    case "or":
      index = 17;
      break;
    case "pa":
      index = 18;
      break;
    case "sa":
      index = 19;
      break;
    case "sat":
      index = 20;
      break;
    case "sd":
      index = 21;
      break;
    case "sd_Deva":
      index = 22;
      break;
    case "ta":
      index = 23;
      break;
    case "te":
      index = 24;
      break;
    case "ur":
      index = 25;
      break;
    default:
      index = 1;
      break;
  }
  return index;
};

const PREDEFINED_ANNOUNCEMENT = [
  {
    origination:
      "यात्रीगण कृप्या ध्यान दीजिए, गाड़ी संख्या (train_no), (origin) से चलकर (destination) को जाने वाली, (train_name) कुछ ही देर मे प्लेटफॉर्म संख्या (PF) से चलने वाली है | ",
    arriving:
      "यात्रीगण कृप्या ध्यान दीजिए, गाड़ी संख्या (train_no), (origin) से चलकर (destination) को जाने वाली, (train_name) कुछ ही देर मे प्लेटफॉर्म संख्या (PF) पर आ रही है |",
    arrived:
      "यात्रीगण कृप्या ध्यान दीजिए, गाड़ी संख्या (train_no), (origin) से चलकर (destination) को जाने वाली, (train_name) प्लेटफॉर्म संख्या (PF) पर खड़ी है| ",
    late: "यात्रीगण कृप्या ध्यान दीजिए, गाड़ी संख्या (train_no), (origin) से चलकर (destination) को जाने वाली, (train_name) अपने निर्धारित समय से (ghante) घंटे और (mintu) मिनट की देरी से चल रह है, इसके यहा (intime) बजे, प्लेटफॉर्म क्रमांक (PF) पर, आने की संभावना है|  ",
    ontime:
      "यात्रीगण कृप्या ध्यान दीजिए, गाड़ी संख्या (train_no), (origin) से चलकर (destination) को जाने वाली, (train_name) अपने निर्धारित समय से चल रही है, इसके यहा (intime) बजे, प्लेटफॉर्म क्रमांक (PF) पर, आने की संभावना है| ",
    additional:
      "यह ट्रेन (intime) पर आएगी और (stop) मिनट के बाद (outtime) पर प्रस्थान करेगी|",
    custom:
      "ट्रेन संख्या (train_no) (train_name) (ghante) घंटे और (mintu) मिनट की देरी से चल रही है । यह (next_station) पर प्लेटफार्म संख्या (PF) पर (intime) बजे पहुंचेगी और यहाँ (stop) मिनट के लिए ठहरेगी",
    custom_ontime:
      "ट्रेन संख्या (train_no) (train_name) अपने निर्धारित समय से चल रही है । यह (next_station) पर प्लेटफार्म संख्या (PF) पर (intime) बजे पहुंचेगी और यहाँ (stop) मिनट के लिए ठहरेगी",
    word_arr: "आगमन",
    word_dep: "प्रस्थान",
    word_stop: "रुकिए",
    word_no: "गाड़ी संख्या",
  },
  {
    origination:
      "May I have your attention please, train number (train_no) from (origin) to (destination), (train_name) is about to depart from platform number (PF).",
    arriving:
      "May I have your attention please, train number (train_no) from (origin) to (destination), (train_name) is arriving on platform number (PF) shortly.",
    arrived:
      "May I have your attention please, train number (train_no) from (origin) to (destination), (train_name) just arrived on platform number (PF).",
    late: "May I have your attention please, train number (train_no) from (origin) to (destination), (train_name), is running late by (ghante) hours and (mintu) minutes from its scheduled time, and is expected to arrive at (intime) on platform number (PF). ",
    ontime:
      "May I have your attention please, train number (train_no) from (origin) to (destination), (train_name), is running as scheduled, this train will reach platform number (PF) at its scheduled time at (intime).",
    additional:
      "This train will arrive on (intime) and will depart after (stop) minutes at (outtime).",
    custom:
      "Train number (train_no), the (train_name), is currently delayed by (ghante) hour and (mintu) minutes. It is expected to arrive at (next_station) on platform number (PF) at (intime) with a (stop) minutes scheduled halt.",
    custom_ontime:
      "Train number (train_no), the (train_name), is running on time. It is expected to arrive at (next_station) on platform number (PF) at (intime) with a (stop) minutes scheduled halt.",
    word_arr: "Arrival",
    word_dep: "Departure",
    word_stop: "Stop",
    word_no: "Train no.",
  },
  {
    additional:
      "এই ট্ৰেইনখন (intime) ত আহিব আৰু (outtime) ত (stop) মিনিটৰ পিছত প্রস্থান কৰিব।",
    arrived:
      "অনুগ্ৰহ কৰি মই আপোনাৰ দৃষ্টি আকৰ্ষণ কৰিব পাৰোঁ, (origin) ৰ পৰা (destination) লৈ যোৱা ৰে 'ল নম্বৰ (train_no), (train_name) এইমাত্ৰ প্লেটফৰ্ম নম্বৰত (PF) উপস্থিত হৈছে।",
    arriving:
      "অনুগ্ৰহ কৰি মই আপোনালোকৰ দৃষ্টি আকৰ্ষণ কৰিব পাৰোঁ, (origin) ৰ পৰা (destination) লৈ যোৱা ৰে 'ল নম্বৰ (train_no), (train_name) অতি সোনকালেই প্লেটফৰ্ম নম্বৰ (PF) ত আহিব।",
    code: "as",
    custom: "ট্ৰেইন নম্বৰ (train_no), (train_name), বৰ্তমান (ghante) ঘণ্টা আৰু (mintu) মিনিট পলম হৈছে। ই প্লেটফৰ্ম নম্বৰত (PF) ত (intime) (stop) মিনিটৰ নিৰ্ধাৰিত অৱস্থানৰ সৈতে (next_station) ত উপনীত হ 'ব বুলি আশা কৰা হৈছে।"
      ,
    custom_ontime:"ট্ৰেইন নম্বৰ (train_no), (train_name), সময়মতে চলি আছে। ই প্লেটফৰ্ম নম্বৰত (PF) ত (intime) (stop) মিনিটৰ নিৰ্ধাৰিত অৱস্থানৰ সৈতে (next_station) ত উপনীত হ 'ব বুলি আশা কৰা হৈছে।",
    late: "অনুগ্ৰহ কৰি মই আপোনাৰ দৃষ্টি আকৰ্ষণ কৰিব পাৰোঁনে, (origin) ৰ পৰা (destination), (train_name) লৈ যোৱা ৰে 'ল নম্বৰ (train_no), নিৰ্ধাৰিত সময়ৰ পৰা (ghante) ঘণ্টা আৰু (mintu) মিনিট পলমকৈ চলি আছে, আৰু প্লেটফৰ্ম নম্বৰ (PF) ত (intime) পোৱাৰ আশা কৰা হৈছে।",
    ontime:
      "অনুগ্ৰহ কৰি মই আপোনালোকৰ দৃষ্টি আকৰ্ষণ কৰিব পাৰোঁনে, (origin) ৰ পৰা (destination) (train_name) লৈ যোৱা ৰে 'ল নম্বৰ (train_no), সময়সূচী অনুসৰি চলি আছে, এই ৰে' লখনে ইয়াৰ নিৰ্ধাৰিত সময়ত (intime) প্লেটফৰ্ম নম্বৰ (PF) ত উপনীত হ 'ব।",
    origination:
      "অনুগ্ৰহ কৰি মই আপোনালোকৰ দৃষ্টি আকৰ্ষণ কৰিব পাৰোঁ, ট্ৰেইন নম্বৰ (train_no) (origin) ৰ পৰা (destination), (train_name) প্লেটফৰ্ম নম্বৰ (PF) ৰ পৰা প্ৰস্থান কৰিবলৈ গৈ আছে।",
    word_arr: "আগমন",
    word_dep: "প্ৰস্থান",
    word_stop: "ৰাখক",
    word_no: "ট্ৰেইনৰ নম্বৰ",
  },
  {
    additional:
      "এই ট্রেনটি (intime)-এ পৌঁছবে এবং (outtime)-এ (stop) মিনিট পর ছেড়ে যাবে।",
    arrived:
      "দয়া করে আপনার দৃষ্টি আকর্ষণ করছি, (origin) থেকে (destination) যাওয়ার ট্রেন নম্বর (train_no), (train_name) সবেমাত্র প্ল্যাটফর্ম নম্বর (PF)-এ এসেছে।",
    arriving:
      "দয়া করে আপনার দৃষ্টি আকর্ষণ করি, (origin) থেকে (destination) যাওয়ার ট্রেন নম্বর (train_no), (train_name) শীঘ্রই প্ল্যাটফর্ম নম্বর (PF)-এ আসছে।",
    code: "bn",
    custom:
      "ট্রেন নম্বর (train_no), (train_name), বর্তমানে (ghante) ঘন্টা এবং (mintu) মিনিট বিলম্বিত হচ্ছে। এটি (stop) মিনিটের নির্ধারিত বিরতি সহ (PF) নম্বর প্ল্যাটফর্মে (intime) (next_station) এ পৌঁছবে বলে আশা করা হচ্ছে।",
    custom_ontime:"ট্রেন নম্বর (train_no), (train_name), সময়মতো চলছে। এটি (stop) মিনিটের নির্ধারিত বিরতি সহ (PF) নম্বর প্ল্যাটফর্মে (intime) (next_station) এ পৌঁছবে বলে আশা করা হচ্ছে।",
    late: "দয়া করে আপনার দৃষ্টি আকর্ষণ করি, (origin) থেকে (destination) যাওয়ার ট্রেন নম্বর (train_no), (train_name) নির্ধারিত সময় থেকে (ghante) ঘন্টা (mintu) মিনিট দেরি করছে, এবং প্ল্যাটফর্ম নম্বর (PF)-এ (intime) পৌঁছবে বলে আশা করা হচ্ছে।",
    ontime:
      "আমি কি দয়া করে আপনাদের দৃষ্টি আকর্ষণ করতে পারি, ট্রেন নম্বর (train_no) (origin) থেকে (destination), (train_name), নির্ধারিত সময়সূচী অনুযায়ী চলছে, এই ট্রেনটি তার নির্ধারিত সময়ে (intime) প্ল্যাটফর্ম নম্বর (PF) এ পৌঁছাবে।",
    origination:
      "দয়া করে আপনার দৃষ্টি আকর্ষণ করি, (origin) থেকে (destination) যাওয়ার ট্রেন নম্বর (train_no), (train_name) প্ল্যাটফর্ম নম্বর (PF) থেকে ছাড়তে চলেছে।",
    word_arr: "আগমন",
    word_dep: "প্রস্থান",
    word_stop: "থামুন",
    word_no: "ট্রেনের নম্বর",
  },

  {
    additional:
      "बे ट्रेना (intime) आव सौगोन आरो (stop) मिनिटनि उनाव (outtime) आव ओंखारगोन।",
    arrived:
      "अन्नानै आं नोंथांखौ नोजोर होनो हागोन नामा, (origin) निफ्राय (destination) सिम ट्रेन नम्बर (train_no), (train_name) प्लेटफर्म नम्बर (PF) आव सफैबाय।",
    arriving:
      "आं अन्नानै नोंनि गोसोखौ लानो हायो, (origin) निफ्राय (destination) सिम ट्रेन नम्बर (train_no), (train_name) प्लेटफर्म नम्बर (PF) आव थाबैनो सौफैगासिनो।",
    code: "brx",
    custom:
      "ट्रेन नम्बर (train_no), (train_name) आ आथिखालाव (ghante) घन्टा आरो (mintu) मिनिट गोबाव जादों। बेखौ प्लेटफर्म नम्बराव (PF) (intime) (stop) मिनिटनि थि थाद 'नायजों (next_station) सिम सौहैनायनि आसा खालामनाय जादों।",
    custom_ontime:"ट्रेन नम्बर (train_no), (train_name) आ समाव खारगासिनो। बेखौ प्लेटफर्म नम्बराव (PF) (intime) (stop) मिनिटनि थि थाद 'नायजों (next_station) सिम सौहैनायनि आसा खालामनाय जादों।",
    late: "अन्नानै आं नोंनि गोसोखौ नायनो हागोन नामा, (origin) निफ्राय (destination) सिम ट्रेन नम्बर (train_no), (train_name), गावनि थि समनिफ्राय (ghante) घन्टा आरो (mintu) मिनिट गोबावै खारगासिनो, आरो प्लेटफर्म नम्बर (PF) आव (intime) सौहैनायनि आसा दं।",
    ontime:
      "(origin) निफ्राय (destination) सिम ट्रेन नम्बर (train_no), (train_name), थि सम बायदियै खारगासिनो, बे ट्रेनआ प्लेटफर्म नम्बर (PF) आव गावनि थि समाव (intime) सौहैगोन।",
    origination:
      "आं अन्नानै नोंनि गोसोखौ लानो हायो, (origin) निफ्राय (destination), (train_name) ट्रेन नम्बर (train_no) आ प्लेटफर्म नम्बर (PF) निफ्राय ओंखारनो हमगासिनो।",
    word_arr: "सफैनाय",
    word_dep: "नागारनाय",
    word_stop: "थाद",
    word_no: "ट्रेननि नम्बर",
  },
  {
    additional:
      "एह् रेलगड्डी (intime) पर औग ते (stop) मिंटें परैंत्त (outtime) पर रवाना होग।",
    arrived:
      "कृपा करियै में तुंʼदा ध्यान देई सकनां, रेलगड्डी नंबर (train_no) (origin) थमां (destination), (train_name) प्लेटफार्म नंबर (PF) पर आई ऐ।",
    arriving:
      "कृपा करियै में तुंʼदा ध्यान देई सकनां, रेलगड्डी नंबर (train_no) (origin) थमां (destination), (train_name) प्लेटफार्म नंबर (PF) पर तुंʼदी गै औने आह्ली ऐ।",
    code: "doi",
    custom:
      "ट्रेन नंबर (train_no), (train_name), वर्तमान च (ghante) घैंटे ते (mintu) मिंटें दी देरी कन्नै चला दा ऐ। एह्दे प्लेटफार्म नंबर (PF) पर (intime) (stop) मिंटें दे निर्धारित विराम दे कन्नै (next_station) पर औने दी मेद ऐ।",
    custom_ontime:"ट्रेन नंबर (train_no), (train_name), समें उप्पर चला दा ऐ। एह्दे प्लेटफार्म नंबर (PF) पर (intime) (stop) मिंटें दे निर्धारित विराम दे कन्नै (next_station) पर औने दी मेद ऐ।",
    late: "कृपा करियै में तुंʼदा ध्यान देई सकनां, (origin) थमां (destination) जाने आह्ली रेलगड्डी (train_no), (train_name), अपने निर्धारित समें थमां (ghante) घैंटे ते (mintu) मिंट लेट चला दी ऐ, ते प्लेटफार्म नंबर (PF) पर (intime) तक्कर औने दी मेद ऐ।",
    ontime:
      "कृपा करियै में तुंʼदा ध्यान देई सकनां, (origin) थमां (destination), (train_name) तक्कर जाने आह्ली रेलगड्डी नंबर (train_no), निर्धारित समें दे मताबक चलदी ऐ, एह् रेलगड्डी अपने निर्धारित समें (intime) पर प्लेटफार्म नंबर (PF) तक्कर पुजग।",
    origination:
      "कृपा करियै में तुंʼदा ध्यान देई सकनां, रेलगड्डी नंबर (train_no) (origin) थमां (destination), (train_name) प्लेटफार्म नंबर (PF) थमां रवाना होने आह्ली ऐ।",
    word_arr: "आमदोरफ्त",
    word_dep: "रवानगी",
    word_stop: "रुको",
    word_no: "रेलगड्डी नंबर",
  },
  {
    additional:
      "ही ट्रेन (intime) चेर येतली आनी (stop) मिण्टां उपरांत (outtime) भायर वतली.",
    arrived:
      "उपकार करून हांव तुजें लक्ष दिवंक शकता, (origin) सावन (destination) वचपी रेल्वे क्रमांक (train_no), (train_name) आतांच प्लॅटफॉर्म क्रमांकाचेर (PF) पावला.",
    arriving:
      "उपकार करून हांव तुजें लक्ष दिवंक शकता, (origin) सावन (destination) वचपी रेल्वे क्रमांक (train_no), (train_name) बेगीनच प्लॅटफॉर्म क्रमांकाचेर (PF) पावता.",
    code: "gom",
    custom:
      "ट्रेन क्रमांक (train_no), (train_name), सद्या (ghante) वरां आनी (mintu) मिनटां उसरां वता. प्लॅटफॉर्म क्रमांकाचेर (PF) (intime) (stop) मिण्टांचो नियोजीत थांबो घेवन (next_station) पावपाची अपेक्षा आसा.",
    custom_ontime:"ट्रेन क्रमांक (train_no), (train_name), वेळार चलता. प्लॅटफॉर्म क्रमांकाचेर (PF) (intime) (stop) मिण्टांचो नियोजीत थांबो घेवन (next_station) पावपाची अपेक्षा आसा.",
    late: "उपकार करून हांव तुजें लक्ष दिवंक शकता, (origin) सावन (destination) वचपी रेल्वे क्रमांक (train_no), (train_name), थारायिल्ल्या वेळा सावन (ghante) वरां आनी (mintu) मिनटां उसरां वता, आनी प्लॅटफॉर्म क्रमांक (PF) चेर (intime) पावपाची अपेक्षा आसा.",
    ontime:
      "उपकार करून हांव तुजें लक्ष दिवंक शकता, (origin) सावन (destination) वचपी रेल्वे क्रमांक (train_no), (train_name), वेळापत्रका प्रमाण चलता, ही रेल्वे आपल्या थारायिल्ल्या वेळार (intime) प्लॅटफॉर्म क्रमांक (PF) चेर पावटली.",
    origination:
      "उपकार करून हांव तुजें लक्ष दिवंक शकता, (origin) सावन (destination) वचपी रेल्वे क्रमांक (train_no), (train_name) प्लॅटफॉर्म क्रमांक (PF) सावन भायर सरपाची आसा.",
    word_arr: "पावप",
    word_dep: "वचपाक वचप",
    word_stop: "थांबो",
    word_no: "रेल्वे क्रमांक",
  },
  {
    additional:
      "આ ટ્રેન (intime) પર પહોંચશે અને (outtime) પર (stop) મિનિટ પછી ઉપડશે.",
    arrived:
      "કૃપા કરીને હું તમારું ધ્યાન દોરું, (origin) થી (destination) (train_name) ટ્રેન નંબર (train_no) હમણાં જ પ્લેટફોર્મ નંબર (PF) પર આવી છે.",
    arriving:
      "કૃપા કરીને હું તમારું ધ્યાન દોરું, (origin) થી (destination) (train_name) સુધીની ટ્રેન નંબર (train_no) ટૂંક સમયમાં પ્લેટફોર્મ નંબર (PF) પર આવી રહી છે.",
    code: "gu",
    custom:
      "ટ્રેન નંબર (train_no), (train_name), હાલમાં (ghante) કલાક અને (mintu) મિનિટ વિલંબિત છે. તે પ્લેટફોર્મ નંબર (PF) પર (intime) પર (stop) મિનિટના નિર્ધારિત વિરામ સાથે (next_station) પર પહોંચવાની અપેક્ષા છે.",
    custom_ontime:"ટ્રેન નંબર (train_no), (train_name), સમયસર ચાલી રહી છે. તે પ્લેટફોર્મ નંબર (PF) પર (intime) પર (stop) મિનિટના નિર્ધારિત વિરામ સાથે (next_station) પર પહોંચવાની અપેક્ષા છે.",
    late: "કૃપા કરીને હું તમારું ધ્યાન દોરું, (origin) થી (destination) (train_name) સુધીની ટ્રેન નંબર (train_no), તેના નિર્ધારિત સમયથી (ghante) કલાક અને (mintu) મિનિટ મોડી ચાલી રહી છે, અને પ્લેટફોર્મ નંબર (PF) પર (intime) પહોંચવાની અપેક્ષા છે.",
    ontime:
      "કૃપા કરીને હું તમારું ધ્યાન દોરું, (origin) થી (destination) (train_name) સુધીની ટ્રેન નંબર (train_no) નિર્ધારિત સમય મુજબ ચાલી રહી છે, આ ટ્રેન તેના નિર્ધારિત સમયે (intime) પ્લેટફોર્મ નંબર (PF) પર પહોંચશે.",
    origination:
      "કૃપા કરીને હું તમારું ધ્યાન દોરું, ટ્રેન નંબર (train_no) (origin) થી (destination), (train_name) પ્લેટફોર્મ નંબર (PF) થી ઉપડવાની છે.",
    word_arr: "આગમન",
    word_dep: "પ્રસ્થાન",
    word_stop: "બંધ કરો",
    word_no: "ટ્રેન નંબર",
  },
  {
    additional:
      "ಈ ರೈಲು (intime) ತಲುಪುತ್ತದೆ ಮತ್ತು (stop) ನಿಮಿಷಗಳ ನಂತರ (outtime) ಹೊರಡುತ್ತದೆ.",
    arrived:
      "ದಯವಿಟ್ಟು ನಿಮ್ಮ ಗಮನವನ್ನು ಸೆಳೆಯಲಿ, ರೈಲು ಸಂಖ್ಯೆ (train_no) (origin) ಯಿಂದ (destination), (train_name) ಈಗಷ್ಟೇ ಪ್ಲಾಟ್ಫಾರ್ಮ್ ಸಂಖ್ಯೆ (PF) ತಲುಪಿದೆ.",
    arriving:
      "ದಯವಿಟ್ಟು ನಾನು ನಿಮ್ಮ ಗಮನವನ್ನು ಸೆಳೆಯಲಿ, ರೈಲು ಸಂಖ್ಯೆ (train_no) (origin) ಯಿಂದ (destination), (train_name) ಶೀಘ್ರದಲ್ಲೇ ಪ್ಲಾಟ್ಫಾರ್ಮ್ ಸಂಖ್ಯೆ (PF) ಗೆ ಆಗಮಿಸುತ್ತಿದೆ.",
    code: "kn",
    custom:
      "ರೈಲು ಸಂಖ್ಯೆ (train_no), (train_name), ಪ್ರಸ್ತುತ (ghante) ಗಂಟೆ ಮತ್ತು (mintu) ನಿಮಿಷಗಳಷ್ಟು ವಿಳಂಬವಾಗಿದೆ. ಇದು ಪ್ಲಾಟ್ಫಾರ್ಮ್ ಸಂಖ್ಯೆ (PF) ನಲ್ಲಿ (intime) (stop) ನಿಮಿಷಗಳ ನಿಗದಿತ ನಿಲುಗಡೆಗೆ (next_station) ತಲುಪುವ ನಿರೀಕ್ಷೆಯಿದೆ.",
    custom_ontime:"ರೈಲು ಸಂಖ್ಯೆ (train_no), (train_name), ಸಮಯಕ್ಕೆ ಸರಿಯಾಗಿ ಚಲಿಸುತ್ತಿದೆ. ಇದು ಪ್ಲಾಟ್ಫಾರ್ಮ್ ಸಂಖ್ಯೆ (PF) ನಲ್ಲಿ (intime) (stop) ನಿಮಿಷಗಳ ನಿಗದಿತ ನಿಲುಗಡೆಗೆ (next_station) ತಲುಪುವ ನಿರೀಕ್ಷೆಯಿದೆ.",
    late: "ದಯವಿಟ್ಟು ನಾನು ನಿಮ್ಮ ಗಮನವನ್ನು ಸೆಳೆಯಲಿ, ರೈಲು ಸಂಖ್ಯೆ (train_no) (origin) ದಿಂದ (destination), (train_name), ನಿಗದಿತ ಸಮಯದಿಂದ (ghante) ಗಂಟೆಗಳು ಮತ್ತು (mintu) ನಿಮಿಷಗಳಷ್ಟು ತಡವಾಗಿ ಚಲಿಸುತ್ತಿದೆ ಮತ್ತು ಪ್ಲಾಟ್ಫಾರ್ಮ್ ಸಂಖ್ಯೆ (PF) ನಲ್ಲಿ (intime) ತಲುಪುವ ನಿರೀಕ್ಷೆಯಿದೆ.",
    ontime:
      "ದಯವಿಟ್ಟು ನಾನು ನಿಮ್ಮ ಗಮನವನ್ನು ಸೆಳೆಯಲಿ, ರೈಲು ಸಂಖ್ಯೆ (train_no) (origin) ಯಿಂದ (destination), (train_name), ನಿಗದಿತ ವೇಳಾಪಟ್ಟಿಯಂತೆ ಓಡುತ್ತಿದೆ, ಈ ರೈಲು ತನ್ನ ನಿಗದಿತ ಸಮಯದಲ್ಲಿ (intime) ಪ್ಲಾಟ್ಫಾರ್ಮ್ ಸಂಖ್ಯೆ (PF) ಅನ್ನು ತಲುಪುತ್ತದೆ.",
    origination:
      "ದಯವಿಟ್ಟು ನಾನು ನಿಮ್ಮ ಗಮನವನ್ನು ಸೆಳೆಯಲಿ, ರೈಲು ಸಂಖ್ಯೆ (train_no) (origin) ಯಿಂದ (destination), (train_name) ಪ್ಲಾಟ್ಫಾರ್ಮ್ ಸಂಖ್ಯೆ (PF) ಯಿಂದ ಹೊರಡಲಿದೆ.",
    word_arr: "ಆಗಮನ",
    word_dep: "ನಿರ್ಗಮನ",
    word_stop: "ನಿಲ್ಲಿಸಿ",
    word_no: "ರೈಲು ಸಂಖ್ಯೆ",
  },
  {
    additional:
      "یہ ٹرین آسہٕ (intime) پؠٹھ تہٕ گژھن (stop) منٹن پتہٕ (outtime) پؠٹھ۔",
    arrived:
      "بہٕ ہؠکا مہربٲنی کٔرتھ تہنٛد توجہ دتھ، ٹرین نمبر (train_no) (origin) (destination) پؠٹھٕ ، (train_name) ووت صرف پلیٹ فارم نمبرس (PF) پؠٹھ۔",
    arriving:
      "بہٕ ہؠکا مہربٲنی کٔرتھ تہنٛد توجہ دتھ، ٹرین نمبر (train_no) (origin) (destination) پؠٹھٕ ، (train_name) چھ جلدی پلیٹ فارم نمبرس (PF) پؠٹھ یوان۔",
    code: "ks",
    custom:
      " ٹرین نمبر (train_no)، (train_name)، چھ ونکینس (ghante) گھنٹہٕ تہٕ (mintu) منٹن ہنٛد تاخیر۔ یہٕ چھ پلیٹ فارم نمبرس (PF) پیٹھ (intime) پیٹھ (stop) منٹن ہنٛد طے شدٕ رکنس سۭتۍ (next_station) تام واتنچ توقع۔",
    custom_ontime:"ٹرین نمبر (train_no)، (train_name)، چھ وقتس پیٹھ پکان۔ یہٕ چھ پلیٹ فارم نمبرس (PF) پیٹھ (intime) پیٹھ (stop) منٹن ہنٛد طے شدٕ رکنس سۭتۍ (next_station) تام واتنچ توقع۔",
    late: "بہٕ ہیٚکا مہربٲنی کٔرتھ تہنٛد توجہ دتھ، ٹرین نمبر (train_no) (origin) (destination) پؠٹھٕ ، (train_name)، چھ پننس مقرر وقتہٕ پیٚٹھٕ (ghante) گھنٛٹہٕ تہٕ (mintu) منٹ دیر سان پکان، تہٕ پلیٹ فارم نمبرس (PF) پؠٹھ چھ (intime) تام واتنٕچ توقع۔",
    ontime:
      "بہٕ ہیٚکا مہربٲنی کٔرتھ تہنٛد توجہ دتھ، ٹرین نمبر (train_no) (origin) (destination) پؠٹھٕ ، (train_name)، چھےٚ مقرر وقتہٕ مطٲبق پکان، یہ ٹرین واتہ پلیٹ فارم نمبر (PF) پننس مقرر وقتس پؠٹھ (intime)۔",
    origination:
      "بہٕ ہؠکا مہربٲنی کٔرتھ تہنٛد توجہ دتھ، ٹرین نمبر (train_no) (origin) (destination) پؠٹھٕ ، (train_name) چھ پلیٹ فارم نمبر (PF) پؠٹھٕ گژھن وول۔",
    word_arr: "آمدٕ۔",
    word_dep: " نیرٗن۔",
    word_stop: "رک۔",
    word_no: " ریل نمبر",
  },
  {
    additional: "ये ट्रेन औ (intime) ते रटन (stop) मिनट्स पथ (outtime).",
    arrived:
      "ट्रेन नंबर (train_no) (origin) से (destination), (train_name) बस प्लेटफार्म नंबर (PF) पे आया.",
    arriving:
      "ट्रेन नंबर (train_no) (origin) पेठ (destination), (train_name) प्लेटफॉर्म नंबर (PF) पेठ जल्द आ रही है।",
    code: "ks_Deva",
    custom:
      " ट्रेन नंबर (train_no), (train_name), छू वेन मूजूद लेट (ghante) घंटा ते (mintu) मिनट. ये छी एवं माना (next_station) प्लेटफार्म नंबर पेठ (PF) पेठ (intime) (stop) मिनट्स शिड्यूल हाल्ट सेथ",
    custom_ontime:"ट्रेन नंबर (train_no), (train_name), छू रनिंग ऑन टाइम. ये छी एवं माना (next_station) प्लेटफार्म नंबर पेठ (PF) पेठ (intime) (stop) मिनट्स शिड्यूल हाल्ट सेथ",
    late: "ट्रेन नंबर (train_no) (origin) पेठ (destination), (train_name), छू लेट गासन (ghante) घंटे ते (mintu) मिनट टाइम सेत, ते प्लैटफॉर्म नंबर (PF) पेठ (intime).",
    ontime:
      "ट्रेन नंबर (train_no) (origin) से (destination), (train_name), शिड्यूल के मुताबिक चल रही है, ये ट्रेन प्लेटफॉर्म नंबर (PF) अपने शिड्यूल टाइम पर (intime) पहुंचेगी।",
    origination:
      "ट्रेन नंबर (train_no) (origin) पेठ (destination), (train_name) प्लेटफॉर्म नंबर (PF) पेठ रटन वाली.",
    word_arr: "आगमन",
    word_dep: "छूट जाये",
    word_stop: "रुक जाये",
    word_no: "ट्रेन नंबर",
  },
  {
    additional:
      "ई ट्रेन (intime) पर पहुँचेगी आ (stop) मिनटक बाद (outtime) पर रवाना होयत।",
    arrived:
      "कृपया हम अहाँ के ध्यान दऽ सकय छी, ट्रेन नंबर (train_no) (origin) सँ (destination), (train_name) प्लेटफॉर्म नंबर (PF) पर आयल अछि।",
    arriving:
      "कृपया हम अहाँ के ध्यान दऽ सकय छी, ट्रेन नंबर (train_no) (origin) सँ (destination), (train_name) जल्दहि प्लेटफार्म नंबर (PF) पर आबि रहल अछि।",
    code: "mai",
    custom:
      "ट्रेन नम्बर (train_no), (train_name), वर्तमानमे (ghante) घण्टा आ (mintu) मिनट देरीसँ चलि रहल अछि। एकर प्लेटफॉर्म नंबर (PF) पर (intime) पर (stop) मिनटक निर्धारित स्टॉपक संग (next_station) पर पहुँचबाक उम्मीद छैक।",
    custom_ontime:"ट्रेन नम्बर (train_no), (train_name), समय पर चलि रहल अछि। एकर प्लेटफॉर्म नंबर (PF) पर (intime) पर (stop) मिनटक निर्धारित स्टॉपक संग (next_station) पर पहुँचबाक उम्मीद छैक।",
    late: "कृपया हम अहाँ के ध्यान दऽ सकय छी, ट्रेन नंबर (train_no) (origin) सँ (destination), (train_name), अपन निर्धारित समय सँ (ghante) घंटा आ (mintu) मिनट देरी सँ चलि रहल अछि, आ प्लेटफॉर्म नंबर (PF) पर (intime) पर पहुँचय के उम्मीद अछि।",
    ontime:
      "कृपया हम अहाँ के ध्यान दऽ सकय छी, ट्रेन नंबर (train_no) (origin) सँ (destination), (train_name), निर्धारित समय पर चलि रहल अछि, ई ट्रेन प्लेटफॉर्म नंबर (PF) पर अपन निर्धारित समय पर (intime) पहुंचतै।",
    origination:
      "कृपया हम अहाँ के ध्यान दऽ सकय छी, ट्रेन नंबर (train_no) (origin) सँ (destination), (train_name) प्लेटफार्म नंबर (PF) सँ प्रस्थान करय वाला छै।",
    word_arr: "आगमन",
    word_dep: "चलि रहल अछि",
    word_stop: "रुकू",
    word_no: "ट्रेनक नम्बर",
  },
  {
    additional:
      "ഈ ട്രെയിൻ (intime) എത്തിച്ചേരുകയും (stop) മിനിറ്റിനുശേഷം (outtime) പുറപ്പെടുകയും ചെയ്യും.",
    arrived:
      "(origin) മുതൽ (destination) വരെയുള്ള (train_name) ട്രെയിൻ നമ്പർ (train_no) പ്ലാറ്റ്ഫോം നമ്പറിൽ (PF) എത്തിയതേയുള്ളൂ.",
    arriving:
      "(origin) മുതൽ (destination) വരെയുള്ള (train_name) ട്രെയിൻ നമ്പർ (train_no) താമസിയാതെ പ്ലാറ്റ്ഫോം നമ്പറിൽ (PF) എത്തുന്നു.",
    code: "ml",
    custom:
      "ട്രെയിൻ നമ്പർ (train_no), (train_name), നിലവിൽ (ghante) മണിക്കൂറും (mintu) മിനിറ്റും വൈകുന്നു. പ്ലാറ്റ്ഫോം നമ്പറിൽ (PF) (intime) (stop) മിനിറ്റ് ഷെഡ്യൂൾ ചെയ്ത സ്റ്റോപ്പോടെ (next_station) ൽ എത്തുമെന്ന് പ്രതീക്ഷിക്കുന്നു.",
    custom_ontime:"ട്രെയിൻ നമ്പർ (train_no), (train_name), കൃത്യസമയത്ത് ഓടുന്നു. പ്ലാറ്റ്ഫോം നമ്പറിൽ (PF) (intime) (stop) മിനിറ്റ് ഷെഡ്യൂൾ ചെയ്ത സ്റ്റോപ്പോടെ (next_station) ൽ എത്തുമെന്ന് പ്രതീക്ഷിക്കുന്നു.",
    late: "(origin) മുതൽ (destination) വരെയുള്ള ട്രെയിൻ നമ്പർ (train_no), (train_name), നിശ്ചയിച്ച സമയത്തിൽ നിന്ന് (ghante) മണിക്കൂറും (mintu) മിനിറ്റും വൈകിയാണ് ഓടുന്നത്, കൂടാതെ പ്ലാറ്റ്ഫോം നമ്പർ (PF) ൽ (intime) എത്തുമെന്ന് പ്രതീക്ഷിക്കുന്നു.",
    ontime:
      "(origin) മുതൽ (destination) വരെയുള്ള (train_name) ട്രെയിൻ നമ്പർ (train_no) നിശ്ചയിച്ച പ്രകാരം ഓടുന്നു, ഈ ട്രെയിൻ നിശ്ചയിച്ച സമയത്ത് (intime) പ്ലാറ്റ്ഫോം നമ്പർ (PF) ൽ എത്തും.",
    origination:
      "(origin) മുതൽ (destination) വരെയുള്ള (train_name) ട്രെയിൻ നമ്പർ (train_no) പ്ലാറ്റ്ഫോം നമ്പറിൽ (PF) നിന്ന് പുറപ്പെടാൻ പോകുന്നു.",
    word_arr: "വരവ്",
    word_dep: "പോക്ക്",
    word_stop: "നിർത്തുക",
    word_no: "ട്രെയിൻ നമ്പർ",
  },
  {
    additional:
      "ꯇ ꯭ ꯔꯦꯟ ꯑꯁꯤ (intime) ꯗ ꯂꯥꯛꯀꯅꯤ ꯑꯃꯁꯨꯡ (outtime) ꯗ ꯃꯤꯅꯤꯠ (stop) ꯒꯤ ꯃꯇꯨꯡꯗ ꯊꯥꯗꯣꯛꯀꯅꯤ ꯫",
    arrived:
      "ꯆꯥꯟꯕꯤꯗꯨꯅ ꯑꯗꯣꯝꯒꯤ ꯄꯨꯛꯅꯤꯡ ꯆꯤꯡꯁꯤꯟꯕꯤꯔꯛꯎ, (origin) ꯗꯒꯤ (destination) ꯐꯥꯎꯕꯒꯤ ꯇ ꯭ ꯔꯦꯟ ꯅꯝꯕꯔ (train_no), (train_name) ꯑꯁꯤ ꯄ ꯭ ꯂꯦꯠꯐꯣꯔ ꯭ ꯝ ꯅꯝꯕꯔ (PF) ꯗ ꯂꯥꯛꯈ ꯭ ꯔꯦ ꯫",
    arriving:
      "ꯆꯥꯟꯕꯤꯗꯨꯅ ꯑꯗꯣꯝꯒꯤ ꯄꯨꯛꯅꯤꯡ ꯆꯤꯡꯁꯤꯟꯕꯤꯔꯛꯎ, (origin) ꯗꯒꯤ (destination) ꯐꯥꯎꯕꯒꯤ ꯇ ꯭ ꯔꯦꯟ ꯅꯝꯕꯔ (train_no), (train_name) ꯑꯁꯤ ꯊꯨꯅ ꯄ ꯭ ꯂꯦꯠꯐꯣꯔꯝ ꯅꯝꯕꯔ (PF) ꯗ ꯂꯥꯛꯂꯤ ꯫",
    code: "mni",
    custom: "ꯇ ꯭ ꯔꯦꯟ ꯅꯝꯕꯔ (train_no), (train_name), ꯑꯁꯤ ꯍꯧꯖꯤꯛ ꯄꯨꯡ (ghante) ꯑꯃꯁꯨꯡ ꯃꯤꯅꯤꯠ (mintu) ꯋꯥꯠꯂꯤ ꯫ ꯃꯁꯤ ꯄ ꯭ ꯂꯦꯠꯐꯣꯔꯝ ꯅꯝꯕꯔ (PF) ꯒꯤ (intime) ꯗ (next_station) ꯗ ꯃꯤꯅꯤꯠ (stop) ꯒꯤ ꯃꯇꯝ ꯂꯦꯞꯇꯨꯅ ꯌꯧꯔꯛꯀꯅꯤ ꯍꯥꯏꯅ ꯄꯥꯅꯔꯤ ꯫" ,
    custom_ontime:"ꯇ ꯭ ꯔꯦꯟ ꯅꯝꯕꯔ (train_no), (train_name), ꯑꯁꯤ ꯃꯇꯝꯆꯥꯅ ꯆꯠꯂꯤ ꯫ ꯃꯁꯤ ꯄ ꯭ ꯂꯦꯠꯐꯣꯔꯝ ꯅꯝꯕꯔ (PF) ꯒꯤ (intime) ꯗ (next_station) ꯗ ꯃꯤꯅꯤꯠ (stop) ꯒꯤ ꯃꯇꯝ ꯂꯦꯞꯇꯨꯅ ꯌꯧꯔꯛꯀꯅꯤ ꯍꯥꯏꯅ ꯄꯥꯅꯔꯤ ꯫",
    late: "ꯆꯥꯟꯕꯤꯗꯨꯅ ꯑꯗꯣꯝꯒꯤ ꯄꯨꯛꯅꯤꯡ ꯆꯤꯡꯁꯤꯟꯕꯤꯔꯛꯎ, (origin) ꯗꯒꯤ (destination) ꯐꯥꯎꯕꯒꯤ ꯇ ꯭ ꯔꯦꯟ ꯅꯝꯕꯔ (train_no), (train_name) ꯑꯁꯤ ꯂꯦꯞꯈꯤꯕ ꯃꯇꯝꯗꯒꯤ ꯄꯨꯡ (ghante) ꯑꯃꯁꯨꯡ ꯃꯤꯅꯤꯠ (mintu) ꯋꯥꯠꯂꯤ, ꯑꯃꯁꯨꯡ ꯄ ꯭ ꯂꯦꯠꯐꯣꯔꯝ ꯅꯝꯕꯔ (PF) ꯗ (intime) ꯌꯧꯔꯛꯀꯅꯤ ꯍꯥꯏꯅ ꯄꯥꯅꯔꯤ ꯫",
    ontime:
      "ꯆꯥꯟꯕꯤꯗꯨꯅ ꯑꯗꯣꯝꯒꯤ ꯄꯨꯛꯅꯤꯡ ꯆꯤꯡꯁꯤꯟꯕꯤꯔꯛꯎ, (origin) ꯗꯒꯤ (destination) ꯐꯥꯎꯕꯒꯤ ꯇ ꯭ ꯔꯦꯟ ꯅꯝꯕꯔ (train_no), (train_name) ꯑꯁꯤ ꯃꯇꯝ ꯂꯦꯞꯈꯤꯕꯒꯨꯝꯅ ꯆꯂꯥꯏꯔꯤ, ꯇ ꯭ ꯔꯦꯟ ꯑꯁꯤ ꯃꯁꯤꯒꯤ ꯃꯇꯝ ꯂꯦꯞꯈꯤꯕ ꯃꯇꯝꯗ (intime) ꯄ ꯭ ꯂꯦꯠꯐꯣꯔ ꯭ ꯝ ꯅꯝꯕꯔ (PF) ꯌꯧꯒꯅꯤ ꯫",
    origination:
      "ꯆꯥꯟꯕꯤꯗꯨꯅ ꯑꯗꯣꯝꯒꯤ ꯄꯨꯛꯅꯤꯡ ꯆꯤꯡꯁꯤꯟꯕꯤꯔꯛꯎ, (origin) ꯗꯒꯤ (destination) ꯐꯥꯎꯕꯒꯤ ꯇ ꯭ ꯔꯦꯟ ꯅꯝꯕꯔ (train_no), (train_name) ꯑꯁꯤ ꯄ ꯭ ꯂꯦꯠꯐꯣꯔ ꯭ ꯝ ꯅꯝꯕꯔ (PF) ꯗꯒꯤ ꯊꯥꯗꯣꯛꯀꯗꯧꯔꯤ ꯫",
    word_arr: "ꯂꯥꯛꯄ",
    word_dep: "ꯆꯠꯇꯨꯅ ꯆꯠꯄ",
    word_stop: "ꯂꯦꯞꯄꯨ",
    word_no: " ꯇ ꯭ ꯔꯦꯟ ꯅꯝꯕꯔ",
  },
  {
    additional:
      "হায়রিবা ত্রেন অসি (intime) দা লাক্কনি অমসুং (outtime) দা মিনিট (stop) গী মতুংদা চৎকনি।",
    arrived:
      "(origin) দগী (destination) ফাওবা চৎলিবা ত্রেন নম্বর (train_no), (train_name) অসি প্লেতফোর্ম নম্বর (PF) দা লাকখ্রে।",
    arriving:
      "(origin) দগী (destination) ফাওবা চৎলিবা ত্রেন নম্বর (train_no), (train_name) অসি প্লেতফোর্ম নম্বর (PF) দা অথুবা মতমদা লাক্কনি।",
    code: "mni_Beng",
    custom:
      "ত্রেন নম্বর (train_no), (train_name), অসি হৌজিক পুং (ghante) অমসুং (mintu) মিনিটনা লেপখ্রে। মসি প্লেতফোর্ম নম্বর (PF) দা (intime) মিনিট (stop) শিন্দোকপা হোল্তকা লোয়ননা (next_station) দা লাক্কনি হায়না থাজনরি।",
    custom_ontime:"ত্রেন নম্বর (train_no), দি (train_name), অসি মতম চানা চেল্লি। মসি প্লেতফোর্ম নম্বর (PF) দা (intime) মিনিট (stop) শিন্দোকপা হোল্তকা লোয়ননা (next_station) দা লাক্কনি হায়না থাজনরি। ",
    late: "(origin) দগী (destination) ফাওবা চৎলিবা ত্রেন নম্বর (train_no), (train_name) অসি মসিগী অকক্নবা মতমদগী পুং (ghante) অমসুং মিনিট (mintu) হেন্না লেপখ্রে, অমসুং প্লেতফোর্ম নম্বর (PF) দা (intime) য়ৌগনি।",
    ontime:
      "(origin) দগী (destination) ফাওবা চৎলিবা ত্রেন নম্বর (train_no), (train_name) অসি শিন্দোল তৌবগুম্না চেল্লি, মসিগী ত্রেন অসি মসিগী শিন্দোল থোক্লিবা মতম অদুদা (intime) প্লেতফোর্ম নম্বর (PF) য়ৌগনি।",
    origination:
      "(origin) দগী (destination) ফাওবা চৎলিবা ত্রেন নম্বর (train_no), (train_name) অসি প্লেতফোর্ম নম্বর (PF) দগী চৎকনি।",
    word_arr: "লাকখিবা",
    word_dep: "চৎখিগদবা নোংমদুনি",
    word_stop: "থিংলুবা",
    word_no: " ত্রেন নম্বর",
  },
  {
    additional: "ही गाडी (intime) वर येईल आणि (outtime) वर (stop) मिनिटांनंतर निघेल.",
    arrived:
      "कृपया मी तुमचे लक्ष वेधून घेऊ का, (origin) ते (destination), (train_name) पर्यंतचा रेल्वे क्रमांक (train_no) प्लॅटफॉर्म क्रमांकावर (PF) नुकताच पोहोचला आहे.",
    arriving:
      "कृपया मी तुमचे लक्ष वेधून घेऊ का, (origin) ते (destination) (train_name) हा रेल्वे क्रमांक (train_no) लवकरच प्लॅटफॉर्म क्रमांकावर (PF) येत आहे.",
    code: "mr",
    custom:
      "रेल्वे क्रमांक (train_no), (train_name), सध्या (ghante) तास आणि (mintu) मिनिटांनी विलंबित आहे. प्लॅटफॉर्म क्रमांक (PF) वर (intime) (stop) मिनिटांच्या नियोजित थांब्यासह (next_station) वर पोहोचणे अपेक्षित आहे.",
    custom_ontime:"गाडी क्रमांक (train_no), (train_name) वेळेवर धावत आहे. प्लॅटफॉर्म क्रमांक (PF) वर (intime) (stop) मिनिटांच्या नियोजित थांब्यासह (next_station) वर पोहोचणे अपेक्षित आहे.",
    late: "कृपया मी तुमचे लक्ष वेधून घेऊ का, (origin) ते (destination), (train_name) पर्यंतचा रेल्वे क्रमांक (train_no), निर्धारित वेळेपासून (ghante) तास आणि (mintu) मिनिटे उशिराने धावत आहे आणि प्लॅटफॉर्म क्रमांक (PF) वर (intime) पोहोचणे अपेक्षित आहे.",
    ontime:
      "कृपया मी तुमचे लक्ष वेधून घेऊ का, (origin) ते (destination) (train_name) पर्यंतचा रेल्वे क्रमांक (train_no) नियोजित वेळापत्रकानुसार धावत आहे, ही रेल्वेगाडी नियोजित वेळेनुसार (intime) प्लॅटफॉर्म क्रमांक (PF) वर पोहोचेल.",
    origination:
      "कृपया मी तुमचे लक्ष वेधून घेऊ का, (origin) ते (destination) (train_name) पर्यंतचा रेल्वे क्रमांक (train_no) प्लॅटफॉर्म क्रमांकावरून (PF) निघणार आहे.",
    word_arr: "आगमन",
    word_dep: "प्रस्थान",
    word_stop: "थांबा",
    word_no: "गाडीचा क्रमांक",
  },
  {
    additional:
      "यो रेल (intime) मा आइपुग्नेछ र (outtime) मा (stop) मिनेट पछि प्रस्थान गर्नेछ।",
    arrived:
      "कृपया म तपाईँको ध्यान दिन सक्छु, रेल नम्बर (train_no) (origin) देखि (destination), (train_name) भर्खरै प्लेटफर्म नम्बर (PF) मा आइपुगेको छ।",
    arriving:
      "कृपया तपाईँको ध्यान दिनुहोस्, रेल नम्बर (train_no) (origin) देखि (destination), (train_name) प्लेटफर्म नम्बर (PF) मा चाँडै आउँदैछ।",
    code: "ne",
    custom:
      "ट्रेन नम्बर (train_no), (train_name), हाल (ghante) घन्टा र (mintu) मिनेटले ढिलाइ भएको छ। यो प्लेटफर्म नम्बर (PF) मा (intime) मा (stop) मिनेटको निर्धारित विरामको साथ (next_station) मा पुग्ने अपेक्षा गरिएको छ।",
    custom_ontime:"ट्रेन नम्बर (train_no), (train_name), समयमै चल्दै छ। यो प्लेटफर्म नम्बर (PF) मा (intime) मा (stop) मिनेटको निर्धारित विरामको साथ (next_station) मा पुग्ने अपेक्षा गरिएको छ।",
    late: "कृपया म तपाईँको ध्यान दिन सक्छु, रेल नम्बर (train_no) (origin) देखि (destination), (train_name), निर्धारित समयबाट (ghante) घण्टा र (mintu) मिनेट ढिलो चलिरहेको छ, र प्लेटफर्म नम्बर (PF) मा (intime) मा पुग्ने अपेक्षा गरिएको छ।",
    ontime:
      "के म तपाईँको ध्यान दिन सक्छु, रेल नम्बर (train_no) (origin) देखि (destination), (train_name), निर्धारित समय अनुसार चलिरहेको छ, यो रेल प्लेटफर्म नम्बर (PF) मा आफ्नो निर्धारित समयमा (intime) पुग्नेछ।",
    origination:
      "कृपया तपाईँको ध्यान दिनुहोस्, रेल नम्बर (train_no) (origin) बाट (destination), (train_name) प्लेटफर्म नम्बर (PF) बाट प्रस्थान गर्न लागेको छ।",
    word_arr: "आगमन",
    word_dep: "प्रस्थान",
    word_stop: "रोक्नुहोस्",
    word_no: "रेल नम्बर",
  },
  {
    additional:
      "ଏହି ଟ୍ରେନ୍ (intime) ରେ ପହଞ୍ଚିବ ଏବଂ (outtime) ରେ (stop) ମିନିଟ୍ ପରେ ପ୍ରସ୍ଥାନ କରିବ।",
    arrived:
      "ଦଯ଼ାକରି ମୁଁ ଆପଣଙ୍କ ଧ୍ଯ଼ାନ ଆକର୍ଷଣ କରିବି, ଟ୍ରେନ୍ ନମ୍ବର (train_no) (origin) ରୁ (destination), (train_name) ବର୍ତ୍ତମାନ ପ୍ଲାଟଫର୍ମ ନମ୍ବର (PF) ରେ ପହଞ୍ଚିଛି।",
    arriving:
      "ଦଯ଼ାକରି ମୁଁ ଆପଣଙ୍କ ଧ୍ଯ଼ାନ ଆକର୍ଷଣ କରିବି, ଟ୍ରେନ୍ ନମ୍ବର (train_no) (origin) ରୁ (destination), (train_name) ଖୁବ୍ ଶୀଘ୍ର ପ୍ଲାଟଫର୍ମ ନମ୍ବର (PF) ରେ ପହଞ୍ଚୁଛି।",
    code: "or",
    custom:
      "ଟ୍ରେନ୍ ନମ୍ବର (train_no), (train_name), ବର୍ତ୍ତମାନ (ghante) ଘଣ୍ଟା ଏବଂ (mintu) ମିନିଟ୍ ବିଳମ୍ବ ହୋଇଛି। ଏହା ପ୍ଲାଟଫର୍ମ ନମ୍ବର (PF) ରେ (intime) ରେ (stop) ମିନିଟର ନିର୍ଦ୍ଧାରିତ ଷ୍ଟପ୍ ସହିତ (next_station) ରେ ପହଞ୍ଚିବ ବୋଲି ଆଶା କରାଯାଉଛି।",
    custom_ontime:"ଟ୍ରେନ୍ ନମ୍ବର (train_no), (train_name), ଠିକ୍ ସମଯ଼ରେ ଚାଲୁଛି। ଏହା ପ୍ଲାଟଫର୍ମ ନମ୍ବର (PF) ରେ (intime) ରେ (stop) ମିନିଟର ନିର୍ଦ୍ଧାରିତ ଷ୍ଟପ୍ ସହିତ (next_station) ରେ ପହଞ୍ଚିବ ବୋଲି ଆଶା କରାଯାଉଛି।",
    late: "ଦଯ଼ାକରି ମୁଁ ଆପଣଙ୍କ ଧ୍ଯ଼ାନ ଆକର୍ଷଣ କରିବି କି, ଟ୍ରେନ୍ ନମ୍ବର (train_no) (origin) ରୁ (destination), (train_name), ନିର୍ଦ୍ଧାରିତ ସମଯ଼ଠାରୁ (ghante) ଘଣ୍ଟା ଏବଂ (mintu) ମିନିଟ୍ ବିଳମ୍ବରେ ଚାଲୁଛି, ଏବଂ ପ୍ଲାଟଫର୍ମ ନମ୍ବର (PF) ରେ (intime) ପହଞ୍ଚିବ ବୋଲି ଆଶା କରାଯାଉଛି।",
    ontime:
      "ଦଯ଼ାକରି ମୁଁ ଆପଣଙ୍କ ଧ୍ଯ଼ାନ ଆକର୍ଷଣ କରିବି, ଟ୍ରେନ୍ ନମ୍ବର (train_no) (origin) ରୁ (destination), (train_name), ନିର୍ଦ୍ଧାରିତ ସମଯ଼ ଅନୁଯାଯ଼ୀ ଚାଲୁଛି, ଏହି ଟ୍ରେନ୍ ନିର୍ଦ୍ଧାରିତ ସମଯ଼ରେ (intime) ପ୍ଲାଟଫର୍ମ ନମ୍ବର (PF) ରେ ପହଞ୍ଚିବ।",
    origination:
      "ଦଯ଼ାକରି ମୁଁ ଆପଣଙ୍କ ଧ୍ଯ଼ାନ ଆକର୍ଷଣ କରିବି, ଟ୍ରେନ୍ ନମ୍ବର (train_no) (origin) ରୁ (destination), (train_name) ପ୍ଲାଟଫର୍ମ ନମ୍ବର (PF) ରୁ ପ୍ରସ୍ଥାନ କରିବାକୁ ଯାଉଛି।",
    word_arr: "ଆଗମନ",
    word_dep: "ପ୍ରସ୍ଥାନ",
    word_stop: "ଅଟକି ଯାଆନ୍ତୁ",
    word_no: "ଟ୍ରେନ୍ ନମ୍ବର",
  },
  {
    additional:
      "ਇਹ ਰੇਲਗੱਡੀ (intime) ਉੱਤੇ ਪਹੁੰਚੇਗੀ ਅਤੇ (outtime) ਉੱਤੇ (stop) ਮਿੰਟ ਬਾਅਦ ਰਵਾਨਾ ਹੋਵੇਗੀ।",
    arrived:
      "ਕ੍ਰਿਪਾ ਕਰਕੇ ਮੈਂ ਤੁਹਾਡਾ ਧਿਆਨ ਦਿਵਾ ਸਕਦਾ ਹਾਂ, (origin) ਤੋਂ (destination) ਜਾਣ ਵਾਲੀ ਰੇਲਗੱਡੀ ਨੰਬਰ (train_no), (train_name) ਪਲੇਟਫਾਰਮ ਨੰਬਰ (PF) 'ਤੇ ਪਹੁੰਚੀ ਹੈ।",
    arriving:
      "ਕ੍ਰਿਪਾ ਕਰਕੇ ਮੈਂ ਤੁਹਾਡਾ ਧਿਆਨ ਦਿਵਾ ਸਕਦਾ ਹਾਂ ਕਿ (origin) ਤੋਂ (destination) ਜਾਣ ਵਾਲੀ ਰੇਲਗੱਡੀ ਨੰਬਰ (train_no), (train_name) ਜਲਦੀ ਹੀ ਪਲੇਟਫਾਰਮ ਨੰਬਰ (PF) 'ਤੇ ਪਹੁੰਚ ਰਹੀ ਹੈ।",
    code: "pa",
    custom:
      "ਟ੍ਰੇਨ ਨੰਬਰ (train_no), (train_name), ਇਸ ਵੇਲੇ (ghante) ਘੰਟੇ ਅਤੇ (mintu) ਮਿੰਟ ਦੇਰੀ ਨਾਲ ਚੱਲ ਰਹੀ ਹੈ। ਇਸ ਦੇ (stop) ਮਿੰਟ ਦੇ ਨਿਰਧਾਰਤ ਰੁਕਣ ਦੇ ਨਾਲ (PF) ਪਲੇਟਫਾਰਮ ਨੰਬਰ (intime) 'ਤੇ (next_station)' ਤੇ ਪਹੁੰਚਣ ਦੀ ਉਮੀਦ ਹੈ।",
    custom_ontime:"ਟ੍ਰੇਨ ਨੰਬਰ (train_no), (train_name), ਸਮੇਂ ਸਿਰ ਚੱਲ ਰਹੀ ਹੈ। ਇਸ ਦੇ (stop) ਮਿੰਟ ਦੇ ਨਿਰਧਾਰਤ ਰੁਕਣ ਦੇ ਨਾਲ (PF) ਪਲੇਟਫਾਰਮ ਨੰਬਰ (intime) 'ਤੇ (next_station)' ਤੇ ਪਹੁੰਚਣ ਦੀ ਉਮੀਦ ਹੈ।",
    late: "ਕ੍ਰਿਪਾ ਕਰਕੇ ਮੈਂ ਤੁਹਾਡਾ ਧਿਆਨ ਦਿਵਾ ਸਕਦਾ ਹਾਂ ਕਿ (origin) ਤੋਂ (destination) ਜਾਣ ਵਾਲੀ ਰੇਲਗੱਡੀ ਨੰਬਰ (train_no), (train_name) ਆਪਣੇ ਨਿਰਧਾਰਤ ਸਮੇਂ ਤੋਂ (ghante) ਘੰਟੇ ਅਤੇ (mintu) ਮਿੰਟ ਦੇਰੀ ਨਾਲ ਚੱਲ ਰਹੀ ਹੈ ਅਤੇ ਪਲੇਟਫਾਰਮ ਨੰਬਰ (PF) 'ਤੇ (intime)' ਤੇ ਪਹੁੰਚਣ ਦੀ ਉਮੀਦ ਹੈ।",
    ontime:
      "ਕ੍ਰਿਪਾ ਕਰਕੇ ਮੈਂ ਤੁਹਾਡਾ ਧਿਆਨ ਦਿਵਾ ਸਕਦਾ ਹਾਂ ਕਿ (origin) ਤੋਂ (destination) ਜਾਣ ਵਾਲੀ ਰੇਲਗੱਡੀ ਨੰਬਰ (train_no), (train_name) ਨਿਰਧਾਰਤ ਸਮੇਂ ਅਨੁਸਾਰ ਚੱਲ ਰਹੀ ਹੈ, ਇਹ ਰੇਲਗੱਡੀ ਆਪਣੇ ਨਿਰਧਾਰਤ ਸਮੇਂ (intime) 'ਤੇ ਪਲੇਟਫਾਰਮ ਨੰਬਰ (PF)' ਤੇ ਪਹੁੰਚ ਜਾਵੇਗੀ।",
    origination:
      "ਕ੍ਰਿਪਾ ਕਰਕੇ ਮੈਂ ਤੁਹਾਡਾ ਧਿਆਨ ਦਿਵਾ ਸਕਦਾ ਹਾਂ ਕਿ ਰੇਲਗੱਡੀ ਨੰਬਰ (train_no) (origin) ਤੋਂ (destination), (train_name) ਪਲੇਟਫਾਰਮ ਨੰਬਰ (PF) ਤੋਂ ਰਵਾਨਾ ਹੋਣ ਵਾਲੀ ਹੈ।",
    word_arr: "ਪਹੁੰਚ",
    word_dep: "ਰਵਾਨਗੀ",
    word_stop: "ਰੁਕੋ",
    word_no: "ਰੇਲਗੱਡੀ ਨੰਬਰ",
  },
  {
    additional:
      "इयं रेलगाडी (intime) मध्ये आगमिष्यति, (stop) निमेषानन्तरं (outtime) निर्गमिष्यति।",
    arrived:
      "कृपया भवतः अवधानं प्राप्तुं शक्नोमि, रेलयानसङ्ख्या (train_no) (origin) तः (destination) पर्यन्तं, (train_name) अधुना एव प्ल्याट्फ़ार्म्-सङ्ख्यायां (PF) आगतम्।",
    arriving:
      "कृपया भवतः अवधानं प्राप्तुं शक्नोमि, (origin) तः (destination) पर्यन्तं (train_name) रेलयानसङ्ख्या (train_no) शीघ्रमेव प्ल्याट्फ़ार्म्-सङ्ख्यायां (PF) आगमिष्यति।",
    code: "sa",
    custom:
      "रेलयानसङ्ख्या (train_no), (train_name), सम्प्रति (ghante) घण्टाः (mintu) निमेषैः विलम्बिता अस्ति। एतत् प्ल्याट्फ़ार्म्-सङ्ख्यायां (PF) (intime) (stop) निमेषेषु नियत-विरामेन सह (next_station) पर्यन्तं आगच्छति इति अपेक्ष्यते।",
    custom_ontime:"रेलयानसङ्ख्या (train_no), (train_name), समये प्रचलति। एतत् प्ल्याट्फ़ार्म्-सङ्ख्यायां (PF) (intime) (stop) निमेषेषु नियत-विरामेन सह (next_station) पर्यन्तं आगच्छति इति अपेक्ष्यते।",
    late: "(origin) तः (destination) पर्यन्तं (train_name) रेलयानसङ्ख्या (train_no), निर्धारितसमयात् (ghante) घण्टाः (mintu) निमेषाः विलम्बेन प्रचलति, तथा च प्ल्याट्फ़ार्म् सङ्ख्या (PF) इत्यत्र (intime) आगच्छति इति अपेक्ष्यते।",
    ontime:
      "(origin) तः (destination) पर्यन्तं (train_name) रेलयानसङ्ख्या (train_no) पूर्वनिर्धारितरूपेण प्रचलति, एषा रेलगाडी स्वस्य निर्धारितसमये (intime) प्ल्याट्फ़ार्म् सङ्ख्या (PF) प्राप्स्यति।",
    origination:
      "कृपया भवतः अवधानं प्राप्तुं शक्नोमि, रेलयानसङ्ख्या (train_no) (origin) तः (destination) पर्यन्तं, (train_name) प्ल्याट्फ़ार्म् सङ्ख्या (PF) इत्यतः निर्गमिष्यति।",
    word_arr: "आगमनम्",
    word_dep: "प्रस्थानं",
    word_stop: "स्थगयतु",
    word_no: "रेलयानसङ्ख्या",
  },
  {
    additional:
      "ᱱᱚᱶᱟ ᱴᱮᱨᱮᱱ ᱫᱚ (intime) ᱨᱮ ᱥᱮᱴᱮᱨᱚᱜᱼᱟ ᱟᱨ (stop) ᱴᱤᱲᱤᱡ ᱛᱟᱭᱚᱢ (outtime) ᱨᱮ ᱪᱟᱞᱟᱣᱚᱜᱼᱟ ᱾",
    arrived:
      "ᱤᱧ ᱠᱤ ᱫᱟᱭᱟ ᱠᱟᱛᱮ ᱟᱢᱟᱜ ᱢᱚᱱᱮ ᱮᱢᱢᱮ, ᱴᱮᱨᱮᱱ ᱱᱚᱢᱵᱚᱨ (train_no) (origin) ᱠᱷᱚᱱ (destination) ᱦᱟᱹᱵᱤᱡ, (train_name) ᱥᱴᱞᱟᱴᱯᱷᱳᱨᱟᱢ ᱱᱚᱢᱵᱚᱨ (PF) ᱨᱮ ᱥᱮᱴᱮᱨ ᱟᱠᱟᱱᱟ ᱾",
    arriving:
      "ᱤᱧ ᱠᱤ ᱫᱟᱭᱟ ᱠᱟᱛᱮ ᱟᱢᱟᱜ ᱢᱚᱱᱮ ᱮᱢᱢᱮ, ᱴᱮᱨᱮᱱ ᱱᱚᱢᱵᱚᱨ (train_no) (origin) ᱠᱷᱚᱱ (destination), (train_name) ᱟᱹᱰᱤ ᱠᱚᱢ ᱚᱠᱛᱚ ᱨᱮ ᱯᱷᱚᱞᱴᱯᱷᱳᱨᱟᱢ ᱱᱚᱢᱵᱚᱨ (PF) ᱨᱮ ᱥᱮᱴᱮᱨᱚᱜᱼᱟ ᱾",
    code: "sat",
    custom:
      "ᱴᱮᱨᱮᱱ ᱱᱚᱢᱵᱚᱨ (train_no), (train_name), ᱱᱟᱦᱟᱜ (ghante) ᱴᱟᱲᱟᱝ ᱟᱨ (mintu) ᱴᱤᱲᱤᱡ ᱟᱠᱟᱱᱟ ᱾ ᱱᱚᱶᱟ ᱫᱚ ᱢᱤᱫ (stop) ᱴᱤᱲᱤᱡ ᱜᱚᱴᱟ ᱟᱠᱟᱱ ᱥᱴᱚᱯ ᱥᱟᱶᱛᱮ ᱯᱮᱴᱨᱟᱢ ᱱᱚᱢᱵᱚᱨ (PF) ᱨᱮ (intime) ᱨᱮ (next_station) ᱨᱮ ᱥᱮᱴᱮᱨᱚᱜᱼᱟ ᱢᱮᱱᱛᱮ ᱢᱚᱱᱮ ᱦᱩᱭᱩᱜ ᱠᱟᱱᱟ ᱾",
    custom_ontime:"ᱴᱮᱨᱮᱱ ᱱᱚᱢᱵᱚᱨ (train_no), (train_name), ᱚᱠᱛᱚ ᱞᱮᱠᱟᱛᱮ ᱪᱟᱞᱟᱣᱚᱜ ᱠᱟᱱᱟ ᱾ ᱱᱚᱶᱟ ᱫᱚ ᱢᱤᱫ (stop) ᱴᱤᱲᱤᱡ ᱜᱚᱴᱟ ᱟᱠᱟᱱ ᱥᱴᱚᱯ ᱥᱟᱶᱛᱮ ᱯᱮᱴᱨᱟᱢ ᱱᱚᱢᱵᱚᱨ (PF) ᱨᱮ (intime) ᱨᱮ (next_station) ᱨᱮ ᱥᱮᱴᱮᱨᱚᱜᱼᱟ ᱢᱮᱱᱛᱮ ᱢᱚᱱᱮ ᱦᱩᱭᱩᱜ ᱠᱟᱱᱟ ᱾",
    late: "ᱤᱧ ᱠᱤ ᱫᱟᱭᱟ ᱠᱟᱛᱮ ᱟᱢᱟᱜ ᱢᱚᱱᱮ ᱮᱢᱢᱮ, ᱴᱮᱨᱮᱱ ᱱᱚᱢᱵᱚᱨ (train_no) (origin) ᱠᱷᱚᱱ (destination), (train_name), ᱜᱚᱴᱟ ᱟᱠᱟᱱ ᱚᱠᱛᱚ ᱠᱷᱚᱱ (ghante) ᱴᱟᱲᱟᱝ ᱟᱨ (mintu) ᱴᱤᱲᱤᱡ ᱛᱮ ᱪᱟᱞᱟᱣ ᱟᱠᱟᱱᱟ, ᱟᱨ ᱯᱷᱚᱞᱴᱯᱷᱳᱨᱟᱢ ᱱᱚᱢᱵᱚᱨ (PF) ᱨᱮ (intime) ᱨᱮ ᱥᱮᱴᱮᱨᱚᱜᱼᱟ ᱢᱮᱱᱛᱮ ᱢᱚᱱᱮ ᱦᱩᱭᱩᱜ ᱠᱟᱱᱟ ᱾",
    ontime:
      "ᱤᱧ ᱠᱤ ᱫᱟᱭᱟ ᱠᱟᱛᱮ ᱟᱢᱟᱜ ᱢᱚᱱᱮ ᱮᱢᱢᱮ, ᱴᱮᱨᱮᱱ ᱱᱚᱢᱵᱚᱨ (train_no) (origin) ᱠᱷᱚᱱ (destination), (train_name), ᱛᱟᱹᱞᱤᱠᱟ ᱞᱮᱠᱟᱛᱮ ᱪᱟᱞᱟᱣᱚᱜ ᱠᱟᱱᱟ, ᱱᱚᱶᱟ ᱴᱮᱨᱮᱱ ᱫᱚ ᱚᱱᱟ ᱛᱟᱹᱞᱤᱠᱟ ᱚᱠᱛᱚ (intime) ᱯᱮᱴᱨᱟᱢ ᱱᱚᱢᱵᱚᱨ (PF) ᱨᱮ ᱥᱮᱴᱮᱨᱚᱜᱼᱟ ᱾",
    origination:
      "ᱤᱧ ᱠᱤ ᱫᱟᱭᱟ ᱠᱟᱛᱮ ᱟᱢᱟᱜ ᱢᱚᱱᱮ ᱮᱢᱢᱮ, ᱴᱮᱨᱮᱱ ᱱᱚᱢᱵᱚᱨ (train_no) (origin) ᱠᱷᱚᱱ (destination), (train_name) ᱯᱷᱞᱟᱴᱯᱷᱳᱨᱟᱢ ᱱᱚᱢᱵᱚᱨ (PF) ᱠᱷᱚᱱ ᱪᱟᱞᱟᱣᱚᱜ ᱠᱟᱱᱟ ᱾",
    word_arr: "ᱥᱮᱴᱮᱨ",
    word_dep: "ᱪᱟᱞᱟᱣᱚᱜ",
    word_stop: "ᱵᱚᱱᱚᱫᱚᱞ ᱢᱮ ᱾",
    word_no: "ᱴᱮᱨᱮᱱ ᱱᱚᱢᱵᱚᱨ",
  },
  {
    additional:
      "ہی ٽرین (intime) تی ایندی ۽ (stop) منٽن کان پوء (outtime) تی روانگی ٿیندی",
    arrived:
      "ڇا مان توہان جو ڌیان ڏیندس، ٽرین نمبر (train_no) (origin) کان (destination)، (train_name) بس پلیٽ فارم نمبر (PF) تی پہتو",
    arriving:
      "مہربانی ڪری مان توہان جو ڌیان ڏیندس، ٽرین نمبر (train_no) (origin) کان (destination)، (train_name) جلد ئی پلیٽ فارم نمبر (PF) تی اچی رھیو آھی",
    code: "sd",
    custom:
      "ٽرین نمبر (train_no)، (train_name)، ھن وقت (ghante) ڪلاڪ ۽ (mintu) منٽ دیر آھی ان جی (stop) منٽن جی مقرر ڪیل اسٽاپ سان پلیٽ فارم نمبر (PF) تی (intime) تی (next_station) تی پہچڻ جی امید آھی",
    custom_ontime:"ٽرین نمبر (train_no)، (train_name)، وقت تی ھلندی آھی ان جی (stop) منٽن جی مقرر ڪیل اسٽاپ سان پلیٽ فارم نمبر (PF) تی (intime) تی (next_station) تی پہچڻ جی امید آھی",
    late: "ڇا مان توہان جو ڌیان ڏیندس، ٽرین نمبر (train_no) (origin) کان (destination)، (train_name)، پنھنجی مقرر وقت کان (ghante) ڪلاڪ ۽ (mintu) منٽ دیر سان ھلندی آھی، ۽ پلیٽ فارم نمبر (PF) تی (intime) تی پھچڻ جی امید آھی",
    ontime:
      "ڇا مان توہان جو ڌیان ڏیندس، ٽرین نمبر (train_no) (origin) کان (destination)، (train_name)، مقرر وقت مطابق ہلی رہی آھی، ہی ٽرین پلیٽ فارم نمبر (PF) تی پنھنجی مقرر وقت تی پہچی ویندی (intime)",
    origination:
      "ڇا مان توہان جو ڌیان ڏیندس، ٽرین نمبر (train_no) (origin) کان (destination)، (train_name) پلیٽ فارم نمبر (PF) کان روانگی ٿیڻ واری آھی",
    word_arr: " آمد",
    word_dep: " روانگی",
    word_stop: "روڪیو",
    word_no: "ٽرین نمبر",
  },

  {
    additional:
      "ही ट्रेन (intime) ते पहुचंदो ऐं (stop) मिनटनि खां पोइ (outtime) ते रवाना थींदो",
    arrived:
      "कृपा करे मां तवहां जो ध्यान दयां, ट्रेन जो नम्बरु (train_no) (origin) खां (destination), (train_name) प्लेटफार्म नम्बरु (PF) ते ई पहुची आहे।",
    arriving:
      "कृपा करे मां तवहां जो ध्यान दयां, रेल नंबर (train_no) (origin) खां (destination), (train_name) प्लेटफ़ार्म नंबर (PF) ते जल्दी ई पहुची रही आहे।",
    code: "sd_Deva",
    custom:
      "ट्रेन जो नम्बरु (train_no), (train_name), हिन वक़्त (ghante) घंटो ऐं (mintu) मिनट जी देरी आहे हुन जे प्लेटफार्म नम्बरु (PF) ते (intime) ते (stop) मिनटनि जे तयशुदा रुकणु सां गडु॒ (next_station) ते पहुचणु जी आस आहे",
    custom_ontime:"ट्रेन जो नम्बरु (train_no), (train_name), वक्त ते हलंदो आहे हुन जे प्लेटफार्म नम्बरु (PF) ते (intime) ते (stop) मिनटनि जे तयशुदा रुकणु सां गडु॒ (next_station) ते पहुचणु जी आस आहे",
    late: "कृपा करे मां तवहां जो ध्यान दयां, ट्रेन नंबर (train_no) (origin) खां (destination), (train_name), पंहिंजे तय वक़्त खां (ghante) घंटो ऐं (mintu) मिनट देरि थी रही आहे, ऐं प्लेटफार्म नंबर (PF) ते (intime) ते पहुचणु जी उम्मीद आहे।",
    ontime:
      "कृपा करे मां तवहां जो ध्यान दयां, ट्रेन नंबर (train_no) (origin) खां (destination), (train_name), तय वक़्त ते हलंदो आहे, ही ट्रेन प्लेटफार्म नंबर (PF) ते पंहिंजे तय वक़्त ते पहुचंदो (intime)",
    origination:
      "कृपा करे मां तवहां जो ध्यान दयां, ट्रेन नंबर (train_no) (origin) खां (destination), (train_name) प्लेटफार्म नंबर (PF) खां रवानगीअ वारी आहे।",
    word_arr: "पहुचणु",
    word_dep: "रवाना",
    word_stop: "रूको",
    word_no: "ट्रेन जो नम्बरु",
  },
  {
    additional:
      "இந்த ரயில் (intime) வந்து (outtime) மணிக்கு (stop) நிமிடங்களுக்குப் பிறகு புறப்படும்.",
    arrived:
      "(origin) முதல் (destination) வரையிலான ரயில் எண் (train_no), (train_name) இப்போதுதான் பிளாட்பார்ம் எண் (PF) இல் வந்தது.",
    arriving:
      "(origin) முதல் (destination) வரையிலான ரயில் எண் (train_no), (train_name) விரைவில் பிளாட்பார்ம் எண் (PF) இல் வருகிறது.",
    code: "ta",
    custom:
      "ரயில் எண் (train_no), (train_name), தற்போது (ghante) மணி நேரம் மற்றும் (mintu) நிமிடங்கள் தாமதமாக உள்ளது. இது பிளாட்ஃபார்ம் எண் (PF) இல் (intime) (stop) நிமிட திட்டமிடப்பட்ட நிறுத்தத்துடன் (next_station) மணிக்கு வரும் என்று எதிர்பார்க்கப்படுகிறது.",
    custom_ontime:"ரயில் எண் (train_no), (train_name), சரியான நேரத்தில் இயங்குகிறது. இது பிளாட்ஃபார்ம் எண் (PF) இல் (intime) (stop) நிமிட திட்டமிடப்பட்ட நிறுத்தத்துடன் (next_station) மணிக்கு வரும் என்று எதிர்பார்க்கப்படுகிறது.",
    late: "(origin) முதல் (destination) வரையிலான ரயில் எண் (train_no), (train_name), அதன் திட்டமிடப்பட்ட நேரத்திலிருந்து (ghante) மணி நேரம் மற்றும் (mintu) நிமிடங்கள் தாமதமாக இயங்குகிறது, மேலும் பிளாட்பார்ம் எண் (PF) இல் (intime) வரும் என்று எதிர்பார்க்கப்படுகிறது.",
    ontime:
      "(origin) முதல் (destination) வரையிலான ரயில் எண் (train_no), (train_name), திட்டமிட்டபடி இயங்குகிறது, இந்த ரயில் அதன் திட்டமிடப்பட்ட நேரத்தில் (intime) பிளாட்பார்ம் எண் (PF) ஐ அடையும்.",
    origination:
      "(origin) முதல் (destination) வரையிலான ரயில் எண் (train_no), (train_name) பிளாட்பார்ம் எண் (PF) இலிருந்து புறப்பட உள்ளது.",
    word_arr: "வருகை",
    word_dep: "புறப்பாடு",
    word_stop: "நிறுத்துங்கள்",
    word_no: "ரயில் எண்",
  },
  {
    additional:
      "ఈ రైలు (intime) లో వచ్చి (outtime) వద్ద (stop) నిమిషాల తర్వాత బయలుదేరుతుంది.",
    arrived:
      "(origin) నుండి (destination), (train_name) వరకు ఉన్న రైలు సంఖ్య (train_no) ప్లాట్ఫాం సంఖ్య (PF) లో ఇప్పుడే వచ్చింది.",
    arriving:
      "దయచేసి నేను మీ దృష్టిని ఆకర్షించగలనా, (origin) నుండి (destination) వరకు (train_name) రైలు నంబర్ (train_no) ప్లాట్ఫాం నంబర్ (PF) లో త్వరలో వస్తోంది.",
    code: "te",
    custom:
      " రైలు సంఖ్య (train_no), (train_name), ప్రస్తుతం (ghante) గంట మరియు (mintu) నిమిషాలు ఆలస్యం అవుతోంది. ఇది (stop) నిమిషాల నిర్ణీత విరామంతో ప్లాట్ఫాం నంబర్ (PF) వద్ద (intime) (next_station) కి చేరుకుంటుందని భావిస్తున్నారు.",
    custom_ontime:"రైలు సంఖ్య (train_no), (train_name), సమయానికి నడుస్తోంది. ఇది (stop) నిమిషాల నిర్ణీత విరామంతో ప్లాట్ఫాం నంబర్ (PF) వద్ద (intime) (next_station) కి చేరుకుంటుందని భావిస్తున్నారు. ",
    late: "దయచేసి నేను మీ దృష్టిని ఆకర్షించగలనా, (origin) నుండి (destination), (train_name) వరకు రైలు సంఖ్య (train_no), దాని నిర్ణీత సమయం నుండి (ghante) గంటలు మరియు (mintu) నిమిషాలు ఆలస్యంగా నడుస్తోంది, మరియు ప్లాట్ఫాం నంబర్ (PF) లో (intime) చేరుకుంటుందని భావిస్తున్నారు.",
    ontime:
      "(origin) నుండి (destination), (train_name) వరకు రైలు సంఖ్య (train_no), షెడ్యూల్ ప్రకారం నడుస్తోంది, ఈ రైలు దాని షెడ్యూల్ సమయంలో (intime) ప్లాట్ఫాం సంఖ్య (PF) కి చేరుకుంటుంది.",
    origination:
      "దయచేసి నేను మీ దృష్టిని ఆకర్షించగలనా, రైలు సంఖ్య (train_no) (origin) నుండి (destination), (train_name) ప్లాట్ఫాం సంఖ్య (PF) నుండి బయలుదేరబోతోంది.",
    word_arr: "రాక",
    word_dep: "నిష్క్రమణ",
    word_stop: "ఆపండి",
    word_no: "రైలు సంఖ్య",
  },
  {
    additional:
      "ہی ٽرین (intime) تی ایندی ۽ (stop) منٽن کان پوء (outtime) تی روانگی ٿیندی",
    arrived:
      "ڇا مان توہان جو ڌیان ڏیندس، ٽرین نمبر (train_no) (origin) کان (destination)، (train_name) بس پلیٽ فارم نمبر (PF) تی پہتو",
    arriving:
      "مہربانی ڪری مان توہان جو ڌیان ڏیندس، ٽرین نمبر (train_no) (origin) کان (destination)، (train_name) جلد ئی پلیٽ فارم نمبر (PF) تی اچی رھیو آھی",
    code: "sd",
    custom:
      "ٹرین نمبر (train_no)، (train_name)، فی الحال (ghante) گھنٹہ اور (mintu) منٹ کی تاخیر سے چل رہی ہے۔ اس کے پلیٹ فارم نمبر (PF) پر (intime) پر (stop) منٹ کے طے شدہ اسٹاپ کے ساتھ (next_station) پر پہنچنے کی توقع ہے۔",
    custom_ontime: "ٹرین نمبر (train_no)، (train_name)، وقت پر چل رہا ہے۔ اس کے پلیٹ فارم نمبر (PF) پر (intime) پر (stop) منٹ کے طے شدہ اسٹاپ کے ساتھ (next_station) پر پہنچنے کی توقع ہے۔",
    late: "ڇا مان توہان جو ڌیان ڏیندس، ٽرین نمبر (train_no) (origin) کان (destination)، (train_name)، پنھنجی مقرر وقت کان (ghante) ڪلاڪ ۽ (mintu) منٽ دیر سان ھلندی آھی، ۽ پلیٽ فارم نمبر (PF) تی (intime) تی پھچڻ جی امید آھی",
    ontime:
      "ڇا مان توہان جو ڌیان ڏیندس، ٽرین نمبر (train_no) (origin) کان (destination)، (train_name)، مقرر وقت مطابق ہلی رہی آھی، ہی ٽرین پلیٽ فارم نمبر (PF) تی پنھنجی مقرر وقت تی پہچی ویندی (intime)",
    origination:
      "ڇا مان توہان جو ڌیان ڏیندس، ٽرین نمبر (train_no) (origin) کان (destination)، (train_name) پلیٽ فارم نمبر (PF) کان روانگی ٿیڻ واری آھی",
    word_arr: "آمد",
    word_dep: "روانگی",
    word_stop: "رک جائیں",
    word_no: "ٹرین کا نمبر",
  },
];

//ASR Language Configs
const ASR_LANGUAGE_CONFIGS = {
  streaming: "bn,en,gu,hi,kn,ml,mr,ne,or,pa,sa,si,ta,te,ur".split(","),
  rest: "bn,en,gu,hi,kn,ml,mr,ne,or,pa,sa,si,ta,te,ur".split(","),
  processors: {
    hi: {
      numbers_only: [true, "Numbers Only"],
    },
    mr: {
      numbers_only: [true, "Numbers Only"],
    },
  },
};

export {
  ASR_LANGUAGE_CONFIGS,
  SPEECH_TO_TEXT,
  TEXT_TO_SPEECH,
  TRANSLATION,
  PREDEFINED_ANNOUNCEMENT,
  LANGUAGE_SELECTION,
  TYPE_SELECTION,
};
