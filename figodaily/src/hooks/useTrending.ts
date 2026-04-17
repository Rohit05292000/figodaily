import { useQuery } from "@tanstack/react-query";
import { getTrendingProducts } from "../services/productService";

export const useTrending = (storeId: number) => {
  return useQuery({
    queryKey: ["trending", storeId],
    queryFn: () => getTrendingProducts(storeId),
  });
};