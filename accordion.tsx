import { useI18n } from "@/lib/i18n";

export default function LanguageToggle({ dark = false }: { dark?: boolean }) {
  const { lang, setLang } = useI18n();

  return (
    <div className={`flex items-center gap-0.5 rounded-lg border p-0.5 text-xs font-medium ${dark ? "border-white/20 bg-white/10" : "border-border bg-muted"}`}>
      <button
        onClick={() => setLang("en")}
        className={`px-2.5 py-1 rounded-md transition-colors ${
          lang === "en"
            ? dark ? "bg-white text-[hsl(100,25%,13%)]" : "bg-primary text-primary-foreground"
            : dark ? "text-white/70 hover:text-white" : "text-muted-foreground hover:text-foreground"
        }`}
        data-testid="button-lang-en"
        title="English"
      >
        EN
      </button>
      <button
        onClick={() => setLang("ur")}
        className={`px-2.5 py-1 rounded-md transition-colors font-[Noto_Nastaliq_Urdu,serif] ${
          lang === "ur"
            ? dark ? "bg-white text-[hsl(100,25%,13%)]" : "bg-primary text-primary-foreground"
            : dark ? "text-white/70 hover:text-white" : "text-muted-foreground hover:text-foreground"
        }`}
        data-testid="button-lang-ur"
        title="اردو"
      >
        اردو
      </button>
    </div>
  );
}
