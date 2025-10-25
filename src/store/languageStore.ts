import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Language = 'en' | 'tel' | 'hi' | 'tm' | 'kn';

interface LanguageStore {
  currentLanguage: Language;
  setLanguage: (language: Language) => void;
}

export const useLanguageStore = create<LanguageStore>()(
  persist(
    (set) => ({
      currentLanguage: 'en', // default English
      setLanguage: (language: Language) => set({ currentLanguage: language }),
    }),
    {
      name: 'language-storage',
    }
  )
);
