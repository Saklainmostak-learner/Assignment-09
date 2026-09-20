import { ArrowRight, Calendar, Clock, MapPin } from "lucide-react";
import { Link } from "react-router";

const heroSessions = [
  {
    id: 1,
    time: "06:00 PM",
    sport: "Badminton",
    court: "Court 02",
    status: "Available",
  },
  {
    id: 2,
    time: "07:30 PM",
    sport: "Football",
    court: "Turf 01",
    status: "Popular",
  },
  {
    id: 3,
    time: "09:00 PM",
    sport: "Tennis",
    court: "Court 04",
    status: "Available",
  },
  {
    id: 4,
    time: "06:00 PM",
    sport: "Badminton",
    court: "Court 02",
    status: "Available",
  },
];
const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-background">
      <div
        aria-hidden="true"
        className="absolute -top-40 -left-40 size-96 rounded-full bg-primary/10 blur-3xl"
      ></div>
      <div
        aria-hidden="true"
        className="absolute right-0 bottom-0 size-80 rounded-full bg-accent/10 blur-3xl"
      ></div>
      <div className="relative mx-auto grid min-h-[calc(100vh-4rem)] w-[calc(100%-2rem)] max-w-7xl items-center gap-14 py-16 lg:grid-cols-[1.05fr_0.5fr] lg:py-20">
        <div>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/5 px-4 py-2 text-sm font-semibold text-primary">
            <span className="size-2 rounded-full bg-accent"></span>
            Sports space,ready when you are
          </div>
          <h1 className="max-w-3xl text-5xl leading-[0.98] font-black tracking-[-3px] text-ink sm:text-6xl lg:text-7xl">
            Your next game starts with the{" "}
            <span className="text-primary">right space.</span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-7 text-muted sm:text-lg">
            Find trusted courts, turfs and training spaces, compare available
            time slots and reserve your session without unnecessary calls or
            waiting.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/facilities"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 font-bold text-white transition duration-200 hover:-translate-y-0.5 hover:bg-primary-dark"
            >
              Explore Facilities
              <ArrowRight size={19} />
            </Link>
            <a
              href="#booking"
              className="inline-flex items-center justify-center rounded-xl border border-ink/15 bg-surface px-6 py-3.5 font-bold text-ink transition duration-200 hover:border-primary/30 hover:text-primary"
            >
              {" "}
              See live slots
            </a>
          </div>
          <div className="mt-10 grid max-w-xl grid-cols-3 gap-3 border-t border-ink/10 pt-6">
            <div>
              <p className="text-lg font-extrabold text-ink">Flexible</p>
              <p className="mt-1 text-xs text-muted sm:text-sm">Time slots</p>
            </div>
            <div>
              <p className="text-lg font-extrabold text-ink">Verified</p>
              <p className="mt-1 text-xs text-muted sm:text-sm">
                Facility details
              </p>
            </div>
            <div>
              <p className="text-lg font-extrabold text-ink">Simple</p>
              <p className="mt-1 text-xs text-muted sm:text-sm">Booking flow</p>
            </div>
          </div>
        </div>
        <div id="booking" className="relative mx-auto w-full max-w-xl">
          <div className="absolute -inset-4 rotate-3 rounded-4xl bg-primary/10 "></div>
          <div className="relative overflow-hidden rounded-4xl border border-white/10 bg-ink p-4 shadow-2xl shadow-primary/15 sm:p-6">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold tracking-[0.18rem] text-white/45 uppercase ">
                  Live booking board
                </p>
                <h2 className="mt-1 text-xl font-bold text-white">
                  Evening sessions
                </h2>
              </div>
              <div className="grid size-11 place-items-center rounded-xl bg-white/10 text-white">
                <Calendar size={21} />
              </div>
            </div>
            <div className="relative mb-5 aspect-16/8 overflow-hidden rounded-2xl bg-linear-to-br from-primary via-[#3658ec] to-[#102b92] p-5">
              <div className="relative h-full rounded-xl border-2 border-white/35">
                <div className="absolute top-0 bottom-0 left-1/2 w-0.5 -translate-x-1/2 bg-white/30"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full size-20  border-2 border-white/30"></div>
                <div className="absolute top-1/2 left-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent shadow-lg  shadow-accent/40"></div>
              </div>
              <div className="absolute top-3 left-3 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-ink ">
                Available now
              </div>
            </div>
            <div className="space-y-3">
              {heroSessions.map((session) => (
                <article
                  key={session.id}
                  className="grid grid-cols-[1fr_auto] items-center gap-4 rounded-xl border border-white/10 bg-white/5 p-3.5"
                >
                  <div>
                    <div className="flex items-center gap-2 text-sm font-bold text-white">
                      <Clock size={15} className="text-center" />
                      {session.time}
                    </div>
                    <div className="mt-1 flex items-center gap-2 text-xs text-white/55">
                      <MapPin size={14} />
                      {session.sport} . {session.court}
                    </div>
                  </div>
                  <span className={session.status==="Popular"?"rounded-full bg-accent/15 px-3 py-1 text-xs font-bold text-accent":"rounded-full bg-emerald-400/15 px-3 py-1 text-xs font-bold text-emerald-300"}>
                  {session.status}
                  </span>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
