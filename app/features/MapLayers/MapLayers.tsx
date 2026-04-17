import { Dropdown } from "@/app/components/ui/Dropdown/Dropdown";
import { mapLayersData } from "./MapLayers.Data";

interface MapLayersProps {
  mapType: string;
  onMapTypeChange: (mapType: string) => void;
}

export const MapLayers = ({ mapType, onMapTypeChange }: MapLayersProps) => {
  return (
    <div className="fixed z-30 top-20 right-4">
      <Dropdown
        options={mapLayersData.map((layer) => ({
          value: layer.key,
          label: layer.label,
        }))}
        value={mapType}
        placeholder="Select map type"
        onChange={onMapTypeChange}
        className="w-32"
      />
    </div>
  );
};
