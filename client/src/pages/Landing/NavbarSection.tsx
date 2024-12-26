import React from "react";

import { useOCAuth } from "@opencampus/ocid-connect-js";

const NavbarSection = ({
  OCId,
  ethAddress,
}: {
  OCId: string;
  ethAddress: string;
}) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen((cur) => !cur);

  const { ocAuth } = useOCAuth();

  const handleLogin = async () => {
    await ocAuth.signInWithRedirect({
      state: "opencampus",
    });
  };

  const handleLogout = () => {
    localStorage.clear();
    setTimeout(() => {
      window.location.href = "/";
    }, 1000);
  };

  return <></>;
};

export default NavbarSection;
