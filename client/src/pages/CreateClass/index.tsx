// @components
import { useCreateStreamMutation } from "../../api/stream";
import {
  Card,
  Button,
  CardBody,
  CardHeader,
  Typography,
  Input,
  IconButton,
  Tooltip,
  Textarea,
} from "@material-tailwind/react";
import { useOCAuth } from "@opencampus/ocid-connect-js";
import { CopyIcon } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// @icons

function CreateClass() {
  const { OCId } = useOCAuth();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [rtmpURL, setRtmpURL] = useState("");
  const [streamKey, setStreamKey] = useState("");
  const [slug, setSlug] = useState("");

  const { mutateAsync: createStream } = useCreateStreamMutation();

  const handleCreateStream = async () => {
    try {
      const res = await createStream({
        ocid: OCId,
        title,
        description,
      });
      setRtmpURL(res.rtmpURL);
      setStreamKey(res.streamKey);
      setSlug(res.slug);
    } catch (error) {
      console.log(error);
    }
  };

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
                name='title'
                value={title}
                className=' text-white'
                label='Enter a title'
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
              <Textarea
                name='description'
                value={description}
                className=' text-white'
                label='Some descriptions'
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              />
              <Button onClick={handleCreateStream}>Get Stream Keys</Button>
              <div className='flex items-center gap-2 justify-between'>
                <Typography className='text-sm'>
                  {" "}
                  <span className='text-white font-bold'>URL:</span>{" "}
                  {rtmpURL?.slice(0, 50)}
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
                      navigator.clipboard.writeText(rtmpURL);
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
                  {streamKey?.slice(0, 45)}
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
                  navigate("/class/" + slug);
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
