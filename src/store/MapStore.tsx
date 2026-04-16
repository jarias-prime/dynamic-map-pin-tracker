import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type MapState = {
  loading: boolean;
  mapType: string;
  positionsList: {
    long: number;
    lat: number;
    address: { name: string; display_name: string };
  }[];
  centerPosition: [number, number];

  setLoading: (loading: boolean) => void;
  setMapType: (mapType: string) => void;
  setPositionsList: (
    positions: {
      long: number;
      lat: number;
      address: { name: string; display_name: string };
    }[],
  ) => void;
  setCenterPosition: (position: [number, number]) => void;
};

export const useMapStore = create<MapState>()(
  persist(
    (set) => ({
      loading: true,
      mapType: "osm",
      positionsList: [],
      centerPosition: [14.5995, 120.9842],

      setLoading: (loading) => set({ loading }),
      setMapType: (mapType) => set({ mapType }),
      setPositionsList: (positions) => set({ positionsList: positions }),
      setCenterPosition: (position) => set({ centerPosition: position }),
    }),
    { name: "map-store", storage: createJSONStorage(() => localStorage) },
  ),
);
