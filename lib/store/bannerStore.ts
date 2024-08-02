import { create } from "zustand";
import { BannerType } from "@/app/page";

interface BannerStoreState {
  banners: BannerType[];
  setBanners: (banners: BannerType[]) => void;
  updateBanner: (banner: BannerType) => void;
  selectedBanner: BannerType | null;
  setSelectedBanner: (banner: BannerType | null) => void;
  updateTitle: (title: string) => void;
  updateDescription: (description: string) => void;
  updateCTA: (cta: string) => void;
  updateImage: (imageURL: string) => void;
}

export const useBannerStore = create<BannerStoreState>()((set) => ({
  banners: [],
  setBanners: (banners) => set(() => ({ banners: banners })),
  updateBanner: (banner) =>
    set((state) => {
      const updatedBanners = state.banners.map((item) =>
        item.id === banner.id ? banner : item
      );
      return { banners: updatedBanners };
    }),
  selectedBanner: null,
  setSelectedBanner: (selectedBanner) =>
    set(() => ({ selectedBanner: selectedBanner })),
  updateTitle: (title) =>
    set((state) => ({
      selectedBanner: state.selectedBanner && {
        ...state.selectedBanner,
        title: {
          ...state.selectedBanner?.title,
          content: title,
        },
      },
    })),
  updateDescription: (description) =>
    set((state) => ({
      selectedBanner: state.selectedBanner && {
        ...state.selectedBanner,
        description: {
          ...state.selectedBanner?.description,
          content: description,
        },
      },
    })),
  updateCTA: (cta) =>
    set((state) => ({
      selectedBanner: state.selectedBanner && {
        ...state.selectedBanner,
        cta: {
          ...state.selectedBanner?.cta,
          content: cta,
        },
      },
    })),
  updateImage: (url) =>
    set((state) => ({
      selectedBanner: state.selectedBanner && {
        ...state.selectedBanner,
        image: {
          ...state.selectedBanner?.image,
          url: url,
        },
      },
    })),
}));
