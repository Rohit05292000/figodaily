import { useQuery } from "@tanstack/react-query";
import { getFlashDeals } from "../services/productService";

export const useFlashDeals = (storeId: number) => {
  return useQuery({
    queryKey: ["flashDeals", storeId],
    queryFn: () => getFlashDeals(storeId),
  });
};