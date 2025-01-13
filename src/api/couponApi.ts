import { useMutation, useQueryClient } from "@tanstack/react-query";
import API from ".";
import errorToasting from "../utils/errorToasting";

const validateCoupon = async (couponCode: string, orderTotal: number) => {
  const response = await fetch(`${API}/api/coupons/validate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ couponCode, orderTotal }),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Error validating coupon");
  }

  return result.data;
};

export const useValidateCoupon = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params: { couponCode: string; orderTotal: number }) =>
      validateCoupon(params.couponCode, params.orderTotal),
    onSuccess: (_, params) => {
      queryClient.invalidateQueries({
        queryKey: ["coupon", params.couponCode],
      });
    },
    onError: (error) => {
      errorToasting(error);
    },
  });
};
