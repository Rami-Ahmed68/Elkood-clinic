import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAppStore = create(
  persist(
    (set, get) => ({
      language: "ar",
      theme: "light",
      isSidebarOpen: false,

      setLanguage: (lang) => set({ language: lang }),
      toggleLanguage: () =>
        set((state) => ({
          language: state.language === "ar" ? "en" : "ar",
        })),

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
        user: state.user,
      }),
    },
  ),
);

export default useAppStore;
