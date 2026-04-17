import { use, useState } from "react";
import Image from "next/image";
import clsx from "clsx";
import formatcoords from "formatcoords";
import { useMapStore } from "@/app/store/MapStore";

type PinListsProps = {
  positions: {
    long: number;
    lat: number;
    address: { name: string; display_name: string };
  }[];
  onHoverItem: (index: number) => void;
  onLeaveList: () => void;
};

export const PinLists = ({
  positions,
  onHoverItem,
  onLeaveList,
}: PinListsProps) => {
  const {
    centerPosition,
    pinListMobileHeightMax,
    setCenterPosition,
    setPinListMobileHeightMax,
  } = useMapStore();

  const removePin = (index: number) => {
    const removed = positions[index];
    const newList = positions.filter((_, i) => i !== index);

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
        "absolute z-30 bottom-0 left-0 w-full flex flex-col bg-background-default",
        "rounded-lg shadow-md overflow-hidden",
        "transition-all duration-300",
        "sm:top-19 sm:left-6 sm:h-[calc(100vh-100px)] sm:w-[25em]",
        pinListMobileHeightMax ? "h-[calc(100%-80px)]" : "h-1/3",
      )}
      onMouseLeave={onLeaveList}
    >
      <div
        className={clsx(
          "block min-h-1 max-h-1 min-w-25 max-w-25 mx-auto bg-background-disabled mt-3 rounded-2xl",
          "sm:hidden",
        )}
        onClick={() => {
          if (pinListMobileHeightMax) {
            setPinListMobileHeightMax(false);
          } else {
            setPinListMobileHeightMax(true);
          }
        }}
      ></div>

      <div
        className={clsx(
          "flex gap-2 justify-between items-center px-5 pt-5 pb-3",
          "border-b border-gray-200",
        )}
      >
        <h3 className="text-xl font-medium text-txt-default leading-[140%]">
          Pin Lists
        </h3>
      </div>

      <div className="grid overflow-y-auto">
        {positions.length === 0 ? (
          <div className="grid gap-4 text-center text-gray-500 w-full pt-16">
            <Image
              className="m-auto"
              src="/images/magnifying-glass.svg"
              alt="Magnifying Glass Icon"
              height={24}
              width={24}
            />
            <div className="grid gap-1">
              <h5 className="font-semibold leading-[140%] text-txt-secondary">
                No Result Found
              </h5>
              <p className="text-[12px] leading-[140%] text-txt-secondary">
                Your map pin list will show in here.
              </p>
            </div>
          </div>
        ) : (
          <div className="h-full w-full overflow-y-auto">
            {positions.map((pos, index) => {
              const isActive =
                pos.lat === centerPosition[0] && pos.long === centerPosition[1];

              return (
                <div
                  className={clsx(
                    "flex gap-5 items-center justify-between p-5",
                    "border-b border-gray-200",
                    "transition duration-150 ease-in-out",
                    "hover:bg-background-secondary",
                    isActive && "bg-background-primary-subdued",
                  )}
                  key={`${pos.lat}-${pos.long}-${index}`}
                  onClick={() => {
                    setPinListMobileHeightMax(false);
                  }}
                  onMouseEnter={() => {
                    setCenterPosition([pos.lat, pos.long]);
                    onHoverItem(index);
                  }}
                >
                  <div className="flex items-center gap-5">
                    <div className="w-9.5 h-9.5 flex items-center justify-center bg-background-primary-subdued border border-border-default rounded-full">
                      <span className="text-txt-primary leading-[140%]">
                        #{index + 1}
                      </span>
                    </div>
                    <div className="grid gap-1">
                      <h4 className="text-lg font-medium text-txt-default leading-[140%]">
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
                        <p className="text-xs text-txt-secondary leading-[140%]">
                          {formatcoords(pos.lat, pos.long).format(
                            "DD MM ss X",
                            {
                              latLonSeparator: " ",
                              decimalPlaces: 1,
                            },
                          )}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-0.5">
                    <Image
                      className="p-2 min-h-10 min-w-10 rounded-full border border-border-secondary cursor-pointer"
                      src="/images/trash.svg"
                      alt="Trash Icon"
                      height={24}
                      width={24}
                      onClick={() => removePin(index)}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
