import { useEffect, useState } from "react";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000";

const useFacility = (facilityId) => {
  const [facility, setFacility] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!facilityId) {
      setLoading(false);
      setError("Facility ID was not found");
      return;
    }

    const loadFacility = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `${API_URL}/api/facilities/${facilityId}`
        );

        if (!response.ok) {
          throw new Error("Facility could not be loaded");
        }

        const facilityData = await response.json();
        setFacility(facilityData);
      } catch (error) {
        console.error("Failed to load facility:", error);
        setError(error.message);
        setFacility(null);
      } finally {
        setLoading(false);
      }
    };

    loadFacility();
  }, [facilityId]);

  return {
    facility,
    loading,
    error,
  };
};

export default useFacility;