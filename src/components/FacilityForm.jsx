const fieldClass =
  "mt-2 h-12 w-full rounded-xl border border-ink/15 bg-white px-4 text-ink outline-none transition placeholder:text-muted/65 focus:border-primary focus:ring-4 focus:ring-primary/10";

const FacilityForm = ({
  initialFacility = null,
  ownerEmail,
  submitLabel,
  submitting,
  error,
  success,
  onSubmit,
}) => {
  const slots = initialFacility?.available_slots?.join(", ") || "";

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);

    onSubmit({
      name: String(form.get("name") || "").trim(),
      facility_type: String(form.get("facility_type") || "").trim(),
      image: String(form.get("image") || "").trim(),
      location: String(form.get("location") || "").trim(),
      description: String(form.get("description") || "").trim(),
      price_per_hour: Number(form.get("price_per_hour")),
      capacity: Number(form.get("capacity")),
      available_slots: String(form.get("available_slots") || "")
        .split(",")
        .map((slot) => slot.trim())
        .filter(Boolean),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="text-sm font-bold text-ink">
          Facility name
          <input
            name="name"
            defaultValue={initialFacility?.name || ""}
            placeholder="Example: Riverside Badminton Court"
            required
            className={fieldClass}
          />
        </label>
        <label className="text-sm font-bold text-ink">
          Sport type
          <input
            name="facility_type"
            defaultValue={initialFacility?.facility_type || ""}
            placeholder="Badminton, Football, Tennis..."
            required
            className={fieldClass}
          />
        </label>
      </div>

      <label className="block text-sm font-bold text-ink">
        Image URL
        <input
          type="url"
          name="image"
          defaultValue={initialFacility?.image || ""}
          placeholder="https://example.com/facility.jpg"
          required
          className={fieldClass}
        />
      </label>

      <label className="block text-sm font-bold text-ink">
        Location
        <input
          name="location"
          defaultValue={initialFacility?.location || ""}
          placeholder="Area, Dhaka"
          required
          className={fieldClass}
        />
      </label>

      <label className="block text-sm font-bold text-ink">
        Description
        <textarea
          name="description"
          defaultValue={initialFacility?.description || ""}
          placeholder="Describe the space, surface and useful facilities."
          required
          rows="5"
          className={`${fieldClass} h-auto py-3`}
        />
      </label>

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="text-sm font-bold text-ink">
          Price per hour (৳)
          <input
            type="number"
            min="1"
            name="price_per_hour"
            defaultValue={initialFacility?.price_per_hour || ""}
            required
            className={fieldClass}
          />
        </label>
        <label className="text-sm font-bold text-ink">
          Player capacity
          <input
            type="number"
            min="1"
            name="capacity"
            defaultValue={initialFacility?.capacity || ""}
            required
            className={fieldClass}
          />
        </label>
      </div>

      <label className="block text-sm font-bold text-ink">
        Available time slots
        <input
          name="available_slots"
          defaultValue={slots}
          placeholder="08:00 AM, 10:00 AM, 06:00 PM"
          required
          className={fieldClass}
        />
        <span className="mt-2 block text-xs font-normal leading-5 text-muted">
          Separate multiple slots with commas.
        </span>
      </label>

      <label className="block text-sm font-bold text-ink">
        Owner email
        <input
          type="email"
          value={ownerEmail || ""}
          readOnly
          className={`${fieldClass} bg-background text-muted`}
        />
      </label>

      {error && (
        <p role="alert" className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
          {error}
        </p>
      )}
      {success && (
        <p role="status" className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
          {success}
        </p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="w-full rounded-xl bg-primary px-6 py-3.5 font-bold text-white transition hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-60"
      >
        {submitting ? "Saving facility..." : submitLabel}
      </button>
    </form>
  );
};

export default FacilityForm;
