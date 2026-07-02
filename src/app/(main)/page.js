import Hero from "@/components/Hero";
import FeaturedDoctors from "./FeaturedDoctors";
import WhyChooseUs from "./WhyChooseUs";
import PatientSuccessStories from "@/components/SuccessStrories";

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedDoctors />
      <WhyChooseUs />
      <PatientSuccessStories />
    </>
  );
}
