import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Language = 'en' | 'es' | 'fr' | 'de';

interface LanguageStore {
  currentLanguage: Language;
  setLanguage: (language: Language) => void;
}

export const useLanguageStore = create<LanguageStore>()(
  persist(
    (set) => ({
      currentLanguage: 'en',
      setLanguage: (language) => set({ currentLanguage: language }),
    }),
    {
      name: 'language-storage',
    }
  )
);
