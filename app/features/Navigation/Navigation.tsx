import Image from "next/image";

export const Navigation = () => {
  return (
    <div className="h-13 w-full bg-background-default shadow px-4 py-4">
      <h5 className="flex items-center gap-3 justify-center font-bold">
        <Image
          className="m-auto"
          src="/images/map-pinboard-logo.svg"
          alt="Map Pinboard Logo"
          height={28}
          width={116}
        />
      </h5>
    </div>
  );
};
