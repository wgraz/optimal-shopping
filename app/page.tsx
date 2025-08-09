import Banner from "@/components/Banner";
import ShoppingList from "@/components/ShoppingList";
import Filters from "@/components/Filters";
import StoreInfo from "@/components/StoreInfo";
import WhitelistBlacklist from "@/components/WhitelistBlacklist";
import ProductCard from "@/components/ProductCard";

export default function Home() {
  return (
    <main className="max-w-7xl mx-auto px-4">
      {/* Top Banner + Store Info */}
      <Banner />
      <StoreInfo />

      {/* Main Content */}
      <div className="flex flex-col w-full p-4 gap-4">
        {/* TOP: Shopping List (Left) and Whitelist/Blacklist (Right) */}
        <div className="flex w-full gap-4">
          <div className="w-1/2 space-y-4">
            <ShoppingList />
          </div>
          <div className="w-1/2 space-y-4">
            <WhitelistBlacklist />
          </div>
        </div>

        {/* BOTTOM: Filters */}
        <div className="flex flex-wrap gap-4">
          <Filters />
        </div>

        {/* PRODUCT CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 pt-6">
          <ProductCard
            image="/images/milk.jpg"
            name="Milk"
            store="Walmart"
            price="$3.49"
          />
          <ProductCard
            image="/images/coke.jpg"
            name="Coca Cola (12pk)"
            store="Target"
            price="$6.99"
          />
          <ProductCard
            image="/images/eggs.jpg"
            name="Eggs (12ct)"
            store="Costco"
            price="$4.59"
          />
        </div>
      </div>
    </main>
  );
}
