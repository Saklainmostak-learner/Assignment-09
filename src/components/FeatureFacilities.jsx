import { ArrowRight } from "lucide-react";
import { Link } from "react-router";
import useFacilities from "../hooks/useFacilities";
import FacilityCard from "./FacilityCard";
const EMPTY_SELECTED_TYPES=[];

const FeatureFacilities = () => {
  const {
    facilities,
    loading,
    error,
  } = useFacilities("", EMPTY_SELECTED_TYPES);

  const featuredFacilities = facilities.slice(0, 6);

  if (loading) {
    return (
      <section className="py-16 text-center">
        <p className="font-semibold text-muted">
          Loading featured facilities...
        </p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 text-center">
        <p className="font-semibold text-red-600">
          {error}
        </p>
      </section>
    );
  }

  return (
    <section className="bg-white py-20">
      <div className="mx-auto w-[calc(100%-2rem)] max-w-7xl">
        <div className="mb-10 flex flex-col gap-5 sm:flex-row sm:items sm:justify-between">
          <div>
            <span className="text-xs font tracking-[0.2rem] text-primary uppercase">
              Featured spaces
            </span>
            <h2 className="mt-3 max-w-2xl text-3xl font-black tracking-[-2px] text-ink sm:text-4xl lg:text-5xl">Popular place to play around Dhaka</h2>
            <p className="mt-4 max-w-2xl leading-7 text-muted">Compare sports types, capacity, available slots and hourly prices before making your reservation.</p>
          </div>
          <Link to="/facilities" className="inline-flex shrink-0 items-center gap-2 font-bold text-primary transition hover:gap-3">View all facilities
          <ArrowRight size={18}/>
          </Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 xl:grid">
            {featuredFacilities.map((facility)=>(
                <FacilityCard key={facility._id || facility.id} facility={facility}/>
            ))}
        </div>
      </div>
    </section>
  );
};


export default FeatureFacilities;
