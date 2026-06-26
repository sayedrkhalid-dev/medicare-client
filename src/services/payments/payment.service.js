import { fetcher } from "@/lib/fetcher";
import { buildQuery } from "@/lib/query";

/**
 * Create payment
 */
export const createPayment = async (payload) => {
  return fetcher("/payments", {
    method: "POST",
    body: JSON.stringify(payload),
  });
};

/**
 * Get my payments
 */
export const getMyPayments = async (params = {}) => {
  const query = buildQuery(params);

  return fetcher(`/payments/me?${query}`);
};

/**
 * Get payment by ID
 */
export const getPaymentById = async (paymentId) => {
  return fetcher(`/payments/${paymentId}`);
};

/**
 * Get all payments
 */
export const getPayments = async (params = {}) => {
  const query = buildQuery(params);

  return fetcher(`/payments?${query}`);
};

/**
 * Verify payment (Future)
 */
export const verifyPayment = async (paymentId) => {
  return fetcher(`/payments/${paymentId}/verify`, {
    method: "PATCH",
  });
};
