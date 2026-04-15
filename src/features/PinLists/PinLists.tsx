import { useState } from "react";

import { Icon } from "@iconify/react";
import clsx from "clsx";

import { useMapStore } from "../../store/MapStore";
import { Button } from "../../components/Button/Button";

export const PinLists = () => {
  const { positionsList, centerPosition, setCenterPosition } = useMapStore();

  const [collapsed, setCollapsed] = useState(false);

  return (
    <div
      className={clsx(
        "absolute z-30 top-20 left-10",
        "rounded-lg shadow-md overflow-hidden",
        "bg-white/80 backdrop-blur-2xl backdrop-saturate-150",
        "transition-all duration-300",
        collapsed ? "w-35 h-11" : "w-[25em] h-[calc(100vh-100px)]",
      )}
    >
      <div
        className={clsx(
          "flex gap-2 justify-between items-center px-4 py-2",
          "border-b border-t-0 border-x-0 border-gray-200",
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
          {positionsList.length === 0 ? (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 grid gap-4 justify-center text-center text-gray-500 w-full">
              <Icon className="m-auto text-[60px]" icon="ph:map-trifold-fill" />
              <div className="grid gap-2">
                <p className="text-2xl">No pins added yet.</p>
                <p>Click on the map to add a pin or search location.</p>
              </div>
            </div>
          ) : (
            <div className="h-[calc(calc(100% - 42px))] overflow-y-auto">
              {positionsList.map((pos, index) => (
                <div
                  key={index}
                  className={clsx(
                    "flex gap-4 items-start justify-between px-4 py-2",
                    "border-b border-t-0 border-x-0 border-gray-200",
                    "duration-150 ease-in-out",
                    "hover:bg-gray-100",
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
                        "duration-150 ease-in-out",
                        "hover:text-txt-error-hover",
                        "active:scale-90",
                      )}
                      icon="ph:trash-fill"
                      onClick={() => {
                        const newList = [...positionsList];

                        newList.splice(index, 1);

                        setCenterPosition(centerPosition);

                        useMapStore.setState({ positionsList: newList });
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};
