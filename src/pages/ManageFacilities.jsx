import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router";
import { Edit3, MapPin, Plus, Trash2 } from "lucide-react";
import ConfirmDialog from "../components/ConfirmDialog";
import LoadingSpinner from "../components/LoadingSpinner";
import { apiRequest } from "../lib/api";

const ManageFacilities = () => {
  const location = useLocation();
  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState(location.state?.notice || "");
  const [selectedFacility, setSelectedFacility] = useState(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    let active = true;
    apiRequest("/api/my-facilities")
      .then((data) => {
        if (active) setFacilities(Array.isArray(data) ? data : []);
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
  }, []);

  const deleteFacility = async () => {
    if (!selectedFacility) return;
    try {
      setDeleting(true);
      setError("");
      await apiRequest(`/api/facilities/${selectedFacility._id}`, {
        method: "DELETE",
      });
      setFacilities((current) =>
        current.filter((facility) => facility._id !== selectedFacility._id)
      );
      setNotice("Facility deleted successfully.");
      setSelectedFacility(null);
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setDeleting(false);
    }
  };

  if (loading) return <LoadingSpinner message="Loading your facilities..." />;

  return (
    <main className="min-h-screen bg-background py-12">
      <div className="mx-auto w-[calc(100%-2rem)] max-w-7xl">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-bold tracking-[0.2em] text-primary uppercase">Owner workspace</p>
            <h1 className="mt-3 text-4xl font-black tracking-[-2px] text-ink sm:text-5xl">Manage my facilities</h1>
            <p className="mt-3 max-w-2xl leading-7 text-muted">Only listings connected to your signed-in email appear here.</p>
          </div>
          <Link to="/add-facility" className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 font-bold text-white hover:bg-primary-dark">
            <Plus size={18} /> Add facility
          </Link>
        </div>

        {notice && <p className="mt-7 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-emerald-800">{notice}</p>}
        {error && <p role="alert" className="mt-7 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-red-800">{error}</p>}

        {facilities.length ? (
          <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {facilities.map((facility) => (
              <article key={facility._id} className="overflow-hidden rounded-3xl border border-ink/10 bg-surface shadow-sm">
                <img src={facility.image} alt={facility.name} className="h-48 w-full object-cover" />
                <div className="p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-bold text-primary uppercase">{facility.facility_type}</p>
                      <h2 className="mt-1 text-xl font-black text-ink">{facility.name}</h2>
                    </div>
                    <p className="font-black text-primary">৳{facility.price_per_hour}/hr</p>
                  </div>
                  <p className="mt-4 flex items-center gap-2 text-sm text-muted"><MapPin size={16} className="text-accent" /> {facility.location}</p>
                  <div className="mt-5 grid grid-cols-2 gap-3">
                    <Link to={`/edit-facility/${facility._id}`} className="inline-flex items-center justify-center gap-2 rounded-xl border border-primary/25 px-4 py-2.5 font-bold text-primary hover:bg-primary/5">
                      <Edit3 size={17} /> Update
                    </Link>
                    <button type="button" onClick={() => setSelectedFacility(facility)} className="inline-flex items-center justify-center gap-2 rounded-xl border border-red-200 px-4 py-2.5 font-bold text-red-600 hover:bg-red-50">
                      <Trash2 size={17} /> Delete
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <section className="mt-8 rounded-3xl border border-dashed border-ink/20 bg-surface px-6 py-16 text-center">
            <h2 className="text-2xl font-black text-ink">No facility added yet</h2>
            <p className="mt-3 text-muted">Create your first listing to start receiving bookings.</p>
            <Link to="/add-facility" className="mt-6 inline-flex rounded-xl bg-primary px-5 py-3 font-bold text-white">Add facility</Link>
          </section>
        )}
      </div>

      <ConfirmDialog
        open={Boolean(selectedFacility)}
        title={`Delete ${selectedFacility?.name || "facility"}?`}
        message="This permanently removes the listing and its associated bookings. This action cannot be undone."
        confirmLabel="Delete facility"
        busy={deleting}
        onCancel={() => setSelectedFacility(null)}
        onConfirm={deleteFacility}
      />
    </main>
  );
};

export default ManageFacilities;
