import AgeSection from "@/app/(main)/home/components/AgeSection";
import PersonalSection from "@/app/(main)/home/components/PersonalSection";
import TimeSection from "@/app/(main)/home/components/TimeSection";
import SearchSection from "@/app/(main)/home/components/SearchSection";
import EntireSection from "@/app/(main)/home/components/EntireSection";

const page = () => {
  return (
    <section className="space-y-8">
      <SearchSection />
      <PersonalSection />
      <AgeSection />
      <TimeSection />
      <EntireSection />
    </section>
  );
};

export default page;
