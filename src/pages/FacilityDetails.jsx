import { Link, useNavigate, useParams } from "react-router";
import useFacility from "../hooks/useFacility";
import LoadingSpinner from "../components/LoadingSpinner";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ArrowLeft, Calendar, Clock, MapPin, Users } from "lucide-react";

const FacilityDetails = () => {
  const nothing = useNavigate();

  const { id } = useParams();

  const { facility, loading, error } = useFacility(id);

  const [bookingDate, setBookingDate] = useState(null);

  const [timeFormat, setTimeFormat] = useState("");

  const [hour, setHour] = useState(1);

  if (loading) {
    return <LoadingSpinner message="Preparing facility details..." />;
  }

  if (error || !facility) {
    return (
      <main className="mx-auto grid min-h-[65vh] max-w-6xl place-items-center px-4 py-16">
        <div className="max-w-lg rounded-3xl border border-red-200 bg-red-50 p-8 text-center">
          <h1 className="text-2xl font-black text-red-950">
            Facility unavailable
          </h1>

          <p className="mt-3 leading-7 text-red-800">
            {error || "The requested facility could not be found."}
          </p>

          <Link
            to="/facilities"
            className="mt-6 inline-flex rounded-xl bg-primary px-5 py-3 font-bold text-white"
          >
            Browse Facilities
          </Link>
        </div>
      </main>
    );
  }

  const facilityId = facility._id || facility.id;

  const availableSlots = Array.isArray(facility.available_slots)
    ? facility.available_slots
    : [];

  const pricePerHour = Number(facility.price_per_hour || 0);

  const priceSum = pricePerHour * Number(hour || 0);

  const handleBookingSystem = (event) => {
    event.preventDefault();

    nothing("/login", {
      state: {
        from: `/facility/${facilityId}`,
      },
    });
  };

  return (
    <main className="min-h-screen bg-background py-10">
      <div className="mx-auto w-full px-4 sm:px-6">
        <Link
          to="/facilities"
          className="mb-7 inline-flex items-center gap-2 text-sm font-bold text-muted transition hover:text-primary"
        >
          <ArrowLeft size={17} />
          Back to all facilities
        </Link>

        <div className="grid items-start gap-8 lg:grid-cols-[1fr_380px] ">
          <section>
            <div className="relative overflow-hidden rounded-3xl bg-ink">
              <img
                src={facility.image}
                alt={`${facility.name} facility `}
                className="h-72 w-full object-cover sm:h-105"
              />
              <span className="absolute top-5 left-5 rounded-full bg-white/90 px-4 py-2 text-sm font-bold text-primary backdrop-blur">
                {facility.facility_type}
              </span>
            </div>
            <div className="mt-8">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h1 className="text-3xl font-black tracking-[-2px] text-ink sm:text-5xl">
                    {facility.name}
                  </h1>
                  <div className="mt-3 flex items-center gap-2 text-muted">
                    <MapPin size={18} className="text-accent" />
                    {facility.location}
                  </div>
                </div>
                <div className="shrink-0 rounded-2xl bg-primary/10 px-5 py-4 sm:text-right">
                  <p className="text-2xl font-black text-primary">
                    ৳{facility.price_per_hour}
                  </p>
                  <p className="text-sm text-muted">per hour</p>
                </div>
              </div>
              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                <div className="rounded-2xl border border-ink/10 bg-surface p-5">
                  <Users size={21} className="text-primary" />
                  <p className="mt-3 text-sm text-muted ">Capacity</p>
                  <p className="mt-1 font-extrabold text-ink">
                    {facility.capacity} players
                  </p>
                </div>
                <div className="rounded-2xl border border-ink/10 bg-surface p-5">
                  <Clock size={21} className="text-primary" />
                  <p className="mt-3 text-sm text-muted">Available slots</p>
                  <p className="mt-1 font-extrabold text-ink">
                    {availableSlots.length}daily
                  </p>
                </div>
                <div className="rounded-2xl border border-ink/10 bg-surface p-5">
                  <Calendar size={21} className="text-primary" />
                  <p className="mt-3 text-sm text-muted">Bookings made</p>
                  <p className="mt-1 font-extrabold text-ink">
                    {facility.booking_count || 0} sessions
                  </p>
                </div>
              </div>
              <div className="mt-8 rounded-2xl border border-ink/10 bg-surface p-6">
                <h2 className="text-2xl font-black text-ink">
                  About this facility
                </h2>
                <p className="mt-4 leading-7 text-muted">
                  {facility.description}
                </p>
              </div>
              <div className="mt-8 rounded-2xl border border-ink/10 bg-surface p-6">
                <h2 className="text-2xl font-black text-ink">
                  About time slots
                </h2>
                <div className="mt-4 flex flex-wrap gap-3">
                  {facility.available_slots.map((slot) => (
                    <span
                      key={slot}
                      className="rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-sm font-bold text-primary"
                    >
                      {slot}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>
          <aside className="rounded-3xl border border-ink/10 bg-surface p-6 shadow-xl shadow-primary/5 lg:sticky lg:top-24">
            <p className="text-xs font-bold tracking-[0.18em] text-brand uppercase">
              Reserve your session
            </p>
            <h2 className="mt-2 text-2xl font-black text-ink">
              Booking summary
            </h2>
            <form onSubmit={handleBookingSystem} className="mt-6 space-y-5">
              <div>
                <label
                  htmlFor="facility-name"
                  className="mb-2 block text-sm font-bold text-ink"
                >
                  Facility name
                </label>
                <input
                  id="facility-name"
                  type="text"
                  value={facility.name}
                  readOnly
                  className="h-12 w-full rounded-xl border border-ink/10 bg-background px-4 text-muted outline-none"
                />
              </div>
              <div>
                <label
                  htmlFor="booking-date"
                  className="mb-2 block text-sm font-bold text-ink"
                >
                  Booking date
                </label>
                <div
                  className="relative
                "
                >
                  <DatePicker
                    id="booking-date"
                    selected={bookingDate}
                    onChange={(date) => setBookingDate(date)}
                    minDate={new Date()}
                    dateFormat="dd MMMM yyyy"
                    required
                    showPopperArrow={false}
                    wrapperClassName="w-full"
                    popperClassName="z-50"
                    className="h-12 w-full rounded-xl border border-ink/10 bg-background px-4 text-muted outline-none focus:border-primary focus:ring-4 focus:ring-primary/10"
                  />

                  <Calendar
                    size={19}
                    className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-primary"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="time-slot"
                  className="mb-2 block text-sm font-bold text-ink"
                >
                  Time slot
                </label>
                <select
                  id="time-slot"
                  value={timeFormat}
                  onChange={(event) => setTimeFormat(event.target.value)}
                  required
                  className="h-12 w-full rounded-xl border border-ink/10 bg-background px-4 text-muted outline-none focus:border-primary focus:ring-4 focus:ring-primary/10"
                >
                  <option value="">Select a time slot</option>
                  {availableSlots.map((slot) => (
                    <option key={slot} value={slot}>
                      {slot}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label
                  htmlFor="booking-hours"
                  className="mb-2 block text-sm font-bold text-ink"
                >
                  Number of hours
                </label>
                <input
                  id="booking-hours"
                  type="number"
                  min="1"
                  max="8"
                  value={hour}
                  onChange={(even) => setHour(even.target.value)}
                  required
                  className="h-12 w-full rounded-xl border border-ink/10 bg-background px-4 text-muted outline-none focus:border-primary focus:ring-4 focus:ring-primary/10"
                />
              </div>
              <div className="flex items-center justify-between rounded-xl bg-ink p-4 text-white">
                <span className="text-sm text-white/65">Total price</span>
                <strong>৳{priceSum}</strong>
              </div>
              <button
                type="submit"
                className="w-full rounded-xl bg-primary px-5 py-3.5 font-bold text-white transition hover:bg-primary-dark"
              >
                Continue to Login
              </button>
              <p className="text-center text-xs leading-5 text-muted">
                Authentication is required before confirming a booking.
              </p>
            </form>
          </aside>
        </div>
      </div>
    </main>
  );
};

export default FacilityDetails;
