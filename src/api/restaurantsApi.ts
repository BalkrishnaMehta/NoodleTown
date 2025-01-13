import { useQuery } from "@tanstack/react-query";
import API from ".";
import Restaurant from "../models/Restaurant";

export const useRestaurant = () => {
  return useQuery<Pick<Restaurant, "id" | "title" | "logo">[]>({
    queryKey: ["brands"],
    queryFn: async () => {
      const response = await fetch(`${API}/api/restaurants`);
      const result = await response.json();
      if (!response.ok)
        throw new Error(result.message || "Error fetching restaurants");
      return result.data;
    },
  });
};

export const useRestaurantDetails = (restaurantId: string) => {
  return useQuery<Restaurant>({
    queryKey: ["restaurants", restaurantId],
    queryFn: async () => {
      const response = await fetch(`${API}/api/restaurants/${restaurantId}`);
      const result = await response.json();
      if (!response.ok)
        throw new Error(result.message || "Error fetching restaurant details");
      return result.data;
    },
    enabled: restaurantId.trim() !== "",
  });
};

export const useCategorizedRestaurants = (type: string, value: string) => {
  return useQuery({
    queryKey: ["restaurants", value],
    queryFn: async () => {
      let endpoint = `${API}/api/restaurants/${type}/${value}`;
      const response = await fetch(endpoint);
      const result = await response.json();
      if (!response.ok)
        throw new Error(
          result.message || `Error fetching ${value} restaurants.`
        );
      return result.data;
    },
  });
};

export const useRestaurantMenu = (restaurantId: string) => {
  return useQuery({
    queryKey: ["restaurants", restaurantId, "categories"],
    queryFn: async () => {
      const response = await fetch(
        `${API}/api/restaurants/${restaurantId}/menu`
      );
      const result = await response.json();
      if (!response.ok)
        throw new Error(result.message || "Error fetching restaurant menu");
      return result.data;
    },
  });
};
