import AgeSection from '@/app/home/components/AgeSection';
import PersonalSection from '@/app/home/components/PersonalSection';
import TimeSection from '@/app/home/components/TimeSection';
import React from 'react';

const page = () => {
  return (
    <section className='space-y-8'>
      <PersonalSection />
      <AgeSection />
      <TimeSection />
    </section>
  );
};

export default page;