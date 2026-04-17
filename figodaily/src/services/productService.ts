import axios, { AxiosError } from "axios";

const BASE_URL = "http://13.205.63.126/api";


// =========================
// 🔥 DEAL PRODUCTS
// =========================
export const getDealProducts = async (storeId: number) => {
  console.log("🔥 API CALLED: getDealProducts");

  try {
    const response = await axios.get(
      `${BASE_URL}/dealproduct?store_id=${storeId}`
    );

    console.log("🔥 FULL RESPONSE:", response.data);

    return response.data?.data ?? [];
  } catch (error) {
    console.log("API Error (Deal Products):", error);
    return [];
  }
};


// =========================
// ⚡ FLASH DEALS
// =========================
export const getFlashDeals = async (storeId: number) => {
  console.log("🔥 API CALLED: getFlashDeals");

  try {
    const response = await axios.get(
      `${BASE_URL}/flashdeal?store_id=${storeId}`
    );

    console.log("🔥 FULL RESPONSE:", response.data);

    if (response.data?.status === "1") {
      return response.data?.data ?? [];
    }

    return [];
  } catch (error) {
    console.log("Flash Deal API Error:", error);
    return [];
  }
};


// =========================
// 🔥 TRENDING PRODUCTS
// =========================
export interface TrendingItem {
  cat_id: number;
  title: string;
  image: string;
  description?: string;
  count?: number;
}

export const getTrendingProducts = async (
  storeId: number
): Promise<TrendingItem[]> => {
  try {
    const response = await axios.post(`${BASE_URL}/topsix`, {
      store_id: storeId,
    });

    console.log("TOP SIX RESPONSE:", response.data);

    if (response.data?.status === "1") {
      return (response.data?.data ?? []) as TrendingItem[];
    }

    return [];
  } catch (error) {
    console.log("Trending API Error:", error);
    return [];
  }
};


// =========================
// 📦 CATEGORIES
// =========================
export interface SubChild {
  cat_id: number;
  title: string;
  image: string;
}

export interface SubCategory {
  cat_id: number;
  title: string;
  image: string;
  subchild?: SubChild[];
}

export interface Category {
  cat_id: number;
  title: string;
  image: string;
  subcategory?: SubCategory[];
}

export const getCategories = async (
  storeId: number
): Promise<Category[]> => {
  try {
    const response = await axios.get(`${BASE_URL}/catee`, {
      params: {
        storeid: storeId,
      },
    });

    console.log("CATEGORIES RESPONSE:", response.data);

    if (response.data?.status === "1") {
      return (response.data?.data ?? []) as Category[];
    }

    return [];
  } catch (error) {
    console.log("Categories API Error:", error);
    return [];
  }
};


// =========================
// 🔍 SEARCH PRODUCTS
// =========================
export interface SearchProduct {
  product_id: number;
  product_name: string;
  product_image: string;
  price: number;
}

export const searchProducts = async (
  keyword: string,
  storeId: number
): Promise<SearchProduct[]> => {
  try {
    const response = await axios.post(`${BASE_URL}/search_ios`, {
      keyword,
      store_id: storeId,
    });

    console.log("🟢 SEARCH RESPONSE:", response.data);

    if (response.data?.status === "1") {
      return response.data?.data ?? [];
    }

    return [];
  } catch (error) {
    const err = error as AxiosError<any>;
    console.log("❌ Search API Error:", err.response?.data || err.message);

    return [];
  }
};