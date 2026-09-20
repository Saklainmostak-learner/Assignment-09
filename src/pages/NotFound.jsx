import { ArrowLeft } from "lucide-react";
import { FaFutbol } from "react-icons/fa6";
import { Link, useLocation } from "react-router";

const NotFound = () => {
  const place = useLocation();

  return (
    <main className="relative grid min-h-[75vh] place-items-center overflow-hidden bg-background px-4 py-16">
      <div
        aria-hidden="true"
        className="absolute -top-32 -left-32 size-80 rounded-full bg-primary/10 blur-3xl"
      ></div>
      <div
        aria-hidden="true"
        className="absolute -right-32 -bottom-32 size-80 rounded-full bg-accent/10 blur-3xl"
      ></div>
      <div className="relative grid w-full max-w-5xl gap-10 rounded-3xl border border-ink/10 bg-surface p-6 shadow-primary/10 sm:p-10 lg:grid-cols-2 lg:items-center">
        <section>
          <span className="text-xs font-bold tracking-[0.2em] text-primary uppercase">
            Out of bounds
          </span>
          <h1 className="mt-3 text-4xl font-black tracking-[-2px] text-ink sm:text-5xl ">
            This page left the playing field
          </h1>
          <p className="mt-5 max-w-lg leading-7 text-muted">
            The address may be incorrect, or the page may have moved to a
            different part of PlayGrid.
          </p>
          <div className="mt-5 rounded-xl border border-ink/10 bg-background px-4 py-3">
            <p className="text-xs font-bold text-muted uppercase">
              Requested route
            </p>

            <code className="mt-1 block break-all text-sm font-bold text-ink">
              {place.pathname}
            </code>
          </div>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 font-bold text-white transition hover:-translate-y-0.5 hover:bg-primary-dark"
            >
              <ArrowLeft size={18} />
              Back Home
            </Link>
            <Link
              to="/facilities"
              className="inline-flex items-center justify-center rounded-xl border border-ink/15 px-5 py-3 font-bold text-ink transition hover:border-primary hover:text-primary"
            >
              Browse Facilities
            </Link>
          </div>
        </section>
        <section className="relative overflow-hidden rounded-3xl bg-ink p-6 text-white sm:p-10">
          <div className="absolute top-1/2 right-0 left-0 h-px bg-white/10"></div>
          <div className="absolute top-0 bottom-0 left-1/2 w-px bg-white/10"></div>
          <div className="relative flex min-h-64 items-center justify-center gap-3 sm:gap-5">
            <span className="text-8xl font-black tracking-[-7px] text-white sm:text-9xl">
              4
            </span>

            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-primary blur-xl"></div>

              <FaFutbol className="relative size-20 animate-[spin_12s_linear_infinite] text-white sm:size-24" />
            </div>

            <span className="text-8xl font-black tracking-[-7px] text-white sm:text-9xl">
              4
            </span>
          </div>
          <div className="relative mt-4 flex item- justify-center gap-3">
            <span className="h-px w-10 bg-white/20"></span>
            <p className="text-xs font-bol tracking-[0.2em] text-white/50 uppercase">Route not Found</p>
            <span className="h-px w-10 bg-white/20"></span>
          </div>
        </section>
      </div>
    </main>
  );
};

export default NotFound;
