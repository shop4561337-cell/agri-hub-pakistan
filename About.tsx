import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { getGetCurrentFarmerQueryKey } from "@workspace/api-client-react";

interface AuthContextType {
  farmerId: number | null;
  setFarmerId: (id: number | null) => void;
}

const AuthContext = createContext<AuthContextType>({ farmerId: null, setFarmerId: () => {} });

export function AuthProvider({ children }: { children: ReactNode }) {
  const [farmerId, setFarmerIdState] = useState<number | null>(() => {
    const stored = localStorage.getItem("agri_farmer_id");
    return stored ? parseInt(stored, 10) : null;
  });

  const setFarmerId = (id: number | null) => {
    setFarmerIdState(id);
    if (id) localStorage.setItem("agri_farmer_id", String(id));
    else localStorage.removeItem("agri_farmer_id");
  };

  return <AuthContext.Provider value={{ farmerId, setFarmerId }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
