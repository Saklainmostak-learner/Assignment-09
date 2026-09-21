import { useEffect, useState } from "react";

const API_URL = (
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000"
).replace(/\/$/, "");

function useFacilities(searchField, selectedTypes) {
  const [facilities, setFacilities] = useState([]);
  const [facilityTypes, setFacilityTypes] =
    useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Load unique sport types
  useEffect(() => {
    const controller = new AbortController();

    async function loadFacilityTypes() {
      try {
        const response = await fetch(
          `${API_URL}/api/facility-types`,
          {
            signal: controller.signal,
          }
        );

        if (!response.ok) {
          throw new Error(
            "Could not load facility types"
          );
        }

        const data = await response.json();

        setFacilityTypes(
          Array.isArray(data) ? data : []
        );
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error(
            "Facility types request failed:",
            error
          );
        }
      }
    }

    loadFacilityTypes();

    return () => {
      controller.abort();
    };
  }, []);

  // Load facilities with search and filter
  useEffect(() => {
    const controller = new AbortController();

    setLoading(true);
    setError("");

    const timer = setTimeout(async () => {
      try {
        const query = new URLSearchParams();

        const normalizedSearch =
          searchField.trim();

        if (normalizedSearch) {
          query.set("search", normalizedSearch);
        }

        if (selectedTypes.length > 0) {
          query.set(
            "sports",
            selectedTypes.join(",")
          );
        }

        const queryString = query.toString();

        const url = queryString
          ? `${API_URL}/api/facilities?${queryString}`
          : `${API_URL}/api/facilities`;

        const response = await fetch(url, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(
            "Could not load facilities"
          );
        }

        const data = await response.json();

        setFacilities(
          Array.isArray(data) ? data : []
        );
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error(
            "Facilities request failed:",
            error
          );

          setError(
            "Facilities could not be loaded. Make sure the server is running."
          );
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }, 350);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [searchField, selectedTypes]);

  return {
    facilities,
    facilityTypes,
    loading,
    error,
  };
}

export default useFacilities;