import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type MapState = {
  loading: boolean;
  positionsList: { long: number; lat: number; address: string }[];
  centerPosition: [number, number];

  setLoading: (loading: boolean) => void;
  setPositionsList: (
    positions: { long: number; lat: number; address: string }[],
  ) => void;
  setCenterPosition: (position: [number, number]) => void;
};

export const useMapStore = create<MapState>()(
  persist(
    (set) => ({
      loading: true,
      positionsList: [],
      centerPosition: [14.5995, 120.9842],

      setLoading: (loading) => set({ loading }),
      setPositionsList: (positions) => set({ positionsList: positions }),
      setCenterPosition: (position) => set({ centerPosition: position }),
    }),
    { name: "map-store", storage: createJSONStorage(() => localStorage) },
  ),
);
