"use client";
import PersonalSection from "./PersonalSection";
import AgeSection from "./AgeSection";
import TimeSection from "./TimeSection";
import EntireSection from "./EntireSection";
import { useSearchParams } from "next/navigation";

const HomeContent = () => {
  const searchParams = useSearchParams();
  const q = searchParams.get("q") || "";

  if (q) return null;

  return (
    <section className="scrollbar-hide space-y-8">
      <PersonalSection />
      <AgeSection />
      <TimeSection />
      <EntireSection />
    </section>
  );
};

export default HomeContent;
