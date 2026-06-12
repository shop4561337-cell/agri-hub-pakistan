export interface PakistanLocation {
  province: string;
  provinceUrdu: string;
  cities: { name: string; urdu: string }[];
}

export const PAKISTAN_LOCATIONS: PakistanLocation[] = [
  {
    province: "Punjab",
    provinceUrdu: "پنجاب",
    cities: [
      { name: "Faisalabad", urdu: "فیصل آباد" },
      { name: "Lahore", urdu: "لاہور" },
      { name: "Sargodha", urdu: "سرگودھا" },
      { name: "Sheikhupura", urdu: "شیخوپورہ" },
      { name: "Multan", urdu: "ملتان" },
      { name: "Sahiwal", urdu: "ساہیوال" },
      { name: "Gujranwala", urdu: "گجرانوالہ" },
      { name: "Okara", urdu: "اوکاڑہ" },
      { name: "Jhang", urdu: "جھنگ" },
      { name: "Khanewal", urdu: "خانیوال" },
      { name: "Vehari", urdu: "وہاڑی" },
      { name: "Pakpattan", urdu: "پاکپتن" },
      { name: "Bahawalnagar", urdu: "بہاولنگر" },
      { name: "Bahawalpur", urdu: "بہاولپور" },
      { name: "Rahim Yar Khan", urdu: "رحیم یار خان" },
      { name: "Hafizabad", urdu: "حافظ آباد" },
      { name: "Chiniot", urdu: "چنیوٹ" },
      { name: "Nankana Sahib", urdu: "ننکانہ صاحب" },
      { name: "Sialkot", urdu: "سیالکوٹ" },
      { name: "Gujrat", urdu: "گجرات" },
    ],
  },
  {
    province: "Sindh",
    provinceUrdu: "سندھ",
    cities: [
      { name: "Hyderabad", urdu: "حیدرآباد" },
      { name: "Sukkur", urdu: "سکھر" },
      { name: "Larkana", urdu: "لاڑکانہ" },
      { name: "Nawabshah (Shaheed Benazirabad)", urdu: "نوابشاہ" },
      { name: "Mirpur Khas", urdu: "میرپور خاص" },
      { name: "Jacobabad", urdu: "جیکب آباد" },
      { name: "Shikarpur", urdu: "شکارپور" },
      { name: "Sanghar", urdu: "سانگھڑ" },
      { name: "Dadu", urdu: "دادو" },
      { name: "Thatta", urdu: "ٹھٹھہ" },
      { name: "Badin", urdu: "بدین" },
      { name: "Tando Adam", urdu: "ٹنڈو آدم" },
    ],
  },
  {
    province: "Khyber Pakhtunkhwa (KPK)",
    provinceUrdu: "خیبر پختونخوا",
    cities: [
      { name: "Peshawar", urdu: "پشاور" },
      { name: "Mardan", urdu: "مردان" },
      { name: "Swabi", urdu: "صوابی" },
      { name: "Charsadda", urdu: "چارسدہ" },
      { name: "Nowshera", urdu: "نوشہرہ" },
      { name: "Bannu", urdu: "بنوں" },
      { name: "Dera Ismail Khan", urdu: "ڈیرہ اسماعیل خان" },
      { name: "Kohat", urdu: "کوہاٹ" },
      { name: "Abbottabad", urdu: "ایبٹ آباد" },
      { name: "Mansehra", urdu: "مانسہرہ" },
    ],
  },
  {
    province: "Balochistan",
    provinceUrdu: "بلوچستان",
    cities: [
      { name: "Quetta", urdu: "کوئٹہ" },
      { name: "Turbat", urdu: "تُربت" },
      { name: "Khuzdar", urdu: "خضدار" },
      { name: "Hub", urdu: "حب" },
      { name: "Dera Murad Jamali", urdu: "ڈیرہ مراد جمالی" },
      { name: "Sibi", urdu: "سبی" },
      { name: "Chaman", urdu: "چمن" },
      { name: "Zhob", urdu: "ژوب" },
    ],
  },
  {
    province: "Azad Kashmir",
    provinceUrdu: "آزاد کشمیر",
    cities: [
      { name: "Muzaffarabad", urdu: "مظفرآباد" },
      { name: "Mirpur", urdu: "میرپور" },
      { name: "Rawalakot", urdu: "راولاکوٹ" },
    ],
  },
  {
    province: "Gilgit-Baltistan",
    provinceUrdu: "گلگت بلتستان",
    cities: [
      { name: "Gilgit", urdu: "گلگت" },
      { name: "Skardu", urdu: "سکردو" },
      { name: "Chilas", urdu: "چلاس" },
    ],
  },
];

export const PAKISTANI_CROP_TYPES = [
  { value: "wheat", labelEn: "Wheat (Gandum)", labelUr: "گندم" },
  { value: "rice", labelEn: "Rice (Chawal)", labelUr: "چاول" },
  { value: "sugarcane", labelEn: "Sugarcane (Kamad)", labelUr: "کماد" },
  { value: "cotton", labelEn: "Cotton (Kapaas)", labelUr: "کپاس" },
  { value: "maize", labelEn: "Maize (Makki)", labelUr: "مکئی" },
  { value: "potato", labelEn: "Potato (Alu)", labelUr: "آلو" },
  { value: "onion", labelEn: "Onion (Pyaz)", labelUr: "پیاز" },
  { value: "tomato", labelEn: "Tomato (Tamatar)", labelUr: "ٹماٹر" },
  { value: "mustard", labelEn: "Mustard (Sarson)", labelUr: "سرسوں" },
  { value: "sunflower", labelEn: "Sunflower (Surajmukhi)", labelUr: "سورج مکھی" },
  { value: "chickpea", labelEn: "Chickpea (Chanay)", labelUr: "چنے" },
  { value: "mango", labelEn: "Mango (Aam)", labelUr: "آم" },
];
