// @components
import { Button } from "@/components/ui/button";
import { useCreateStreamMutation } from "../../api/stream";
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
        <div className='md:px-24 md:py-14 py-8 border border-blue-gray-900 bg-black'>
          <div className='text-center bg-black'>
            <span color='white' className='mb-4 !text-3xl lg:text-4xl'>
              Create A Class
            </span>
            <span className='!text-gray-600 text-[18px] font-normal md:max-w-sm'>
              Copy Stream URL and Stream KEY to your Live Streaming Tool like
              OBS...
            </span>
          </div>
          <div>
            <form action='#' className='flex flex-col gap-4'>
              <input
                name='title'
                value={title}
                className=' text-white'
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
              <textarea
                name='description'
                value={description}
                className=' text-white'
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              />
              <Button onClick={handleCreateStream}>Get Stream Keys</Button>
              <div className='flex items-center gap-2 justify-between'>
                <span className='text-sm'>
                  {" "}
                  <span className='text-white font-bold'>URL:</span>{" "}
                  {rtmpURL?.slice(0, 50)}
                </span>

                <Button
                  onClick={() => {
                    navigator.clipboard.writeText(rtmpURL);
                  }}
                >
                  <CopyIcon width={12} />
                </Button>
              </div>
              <div className='flex items-center gap-2 justify-between'>
                <span className='text-sm'>
                  {" "}
                  <span className='text-white font-bold'>KEY:</span>{" "}
                  {streamKey?.slice(0, 45)}
                </span>

                <Button
                  onClick={() => {
                    navigator.clipboard.writeText(streamKey);
                  }}
                >
                  <CopyIcon width={12} />
                </Button>
              </div>
              <Button
                onClick={() => {
                  navigate("/class/" + slug);
                }}
                color='deep-orange'
              >
                Enter Class
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CreateClass;
