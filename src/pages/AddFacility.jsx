import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { ArrowLeft } from "lucide-react";
import FacilityForm from "../components/FacilityForm";
import { authClient } from "../lib/auth-client";
import { apiRequest } from "../lib/api";

const AddFacility = () => {
  const navigate = useNavigate();
  const { data: session } = authClient.useSession();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const addFacility = async (facility) => {
    try {
      setSubmitting(true);
      setError("");
      await apiRequest("/api/facilities", {
        method: "POST",
        body: JSON.stringify(facility),
      });
      navigate("/manage-facilities", {
        replace: true,
        state: { notice: "Facility added successfully." },
      });
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-background py-10 sm:py-14">
      <div className="mx-auto w-[calc(100%-2rem)] max-w-3xl">
        <Link to="/facilities" className="inline-flex items-center gap-2 text-sm font-bold text-muted hover:text-primary">
          <ArrowLeft size={17} /> Back to facilities
        </Link>
        <section className="mt-6 rounded-3xl border border-ink/10 bg-surface p-6 shadow-sm sm:p-10">
          <p className="text-xs font-bold tracking-[0.2em] text-primary uppercase">Owner workspace</p>
          <h1 className="mt-3 text-3xl font-black tracking-[-1.5px] text-ink sm:text-4xl">Add a new facility</h1>
          <p className="mt-3 mb-8 leading-7 text-muted">Publish accurate information so players can confidently reserve your space.</p>
          <FacilityForm
            ownerEmail={session?.user?.email}
            submitLabel="Add facility"
            submitting={submitting}
            error={error}
            onSubmit={addFacility}
          />
        </section>
      </div>
    </main>
  );
};

export default AddFacility;
