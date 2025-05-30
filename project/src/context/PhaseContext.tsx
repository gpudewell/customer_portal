import React, { createContext, useContext, useState, ReactNode } from 'react';
import { PhaseSlug } from '../types';

interface PhaseContextType {
  current: PhaseSlug;
  setCurrent: (slug: PhaseSlug) => void;
}

const PhaseContext = createContext<PhaseContextType | undefined>(undefined);

export const PhaseProvider: React.FC<{ children: ReactNode; defaultPhase: PhaseSlug }> = ({
  children,
  defaultPhase
}) => {
  const [current, setCurrent] = useState<PhaseSlug>(defaultPhase);

  return (
    <PhaseContext.Provider value={{ current, setCurrent }}>
      {children}
    </PhaseContext.Provider>
  );
};

export const usePhase = () => {
  const context = useContext(PhaseContext);
  if (!context) {
    throw new Error('usePhase must be used within a PhaseProvider');
  }
  return context;
};