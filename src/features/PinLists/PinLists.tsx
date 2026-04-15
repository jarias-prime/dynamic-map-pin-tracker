import { useState } from "react";

import { Icon } from "@iconify/react";
import clsx from "clsx";

import { useMapStore } from "../../store/MapStore";
import { SearchAddress } from "../../features/SearchAddress/SearchAddress";
import { Button } from "../../components/Button/Button";

export const PinLists = () => {
  const { positionsList, centerPosition, setCenterPosition } = useMapStore();

  const [collapsed, setCollapsed] = useState(false);

  const removePin = (index: number) => {
    const removed = positionsList[index];

    const newList = positionsList.filter((_, i) => i !== index);

    useMapStore.setState({ positionsList: newList });

    if (
      removed &&
      removed.lat === centerPosition[0] &&
      removed.long === centerPosition[1]
    ) {
      if (newList.length > 0) {
        setCenterPosition([newList[0].lat, newList[0].long]);
      } else {
        setCenterPosition([0, 0]);
      }
    }
  };

  return (
    <div
      className={clsx(
        "absolute z-30 top-20 left-0 mx-2",
        "rounded-lg shadow-md overflow-hidden",
        "bg-white/70 backdrop-blur backdrop-saturate-150",
        "transition-all duration-300",
        collapsed
          ? "w-35 h-11"
          : "h-[calc(100vh-100px)] w-[calc(100%-1rem)] sm:w-[25em]",
      )}
    >
      <div
        className={clsx(
          "flex gap-2 justify-between items-center px-4 py-2",
          "border-b border-gray-200",
        )}
      >
        <h5>Pin List</h5>

        <Button
          variant="tertiary"
          size="sm"
          onClick={() => setCollapsed((p) => !p)}
        >
          <Icon
            className={clsx(
              "text-xl transition-transform duration-200",
              collapsed && "rotate-180",
            )}
            icon="ph:caret-left-bold"
          />
        </Button>
      </div>

      {!collapsed && (
        <>
          <SearchAddress />

          {positionsList.length === 0 ? (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 grid gap-4 text-center text-gray-500 w-full">
              <Icon className="m-auto text-[60px]" icon="ph:map-trifold-fill" />
              <div className="grid gap-2">
                <p className="text-2xl">No pins added yet.</p>
                <p>Click on the map to add a pin or search location.</p>
              </div>
            </div>
          ) : (
            <div className="h-[calc(100%-42px)] overflow-y-auto">
              {positionsList.map((pos, index) => {
                const isActive =
                  pos.lat === centerPosition[0] &&
                  pos.long === centerPosition[1];

                return (
                  <div
                    key={`${pos.lat}-${pos.long}-${index}`}
                    className={clsx(
                      "flex gap-4 items-start justify-between px-4 py-2",
                      "border-b border-gray-200",
                      "transition duration-150 ease-in-out",
                      "hover:bg-background-primary-subdued",
                      isActive && "bg-background-primary-subdued",
                    )}
                    onMouseEnter={() => setCenterPosition([pos.lat, pos.long])}
                  >
                    <div>
                      <h5 className="text-lg text-txt-primary">
                        {pos.lat.toFixed(4)}, {pos.long.toFixed(4)}
                      </h5>
                      <p className="text-sm text-gray-500 line-clamp-2">
                        {pos.address}
                      </p>
                    </div>

                    <div className="mt-0.5">
                      <Icon
                        className={clsx(
                          "text-xl text-txt-error cursor-pointer",
                          "transition duration-150 ease-in-out",
                          "hover:text-txt-error-hover",
                          "active:scale-90",
                        )}
                        icon="ph:trash-fill"
                        onClick={() => removePin(index)}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </>
      )}
    </div>
  );
};
