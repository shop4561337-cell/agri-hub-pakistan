import { useState } from "react";
import { useGetFertilizerRecommendations } from "@workspace/api-client-react";
import AppSidebar from "@/components/AppSidebar";
import { FlaskConical, Search, AlertTriangle, ChevronDown } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { PAKISTANI_CROP_TYPES } from "@/lib/pakistan-locations";

const ALL = "All";

export default function Fertilizers() {
  const { data: fertilizers, isLoading } = useGetFertilizerRecommendations();
  const [search, setSearch] = useState("");
  const [selectedCrop, setSelectedCrop] = useState(ALL);
  const { t, isUrdu } = useI18n();

  const filtered = fertilizers?.filter(f => {
    const matchesCrop = selectedCrop === ALL || f.cropType === selectedCrop;
    const matchesSearch = !search
      || f.fertilizerName.toLowerCase().includes(search.toLowerCase())
      || f.cropType.toLowerCase().includes(search.toLowerCase());
    return matchesCrop && matchesSearch;
  });

  return (
    <AppSidebar>
      <div className="p-6 max-w-6xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-serif font-bold text-foreground">{t("fertilizerRec")}</h1>
          <p className="text-sm text-muted-foreground mt-1">{t("fertilizerDesc")}</p>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute start-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="search"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder={t("searchFertilizers")}
              className="w-full ps-9 pe-4 py-2.5 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              data-testid="input-fertilizer-search"
            />
          </div>
          <div className="relative">
            <select
              value={selectedCrop}
              onChange={e => setSelectedCrop(e.target.value)}
              className="appearance-none px-4 py-2.5 pr-9 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring min-w-[190px]"
              data-testid="select-fertilizer-crop"
            >
              <option value={ALL}>{t("allCrops")}</option>
              {PAKISTANI_CROP_TYPES.map(c => (
                <option key={c.value} value={c.value}>
                  {isUrdu ? c.labelUr : c.labelEn}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute end-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
          </div>
        </div>

        {isLoading ? (
          <div className="grid sm:grid-cols-2 gap-4">
            {[...Array(6)].map((_, i) => <div key={i} className="h-48 rounded-xl bg-muted animate-pulse" />)}
          </div>
        ) : filtered && filtered.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map(f => {
              const cropLabel = PAKISTANI_CROP_TYPES.find(c => c.value === f.cropType);
              return (
                <div key={f.id} className="bg-card border border-card-border rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow" data-testid={`card-fertilizer-${f.id}`}>
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <FlaskConical className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground text-sm leading-tight">{f.fertilizerName}</h3>
                      <span className="inline-block mt-1 px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-medium">
                        {isUrdu && cropLabel ? cropLabel.labelUr : (cropLabel?.labelEn ?? f.cropType)}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-muted-foreground leading-relaxed mb-4">{f.description}</p>

                  <div className="space-y-1.5 text-xs">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">{t("npkRatio")}</span>
                      <span className="font-semibold text-foreground font-mono">{f.npkRatio}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">{t("applicationRate")}</span>
                      <span className="font-medium text-foreground">{f.applicationRate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">{t("bestSeason")}</span>
                      <span className="font-medium text-foreground">{f.season}</span>
                    </div>
                  </div>

                  {f.warnings && (
                    <div className="mt-3 flex items-start gap-2 p-2.5 rounded-lg bg-amber-50 border border-amber-200">
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-600 flex-shrink-0 mt-0.5" />
                      <p className="text-xs text-amber-700">{f.warnings}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-20 bg-card border border-card-border rounded-xl">
            <FlaskConical className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
            <p className="text-muted-foreground">{t("noFertilizers")}</p>
          </div>
        )}
      </div>
    </AppSidebar>
  );
}
