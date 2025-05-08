export interface Product {
  id: number;
  favoriteCount: number;
  ownerId: number;
  name: string;
  description: string;
  price: number;
  tags: string[];
  images: string[];
  createdAt: string;
  updatedAt: string;
  owner: {
    nickname: string;
    profileImg: string;
  };
  isFavorite: boolean;
}

export interface ProductPreview {
  id: number;
  name: string;
  price: number;
  images: string[];
  favoriteCount: number;
  owner: {
    nickname: string;
    profileImg: string;
  };
}

export interface ProductList {
  totalCount: number;
  products: ProductPreview[];
}