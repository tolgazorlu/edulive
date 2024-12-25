// @components
import {
  Card,
  Button,
  CardBody,
  CardHeader,
  Typography,
  Input,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";
import { CopyIcon } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// @icons

function CreateClass() {
  const [roomName, setRoomName] = useState("");

  const streamURL =
    "rtmps://ingress.stream-io-video.com:443/t2ghjyj5cz34.livestream.livestream_09441999-7cb6-4917-ae88-3ab34f87d6a7";

  const streamKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoidG9sZ2EzIiwiaWF0IjoxNzM1MTIzOTQ1fQ.0q37DXPIedC3GFBxRuyE_jeDFncC3cX8BTS3cqV6lP8";

  const navigate = useNavigate();

  return (
    <section className='px-8'>
      <div className='container mx-auto h-screen grid place-items-center'>
        <Card
          shadow={false}
          className='md:px-24 md:py-14 py-8 border border-blue-gray-900 bg-black'
        >
          <CardHeader
            shadow={false}
            floated={false}
            className='text-center bg-black'
          >
            <Typography
              variant='h1'
              color='white'
              className='mb-4 !text-3xl lg:text-4xl'
            >
              Create A Class
            </Typography>
            <Typography className='!text-gray-600 text-[18px] font-normal md:max-w-sm'>
              Copy Stream URL and Stream KEY to your Live Streaming Tool like
              OBS...
            </Typography>
          </CardHeader>
          <CardBody>
            <form action='#' className='flex flex-col gap-4'>
              <Input
                name='roomName'
                value={roomName}
                className=' text-white'
                label='Enter a room name'
                onChange={(e) => {
                  setRoomName(e.target.value);
                }}
              />
              <div className='flex items-center gap-2 justify-between'>
                <Typography className='text-sm'>
                  {" "}
                  <span className='text-white font-bold'>URL:</span>{" "}
                  {streamURL.slice(0, 50)}
                </Typography>
                <Tooltip
                  content='Copy URL'
                  animate={{
                    mount: { scale: 1, y: 0 },
                    unmount: { scale: 0, y: 25 },
                  }}
                >
                  <IconButton
                    onClick={() => {
                      navigator.clipboard.writeText(streamURL);
                    }}
                  >
                    <CopyIcon width={12} />
                  </IconButton>
                </Tooltip>
              </div>
              <div className='flex items-center gap-2 justify-between'>
                <Typography className='text-sm'>
                  {" "}
                  <span className='text-white font-bold'>KEY:</span>{" "}
                  {streamKey.slice(0, 45)}
                </Typography>
                <Tooltip
                  content='Copy KEY'
                  animate={{
                    mount: { scale: 1, y: 0 },
                    unmount: { scale: 0, y: 25 },
                  }}
                >
                  <IconButton
                    onClick={() => {
                      navigator.clipboard.writeText(streamKey);
                    }}
                  >
                    <CopyIcon width={12} />
                  </IconButton>
                </Tooltip>
              </div>
              <Button
                onClick={() => {
                  navigate("/class/" + roomName);
                }}
                size='lg'
                color='deep-orange'
                fullWidth
              >
                Enter Class
              </Button>

              <Typography
                variant='small'
                className='text-center mx-auto max-w-[19rem] !font-medium !text-gray-600'
              >
                Upon creating class, you consent to abide by our{" "}
                <a href='#' className='text-blue-600'>
                  Terms of Service
                </a>{" "}
                &{" "}
                <a href='#' className='text-blue-600'>
                  Privacy Policy.
                </a>
              </Typography>
            </form>
          </CardBody>
        </Card>
      </div>
    </section>
  );
}

export default CreateClass;
