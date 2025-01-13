import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { cartActions } from "../store/cart/cartSlice";
import CartItem from "../models/CartItem";
import Product from "../models/Product";
import errorToasting from "../utils/errorToasting";
import API from ".";

interface CartOperation {
  product: Product;
  quantity: number;
  method: "POST" | "DELETE";
}

export const cartApi = {
  fetch: async (token: string) => {
    const response = await fetch(`${API}/api/cart`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.message || "Error fetching cart");
    return result.data;
  },

  update: async ({
    productId,
    quantity,
    method,
    token,
  }: {
    productId: string;
    quantity: number;
    method: string;
    token: string;
  }): Promise<CartItem[]> => {
    const response = await fetch(`${API}/api/cart/items`, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ productId, quantity }),
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.message || "Error updating cart");
    return result.data;
  },
};

export const useCart = () => {
  const token = useSelector((state: RootState) => state.auth.accessToken);
  const userId = useSelector((state: RootState) => state.auth.user?.id);

  return useQuery({
    queryKey: [userId, "cart"],
    queryFn: () => (token ? cartApi.fetch(token) : []),
    enabled: !!userId,
  });
};

export const useUpdateCart = () => {
  const queryClient = useQueryClient();
  const token = useSelector((state: RootState) => state.auth.accessToken);
  const userId = useSelector((state: RootState) => state.auth.user?.id);
  const dispatch = useDispatch();

  return useMutation<CartItem[], Error, CartOperation>({
    mutationFn: async ({ product, quantity, method }) => {
      if (!token) {
        const localCart = JSON.parse(localStorage.getItem("cartItems") || "[]");
        const updatedCart = handleLocalCartUpdate(
          localCart,
          product,
          quantity,
          method
        );
        localStorage.setItem("cartItems", JSON.stringify(updatedCart));
        return updatedCart;
      }
      return cartApi.update({
        productId: product.id,
        quantity,
        method,
        token,
      });
    },
    onMutate: ({ product, quantity, method }) => {
      dispatch(
        cartActions.updateCartItem({
          product,
          quantity,
          operation: method === "POST" ? "add" : "remove",
        })
      );
    },
    onError: (error, variables) => {
      dispatch(
        cartActions.updateCartItem({
          product: variables.product,
          quantity: variables.quantity,
          operation: variables.method !== "POST" ? "add" : "remove",
        })
      );
      errorToasting(error || Error("Error updating cart"));
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [userId, "cart"] });
    },
  });
};

function handleLocalCartUpdate(
  localCart: CartItem[],
  product: Product,
  quantity: number,
  method: string
): CartItem[] {
  const updatedCart = [...localCart];
  const itemIndex = updatedCart.findIndex(
    (item) => item.product.id === product.id
  );

  if (method === "POST") {
    if (itemIndex > -1) {
      updatedCart[itemIndex].quantity += quantity;
    } else {
      updatedCart.push({ product, quantity });
    }
  } else if (method === "DELETE" && itemIndex > -1) {
    updatedCart[itemIndex].quantity -= quantity;
    if (updatedCart[itemIndex].quantity <= 0) {
      updatedCart.splice(itemIndex, 1);
    }
  }

  return updatedCart;
}
