import React from "react";
import {
  Navbar,
  Collapse,
  IconButton,
  Button,
  MenuHandler,
  MenuList,
  MenuItem,
  Menu,
} from "@material-tailwind/react";
import { useOCAuth } from "@opencampus/ocid-connect-js";

import NavItems from "./NavItems";
import { LogOutIcon, MenuIcon, RadioIcon, XIcon } from "lucide-react";

type NavbarColorType = "white" | "transparent";

const NavbarSection = ({
  OCId,
  ethAddress,
}: {
  OCId: string;
  ethAddress: string;
}) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen((cur) => !cur);

  const [NavbarColor, setNavbarColor] =
    React.useState<NavbarColorType>("transparent");

  // Handle scroll effect
  const handleScroll = React.useCallback(() => {
    if (window.scrollY > 20) {
      setNavbarColor("white");
    } else {
      setNavbarColor("transparent");
    }
  }, []);

  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 960) {
        setOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  React.useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

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

  return (
    <Navbar
      shadow={false}
      color={NavbarColor}
      fullWidth
      className='border-0 fixed !bg-transparent !z-[999]'
    >
      <div className='container mx-auto flex items-center justify-between'>
        <div className='flex gap-2 justify-center items-center'>
          {" "}
          <RadioIcon className='text-deep-orange-500 w-6 h-6' />
          <span className='text-deep-orange-500 font-bandal text-2xl'>
            edulive
          </span>
        </div>
        <ul className='ml-10 hidden items-center gap-6 lg:flex'>
          <NavItems />
        </ul>
        <div>
          {OCId ? (
            <Menu placement='bottom-end'>
              <MenuHandler>
                <Button>
                  <svg
                    viewBox='0 0 36 36'
                    fill='none'
                    role='img'
                    xmlns='http://www.w3.org/2000/svg'
                    width='32'
                    height='32'
                  >
                    <mask
                      id=':r10:'
                      maskUnits='userSpaceOnUse'
                      x='0'
                      y='0'
                      width='36'
                      height='36'
                    >
                      <rect
                        width='36'
                        height='36'
                        rx='72'
                        fill='#FFFFFF'
                      ></rect>
                    </mask>
                    <g mask='url(#:r10:)'>
                      <rect width='36' height='36' fill='#c0dbab'></rect>
                      <rect
                        x='0'
                        y='0'
                        width='36'
                        height='36'
                        transform='translate(6 6) rotate(356 18 18) scale(1.2)'
                        fill='#e87474'
                        rx='6'
                      ></rect>
                      <g transform='translate(4 1) rotate(6 18 18)'>
                        <path
                          d='M13,21 a1,0.75 0 0,0 10,0'
                          fill='#000000'
                        ></path>
                        <rect
                          x='13'
                          y='14'
                          width='1.5'
                          height='2'
                          rx='1'
                          stroke='none'
                          fill='#000000'
                        ></rect>
                        <rect
                          x='21'
                          y='14'
                          width='1.5'
                          height='2'
                          rx='1'
                          stroke='none'
                          fill='#000000'
                        ></rect>
                      </g>
                    </g>
                  </svg>
                </Button>
              </MenuHandler>
              <MenuList>
                <MenuItem className='flex items-center gap-2'>
                  <svg
                    viewBox='0 0 36 36'
                    fill='none'
                    role='img'
                    xmlns='http://www.w3.org/2000/svg'
                    width='32'
                    height='32'
                  >
                    <mask
                      id=':r10:'
                      maskUnits='userSpaceOnUse'
                      x='0'
                      y='0'
                      width='36'
                      height='36'
                    >
                      <rect
                        width='36'
                        height='36'
                        rx='72'
                        fill='#FFFFFF'
                      ></rect>
                    </mask>
                    <g mask='url(#:r10:)'>
                      <rect width='36' height='36' fill='#c0dbab'></rect>
                      <rect
                        x='0'
                        y='0'
                        width='36'
                        height='36'
                        transform='translate(6 6) rotate(356 18 18) scale(1.2)'
                        fill='#e87474'
                        rx='6'
                      ></rect>
                      <g transform='translate(4 1) rotate(6 18 18)'>
                        <path
                          d='M13,21 a1,0.75 0 0,0 10,0'
                          fill='#000000'
                        ></path>
                        <rect
                          x='13'
                          y='14'
                          width='1.5'
                          height='2'
                          rx='1'
                          stroke='none'
                          fill='#000000'
                        ></rect>
                        <rect
                          x='21'
                          y='14'
                          width='1.5'
                          height='2'
                          rx='1'
                          stroke='none'
                          fill='#000000'
                        ></rect>
                      </g>
                    </g>
                  </svg>{" "}
                  <span className='text-lg'>{OCId}</span>
                </MenuItem>
                <MenuItem className='text-lg'>
                  <span className='text-indigo-600 text-lg'>
                    {ethAddress.slice(0, 10) + "..." + ethAddress.slice(-5)}
                  </span>
                </MenuItem>
                <MenuItem
                  className='text-red-300 text-lg flex justify-between'
                  onClick={handleLogout}
                >
                  Log out
                  <LogOutIcon />
                </MenuItem>
              </MenuList>
            </Menu>
          ) : (
            <Button onClick={handleLogin} color='white' variant='gradient'>
              LOGIN with OCID
            </Button>
          )}
        </div>
        <IconButton
          variant='text'
          color='gray'
          onClick={handleOpen}
          className='ml-auto inline-block lg:hidden'
        >
          {open ? <XIcon /> : <MenuIcon strokeWidth={2} className='h-6 w-6' />}
        </IconButton>
      </div>
      <Collapse open={open}>
        <div className='z-[9999] mt-3 border-t rounded-md bg-white border-blue-gray-50 p-10'>
          <ul className='flex flex-col gap-4'>
            <NavItems />
          </ul>
        </div>
      </Collapse>
    </Navbar>
  );
};

export default NavbarSection;
