import { useEffect, useMemo, useRef, useState } from "react";
import { Icon } from "@iconify/react";
import clsx from "clsx";

import { useMapStore } from "../../store/MapStore";

export const SearchAddress = () => {
  const { positionsList, setPositionsList, setCenterPosition } = useMapStore();
  const containerRef = useRef<HTMLDivElement>(null);

  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const effectiveResults = useMemo(
    () => (query.trim() ? results : []),
    [query, results],
  );
  const showResults = isOpen && effectiveResults.length > 0;

  const searchLocation = async (value: string) => {
    if (!value) return;

    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${value}`,
      );

      const data = await res.json();

      setResults(data);
      if (data.length > 0) {
        setIsOpen(true);
      }
    } catch (err) {
      console.error("Search error:", err);
    }
  };

  useEffect(() => {
    if (!query.trim()) {
      return;
    }

    const timeout = setTimeout(() => {
      searchLocation(query);
    }, 500);

    return () => clearTimeout(timeout);
  }, [query]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [isOpen]);

  const handleSelect = (place: {
    lat: string;
    lon: string;
    display_name: string;
  }) => {
    const lat = parseFloat(place.lat);
    const long = parseFloat(place.lon);

    setPositionsList([
      ...positionsList,
      {
        lat,
        long,
        address: place.display_name,
      },
    ]);

    setCenterPosition([lat, long]);
    setQuery("");
    setIsOpen(false);
  };

  return (
    <div ref={containerRef} className="p-4 relative">
      <div className="relative">
        <Icon
          icon="ph:magnifying-glass-bold"
          className="absolute left-2 top-3 text-gray-400"
        />

        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className={clsx(
            "w-full pl-8 p-2 rounded-md outline-none",
            "border border-gray-300 focus:border-primary focus:ring-1 focus:ring-primary",
            "duration-150 ease-in-out",
          )}
          placeholder="Search for a location..."
        />
      </div>

      {showResults && effectiveResults.length > 0 && (
        <div className="absolute z-30 w-[calc(100%-2rem)] mt-2 grid gap-1.5 bg-white border border-neutral-100 rounded-md shadow-md max-h-60 overflow-auto">
          {effectiveResults.map(
            (
              place: { lat: string; lon: string; display_name: string },
              idx: number,
            ) => (
              <div
                key={idx}
                onClick={() => handleSelect(place)}
                className={clsx(
                  "flex items-center p-2 text-sm cursor-pointer w-full",
                  "hover:bg-neutral-100",
                )}
              >
                {place.display_name}
              </div>
            ),
          )}
        </div>
      )}
    </div>
  );
};
