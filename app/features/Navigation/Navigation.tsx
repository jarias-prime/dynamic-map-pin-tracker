import { Icon } from "@iconify/react";

export const Navigation = () => {
  return (
    <div className="fixed z-30 top-0 left-0 w-full bg-white shadow px-4 py-4">
      <h5 className="flex items-center gap-3 justify-center font-bold">
        <Icon className="text-xl" icon="ph:map-trifold-duotone" />
        <span>Dynamic Map Pin Tracker</span>
      </h5>
    </div>
  );
};
