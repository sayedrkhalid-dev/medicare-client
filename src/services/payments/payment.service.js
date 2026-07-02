import { fetcher } from "@/lib/fetcher";
import { buildQuery } from "@/lib/query";

/**
 * Create Stripe checkout session
 *
 * payload: { doctorId, appointmentDate, appointmentTime, symptoms? }
 * Returns: { sessionId, checkoutUrl }
 */
export const createCheckoutSession = async (payload) => {
  return fetcher("/payments/checkout", {
    method: "POST",
    body: JSON.stringify(payload),
  });
};

/**
 * Verify checkout session
 *
 * Poll this on the payment success page until status is "success".
 * Possible statuses: "pending" | "processing" | "success"
 */
export const verifyCheckoutSession = async (sessionId) => {
  return fetcher(`/payments/verify/${sessionId}`);
};

/**
 * Get my payments (patient)
 */
export const getMyPayments = async (params = {}) => {
  const query = buildQuery(params);

  return fetcher(`/payments/me?${query}`);
};

/**
 * Get payment by ID
 *
 * Patient: only their own payment.
 * Admin: any payment.
 */
export const getPaymentById = async (paymentId) => {
  return fetcher(`/payments/${paymentId}`);
};

/**
 * Get all payments (admin)
 */
export const getPayments = async (params = {}) => {
  const query = buildQuery(params);

  return fetcher(`/payments?${query}`);
};
