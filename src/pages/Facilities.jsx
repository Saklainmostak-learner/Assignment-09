import { useState } from "react";
import useFacilities from "../hooks/useFacilities";
import LoadingSpinner from "../components/LoadingSpinner";
import { Search } from "lucide-react";
import FacilityCard from "../components/FacilityCard";

const Facilities = () => {
  const [searchFiled, setSearchFiled] = useState("");

  const [selectedType, setSelectedType] = useState([]);
  const { facilities, facilityTypes, loading, error } = useFacilities(
    searchFiled,
    selectedType,
  );
  const toggleSport = (sportType) => {
    setSelectedType((presentType) => {
      const isAlreadySelected = presentType.includes(sportType);

      if (isAlreadySelected) {
        return presentType.filter((type) => type !== sportType);
      }
      return [...presentType, sportType];
    });
  };
  const clearFilters = () => {
    setSearchFiled("");
    setSelectedType([]);
  };

  const isActiveFilter = searchFiled.trim() !== "" || selectedType.length > 0;

  if (loading && facilities.length === 0) {
    return <LoadingSpinner message="Finding available playing spaces..." />;
  }

  if (error) {
    return (
      <main className="mx-auto grid min-h-[60vh] max-w-6xl place-items-center px-4 py-16">
        <div className="max-w-lg rounded-3xl border border-red-200 bg-red-50 p-8 text-center">
          <h1 className="text-2xl font-black text-red-950">
            Facilities unavailable
          </h1>

          <p className="mt-3 leading-7 text-red-800">{error}</p>

          <button
            type="button"
            onClick={() => window.location.reload()}
            className="mt-6 rounded-xl bg-primary px-5 py-3 font-bold text-white"
          >
            Try again
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <section className="border-b border-ink/10 bg-ink py-16 text-white">
        <div className="mx-auto w-[calc(100%-2rem)] max-w-7xl">
          <span className="text-xs font-bold tracking-[0.2em] text-accent uppercase">
            Find your playing space
          </span>
          <h1 className="mt-3 max-w-3xl text-4xl font-black tracking-[-2px] sm:text-5xl lg:text-6xl">
            Facilities built around your game
          </h1>
          <p className="mt-5 max-w-2xl leading-7 text-white/65">
            Search by facility name and choose one or multiple sport types to
            find a suitable space.
          </p>
        </div>
      </section>
      <section className="py-12">
        <div className="mx-auto w-[calc(100%-2rem)] max-w-7xl">
          <div className="rounded-2xl border border-ink/10 bg-surface p-4 shadow-sm sm:p-6">
            <div className="relative">
              <Search
                size={20}
                className="absolute top-1/2 left-4 -translate-y-1/2 text-muted"
              />
              <input
                type="search"
                value={searchFiled}
                onChange={(event) => setSearchFiled(event.target.value)}
                placeholder="Search facility..."
                aria-label="Search facilities by name"
                className="h-12 w-full rounded-xl border border-ink/15 bg-white pr-4 pl-12 text-ink outline-none transition placeholder:text-muted/70 focus:border-primary focus:ring-4 focus:ring-primary/10"
              />
            </div>
            <div className="mt-5">
              <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
                <p className="text-sm font-bold text-ink">
                  Filter by sport type
                </p>
                {isActiveFilter && (
                  <button
                    type="button"
                    onClick={clearFilters}
                    className="text-sm font-bold text-primary transition hover:text-primary-dark"
                  >
                    Clear filters
                  </button>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                {facilityTypes.map((sportType) => {
                  const isSelected = selectedType.includes(sportType);

                  return (
                    <button
                      key={sportType}
                      type="button"
                      onClick={() => toggleSport(sportType)}
                      aria-pressed={isSelected}
                      className={
                        isSelected
                          ? "rounded-full border border-primary bg-primary px-4 py-2 text-sm font-bold text-white transition"
                          : "rounded-full border border-ink/15 bg-white px-4 py-2 text-sm font-semibold text-muted transition hover:border-primary/40 hover:text-primary"
                      }
                    >
                      {sportType}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="mt-10 flex items-center justify-between gap-4">
            <div>
              <p className="font-bold text-ink">
                {facilities.length}{" "}
                {facilities.length === 1 ? "facility" : "facilities"} found
              </p>
              {selectedType.length > 0 && (
                <p className="mt-1 text-sm text-muted">
                  {" "}
                  selected: {selectedType.join(", ")}
                </p>
              )}
            </div>
          </div>
          {facilities.length > 0 ? (
            <div className="mt-6 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {facilities.map((facility) => (
                <FacilityCard
                  key={facility._id || facility.id}
                  facility={facility}
                />
              ))}
            </div>
          ) : (
            <div className="mt-6 rounded-2xl border border-dashed border-ink/20 bg-surface px-6 py-16 text-center">
              <div className="mx-auto grid size-14 place-items-center rounded-full bg-primary/10 text-primary">
                <Search size={24} />
              </div>
              <h2 className="mt-5 text-2xl font-extrabold text-ink">
                No facilities found
              </h2>
              <p className="mx-auto mt-2 max-w-md leading-7 text-muted">
                Try a different facility name or remove some of the selected
                sport types.
              </p>
              <button
                type="button"
                onClick={clearFilters}
                className="mt-5 rounded-full bg-primary px-5 py-3 font-bold text-white transition hover:bg-primary-dark"
              >
                Reset search
              </button>
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default Facilities;
