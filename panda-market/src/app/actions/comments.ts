"use server";

import { ApiResponse } from "@/core/types/ApiResponse";
import { fetchWithSession } from "./fetchWithSession";

interface GetCommentsParams {
  productId?: number;
  articleId?: number;
  pageSize?: number;
  cursor?: number;
}

export const getProductComments = async ({
  productId,
  pageSize = 5,
  cursor = 0,
}: GetCommentsParams): Promise<ApiResponse<Comment[] | null>> => {
  try {
    const queryParams = new URLSearchParams({
      pageSize: pageSize.toString(),
      cursor: cursor.toString(),
    });

    return fetchWithSession(
      `/products/${productId}/comments?${queryParams.toString()}`
    );
  } catch (error) {
    return {
      success: false,
      statusCode: 500,
      message: "서버 오류",
      data: null,
    };
  }
};
