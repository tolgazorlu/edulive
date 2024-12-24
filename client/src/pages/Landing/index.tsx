import HeroSection from "./HeroSection";
import NavbarSection from "./NavbarSection";
import { useOCAuth } from "@opencampus/ocid-connect-js";

const LandingPage = () => {
  const { OCId, ethAddress } = useOCAuth();

  return (
    <>
      <NavbarSection OCId={OCId} ethAddress={ethAddress} />
      <HeroSection />
    </>
  );
};

export default LandingPage;
