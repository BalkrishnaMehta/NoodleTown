import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import Order from "../models/Order";
import { RootState } from "../store";
import API from ".";
import errorToasting from "../utils/errorToasting";
import { cartActions } from "../store/cart/cartSlice";
import { toast } from "react-toastify";

const getOrders = async (token: string | null) => {
  if (!token) {
    throw new Error("Unauthorized: No token provided");
  }

  const response = await fetch(`${API}/api/orders`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Error fetching orders");
  }

  return result.data;
};

const makeOrder = async (
  addressTitle: string,
  order: Order,
  token: string | null
) => {
  if (!token) {
    throw new Error("Unauthorized: No token provided");
  }

  const response = await fetch(`${API}/api/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ addressTitle, order }),
  });

  if (!response.ok) {
    throw new Error("Error making order");
  }

  return response.json();
};

export const useGetOrders = () => {
  const token = useSelector((state: RootState) => state.auth.accessToken);
  const userId = useSelector((state: RootState) => state.auth.user?.id);

  return useQuery({
    queryKey: [userId, "orders"],
    queryFn: () => getOrders(token),
  });
};

export const useMakeOrder = () => {
  const queryClient = useQueryClient();
  const token = useSelector((state: RootState) => state.auth.accessToken);
  const userId = useSelector((state: RootState) => state.auth.user?.id);
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: (params: { addressTitle: string; order: Order }) =>
      makeOrder(params.addressTitle, params.order, token),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [userId, "cart"],
      });
      queryClient.invalidateQueries({
        queryKey: [userId, "orders"],
      });
      dispatch(cartActions.clearCart());
      toast.success("Order placed successfully");
    },
    onError: (error) => {
      errorToasting(error || "Error placing order");
    },
  });
};

export const useOrderDetails = (orderId: string) => {
  const token = useSelector((state: RootState) => state.auth.accessToken);
  return useQuery({
    queryKey: ["order", orderId],
    queryFn: async () => {
      const response = await fetch(`${API}/api/orders/${orderId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Error fetching order details");
      }

      return result.data;
    },
  });
};
