import { useGetUserIsExist } from "../../api/auth";
import { useOCAuth } from "@opencampus/ocid-connect-js";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const { OCId, ethAddress } = useOCAuth();
  const navigate = useNavigate();

  const { data: getUser } = useGetUserIsExist(OCId);

  useEffect(() => {
    if (OCId && getUser == false) {
      navigate("/create-user");
    }
  }, [getUser, OCId, navigate]);

  return <></>;
};

export default LandingPage;
