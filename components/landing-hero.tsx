import dynamic from "next/dynamic";

// Dynamic import to avoid issues with framer-motion on server
const LandingProfessional = dynamic(() => import("./landing-professional"), {
  ssr: false,
});

export default function LandingHero() {
  return <LandingProfessional />;
}
