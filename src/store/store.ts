import { create } from "zustand";

export type StoreState = {
  updateSearchTag: any;
  updateLikedCount: any;
  searchTag: "";
  likeCount: 0;
};

const useStore = create<StoreState>((set) => ({
  searchTag: "",
  likeCount: 0,
  updateSearchTag: (txt: any) => set((state) => ({ searchTag: txt })),
  updateLikedCount: (num: any) => set((state) => ({ likeCount: num })),
}));

export default useStore;
