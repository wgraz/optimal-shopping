import Image from "next/image";

export default function Banner() {
  return (
    <div className="relative w-full h-[300px] md:h-[400px]">
      <Image
        src="/optimal_shopping_logos/long-full-slo.png"
        alt="Shop of the Week Banner"
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
        <h1 className="text-white text-2xl md:text-4xl font-bold text-center px-4">
          The Optimal Shop of the Week
        </h1>
      </div>
    </div>
  );
}
