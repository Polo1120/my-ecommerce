import React, { createContext, useContext, useState, ReactNode } from "react";

interface MiniCartContextType {
  isOpen: boolean;
  openMiniCart: () => void;
  closeMiniCart: () => void;
}

const MiniCartContext = createContext<MiniCartContextType | undefined>(undefined);

export const useMiniCart = () => {
  const context = useContext(MiniCartContext);
  if (!context) throw new Error("useMiniCart debe usarse dentro de MiniCartProvider");
  return context;
};

export const MiniCartProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openMiniCart = () => setIsOpen(true);
  const closeMiniCart = () => setIsOpen(false);

  return (
    <MiniCartContext.Provider value={{ isOpen, openMiniCart, closeMiniCart }}>
      {children}
    </MiniCartContext.Provider>
  );
};
