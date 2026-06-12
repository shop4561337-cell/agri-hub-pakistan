import { useGetDashboardSummary, useGetCurrentWeather, useGetCurrentFarmer } from "@workspace/api-client-react";
import AppSidebar from "@/components/AppSidebar";
import { Wheat, TrendingUp, CheckCircle2, CloudSun, Droplets, Wind, Thermometer, Clock, Sprout } from "lucide-react";
import { Link } from "wouter";
import { useI18n } from "@/lib/i18n";

const statusColors: Record<string, string> = {
  planted: "bg-blue-100 text-blue-700",
  growing: "bg-green-100 text-green-700",
  harvested: "bg-amber-100 text-amber-700",
  failed: "bg-red-100 text-red-700",
};

export default function Dashboard() {
  const { data: farmer } = useGetCurrentFarmer();
  const { data: summary, isLoading: summaryLoading } = useGetDashboardSummary();
  const { data: weather, isLoading: weatherLoading } = useGetCurrentWeather();
  const { t, isUrdu } = useI18n();

  const statusLabel = (s: string) => {
    const map: Record<string, string> = {
      planted: t("statusPlanted"),
      growing: t("statusGrowing"),
      harvested: t("statusHarvested"),
      failed: t("statusFailed"),
    };
    return map[s] ?? s;
  };

  return (
    <AppSidebar>
      <div className="p-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-serif font-bold text-foreground">
            {t("welcomeBack2")}, {farmer?.name?.split(" ")[0] ?? (isUrdu ? "کسان" : "Farmer")}
          </h1>
          <p className="text-muted-foreground text-sm mt-1">{farmer?.farmName} &mdash; {farmer?.location}</p>
        </div>

        {/* Stats */}
        {summaryLoading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[...Array(4)].map((_, i) => <div key={i} className="h-24 rounded-xl bg-muted animate-pulse" />)}
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[
              { label: t("totalCrops"),  value: summary?.totalCrops ?? 0,                  icon: Wheat,        color: "bg-primary/10 text-primary" },
              { label: t("activeCrops"), value: summary?.activeCrops ?? 0,                 icon: Sprout,       color: "bg-green-100 text-green-700" },
              { label: t("harvested"),   value: summary?.harvestedCrops ?? 0,              icon: CheckCircle2, color: "bg-amber-100 text-amber-700" },
              { label: t("cropTypes"),   value: summary?.cropsByStatus?.length ?? 0,       icon: TrendingUp,   color: "bg-blue-100 text-blue-700" },
            ].map(({ label, value, icon: Icon, color }) => (
              <div key={label} className="bg-card border border-card-border rounded-xl p-5 shadow-sm flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">{value}</div>
                  <div className="text-sm text-muted-foreground">{label}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Crop breakdown */}
          <div className="lg:col-span-2 bg-card border border-card-border rounded-xl p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-foreground">{t("cropsByStatus")}</h2>
              <Link href="/crops" className="text-sm text-primary hover:underline">{t("manageCrops")} &rarr;</Link>
            </div>
            {summaryLoading ? (
              <div className="space-y-3">{[...Array(3)].map((_, i) => <div key={i} className="h-10 rounded-lg bg-muted animate-pulse" />)}</div>
            ) : summary?.cropsByStatus && summary.cropsByStatus.length > 0 ? (
              <div className="space-y-3">
                {summary.cropsByStatus.map(({ status, count }) => (
                  <div key={status} className="flex items-center gap-3">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusColors[status] ?? "bg-muted text-muted-foreground"}`}>
                      {statusLabel(status)}
                    </span>
                    <div className="flex-1 bg-muted rounded-full h-2">
                      <div
                        className="h-2 rounded-full bg-primary transition-all"
                        style={{ width: `${Math.max(10, (count / (summary.totalCrops || 1)) * 100)}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium text-foreground w-8 text-right">{count}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-10 text-muted-foreground">
                <Wheat className="w-10 h-10 mx-auto mb-3 opacity-30" />
                <p className="text-sm">{isUrdu ? "ابھی کوئی فصل نہیں۔" : "No crops yet."}</p>
                <Link href="/crops" className="text-sm text-primary hover:underline mt-1 inline-block">
                  {t("addFirstCrop")} &rarr;
                </Link>
              </div>
            )}
          </div>

          {/* Weather widget */}
          <div className="bg-card border border-card-border rounded-xl p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-foreground">{t("currentWeather")}</h2>
              <Link href="/weather" className="text-sm text-primary hover:underline">{t("fullForecast")} &rarr;</Link>
            </div>
            {weatherLoading ? (
              <div className="space-y-3">{[...Array(4)].map((_, i) => <div key={i} className="h-8 rounded bg-muted animate-pulse" />)}</div>
            ) : weather ? (
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <CloudSun className="w-10 h-10 text-amber-500" />
                  <div>
                    <div className={`text-3xl font-bold ${weather.temperature >= 40 ? "text-orange-600" : "text-foreground"}`}>
                      {weather.temperature}°C
                    </div>
                    <div className="text-sm text-muted-foreground">{weather.condition}</div>
                  </div>
                </div>
                <div className="space-y-2.5 text-sm">
                  {[
                    { icon: Droplets,    label: t("humidity"),  value: `${weather.humidity}%` },
                    { icon: Wind,        label: t("windSpeed"), value: `${weather.windSpeed} km/h` },
                    { icon: Thermometer, label: t("uvIndex"),   value: String(weather.uvIndex ?? "—") },
                  ].map(({ icon: Icon, label, value }) => (
                    <div key={label} className="flex items-center justify-between text-muted-foreground">
                      <div className="flex items-center gap-2"><Icon className="w-4 h-4" />{label}</div>
                      <span className="font-medium text-foreground">{value}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-3 border-t border-border text-xs text-muted-foreground flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {t("lastUpdated")} &bull; {weather.location}
                </div>
              </div>
            ) : null}
          </div>
        </div>

        {/* Recent activity */}
        {summary?.recentActivity && summary.recentActivity.length > 0 && (
          <div className="mt-6 bg-card border border-card-border rounded-xl p-5 shadow-sm">
            <h2 className="font-semibold text-foreground mb-4">{t("recentActivity")}</h2>
            <div className="space-y-3">
              {summary.recentActivity.map((a, i) => (
                <div key={i} className="flex items-start gap-3 text-sm">
                  <div className="w-2 h-2 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                  <div className="flex-1 text-foreground">{a.message}</div>
                  <div className="text-muted-foreground text-xs whitespace-nowrap">{new Date(a.createdAt).toLocaleDateString()}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </AppSidebar>
  );
}
