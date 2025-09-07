import { useState } from "react";
import { useAuth } from "../AuthContext";

export function useFetch() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { token } = useAuth();

  const fetchData = async (url, options = {}, authRequired = true) => {
    if (authRequired && !token) {
      console.warn("Token not ready yet. Retrying in 100ms...", token);
      await new Promise((resolve) => setTimeout(resolve, 100));
      return fetchData(url, options, authRequired);
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
          ...(options.headers || {}),
        },
      });
      if (!response.ok) {
        const errorData = await response.json();
        if (errorData?.message) {
          throw new Error(errorData?.message);
        } else {
          throw new Error(errorData?.error?.message);
        }
      }
      const result = await response.json();
      return result;
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, fetchData };
}
