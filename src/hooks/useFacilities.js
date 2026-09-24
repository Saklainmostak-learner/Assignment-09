import { useEffect, useState } from "react";

const API_URL = (
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000"
).replace(/\/$/, "");

function useFacilities(searchField = "", selectedType = []) {
  const [facilities, setFacilities] = useState([]);
  const [facilityTypes, setFacilityTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Load facility types
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
          throw new Error("Could not load facility types");
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

  // Load all facilities
  useEffect(() => {
    const controller = new AbortController();

    const timer = setTimeout(async () => {
      try {
        setLoading(true);
        setError("");

        const query = new URLSearchParams();

        if (searchField.trim()) {
          query.set("search", searchField.trim());
        }

        if (
          Array.isArray(selectedType) &&
          selectedType.length > 0
        ) {
          query.set("sports", selectedType.join(","));
        }

        const queryString = query.toString();

        const requestURL = queryString
          ? `${API_URL}/api/facilities?${queryString}`
          : `${API_URL}/api/facilities`;

        const response = await fetch(requestURL, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("Could not load facilities");
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

          setFacilities([]);
          setError(error.message);
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
  }, [searchField, selectedType]);

  return {
    facilities,
    facilityTypes,
    loading,
    error,
  };
}

export default useFacilities;