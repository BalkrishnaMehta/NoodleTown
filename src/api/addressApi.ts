import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import Address from "../models/Address";
import { RootState } from "../store";
import API from ".";
import errorToasting from "../utils/errorToasting";

const fetchAddresses = async (token: string | null) => {
  if (!token) {
    throw new Error("Unauthorized: No token provided");
  }

  const response = await fetch(`${API}/api/addresses`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const result = await response.json();
  if (!response.ok)
    throw new Error(result.message || "Error fetching addresses");
  return result.data;
};

const addAddress = async (address: Address, token: string | null) => {
  if (!token) {
    throw new Error("Unauthorized: No token provided");
  }

  const response = await fetch(`${API}/api/addresses`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ address }),
  });

  const result = await response.json();
  if (!response.ok)
    throw new Error(result.message || "Error adding new address");
  return result.data;
};

export const useAddresses = () => {
  const token = useSelector((state: RootState) => state.auth.accessToken);
  const userId = useSelector((state: RootState) => state.auth.user?.id);

  return useQuery({
    queryKey: [userId, "addresses"],
    queryFn: () => fetchAddresses(token),
  });
};

export const useAddAddress = () => {
  const queryClient = useQueryClient();
  const token = useSelector((state: RootState) => state.auth.accessToken);
  const userId = useSelector((state: RootState) => state.auth.user?.id);

  return useMutation({
    mutationFn: (params: { address: Address }) =>
      addAddress(params.address, token),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [userId, "addresses"],
      });
    },
    onError: (error) => {
      errorToasting(error);
    },
  });
};
