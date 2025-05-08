import BestProducts from "./_components/BestProducts";
import SellingProducts from "./_components/SellingProducts";

export default function ProductPage() {
  return (
    <div className="flex flex-col w-full gap-[40px] h-full">
      <div className="min-h-[426px]">
        <BestProducts />
      </div>
      <div className="h-full min-h-[740px]">
        <SellingProducts />
      </div>
    </div>
  );
}
