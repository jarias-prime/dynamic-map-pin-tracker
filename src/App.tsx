import { useState, useEffect, useRef } from "react";

import { useMapStore } from "./store/MapStore";

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

import { Navigation } from "./features/Navigation/Navigation";
import { MapLayers, mapLayersData } from "./features/MapLayers/index";
import { PinLists } from "./features/PinLists/PinLists";

const App = () => {
  const {
    loading,
    positionsList,
    centerPosition,
    setLoading,
    setPositionsList,
    setCenterPosition,
  } = useMapStore();

  const [mapType, setMapType] = useState("osm");

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCenterPosition([pos.coords.latitude, pos.coords.longitude]);
      },
      (err) => {
        console.error(err);
      },
    );
  }, [setCenterPosition]);

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
    onAddMarker: (lat: number, lng: number, address: string) => void;
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
  ) => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`,
      );

      const data = await res.json();

      setLoading(false);
      return data.display_name;
    } catch (error) {
      setLoading(false);

      console.error("Error fetching address:", error);

      return "Error fetching address";
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
        className="w-full h-[calc(100vh-56px)] mt-14 absolute z-10"
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
          onAddMarker={(lat, lng, address) =>
            setPositionsList([...positionsList, { lat, long: lng, address }])
          }
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
            <Popup>{pos.address}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </>
  );
};

export default App;
