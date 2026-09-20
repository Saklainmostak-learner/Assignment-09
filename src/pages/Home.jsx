
import FeatureFacilities from "../components/FeatureFacilities";
import Hero from "../components/Hero";

const Home = () => {
  return (
    <main className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center bg-background px-6 text-center md:min-h-[calc(100vh-4.5rem)]">
      <Hero/>
      <FeatureFacilities/>
    </main>

  );
};

export default Home;
