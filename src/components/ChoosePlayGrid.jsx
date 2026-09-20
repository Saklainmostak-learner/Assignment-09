import { Calendar, Clock, MapPin, Users } from "lucide-react";

const benefits = [
  {
    id: 1,
    title: "Venue facts you can trust",
    label: "Clear information",
    description:
      "Check the location, capacity, sport type, description and available slots before making a decision.",
    icon: MapPin,
    layout: "lg:col-span-5 lg:row-span-2 bg-ink text-white",
    featured: true,
  },
  {
    id: 2,
    title: "Plan around your schedule",
    label: "Flexible booking",
    description:
      "Select a suitable date and choose from the time slots published by each facility owner.",
    icon: Calendar,
    layout: "lg:col-span-7 bg-background text-ink",
    featured: false,
  },
  {
    id: 3,
    title: "Know the cost upfront",
    label: "Transparent pricing",
    description:
      "Hourly rates and the calculated total price are shown before the booking is confirmed.",
    icon: Clock,
    layout: "lg:col-span-3 bg-primary text-white",
    featured: true,
  },
  {
    id: 4,
    title: "One platform, two sides",
    label: "Players and owners",
    description:
      "Players manage bookings while owners organize their own facility listings from dedicated pages.",
    icon: Users,
    layout: "lg:col-span-4 bg-surface text-ink",
    featured: false,
  },
];

const ChoosePlayGrid = () => {
  return (
    <section className="bg-white py-20 sm:py-24">
      <div className="mx-auto w-[calc(100%-2rem)] max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-xs font-bold tracking-[0.2em] text-primary uppercase">
            Built with purpose
          </span>
          <h2 className="mt-3 text-4xl font-black tracking-[-2px] text-ink sm:text-5xl">
            A calmer way to organize every game
          </h2>
          <p className="mt-5 leading-7 text-muted">
            PlayGrid brings venue information,availability and booking details
            together so that every decision feels clear.
          </p>
        </div>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-12 lg:auto-rows-55">
          {benefits.map((benefit) => {
            const Icon = benefit.icon;
            return (
              <article
                key={benefit.id}
                className={`group relative overflow-hidden rounded-3xl border border-ink/10 p-7 transition duration-300 hover:-translate-y-1 hover:shadow-xl ${benefit.layout}`}
              >
                <div
                  aria-hidden="true"
                  className={
                    benefit.featured
                      ? "absolute -right-12 -bottom-12 size-40 rounded-full border-25 border-white/5"
                      : "absolute -right-12 -bottom-12 size-40 rounded-full border-25 border-primary/5"
                  }
                ></div>
                <div
                  className={
                    benefit.featured
                      ? "grid size-12  place-items-center rounded-2xl bg-white/10 text-white"
                      : "grid size-12  place-items-center rounded-2xl bg-primary/10 text-primary"
                  }
                >
                  <Icon size={22} />
                </div>
                <div className="relative mt-7">
                  <p
                    className={
                      benefit.featured
                        ? "text-xs font-bold tracking-[0.16em] text-white/50 uppercase"
                        : "text-xs font-bold tracking-[0.16em] text-primary uppercase"
                    }
                  >
                    {benefit.label}
                  </p>
                  <h3 className="mt-2 text-2xl font-extrabold tracking-[-1px]">
                    {benefit.title}
                  </h3>
                  <p
                    className={
                      benefit.featured
                        ? "mt-3 max-w-lg text-sm leading-6 text-white/65"
                        : "mt-3 max-w-lg text-sm leading-6 text-muted"
                    }
                  >
                    {benefit.description}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
        <div className="mt-10 flex flex-col items-center justify-between gap-5 rounded-3xl border border-primary/15 bg-primary/15 px-6 py-7 text-center sm:flex-row sm:text-left">
          <div>
            <p className="text-lg font-extrabold text-inl ">
              Designed for real reservation workflows
            </p>
            <p className="mt-1 text-sm leading-6 text-muted ">
              From discovering a facility to managing a confirmed booking.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-2 sm:justify-end">
            <span className="rounded-full bg-white px-4 py-2 text-xs font-bold text-primary shadow-sm">
              Search
            </span>
            <span className="rounded-full bg-white px-4 py-2 text-xs font-bold text-primary shadow-sm">
              Filter
            </span>
            <span className="rounded-full bg-white px-4 py-2 text-xs font-bold text-primary shadow-sm">
              Book
            </span>
            <span className="rounded-full bg-white px-4 py-2 text-xs font-bold text-primary shadow-sm">
              Manage
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChoosePlayGrid;
