import { useQuery } from "@tanstack/react-query";
import { getDealProducts } from "../services/productService";

export const useDeals = (storeId: number) => {
  return useQuery({
    queryKey: ["deals", storeId],
    queryFn: () => getDealProducts(storeId),
  });
};