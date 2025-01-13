import { useQuery } from "@tanstack/react-query";
import API from ".";
import SearchResult from "../models/SearchResult";

export const useSearch = (searchQuery: string, city: string) => {
  return useQuery<SearchResult[]>({
    queryKey: ["search", city, searchQuery],
    queryFn: async () => {
      if (!searchQuery.trim()) return [];

      const response = await fetch(
        `${API}/api/search/${city}/?query=${encodeURIComponent(searchQuery)}`
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Error fetching search results");
      }

      return result.data;
    },
    enabled: searchQuery.trim() !== "",
  });
};
