import React from "react";
import ShelterOffers from "./components/ShelterOffers";
import Stats from "./components/Stats";

function About() {
  return (
    <section className="flex flex-col space-y-8">
      <h1 className="font-light text-5xl w-full md:w-3/5 lg:w-2/5">
        Your Trusted Real Estate Advisors
      </h1>

      <div className="rounded-3xl w-full min-h-[370px] grid grid-cols-1 lg:grid-cols-2 gap-10">
        <Stats />
        <ShelterOffers />
      </div>
    </section>
  );
}

export default About;
