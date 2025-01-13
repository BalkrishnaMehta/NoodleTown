import { useQuery } from "@tanstack/react-query";
import API from ".";
import Product from "../models/Product";

export const usePopularRecipies = () => {
  return useQuery({
    queryKey: ["recipies"],
    queryFn: async () => {
      const response = await fetch(`${API}/api/categories/popular`);
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Error fetching popular recipies");
      }

      return result.data;
    },
  });
};

export const useSeasonalProducts = () => {
  return useQuery({
    queryKey: ["products", "seasonal"],
    queryFn: async () => {
      const response = await fetch(`${API}/api/products/seasonal`);
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Error fetching seasonal products");
      }

      return result.data;
    },
  });
};

export const useProductDetails = (productId: string) => {
  return useQuery<Product>({
    queryKey: ["products", productId],
    queryFn: async () => {
      const response = await fetch(`${API}/api/products/${productId}`);
      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || "Error fetching product with provided id"
        );
      }

      return result.data;
    },
  });
};
