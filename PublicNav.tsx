import { useState } from "react";
import { Link, useLocation } from "wouter";
import {
  Sprout, LayoutDashboard, Wheat, CloudSun, MessageSquare,
  FlaskConical, Bug, LogOut, Menu, ChevronRight
} from "lucide-react";
import { useLogoutFarmer, getGetCurrentFarmerQueryKey } from "@workspace/api-client-react";
import { useAuth } from "@/lib/auth";
import { useI18n } from "@/lib/i18n";
import { useQueryClient } from "@tanstack/react-query";
import LanguageToggle from "@/components/LanguageToggle";

export default function AppSidebar({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { setFarmerId } = useAuth();
  const { t } = useI18n();
  const queryClient = useQueryClient();
  const logout = useLogoutFarmer();

  const navItems = [
    { href: "/dashboard", label: t("dashboard"), icon: LayoutDashboard },
    { href: "/crops", label: t("cropManagement"), icon: Wheat },
    { href: "/weather", label: t("weather"), icon: CloudSun },
    { href: "/chat", label: t("aiAssistant"), icon: MessageSquare },
    { href: "/fertilizers", label: t("fertilizers"), icon: FlaskConical },
    { href: "/pests", label: t("pestsAndDiseases"), icon: Bug },
  ];

  const handleLogout = () => {
    logout.mutate(undefined, {
      onSuccess: () => {
        setFarmerId(null);
        queryClient.removeQueries({ queryKey: getGetCurrentFarmerQueryKey() });
        window.location.href = "/";
      },
    });
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-sidebar text-sidebar-foreground">
      <div className="p-5 border-b border-sidebar-border">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg text-sidebar-foreground">
          <Sprout className="w-6 h-6 text-sidebar-primary" />
          <span className="font-serif">AgroSmart</span>
        </Link>
        <div className="mt-3">
          <LanguageToggle dark />
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navItems.map(({ href, label, icon: Icon }) => {
          const active = location === href;
          return (
            <Link
              key={href}
              href={href}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                active
                  ? "bg-sidebar-primary text-sidebar-primary-foreground"
                  : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-foreground"
              }`}
              data-testid={`nav-${href.replace("/", "")}`}
            >
              <Icon className="w-4 h-4 flex-shrink-0 rtl:ml-0 rtl:mr-0" />
              <span>{label}</span>
              {active && <ChevronRight className="w-3 h-3 ms-auto rtl:rotate-180" />}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-sidebar-border">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground transition-colors w-full"
          data-testid="button-logout"
        >
          <LogOut className="w-4 h-4" />
          <span>{t("logout")}</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex w-64 flex-shrink-0 flex-col">
        <SidebarContent />
      </aside>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-40 flex">
          <div className="fixed inset-0 bg-black/50" onClick={() => setMobileOpen(false)} />
          <aside className="relative z-50 w-64 flex flex-col shadow-xl">
            <SidebarContent />
          </aside>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile topbar */}
        <div className="lg:hidden flex items-center gap-3 px-4 py-3 border-b border-border bg-white">
          <button
            onClick={() => setMobileOpen(true)}
            className="p-2 rounded-lg hover:bg-muted transition-colors"
            data-testid="button-mobile-sidebar"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2 font-bold text-primary">
            <Sprout className="w-5 h-5" />
            <span className="font-serif text-lg">AgroSmart</span>
          </div>
          <div className="ms-auto">
            <LanguageToggle />
          </div>
        </div>

        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
