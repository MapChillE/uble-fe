import SearchSection from "@/app/(main)/home/components/SearchSection";
import SearchResults from "@/app/(main)/home/components/SearchResults";
import HomeContent from "@/app/(main)/home/components/HomeContent";

const HomePage = () => {
  return (
    <section>
      <div className="sticky top-12 z-10 bg-white">
        <SearchSection />
      </div>
      <SearchResults />
      <HomeContent />
    </section>
  );
};

export default HomePage;
