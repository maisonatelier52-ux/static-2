import Business from "@/components/business";
import Finance from "@/components/finance";
import Technology from "@/components/technology";
import Politics from "@/components/politics";
import Investigation from "@/components/investigation";
import Sports from "@/components/sports";

export default function Home() {
  return (
    <>
      <Business />
      <Finance />
      <Technology />
      <Politics />
      <Investigation />
      <Sports />
    </>
  );
}