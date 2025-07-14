import AgeSection from "@/app/(main)/home/components/AgeSection";
import PersonalSection from "@/app/(main)/home/components/PersonalSection";
import TimeSection from "@/app/(main)/home/components/TimeSection";
import React from "react";
import EntireSection from "./components/EntireSection";
import SearchSection from "./components/SearchSection";

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
