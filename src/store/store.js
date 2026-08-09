import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAppStore = create(
  persist(
    (set, get) => ({
      language: "ar",
      theme: "light",
      isSidebarOpen: false,

      setLanguage: (lang) => set({ language: lang }),

      toggleLanguage: () => {
        const current = get().language;
        const newLang = current === "en" ? "ar " : "en";
        set({ language: newLang });
        document.dir = newLang === "ar" ? "rtl" : "ltr";
        document.documentElement.lang = newLang;
      },

      setTheme: (theme) => set({ theme: theme }),
      toggleTheme: () =>
        set((state) => ({
          theme: state.theme === "light" ? "dark" : "light",
        })),

      toggleSidebar: () =>
        set((state) => ({
          isSidebarOpen: !state.isSidebarOpen,
        })),

      closeSidebar: () => set({ isSidebarOpen: false }),
      openSidebar: () => set({ isSidebarOpen: true }),
    }),
    {
      name: "app-storage",
      partialize: (state) => ({
        language: state.language,
        theme: state.theme,
      }),
    },
  ),
);

export default useAppStore;
