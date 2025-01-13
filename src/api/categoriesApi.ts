import { useQuery } from "@tanstack/react-query";
import API from ".";

export const useFeaturedCategories = (category: string, page: number) => {
  return useQuery({
    queryKey: ["featured-categories", category, page],
    queryFn: async () => {
      const response = await fetch(
        `${API}/api/featured-categories/${category}?page=${page}`
      );
      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message ||
            `Error fetching ${category} featured category products`
        );
      }

      return result.data;
    },
    enabled: category.trim() !== "",
  });
};
