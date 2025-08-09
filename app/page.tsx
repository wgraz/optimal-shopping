"use client";

import { useState } from "react";
import Banner from "@/components/Banner";
import ShoppingList from "@/components/ShoppingList";
import Filters from "@/components/Filters";
import StoreInfo from "@/components/StoreInfo";
import WhitelistBlacklist from "@/components/WhitelistBlacklist";
import ProductCard from "@/components/ProductCard";
import ProductModal from "@/components/ProductMondal";

// Local Product type — **only inside this file**
interface Product {
  image: string;
  name: string;
  store: string;
  price: string;
}

const products: Product[] = [
  {
    image: "https://picsum.photos/id/1040/400/300",
    name: "Milk",
    store: "Walmart",
    price: "$3.49",
  },
  {
    image: "https://picsum.photos/id/1080/400/300",
    name: "Coca Cola (12pk)",
    store: "Target",
    price: "$6.99",
  },
  {
    image: "https://picsum.photos/id/1050/400/300",
    name: "Eggs (12ct)",
    store: "Costco",
    price: "$4.59",
  },
];

export default function HomePage() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  function openModal(product: Product) {
    setSelectedProduct(product);
  }

  function closeModal() {
    setSelectedProduct(null);
  }

  return (
    <main className="max-w-7xl mx-auto px-4">
      <Banner />
      <StoreInfo />

      <div className="flex flex-col w-full p-4 gap-4">
        <div className="flex w-full gap-4">
          <div className="w-1/2 space-y-4">
            <ShoppingList />
          </div>
          <div className="w-1/2 space-y-4">
            <WhitelistBlacklist />
          </div>
        </div>

        <div className="flex flex-wrap gap-4">
          <Filters />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 pt-6">
          {products.map((prod) => (
            <ProductCard
              key={prod.name + prod.store}
              image={prod.image}
              name={prod.name}
              store={prod.store}
              price={prod.price}
              onViewDeal={() => openModal(prod)}
            />
          ))}
        </div>
      </div>

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          similarDeals={products.filter((p) => p.name !== selectedProduct.name)}
          onClose={closeModal}
        />
      )}
    </main>
  );
}
