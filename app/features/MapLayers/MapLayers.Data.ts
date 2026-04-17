import { type MapLayer } from "./MapLayers.types";

export const mapLayersData: MapLayer[] = [
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
];
