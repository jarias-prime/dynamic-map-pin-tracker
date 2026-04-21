import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type MapState = {
  loading: boolean;
  mapType: string;
  mapTypeOptions: {
    key: string;
    label: string;
    link: string;
  }[];
  positionsList: {
    long: number;
    lat: number;
    address: { name: string; display_name: string };
  }[];
  centerPosition: [number, number];
  pinListMobileHeightMax: boolean;

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
  setPinListMobileHeightMax: (isMax: boolean) => void;
};

export const useMapStore = create<MapState>()(
  persist(
    (set) => ({
      loading: true,
      mapType: "osm",
      mapTypeOptions: [
        {
          key: "osm",
          label: "OSM",
          link: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        },
        {
          key: "dark",
          label: "Dark",
          link: "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
        },
        {
          key: "light",
          label: "Light",
          link: "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
        },
        {
          key: "satellite",
          label: "Satellite",
          link: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
        },
      ],
      positionsList: [],
      centerPosition: [-37.8394, 144.942],
      pinListMobileHeightMax: false,

      setLoading: (loading) => set({ loading }),
      setMapType: (mapType) => set({ mapType }),
      setPositionsList: (positions) => set({ positionsList: positions }),
      setCenterPosition: (position) => set({ centerPosition: position }),
      setPinListMobileHeightMax: (isMax) =>
        set({ pinListMobileHeightMax: isMax }),
    }),
    { name: "map-store", storage: createJSONStorage(() => localStorage) },
  ),
);
