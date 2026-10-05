"use client";

import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";

type CondoContextValue = {
  condo: string;
  setCondo: (condo: string) => void;
  chooseCondo: (condo: string) => void;
};

const CondoContext = createContext<CondoContextValue | null>(null);

export function CondoProvider({ children }: { children: ReactNode }) {
  const [condo, setCondo] = useState("");

  function chooseCondo(next: string) {
    setCondo(next);
    document.getElementById("inquiry")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <CondoContext.Provider value={{ condo, setCondo, chooseCondo }}>
      {children}
    </CondoContext.Provider>
  );
}

export function useCondo() {
  const value = useContext(CondoContext);
  if (!value) {
    throw new Error("useCondo must be used within CondoProvider");
  }
  return value;
}
