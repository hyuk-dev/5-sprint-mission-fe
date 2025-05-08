"use client";

import { getProducts } from "@/app/actions/products";
import { useQuery } from "@tanstack/react-query";
import ProductCard from "./ProductCard";
import { Spinner } from "@/core/components/Spinner";
import { useEffect, useState } from "react";
import { useWindowSize } from "@/core/hooks/useWindowSize";

const BestProducts = () => {
  const [pageSize, setPageSize] = useState(4);
  const { width, height } = useWindowSize();
  useEffect(() => {
    if (width > 1280) setPageSize(4);
    else if (width > 768) setPageSize(2);
    else setPageSize(1);
  }, [width]);
  const { data, error, isPending } = useQuery({
    queryKey: ["BestProducts", pageSize],
    queryFn: () => getProducts({ page: 1, pageSize, orderBy: "favorite" }),
    staleTime: 1000 * 60,
    refetchOnWindowFocus: false,
  });

  const bestProducts = data?.data?.products;

  if (isPending) {
    return (
      <div className="h-full">
        <h2 className="text-[20px] font-bold">베스트 상품</h2>
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-full">
        <h2 className="text-[20px] font-bold">베스트 상품</h2>
        <div className="flex justify-center items-center h-full">
          데이터를 불러오지 못했습니다.
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 h-full">
      <h2 className="text-[20px] font-bold">베스트 상품</h2>
      <div className="grid xl:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-[24px]">
        {bestProducts?.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default BestProducts;
