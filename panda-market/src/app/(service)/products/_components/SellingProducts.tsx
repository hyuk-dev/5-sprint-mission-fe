"use client";

import { getProducts } from "@/app/actions/products";
import { useQuery } from "@tanstack/react-query";
import ProductCard from "./ProductCard";
import { Spinner } from "@/core/components/Spinner";
import { useEffect, useState } from "react";
import { useWindowSize } from "@/core/hooks/useWindowSize";
import useDebounce from "@/core/hooks/useDebounce";
import SearchBar from "@/core/components/SearchBar";
import { Button, Pagination } from "@mui/material";
import SortOption from "@/core/components/SortOption";
import { useRouter } from "next/navigation";

const SellingProducts = () => {
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(1);
  const { width, height } = useWindowSize();
  const [searchValue, setSearchValue] = useState("");
  const [orderBy, setOrderBy] = useState("recent");
  useEffect(() => {
    if (width > 1280) setPageSize(10);
    else if (width > 768) setPageSize(6);
    else setPageSize(4);
  }, [width]);

  function handleSearchValueChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchValue(e.target.value);
  }

  const debouncedSearchValue = useDebounce(searchValue, 500);

  console.log(debouncedSearchValue);

  const { data, error, isPending } = useQuery({
    queryKey: ["BestProducts", pageSize, debouncedSearchValue, page, orderBy],
    queryFn: () =>
      getProducts({
        page,
        pageSize,
        orderBy,
        keyword: debouncedSearchValue,
      }),
    staleTime: 1000 * 60,
    refetchOnWindowFocus: false,
  });

  const bestProducts = data?.data?.products;
  const totalCount = data?.data?.totalCount ?? 0;

  const router = useRouter();

  if (isPending) {
    return (
      <div className="h-full">
        <h2 className="text-[20px] font-bold">판매 중인 상품</h2>
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-full">
        <h2 className="text-[20px] font-bold">판매 중인 상품</h2>
        <div className="flex justify-center items-center h-full">
          데이터를 불러오지 못했습니다.
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 h-full">
      <div className="flex justify-between items-center">
        <h2 className="text-[20px] font-bold">판매 중인 상품</h2>
        <div className="flex gap-2 items-center">
          <SearchBar
            handleSearch={handleSearchValueChange}
            width="310px"
            value={searchValue}
          />
          <Button
            variant="contained"
            sx={{ width: "133px", height: "42px", borderRadius: "8px" }}
            type="button"
            onClick={() => router.push("/products/new")}
          >
            상품 등록하기
          </Button>
          <SortOption width={width} order={orderBy} setOrder={setOrderBy} />
        </div>
      </div>
      <div className="grid xl:grid-cols-5 md:grid-cols-3 grid-cols-2 gap-[24px]">
        {bestProducts?.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <div className="flex w-full justify-center items-end mt-10">
        <Pagination
          page={page}
          count={Math.ceil(totalCount / pageSize)}
          onChange={(_, value) => setPage(value)}
          color="primary"
        />
      </div>
    </div>
  );
};

export default SellingProducts;
