import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { ArrowLeft } from "lucide-react";
import FacilityForm from "../components/FacilityForm";
import LoadingSpinner from "../components/LoadingSpinner";
import { authClient } from "../lib/auth-client";
import { apiRequest } from "../lib/api";

const EditFacility = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: session } = authClient.useSession();
  const [facility, setFacility] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    apiRequest(`/api/facilities/${encodeURIComponent(id)}`)
      .then((data) => {
        if (active) setFacility(data);
      })
      .catch((requestError) => {
        if (active) setError(requestError.message);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [id]);

  const updateFacility = async (updatedFacility) => {
    try {
      setSubmitting(true);
      setError("");
      await apiRequest(`/api/facilities/${encodeURIComponent(id)}`, {
        method: "PUT",
        body: JSON.stringify(updatedFacility),
      });
      navigate("/manage-facilities", {
        replace: true,
        state: { notice: "Facility updated successfully." },
      });
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <LoadingSpinner message="Loading facility editor..." />;

  if (!facility) {
    return (
      <main className="grid min-h-[65vh] place-items-center px-4">
        <div className="rounded-3xl border border-red-200 bg-red-50 p-8 text-center">
          <h1 className="text-2xl font-black text-red-950">Facility unavailable</h1>
          <p className="mt-3 text-red-800">{error || "Facility not found."}</p>
          <Link to="/manage-facilities" className="mt-6 inline-flex rounded-xl bg-primary px-5 py-3 font-bold text-white">Return to management</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background py-10 sm:py-14">
      <div className="mx-auto w-[calc(100%-2rem)] max-w-3xl">
        <Link to="/manage-facilities" className="inline-flex items-center gap-2 text-sm font-bold text-muted hover:text-primary">
          <ArrowLeft size={17} /> Back to management
        </Link>
        <section className="mt-6 rounded-3xl border border-ink/10 bg-surface p-6 shadow-sm sm:p-10">
          <p className="text-xs font-bold tracking-[0.2em] text-primary uppercase">Update listing</p>
          <h1 className="mt-3 text-3xl font-black text-ink sm:text-4xl">Edit {facility.name}</h1>
          <p className="mt-3 mb-8 leading-7 text-muted">Keep pricing, availability and venue information current.</p>
          <FacilityForm
            initialFacility={facility}
            ownerEmail={session?.user?.email}
            submitLabel="Save changes"
            submitting={submitting}
            error={error}
            onSubmit={updateFacility}
          />
        </section>
      </div>
    </main>
  );
};

export default EditFacility;
