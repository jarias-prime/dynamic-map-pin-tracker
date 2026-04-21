"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

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
import formatcoords from "formatcoords";

import { Navigation } from "@/app/features/Navigation/Navigation";
import { MapLayers } from "@/app/features/MapLayers/MapLayers";
import { PinLists } from "@/app/features/PinLists/PinLists";

export default function HomePage() {
  const {
    loading,
    mapType,
    mapTypeOptions,
    positionsList,
    centerPosition,
    setLoading,
    setMapType,
    setPositionsList,
    setCenterPosition,
  } = useMapStore();

  const markerRefs = useRef<{ [key: number]: L.Marker }>({});

  const markerIcon = new L.Icon({
    iconUrl: "/images/map-pin-v2.svg",
    shadowUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
    iconSize: [24, 36],
    iconAnchor: [12, 41],
    popupAnchor: [130, 20],
    shadowSize: [41, 41],
  });

  return (
    <>
      <Navigation />
      <MapLayers mapType={mapType} onMapTypeChange={setMapType} />
      <PinLists
        positions={positionsList}
        onHoverItem={(index) => openPopupForIndex(index, markerRefs)}
        onLeaveList={() => closeAllPopups(markerRefs)}
      />
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
          url={mapTypeOptions.find((layer) => layer.key === mapType)!.link}
        />
        <MapClickHandler
          onAddMarker={(lat, lng, address) => {
            setPositionsList([...positionsList, { lat, long: lng, address }]);
          }}
          setCenterPosition={setCenterPosition}
        />
        {positionsList.map((pos, index) => (
          <Marker
            key={index}
            position={[pos.lat, pos.long]}
            icon={markerIcon}
            draggable={true}
            ref={(ref) => {
              if (ref) {
                markerRefs.current[index] = ref;
              }
            }}
            eventHandlers={{
              dragend: async (e) => {
                const marker = e.target;
                const { lat, lng } = marker.getLatLng();
                const address = await getAddress(
                  lat,
                  lng,
                  setLoading,
                  setCenterPosition,
                );
                const updatedList = positionsList.map((item, i) =>
                  i === index ? { ...item, lat, long: lng, address } : item,
                );

                setPositionsList(updatedList);
              },
            }}
          >
            <Popup>
              <div className="grid gap-2">
                <h4 className="m-0 text-lg text-txt-default font-medium">
                  Pin #{index + 1}
                </h4>
                <div className="flex items-center gap-1">
                  <Image
                    className="m-auto"
                    src="/images/map-pin-v1.svg"
                    alt="Map Pin Icon"
                    height={12}
                    width={12}
                  />
                  <p className="m-0! text-xs text-txt-secondary leading-[140%]">
                    {formatcoords(pos.lat, pos.long).format("DD MM ss X", {
                      latLonSeparator: " ",
                      decimalPlaces: 1,
                    })}
                  </p>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </>
  );
}

const MapClickHandler = ({
  onAddMarker,
  setCenterPosition,
}: {
  onAddMarker: (
    lat: number,
    lng: number,
    address: { name: string; display_name: string },
  ) => void;
  setCenterPosition: (position: [number, number]) => void;
}) => {
  const { setLoading } = useMapStore();

  useMapEvents({
    async click(e) {
      const { lat, lng } = e.latlng;
      const address = await getAddress(lat, lng, setLoading, setCenterPosition);

      onAddMarker(lat, lng, address);
    },
  });

  return null;
};

const getAddress = async (
  lat: number,
  lng: number,
  setLoading: (loading: boolean) => void,
  setCenterPosition: (position: [number, number]) => void,
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

const openPopupForIndex = (
  index: number,
  markerRefs: React.MutableRefObject<{ [key: number]: L.Marker }>,
) => {
  Object.values(markerRefs.current).forEach((marker) => marker.closePopup());

  const marker = markerRefs.current[index];

  if (marker) marker.openPopup();
};

const closeAllPopups = (
  markerRefs: React.MutableRefObject<{ [key: number]: L.Marker }>,
) => {
  Object.values(markerRefs.current).forEach((marker) => marker.closePopup());
};
