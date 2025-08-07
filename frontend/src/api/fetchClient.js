const API_URL = import.meta.env.VITE_API_URL;

export const fetchClient = async (
  url,
  options = {},
  contentType = "application/json",
  returnType = "json",
) => {
  const headers = {
    ...(contentType ? { "Content-Type": contentType } : {}),
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

  const returnValue = returnType === "json" ? response.json() : response.blob();

  return returnValue;
};
