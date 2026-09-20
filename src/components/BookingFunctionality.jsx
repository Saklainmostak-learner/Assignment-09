import { ArrowRight } from "lucide-react";
import { Link } from "react-router";

const bookingStep = [
  {
    id: "01",
    title: "Discover your space",
    description:
      "Search by facility name and compare sports, locations, capacity and hourly prices.",
  },
  {
    id: "02",
    title: "Shape your session",
    description:
      "Choose a suitable date, available time slot and the number of hours you want to play.",
  },
  {
    id: "03",
    title: "Show up ready",
    description:
      "Review the booking details, confirm your reservation and arrive prepared for the game.",
  },
];

const BookingFunctionality = () => {
  return (
    <section className="relative overflow-hidden bg-background py-20 sm:py-24">
      <div
        aria-hidden="true"
        className="absolute top-1/2 -right-32 size-80 -translate-y-1/2 rounded-full bg-primary/10  blur-3xl"
      ></div>
      <div className="relative mx-auto w-[calc(100%-2rem)] max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <span className="text-xs font-bold tracking-[0.2em] text-primary uppercase">
              How it works
            </span>
            <h2 className="mt-3 text-4xl font-black tracking-[-2px] text-ink sm:text-5xl">
              Form search to game time in three moves
            </h2>
            <p className="mt-5 max-w-xl leading-7 text-muted">
              PlayGrid keeps the booking journey clear so players can spend less
              time coordinating and more time playing.
            </p>
            <Link
              to="facilities"
              className="mt-7 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 font-bold text-white transition duration-200 hover:-translate-y-0.5 hover:bg-primary-dark"
            >
              Start exploring
              <ArrowRight size={18} />
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {bookingStep.map((step, index) => (
              <article
                key={step.id}
                className={
                  index === 1
                    ? "relative rounded-3xl bg-primary p-6 text-white shadow-xl shadow-primary/20 sm:-translate-y-6"
                    : "relative rounded-3xl border border-ink/10 bg-surface p-6"
                }
              >
                <span
                  className={
                    index === 1
                      ? "text-5xl font-black text-white/20"
                      : "text-5xl font-black text-primary/15"
                  }
                >
                  {step.id}
                </span>
                <h3
                  className={
                    index === 1
                      ? "mt-8 text-xl font-extrabold text-white"
                      : "mt-8 text-xl font-extrabold text-ink"
                  }
                >
                  {step.title}
                </h3>
                <p
                  className={
                    index === 1
                      ? "mt-3 text-sm leading-6  text-white/70"
                      : "mt-3 text-sm leading-6 text-muted"
                  }
                >
                  {step.description}
                </p>
                <div
                  aria-hidden="true"
                  className={
                    index === 1
                      ? "absolute bottom-6 right-6 size-2 rounded-full bg-accent"
                      : "absolute bottom-6 right-6 size-2 rounded-full bg-primary"
                  }
                ></div>
              </article>
            ))}
          </div>
        </div>
        <div className="mt-16 grid overflow-hidden rounded-3xl bg-ink lg:grid-cols-[1fr_auto]">
          <div className="p-7 sm:p-10">
            <p className="text-xs font-bold tracking-[0.2em] text-accent uppercase">
              For facility owners
            </p>
            <h3 className="mt-3 max-w2xl text-2xl font-black text-white sm:text-3xl">Turn available playing hours into organized booking</h3>
            <p className="mt-4 max-w-2xl leading-7 text-white">Add your facility, publish available slots and mange every listing form one focused workspace.</p>
          </div>
          <div className="flex items-center border-t border-white/10 p-7 lg:border-t-0 lg:border-l">
          <Link to="/login" className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 font-bold text-ink transition hover:bg-accent hover:text-white lg:w-auto">
          List a facility
          <ArrowRight size={18}/>
          </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingFunctionality;
