const API_URL = import.meta.env.VITE_API_URL;

export const fetchClient = async (url, options = {}) => {
  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  const response = await fetch(`${API_URL}${url}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => {});
    throw new Error(errorData.message || "API error");
  }

  return response.json();
};
