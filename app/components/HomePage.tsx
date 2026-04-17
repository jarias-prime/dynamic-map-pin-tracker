"use client";

import { useEffect, useRef } from "react";

import { useMapStore } from "@/app/store/MapStore";

import * as L from "leaflet";
import type { LatLngTuple } from "leaflet";
import { useMap, useMapEvents } from "react-leaflet";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  ZoomControl,
} from "react-leaflet";

import { Navigation } from "@/app/features/Navigation/Navigation";
import { MapLayers, mapLayersData } from "@/app/features/MapLayers/index";
import { PinLists } from "@/app/features/PinLists/PinLists";

export default function HomePage() {
  const {
    loading,
    mapType,
    positionsList,
    centerPosition,
    setLoading,
    setMapType,
    setPositionsList,
    setCenterPosition,
  } = useMapStore();

  const redIcon = new L.Icon({
    iconUrl:
      "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
    shadowUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",

    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  const blueIcon = new L.Icon({
    iconUrl:
      "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png",
    shadowUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",

    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  const MapClickHandler = ({
    onAddMarker,
  }: {
    onAddMarker: (
      lat: number,
      lng: number,
      address: { name: string; display_name: string },
    ) => void;
  }) => {
    const { setLoading } = useMapStore();

    useMapEvents({
      async click(e) {
        const { lat, lng } = e.latlng;

        const address = await getAddress(lat, lng, setLoading);

        onAddMarker(lat, lng, address);
      },
    });

    return null;
  };

  const getAddress = async (
    lat: number,
    lng: number,
    setLoading: (loading: boolean) => void,
  ): Promise<{ name: string; display_name: string }> => {
    setLoading(true);
    try {
      setCenterPosition([lat, lng]);

      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`,
      );

      const data = await res.json();

      setLoading(false);

      return {
        name: data.name || "Unknown",
        display_name: data.display_name || "Unknown location",
      };
    } catch (error) {
      setLoading(false);

      console.error("Error fetching address:", error);

      return {
        name: "Error",
        display_name: "Error fetching address",
      };
    }
  };

  const ChangeMapView = ({ center }: { center: LatLngTuple }) => {
    const map = useMap();
    const mapRef = useRef(map);

    useEffect(() => {
      mapRef.current?.flyTo(center, 13);
    }, [center]);

    return null;
  };

  return (
    <>
      <Navigation />
      <MapLayers mapType={mapType} onMapTypeChange={setMapType} />
      <PinLists />
      {loading && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-white/70 backdrop-blur-xs">
          <div className="flex flex-col items-center gap-2">
            <div className="w-10 h-10 border-4 border-border-primary border-t-transparent rounded-full animate-spin"></div>
            <p className="text-gray-600">Loading map...</p>
          </div>
        </div>
      )}
      <MapContainer
        className="relative z-10 h-[calc(100vh-52px)] w-full"
        center={centerPosition}
        zoom={13}
        zoomControl={false}
        whenReady={() => setLoading(false)}
      >
        <ZoomControl position="bottomright" />

        <ChangeMapView center={centerPosition} />

        <TileLayer
          key={mapType}
          url={mapLayersData.find((layer) => layer.key === mapType)!.link}
        />

        <MapClickHandler
          onAddMarker={(
            lat,
            lng,
            address: { name: string; display_name: string },
          ) => {
            setPositionsList([...positionsList, { lat, long: lng, address }]);
          }}
        />

        {positionsList.map((pos, index) => (
          <Marker
            key={index}
            position={[pos.lat, pos.long]}
            icon={
              pos.lat === centerPosition[0] && pos.long === centerPosition[1]
                ? redIcon
                : blueIcon
            }
            draggable={true}
            eventHandlers={{
              dragend: async (e) => {
                const marker = e.target;
                const { lat, lng } = marker.getLatLng();

                const address = await getAddress(lat, lng, setLoading);

                const updatedList = positionsList.map((item, i) =>
                  i === index
                    ? {
                        ...item,
                        lat,
                        long: lng,
                        address,
                      }
                    : item,
                );

                setPositionsList(updatedList);
              },
            }}
          >
            <Popup>{pos.address.display_name}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </>
  );
}
