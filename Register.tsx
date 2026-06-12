import { useState } from "react";
import {
  useGetCrops, useCreateCrop, useUpdateCrop, useDeleteCrop,
  getGetCropsQueryKey, getGetDashboardSummaryQueryKey,
} from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import AppSidebar from "@/components/AppSidebar";
import { Plus, Pencil, Trash2, X, Wheat, ChevronDown } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { PAKISTANI_CROP_TYPES } from "@/lib/pakistan-locations";

const statusColors: Record<string, string> = {
  planted: "bg-blue-100 text-blue-700 border-blue-200",
  growing: "bg-green-100 text-green-700 border-green-200",
  harvested: "bg-amber-100 text-amber-700 border-amber-200",
  failed: "bg-red-100 text-red-700 border-red-200",
};

type CropStatus = "planted" | "growing" | "harvested" | "failed";

interface CropFormData {
  name: string; type: string; variety: string; status: CropStatus;
  fieldArea: string; plantedAt: string; expectedHarvest: string; notes: string;
}

const emptyForm: CropFormData = {
  name: "", type: "", variety: "", status: "planted",
  fieldArea: "", plantedAt: new Date().toISOString().split("T")[0], expectedHarvest: "", notes: "",
};

export default function Crops() {
  const qc = useQueryClient();
  const { data: crops, isLoading } = useGetCrops();
  const createCrop = useCreateCrop();
  const updateCrop = useUpdateCrop();
  const deleteCrop = useDeleteCrop();
  const { t, isUrdu } = useI18n();

  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [form, setForm] = useState<CropFormData>(emptyForm);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);

  const invalidate = () => {
    qc.invalidateQueries({ queryKey: getGetCropsQueryKey() });
    qc.invalidateQueries({ queryKey: getGetDashboardSummaryQueryKey() });
  };

  const openAdd = () => { setForm(emptyForm); setEditId(null); setShowForm(true); };
  const openEdit = (crop: NonNullable<typeof crops>[0]) => {
    setForm({
      name: crop.name, type: crop.type, variety: crop.variety ?? "",
      status: crop.status as CropStatus, fieldArea: crop.fieldArea?.toString() ?? "",
      plantedAt: crop.plantedAt, expectedHarvest: crop.expectedHarvest ?? "", notes: crop.notes ?? "",
    });
    setEditId(crop.id);
    setShowForm(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      name: form.name, type: form.type,
      variety: form.variety || null, status: form.status,
      fieldArea: form.fieldArea ? parseFloat(form.fieldArea) : null,
      plantedAt: form.plantedAt,
      expectedHarvest: form.expectedHarvest || null,
      notes: form.notes || null,
    };
    if (editId) {
      updateCrop.mutate({ id: editId, data }, { onSuccess: () => { invalidate(); setShowForm(false); } });
    } else {
      createCrop.mutate({ data }, { onSuccess: () => { invalidate(); setShowForm(false); } });
    }
  };

  const handleDelete = (id: number) => {
    deleteCrop.mutate({ id }, { onSuccess: () => { invalidate(); setDeleteConfirm(null); } });
  };

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
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-serif font-bold text-foreground">{t("cropManagement")}</h1>
            <p className="text-sm text-muted-foreground mt-1">
              {isUrdu ? "بوائی سے کٹائی تک اپنی فصلوں کو ٹریک کریں۔" : "Track all your crops from planting to harvest."}
            </p>
          </div>
          <button onClick={openAdd} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity" data-testid="button-add-crop">
            <Plus className="w-4 h-4" /> {t("addCrop")}
          </button>
        </div>

        {isLoading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => <div key={i} className="h-40 rounded-xl bg-muted animate-pulse" />)}
          </div>
        ) : crops && crops.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {crops.map(crop => {
              const cropMeta = PAKISTANI_CROP_TYPES.find(c => c.value === crop.type);
              return (
                <div key={crop.id} className="bg-card border border-card-border rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow" data-testid={`card-crop-${crop.id}`}>
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-foreground">{crop.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {isUrdu && cropMeta ? cropMeta.labelUr : (cropMeta?.labelEn ?? crop.type)}
                        {crop.variety ? ` — ${crop.variety}` : ""}
                      </p>
                    </div>
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${statusColors[crop.status] ?? "bg-muted text-muted-foreground"}`}>
                      {statusLabel(crop.status)}
                    </span>
                  </div>
                  <div className="space-y-1.5 text-xs text-muted-foreground mb-4">
                    {crop.fieldArea && (
                      <div>{t("area")}: <span className="text-foreground font-medium">{crop.fieldArea} {isUrdu ? "ایکڑ" : "Acres"}</span></div>
                    )}
                    <div>{t("planted")}: <span className="text-foreground font-medium">{crop.plantedAt}</span></div>
                    {crop.expectedHarvest && (
                      <div>{t("expectedHarvestLabel")}: <span className="text-foreground font-medium">{crop.expectedHarvest}</span></div>
                    )}
                    {crop.notes && <div className="italic text-muted-foreground/70 truncate">"{crop.notes}"</div>}
                  </div>
                  <div className="flex gap-2 pt-3 border-t border-border">
                    <button onClick={() => openEdit(crop)} className="flex-1 flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg border border-border text-xs font-medium hover:bg-muted transition-colors" data-testid={`button-edit-crop-${crop.id}`}>
                      <Pencil className="w-3 h-3" /> {t("edit")}
                    </button>
                    <button onClick={() => setDeleteConfirm(crop.id)} className="flex-1 flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg border border-destructive/30 text-destructive text-xs font-medium hover:bg-destructive/5 transition-colors" data-testid={`button-delete-crop-${crop.id}`}>
                      <Trash2 className="w-3 h-3" /> {t("delete")}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-20 bg-card border border-card-border rounded-xl">
            <Wheat className="w-14 h-14 text-muted-foreground/30 mx-auto mb-4" />
            <h3 className="font-semibold text-foreground mb-2">{t("noCrops")}</h3>
            <p className="text-sm text-muted-foreground mb-4">{t("noCropsDesc")}</p>
            <button onClick={openAdd} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90">
              <Plus className="w-4 h-4" /> {t("addFirstCrop")}
            </button>
          </div>
        )}

        {/* Add/Edit modal */}
        {showForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
            <div className="bg-card rounded-2xl shadow-2xl w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-lg font-serif font-bold">{editId ? t("editCrop") : t("addNewCrop")}</h2>
                <button onClick={() => setShowForm(false)} className="p-1.5 rounded-lg hover:bg-muted transition-colors"><X className="w-4 h-4" /></button>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">{t("cropName")} *</label>
                    <input
                      required
                      value={form.name}
                      onChange={e => setForm({ ...form, name: e.target.value })}
                      placeholder={isUrdu ? "مثلاً گندم" : "e.g. Gandum"}
                      className="w-full px-3 py-2 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                      data-testid="input-crop-name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">{t("cropType")} *</label>
                    <div className="relative">
                      <select
                        required
                        value={form.type}
                        onChange={e => setForm({ ...form, type: e.target.value })}
                        className="appearance-none w-full px-3 py-2 pr-8 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                        data-testid="select-crop-type"
                      >
                        <option value="">{isUrdu ? "فصل منتخب کریں" : "Select crop"}</option>
                        {PAKISTANI_CROP_TYPES.map(c => (
                          <option key={c.value} value={c.value}>
                            {isUrdu ? c.labelUr : c.labelEn}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">{t("variety")}</label>
                    <input
                      value={form.variety}
                      onChange={e => setForm({ ...form, variety: e.target.value })}
                      placeholder={isUrdu ? "مثلاً انقلاب-91" : "e.g. Inqilab-91"}
                      className="w-full px-3 py-2 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">{t("status")}</label>
                    <select
                      value={form.status}
                      onChange={e => setForm({ ...form, status: e.target.value as CropStatus })}
                      className="w-full px-3 py-2 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                      data-testid="select-crop-status"
                    >
                      <option value="planted">{t("statusPlanted")}</option>
                      <option value="growing">{t("statusGrowing")}</option>
                      <option value="harvested">{t("statusHarvested")}</option>
                      <option value="failed">{t("statusFailed")}</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">{t("fieldArea")}</label>
                    <input
                      type="number"
                      step="0.5"
                      value={form.fieldArea}
                      onChange={e => setForm({ ...form, fieldArea: e.target.value })}
                      placeholder={isUrdu ? "مثلاً 5" : "e.g. 5"}
                      className="w-full px-3 py-2 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">{t("plantedDate")} *</label>
                    <input
                      required
                      type="date"
                      value={form.plantedAt}
                      onChange={e => setForm({ ...form, plantedAt: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">{t("expectedHarvest")}</label>
                  <input
                    type="date"
                    value={form.expectedHarvest}
                    onChange={e => setForm({ ...form, expectedHarvest: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">{t("notes")}</label>
                  <textarea
                    rows={2}
                    value={form.notes}
                    onChange={e => setForm({ ...form, notes: e.target.value })}
                    placeholder={isUrdu ? "اضافی نوٹس..." : "Any additional notes..."}
                    className="w-full px-3 py-2 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                  />
                </div>
                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="flex-1 py-2.5 rounded-lg border border-border text-sm font-medium hover:bg-muted transition-colors"
                  >
                    {t("cancel")}
                  </button>
                  <button
                    type="submit"
                    disabled={createCrop.isPending || updateCrop.isPending}
                    className="flex-1 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
                    data-testid="button-crop-save"
                  >
                    {createCrop.isPending || updateCrop.isPending
                      ? t("saving")
                      : editId ? t("saveChanges") : t("addCrop")}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Delete confirm */}
        {deleteConfirm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
            <div className="bg-card rounded-2xl shadow-2xl w-full max-w-sm p-6 text-center">
              <Trash2 className="w-10 h-10 text-destructive mx-auto mb-3" />
              <h3 className="font-semibold text-lg mb-2">{t("deleteCrop")}</h3>
              <p className="text-sm text-muted-foreground mb-5">{t("deleteConfirm")}</p>
              <div className="flex gap-3">
                <button onClick={() => setDeleteConfirm(null)} className="flex-1 py-2.5 rounded-lg border border-border text-sm font-medium hover:bg-muted">{t("cancel")}</button>
                <button
                  onClick={() => handleDelete(deleteConfirm)}
                  disabled={deleteCrop.isPending}
                  className="flex-1 py-2.5 rounded-lg bg-destructive text-destructive-foreground text-sm font-medium hover:opacity-90 disabled:opacity-50"
                  data-testid="button-confirm-delete"
                >
                  {deleteCrop.isPending ? t("deleting") : t("delete")}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AppSidebar>
  );
}
