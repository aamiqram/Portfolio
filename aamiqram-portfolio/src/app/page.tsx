import Hero from "@/components/home/Hero";
import Profile from "@/components/home/Profile";
import Capabilities from "@/components/home/Capabilities";
import FeaturedProjects from "@/components/home/FeaturedProjects";
import EngineeringHighlights from "@/components/home/EngineeringHighlights";
import Journey from "@/components/home/Journey";
import ContactCta from "@/components/home/ContactCta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Profile />
      <Capabilities />
      <FeaturedProjects />
      <EngineeringHighlights />
      <Journey />
      <ContactCta />
    </>
  );
}