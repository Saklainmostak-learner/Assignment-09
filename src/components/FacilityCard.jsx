import { Clock, MapPin, User } from "lucide-react";
import { Link } from "react-router";

const FacilityCard = ({ facility }) => {
  const {
    name,
    facility_type,
    image,
    location,
    price_per_hour,
    capacity,
    available_slots,
    description,
  } = facility;
  return (
    <article
      className="group flex h-full overflow-hidden
     rounded-2xl border border-ink/10 bg-surface shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-primary/10"
    >
      <div className="relative h-56 overflow-hidden">
        <img
          src={image}
          alt={`${name} sports facility`}
          loading="lazy"
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <span className="absolute top-4 left-4 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-primary backdrop-blur">
          {facility_type}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-xl font-extrabold tracking-[-0.5px] text-ink">
            {name}
          </h3>
          <div className="shrink-0 text-right">
            <p className="text-lg font-extrabold text-primary">
              ৳{price_per_hour}
            </p>
            <p className="text-xs text-muted">per hour</p>
          </div>
        </div>
        <div className="mt-4 space-y-2 text-sm text-muted">
          <div className="flex items-center gap-2">
            <MapPin size={16} className="shrink-0 text-accent" />
            <span>{location}</span>
          </div>
          <div className="flex items-center gap-2">
            <User size={16} className="shrink-0 text-accent" />
            <span>
              Up to {capacity}
              players
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Clock size={16} className="shrink-0 text-accent" />
            <span>Next slot: {available_slots[0]}</span>
          </div>
        </div>
        <p className="mt-4 line-clamp-2 text-sm leading-6 text-muted">
          {description}
        </p>
        <Link
          to="/login"
          className="mt-5 inline-flex w-full items-center justify-center rounded-xl bg-ink px-5 py-3 text-sm font-bold text-white transition hover:bg-primary"
        >
          Book Now
        </Link>
      </div>
    </article>
  );
};

export default FacilityCard;
