interface ProductCardProps {
  image: string;
  name: string;
  store: string;
  price: string;
}

export default function ProductCard({
  image,
  name,
  store,
  price,
}: ProductCardProps) {
  return (
    <div className="border rounded-2xl shadow-sm p-4 bg-white flex flex-col">
      <img
        src={image}
        alt={name}
        className="rounded-lg object-cover h-40 w-full"
      />
      <div className="mt-3">
        <p className="text-lg font-semibold">{name}</p>
        <p className="text-sm text-gray-600">{store}</p>
        <p className="mt-1 text-green-600 font-bold">{price}</p>
      </div>
      <button className="mt-auto bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded-lg text-sm">
        View Deal
      </button>
    </div>
  );
}
