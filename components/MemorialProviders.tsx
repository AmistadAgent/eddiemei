"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

type MemorialState = {
  simpleMode: boolean;
  setSimpleMode: (v: boolean) => void;
  toggleSimpleMode: () => void;
};

const MemorialContext = createContext<MemorialState | null>(null);

const SIMPLE_KEY = "eddiemei-simple";

export function MemorialProviders({ children }: { children: React.ReactNode }) {
  const [simpleMode, setSimpleModeState] = useState(false);

  useEffect(() => {
    try {
      const sm = localStorage.getItem(SIMPLE_KEY);
      if (sm === "1") setSimpleModeState(true);
    } catch {
      // ignore
    }
  }, []);

  const setSimpleMode = useCallback((v: boolean) => {
    setSimpleModeState(v);
    try {
      localStorage.setItem(SIMPLE_KEY, v ? "1" : "0");
    } catch {
      // ignore
    }
  }, []);

  const toggleSimpleMode = useCallback(() => {
    setSimpleModeState((m) => {
      const n = !m;
      try {
        localStorage.setItem(SIMPLE_KEY, n ? "1" : "0");
      } catch {
        // ignore
      }
      return n;
    });
  }, []);

  const value = useMemo(
    () => ({
      simpleMode,
      setSimpleMode,
      toggleSimpleMode,
    }),
    [simpleMode, setSimpleMode, toggleSimpleMode]
  );

  return (
    <MemorialContext.Provider value={value}>
      {children}
    </MemorialContext.Provider>
  );
}

export function useMemorial() {
  const c = useContext(MemorialContext);
  if (!c) {
    throw new Error("useMemorial must be used within MemorialProviders");
  }
  return c;
}
