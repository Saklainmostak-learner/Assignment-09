import { useEffect, useState } from "react";
import { Link } from "react-router";
import { CalendarDays, Clock, MapPin, Trash2 } from "lucide-react";
import ConfirmDialog from "../components/ConfirmDialog";
import LoadingSpinner from "../components/LoadingSpinner";
import { apiRequest } from "../lib/api";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [cancelling, setCancelling] = useState(false);

  useEffect(() => {
    let active = true;
    apiRequest("/api/my-bookings")
      .then((data) => {
        if (active) setBookings(Array.isArray(data) ? data : []);
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

  const cancelBooking = async () => {
    if (!selectedBooking) return;
    try {
      setCancelling(true);
      setError("");
      await apiRequest(`/api/bookings/${selectedBooking._id}`, {
        method: "DELETE",
      });
      setBookings((current) =>
        current.filter((booking) => booking._id !== selectedBooking._id)
      );
      setNotice("Booking cancelled successfully.");
      setSelectedBooking(null);
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setCancelling(false);
    }
  };

  if (loading) return <LoadingSpinner message="Loading your bookings..." />;

  return (
    <main className="min-h-screen bg-background py-12">
      <div className="mx-auto w-[calc(100%-2rem)] max-w-7xl">
        <p className="text-xs font-bold tracking-[0.2em] text-primary uppercase">Player dashboard</p>
        <h1 className="mt-3 text-4xl font-black tracking-[-2px] text-ink sm:text-5xl">My bookings</h1>
        <p className="mt-3 max-w-2xl leading-7 text-muted">Review every reserved session and cancel a booking when your plans change.</p>

        {notice && <p className="mt-7 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-emerald-800">{notice}</p>}
        {error && <p role="alert" className="mt-7 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-red-800">{error}</p>}

        {bookings.length ? (
          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            {bookings.map((booking) => (
              <article key={booking._id} className="grid overflow-hidden rounded-3xl border border-ink/10 bg-surface shadow-sm sm:grid-cols-[190px_1fr]">
                <img src={booking.facility_image} alt={booking.facility_name} className="h-48 w-full object-cover sm:h-full" />
                <div className="p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-bold tracking-wide text-primary uppercase">{booking.facility_type}</p>
                      <h2 className="mt-1 text-xl font-black text-ink">{booking.facility_name}</h2>
                    </div>
                    <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-800 capitalize">{booking.status}</span>
                  </div>
                  <div className="mt-4 grid gap-2 text-sm text-muted">
                    <p className="flex items-center gap-2"><MapPin size={16} className="text-accent" /> {booking.facility_location}</p>
                    <p className="flex items-center gap-2"><CalendarDays size={16} className="text-accent" /> {booking.booking_date}</p>
                    <p className="flex items-center gap-2"><Clock size={16} className="text-accent" /> {booking.time_slot} · {booking.hours} hour{booking.hours > 1 ? "s" : ""}</p>
                  </div>
                  <div className="mt-5 flex items-center justify-between border-t border-ink/10 pt-4">
                    <p className="font-black text-primary">Total ৳{booking.total_price}</p>
                    <button type="button" onClick={() => setSelectedBooking(booking)} className="inline-flex items-center gap-2 rounded-xl border border-red-200 px-4 py-2 text-sm font-bold text-red-600 hover:bg-red-50">
                      <Trash2 size={16} /> Cancel
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <section className="mt-8 rounded-3xl border border-dashed border-ink/20 bg-surface px-6 py-16 text-center">
            <h2 className="text-2xl font-black text-ink">No booking yet</h2>
            <p className="mt-3 text-muted">Your reserved sports sessions will appear here.</p>
            <Link to="/facilities" className="mt-6 inline-flex rounded-xl bg-primary px-5 py-3 font-bold text-white">Browse facilities</Link>
          </section>
        )}
      </div>

      <ConfirmDialog
        open={Boolean(selectedBooking)}
        title="Cancel this booking?"
        message={`Your reservation for ${selectedBooking?.facility_name || "this facility"} will be removed.`}
        confirmLabel="Cancel booking"
        busy={cancelling}
        onCancel={() => setSelectedBooking(null)}
        onConfirm={cancelBooking}
      />
    </main>
  );
};

export default MyBookings;
