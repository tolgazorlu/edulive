import { Button, Typography } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <header className='pt-8'>
      <div className='grid mt-32 w-full place-items-stretch  bg-center bg-contain bg-no-repeat'>
        <div className='container mx-auto px-4 text-center'>
          <Typography className='inline-flex text-sm rounded-lg border-[1.5px] cursor-none border-gray-900 bg-black py-1 lg:px-4 px-1 font-medium text-gray-600 mb-4 shadow'>
            Look Source Codes on Github
          </Typography>

          <Typography
            variant='h1'
            color='blue-gray'
            className='my-1 w-full leading-snug !text-3xl lg:max-w-3xl lg:!text-6xl !max-w-6xl mx-auto text-gray-700'
          >
            <span className='leading-snug bg-gray-300 inline-block text-transparent bg-clip-text'>
              {" "}
              Live Education Platform
            </span>{" "}
          </Typography>

          <Typography
            variant='lead'
            className='mx-auto w-full !text-gray-500 lg:text-xl text-base max-w-3xl'
          >
            The time is now for it to be okay to be great. For being a bright
            color. For standing out.
          </Typography>

          <div className='mt-8 flex items-center justify-center gap-4'>
            <Button
              onClick={() => navigate("/join-class")}
              size='lg'
              color='deep-orange'
              variant='gradient'
              className='w-full px-4 md:w-[24rem] '
            >
              Join Class
            </Button>
            <Button
              onClick={() => navigate("/create-class")}
              size='lg'
              variant='gradient'
              color='teal'
              className='w-full px-4 md:w-[24rem] '
            >
              Host a Class
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeroSection;
