import Business from "@/components/business";
import Finance from "@/components/finance";
import World from "@/components/world";
import Politics from "@/components/politics";
import US from "@/components/us";
import Sports from "@/components/sports";

export default function Home() {
  return (
    <>
      <Business />
      <Finance />
      <World />
      <Politics />
      <US />
      <Sports />
    </>
  );
}