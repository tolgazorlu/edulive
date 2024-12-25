import { useGetUserIsExist } from "../../api/auth";
import HeroSection from "./HeroSection";
import NavbarSection from "./NavbarSection";
import { useOCAuth } from "@opencampus/ocid-connect-js";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const { OCId, ethAddress } = useOCAuth();
  const { data: userExist } = useGetUserIsExist(OCId);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userExist) {
      navigate("/create-user");
    }
  });

  const { data: getUser } = useGetUserIsExist(OCId);

  useEffect(() => {
    if (getUser == false) {
      navigate("/create-user");
    }
  }, [getUser]);

  return (
    <>
      <NavbarSection OCId={OCId} ethAddress={ethAddress} />
      <HeroSection />
    </>
  );
};

export default LandingPage;
