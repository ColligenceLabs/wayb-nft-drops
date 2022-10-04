import create from 'zustand';

export const useModalWalletsStore = create((set) => ({
  isOpenWallet: false,
  updateOpenWallet: (isOpen) => set({ isOpen: isOpen }),
}));

export const useSidebarStore = create((set) => ({
  isOpenSidebar: false,
  openSidebar: () => set({ isOpen: true }),
  closeSidebar: () => set({ isOpen: false }),
}));
