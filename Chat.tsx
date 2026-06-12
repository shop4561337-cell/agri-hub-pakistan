import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

export type Language = "en" | "ur";

const translations = {
  en: {
    // Nav
    home: "Home",
    aboutUs: "About Us",
    services: "Services",
    contact: "Contact",
    login: "Login",
    register: "Register",
    dashboard: "Dashboard",
    cropManagement: "Crop Management",
    weather: "Weather",
    aiAssistant: "AI Assistant",
    fertilizers: "Fertilizers",
    pestsAndDiseases: "Pests & Diseases",
    logout: "Logout",
    // Auth
    welcomeBack: "Welcome Back",
    signIn: "Sign In",
    signingIn: "Signing in...",
    farmerRegistration: "Farmer Registration",
    createAccount: "Create Account",
    creatingAccount: "Creating Account...",
    demoCredentials: "Demo credentials:",
    fillIn: "Fill in",
    newToAgroSmart: "New to AgroSmart?",
    alreadyHaveAccount: "Already have an account?",
    createYourAccount: "Create your farmer account",
    signInToAccount: "Sign in to your account",
    // Form labels
    fullName: "Full Name",
    emailAddress: "Email Address",
    password: "Password",
    farmName: "Farm Name",
    location: "Location",
    province: "Province",
    city: "City / District",
    phone: "Phone (optional)",
    farmSize: "Farm Size (Acres)",
    variety: "Variety",
    cropType: "Crop Type",
    cropName: "Crop Name",
    status: "Status",
    plantedDate: "Planted Date",
    expectedHarvest: "Expected Harvest Date",
    notes: "Notes",
    fieldArea: "Field Area (Acres)",
    // Dashboard
    totalCrops: "Total Crops",
    activeCrops: "Active Crops",
    harvested: "Harvested",
    cropTypes: "Crop Types",
    cropsByStatus: "Crops by Status",
    manageCrops: "Manage crops",
    currentWeather: "Current Weather",
    fullForecast: "Full forecast",
    recentActivity: "Recent Activity",
    welcomeBack2: "Welcome back",
    // Crops
    addCrop: "Add Crop",
    addFirstCrop: "Add your first crop",
    editCrop: "Edit Crop",
    addNewCrop: "Add New Crop",
    saveChanges: "Save Changes",
    saving: "Saving...",
    deleteCrop: "Delete Crop?",
    deleteConfirm: "This action cannot be undone.",
    cancel: "Cancel",
    delete: "Delete",
    deleting: "Deleting...",
    noCrops: "No crops yet",
    noCropsDesc: "Start tracking your crops by adding your first one.",
    edit: "Edit",
    area: "Area",
    planted: "Planted",
    expectedHarvestLabel: "Expected harvest",
    // Fertilizers
    fertilizerRec: "Fertilizer Recommendations",
    fertilizerDesc: "Science-backed fertilizer guides for Pakistani crops.",
    searchFertilizers: "Search fertilizers...",
    allCrops: "All Crops",
    npkRatio: "NPK Ratio",
    applicationRate: "Application Rate",
    bestSeason: "Best Season",
    noFertilizers: "No fertilizer recommendations found.",
    // Pests
    pestInfo: "Pest & Disease Information",
    pestDesc: "Identify, treat, and prevent common agricultural threats.",
    searchPests: "Search pests, diseases, crops...",
    allTypes: "All Types",
    allSeverities: "All Severities",
    noPests: "No pests or diseases found.",
    symptoms: "Symptoms",
    treatment: "Treatment",
    prevention: "Prevention",
    affectedCrops: "Affected Crops",
    // Weather
    weatherUpdates: "Weather Updates",
    weatherDesc: "Current conditions and 7-day forecast for your farm.",
    dayForecast: "7-Day Forecast",
    humidity: "Humidity",
    windSpeed: "Wind Speed",
    uvIndex: "UV Index",
    rainfall: "Rainfall",
    feelsLike: "Feels Like",
    visibility: "Visibility",
    lastUpdated: "Last updated",
    // Chat
    aiTitle: "AI Agriculture Assistant",
    aiOnline: "Online — powered by GPT",
    aiGreeting: "Your AI Agriculture Assistant",
    aiGreetingDesc: "Ask me anything about crops, pests, fertilizers, weather interpretation, or farming best practices.",
    typeMessage: "Ask about crops, pests, fertilizers...",
    send: "Send",
    enterHint: "Press Enter to send, Shift+Enter for new line",
    // Status
    statusPlanted: "Planted",
    statusGrowing: "Growing",
    statusHarvested: "Harvested",
    statusFailed: "Failed",
    // Currency
    currency: "Rs.",
    // Crop suggestions
    cropSuggestions: "Pakistani crop suggestions:",
  },
  ur: {
    // Nav
    home: "گھر",
    aboutUs: "ہمارے بارے میں",
    services: "خدمات",
    contact: "رابطہ",
    login: "لاگ ان",
    register: "رجسٹر",
    dashboard: "ڈیش بورڈ",
    cropManagement: "فصل مینجمنٹ",
    weather: "موسم",
    aiAssistant: "AI معاون",
    fertilizers: "کھاد",
    pestsAndDiseases: "کیڑے اور بیماریاں",
    logout: "لاگ آؤٹ",
    // Auth
    welcomeBack: "خوش آمدید",
    signIn: "لاگ ان کریں",
    signingIn: "لاگ ان ہو رہا ہے...",
    farmerRegistration: "کسان رجسٹریشن",
    createAccount: "اکاؤنٹ بنائیں",
    creatingAccount: "اکاؤنٹ بن رہا ہے...",
    demoCredentials: "ڈیمو اکاؤنٹ:",
    fillIn: "بھریں",
    newToAgroSmart: "AgroSmart پر نئے ہیں؟",
    alreadyHaveAccount: "پہلے سے اکاؤنٹ ہے؟",
    createYourAccount: "اپنا کسان اکاؤنٹ بنائیں",
    signInToAccount: "اپنے اکاؤنٹ میں لاگ ان کریں",
    // Form labels
    fullName: "پورا نام",
    emailAddress: "ای میل ایڈریس",
    password: "پاس ورڈ",
    farmName: "فارم کا نام",
    location: "مقام",
    province: "صوبہ",
    city: "شہر / ضلع",
    phone: "فون (اختیاری)",
    farmSize: "فارم کا رقبہ (ایکڑ)",
    variety: "قسم",
    cropType: "فصل کی نوعیت",
    cropName: "فصل کا نام",
    status: "حالت",
    plantedDate: "کاشت کی تاریخ",
    expectedHarvest: "متوقع کٹائی کی تاریخ",
    notes: "نوٹس",
    fieldArea: "کھیت کا رقبہ (ایکڑ)",
    // Dashboard
    totalCrops: "کل فصلیں",
    activeCrops: "فعال فصلیں",
    harvested: "کٹائی",
    cropTypes: "فصل کی اقسام",
    cropsByStatus: "حالت کے مطابق فصلیں",
    manageCrops: "فصلیں منظم کریں",
    currentWeather: "موجودہ موسم",
    fullForecast: "مکمل پیش گوئی",
    recentActivity: "حالیہ سرگرمی",
    welcomeBack2: "خوش آمدید",
    // Crops
    addCrop: "فصل شامل کریں",
    addFirstCrop: "پہلی فصل شامل کریں",
    editCrop: "فصل میں ترمیم",
    addNewCrop: "نئی فصل شامل کریں",
    saveChanges: "تبدیلیاں محفوظ کریں",
    saving: "محفوظ ہو رہا ہے...",
    deleteCrop: "فصل حذف کریں؟",
    deleteConfirm: "یہ عمل واپس نہیں ہو سکتا۔",
    cancel: "منسوخ",
    delete: "حذف",
    deleting: "حذف ہو رہا ہے...",
    noCrops: "ابھی کوئی فصل نہیں",
    noCropsDesc: "پہلی فصل شامل کرکے ٹریکنگ شروع کریں۔",
    edit: "ترمیم",
    area: "رقبہ",
    planted: "کاشت",
    expectedHarvestLabel: "متوقع کٹائی",
    // Fertilizers
    fertilizerRec: "کھاد کی سفارشات",
    fertilizerDesc: "پاکستانی فصلوں کے لیے سائنسی کھاد گائیڈ۔",
    searchFertilizers: "کھاد تلاش کریں...",
    allCrops: "تمام فصلیں",
    npkRatio: "NPK تناسب",
    applicationRate: "استعمال کی مقدار",
    bestSeason: "بہترین موسم",
    noFertilizers: "کوئی کھاد سفارشات نہیں ملی۔",
    // Pests
    pestInfo: "کیڑے اور بیماری کی معلومات",
    pestDesc: "عام زرعی خطرات کی شناخت، علاج اور بچاؤ۔",
    searchPests: "کیڑے، بیماریاں، فصلیں تلاش کریں...",
    allTypes: "تمام اقسام",
    allSeverities: "تمام شدتیں",
    noPests: "کوئی کیڑے یا بیماریاں نہیں ملی۔",
    symptoms: "علامات",
    treatment: "علاج",
    prevention: "بچاؤ",
    affectedCrops: "متاثرہ فصلیں",
    // Weather
    weatherUpdates: "موسم کی تازہ کاری",
    weatherDesc: "آپ کے فارم کے لیے موجودہ حالات اور 7 روزہ پیش گوئی۔",
    dayForecast: "7 روزہ پیش گوئی",
    humidity: "نمی",
    windSpeed: "ہوا کی رفتار",
    uvIndex: "UV انڈیکس",
    rainfall: "بارش",
    feelsLike: "محسوس ہوتا ہے",
    visibility: "مرئیت",
    lastUpdated: "آخری اپڈیٹ",
    // Chat
    aiTitle: "زرعی AI معاون",
    aiOnline: "آن لائن — GPT سے چلتا ہے",
    aiGreeting: "آپ کا زرعی AI معاون",
    aiGreetingDesc: "فصل، کیڑے، کھاد، موسم، یا زراعت کے بارے میں کچھ بھی پوچھیں۔",
    typeMessage: "فصل، کیڑے، کھاد کے بارے میں پوچھیں...",
    send: "بھیجیں",
    enterHint: "بھیجنے کے لیے Enter، نئی لائن کے لیے Shift+Enter",
    // Status
    statusPlanted: "کاشت",
    statusGrowing: "بڑھ رہی ہے",
    statusHarvested: "کٹائی ہو چکی",
    statusFailed: "ناکام",
    // Currency
    currency: "Rs.",
    // Crop suggestions
    cropSuggestions: "پاکستانی فصل کی تجاویز:",
  },
} as const;

type TranslationKey = keyof typeof translations.en;

interface I18nContextType {
  lang: Language;
  setLang: (l: Language) => void;
  t: (key: TranslationKey) => string;
  isUrdu: boolean;
}

const I18nContext = createContext<I18nContextType>({
  lang: "en",
  setLang: () => {},
  t: (k) => translations.en[k],
  isUrdu: false,
});

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>(() => {
    return (localStorage.getItem("agri_lang") as Language) ?? "en";
  });

  const setLang = (l: Language) => {
    setLangState(l);
    localStorage.setItem("agri_lang", l);
  };

  useEffect(() => {
    const html = document.documentElement;
    if (lang === "ur") {
      html.setAttribute("dir", "rtl");
      html.setAttribute("lang", "ur");
      html.classList.add("urdu");
    } else {
      html.setAttribute("dir", "ltr");
      html.setAttribute("lang", "en");
      html.classList.remove("urdu");
    }
  }, [lang]);

  const t = (key: TranslationKey): string => translations[lang][key] as string;

  return (
    <I18nContext.Provider value={{ lang, setLang, t, isUrdu: lang === "ur" }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  return useContext(I18nContext);
}
