import { create } from 'zustand';

interface ShellState {
  mobileSidebarOpen: boolean;
  setMobileSidebarOpen: (open: boolean) => void;
  toggleMobileSidebar: () => void;
}

export const useShellStore = create<ShellState>(set => ({
  mobileSidebarOpen: false,
  setMobileSidebarOpen: open => set({ mobileSidebarOpen: open }),
  toggleMobileSidebar: () =>
    set(s => ({ mobileSidebarOpen: !s.mobileSidebarOpen })),
}));
