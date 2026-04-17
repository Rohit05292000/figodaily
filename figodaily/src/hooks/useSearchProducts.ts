import { useQuery } from "@tanstack/react-query";
import { searchProducts } from "../services/productService";

export const useSearchProducts = (keyword: string, storeId: number) => {
  return useQuery({
    queryKey: ["search", keyword, storeId],
    queryFn: () => searchProducts(keyword, storeId),
    enabled: keyword.trim().length >= 2, 
  });
};