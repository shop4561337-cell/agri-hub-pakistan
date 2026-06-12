import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Sprout, Menu, X } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { useI18n } from "@/lib/i18n";
import LanguageToggle from "@/components/LanguageToggle";

export default function PublicNav() {
  const [open, setOpen] = useState(false);
  const [location] = useLocation();
  const { farmerId } = useAuth();
  const { t } = useI18n();

  const links = [
    { href: "/", label: t("home") },
    { href: "/about", label: t("aboutUs") },
    { href: "/services", label: t("services") },
    { href: "/contact", label: t("contact") },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl text-primary">
            <Sprout className="w-7 h-7" />
            <span className="font-serif">AgroSmart</span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            {links.map(l => (
              <Link
                key={l.href}
                href={l.href}
                className={`text-sm font-medium transition-colors hover:text-primary ${location === l.href ? "text-primary" : "text-muted-foreground"}`}
              >
                {l.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <LanguageToggle />
            {farmerId ? (
              <Link href="/dashboard" className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity">
                {t("dashboard")}
              </Link>
            ) : (
              <>
                <Link href="/login" className="px-4 py-2 rounded-lg border border-border text-sm font-medium hover:bg-muted transition-colors">
                  {t("login")}
                </Link>
                <Link href="/register" className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity">
                  {t("register")}
                </Link>
              </>
            )}
          </div>

          <button
            className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
            onClick={() => setOpen(!open)}
            data-testid="button-mobile-menu"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden bg-white border-b border-border px-4 pb-4 space-y-2">
          {links.map(l => (
            <Link
              key={l.href}
              href={l.href}
              className="block py-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ))}
          <div className="pt-2 flex items-center gap-2 flex-wrap">
            <LanguageToggle />
            {farmerId ? (
              <Link href="/dashboard" className="flex-1 text-center px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium">
                {t("dashboard")}
              </Link>
            ) : (
              <>
                <Link href="/login" className="flex-1 text-center px-4 py-2 rounded-lg border border-border text-sm font-medium">{t("login")}</Link>
                <Link href="/register" className="flex-1 text-center px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium">{t("register")}</Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
