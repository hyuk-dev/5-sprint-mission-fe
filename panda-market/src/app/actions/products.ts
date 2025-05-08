"use server";

import { back_url } from "@/core/lib/constants/urls";
import { ApiResponse } from "@/core/types/ApiResponse";
import { Product, ProductList } from "@/core/types/Product";
import { fetchWithSession } from "./fetchWithSession";

// 상품 목록 조회
interface GetProductsParams {
  page?: number;
  pageSize?: number;
  keyword?: string;
  orderBy?: string;
}

export const getProducts = async ({
  page = 1,
  pageSize = 10,
  keyword = "",
  orderBy = "recent",
}: GetProductsParams): Promise<ApiResponse<ProductList | null>> => {
  try {
    const queryParams = new URLSearchParams({
      page: page.toString(),
      pageSize: pageSize.toString(),
      keyword,
      orderBy,
    });
  
    return fetchWithSession<ApiResponse<ProductList>>(
      `${back_url}/products?${queryParams.toString()}`
    );
  } catch (error) {
    return { success: false, statusCode: 500, message: "서버 오류", data: null }
  }
};

// 상품 생성
interface CreateProductParams {
  name: string;
  description: string;
  images: string[];
  tags: string[];
  price: string;
}

export const createProduct = async ({
  name,
  description,
  images,
  tags,
  price,
}: CreateProductParams): Promise<ApiResponse<Product | null>> => {
  try {
    return fetchWithSession<ApiResponse<Product>>(`${back_url}/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        description,
        images,
        tags,
        price,
      }),
    });
  } catch (error) {
    return { success: false, statusCode: 500, message: "서버 오류", data: null }
  }
};

interface UpdateProductParams extends CreateProductParams {
  id: string;
}

export const updateProduct = async ({
  id,
  name,
  description,
  images,
  tags,
  price,
}: UpdateProductParams): Promise<ApiResponse<Product | null>> => {
  try {
    return fetchWithSession<ApiResponse<Product>>(`${back_url}/products/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        description,
        images,
        tags,
        price,
      }),
    });
  } catch (error) {
    return { success: false, statusCode: 500, message: "서버 오류", data: null }
  }
};

export const getProduct = async (
  productId: string
): Promise<ApiResponse<Product | null>> => {
  try {
    return fetchWithSession<ApiResponse<Product>>(`${back_url}/products/${productId}`, {
      method: "GET",
    });
  } catch (error) {
    return { success: false, statusCode: 500, message: "서버 오류", data: null }
  }
}

export const deleteProduct = async (
  productId : string
): Promise<ApiResponse<null>> => {
  try {
    return fetchWithSession<ApiResponse<null>>(`${back_url}/products/${productId}`, {
      method: "DELETE",
    });
  } catch (error) {
    return { success: false, statusCode: 500, message: "서버 오류", data: null }
  }
}