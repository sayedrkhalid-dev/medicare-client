import { fetcher } from "@/lib/fetcher";
import { buildQuery } from "@/lib/query";

/**
 * Create review
 */
export const createReview = async (payload) => {
  return fetcher("/reviews", {
    method: "POST",
    body: JSON.stringify(payload),
  });
};

/**
 * Get my reviews
 */
export const getMyReviews = async (params = {}) => {
  const query = buildQuery(params);

  return fetcher(`/reviews/me?${query}`);
};

/**
 * Get doctor reviews
 */
export const getDoctorReviews = async (doctorId, params = {}) => {
  const query = buildQuery(params);

  return fetcher(`/reviews/doctor/${doctorId}?${query}`);
};

/**
 * Get review by ID
 */
export const getReviewById = async (reviewId) => {
  return fetcher(`/reviews/${reviewId}`);
};

/**
 * Delete review
 */
export const deleteReview = async (reviewId) => {
  return fetcher(`/reviews/${reviewId}`, {
    method: "DELETE",
  });
};
