/**
 * Build URL query string
 *
 * Example:
 * buildQuery({
 *   page: 1,
 *   limit: 10,
 *   search: "doctor",
 * })
 *
 * Returns:
 * page=1&limit=10&search=doctor
 */
export const buildQuery = (params = {}) => {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      searchParams.append(key, value);
    }
  });

  return searchParams.toString();
};
