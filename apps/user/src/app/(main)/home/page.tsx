import AgeSection from "@/app/(main)/home/components/AgeSection";
import PersonalSection from "@/app/(main)/home/components/PersonalSection";
import TimeSection from "@/app/(main)/home/components/TimeSection";
import SearchSection from "./components/SearchSection";
import EntireSectionProvider from "./components/EntireSectionProvider";

const page = () => {
  return (
    <section className="space-y-8">
      <SearchSection />
      <PersonalSection />
      <AgeSection />
      <TimeSection />
      <EntireSectionProvider />
    </section>
  );
};

export default page;
