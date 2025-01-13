import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import API from ".";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import errorToasting from "../utils/errorToasting";
import { toast } from "react-toastify";
import { clearAuth, setAuth } from "../store/auth/authSlice";
import CartItem from "../models/CartItem";
import { cartApi } from "./cartApi";
import { cartActions } from "../store/cart/cartSlice";

const REFRESH_INTERVAL = 14 * 60 * 1000;

const authenticate = async (
  credentials: { email: string; password: string; name?: string },
  operation: string
) => {
  const response = await fetch(`${API}/api/auth/${operation}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
    credentials: "include",
  });

  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.message || "Authentication failed");
  }

  return result.data;
};

const updatePassword = async (
  passwordData: {
    currentPassword: string;
    newPassword: string;
  },
  token: string | null
) => {
  const response = await fetch(`${API}/api/users/password`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    credentials: "include",
    body: JSON.stringify(passwordData),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Error updating password");
  }

  return result.data;
};

const refreshToken = async () => {
  const response = await fetch(`${API}/api/auth/refresh-token`, {
    method: "POST",
    credentials: "include",
  });

  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.message || "Error refreshing token");
  }

  return result.data;
};

export const useAuthenticate = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  const cartMutation = useMutation({
    mutationFn: ({
      cartItem,
      accessToken,
    }: {
      cartItem: CartItem;
      accessToken: string;
      userId: string;
    }) =>
      cartApi.update({
        productId: cartItem.product.id,
        quantity: cartItem.quantity,
        method: "POST",
        token: accessToken,
      }),
    onSuccess: (updatedCart, variables) => {
      dispatch(cartActions.setCart(updatedCart));
      queryClient.setQueryData(["cart", variables.userId], updatedCart);
    },
    onError: (error) => {
      errorToasting(error || "Failed to sync cart item");
    },
  });

  const authMutation = useMutation({
    mutationFn: async ({
      credentials,
      operation,
    }: {
      credentials: { email: string; password: string; name?: string };
      operation: string;
    }) => {
      const localCart: CartItem[] = JSON.parse(
        localStorage.getItem("cartItems") || "[]"
      );
      const authData = await authenticate(credentials, operation);
      return { ...authData, localCart };
    },
    onSuccess: async ({ localCart, ...authData }) => {
      const { accessToken, user } = authData;

      queryClient.setQueryData(["auth"], authData);
      dispatch(setAuth(authData));

      if (localCart.length > 0) {
        try {
          for (const cartItem of localCart) {
            const updatedCart = await cartMutation.mutateAsync({
              cartItem,
              accessToken,
              userId: user.id,
            });

            dispatch(cartActions.setCart(updatedCart));
          }

          localStorage.removeItem("cartItems");

          const finalCart = await cartApi.fetch(accessToken);
          dispatch(cartActions.setCart(finalCart));
          queryClient.setQueryData(["cart", user.id], finalCart);
        } catch (error) {
          errorToasting((error as Error) || "Error syncing cart");
        }
      } else {
        try {
          const serverCart = await cartApi.fetch(accessToken);
          dispatch(cartActions.setCart(serverCart));
          queryClient.setQueryData(["cart", user.id], serverCart);
        } catch (error) {
          errorToasting((error as Error) || "Error fetching server cart");
        }
      }
    },
  });

  return authMutation;
};

export const useUpdatePassword = () => {
  const token = useSelector((state: RootState) => state.auth.accessToken);

  return useMutation({
    mutationFn: (params: {
      passwordData: {
        currentPassword: string;
        newPassword: string;
      };
    }) => updatePassword(params.passwordData, token),
    onSuccess: (data) => {
      toast.success(data.message || "Password updated successfully");
    },
    onError: (error) => {
      errorToasting(error);
    },
  });
};

export const useRefreshToken = () => {
  return useQuery({
    queryKey: ["auth"],
    queryFn: refreshToken,
    refetchIntervalInBackground: true,
    refetchInterval: REFRESH_INTERVAL,
    retry: false,
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  return useMutation({
    mutationFn: async () => {
      const response = await fetch(`${API}/api/auth/logout`, {
        method: "POST",
        credentials: "include",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Logout failed");
      }
    },
    onSuccess: () => {
      queryClient.setQueryData(["auth"], null);
      dispatch(clearAuth());
    },
    onError: (error) => {
      errorToasting(error);
    },
  });
};

export const useProfile = () => {
  const token = useSelector((state: RootState) => state.auth.accessToken);
  return useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const response = await fetch(`${API}/api/users/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Error fetching user");
      }

      return result.data;
    },
  });
};
