import { Button, Input } from "@material-tailwind/react";
import { CameraIcon, MicIcon } from "lucide-react";
import React from "react";

const LiveClass = () => {
  return (
    <>
      <div className='grid grid-cols-12 gap-2 p-4'>
        <div className='col-span-9 h-[80vh] grid grid-cols-2 gap-2'>
          <div className=' rounded-xl max-h-96 bg-green-50 opacity-30'></div>
          <div className=' rounded-xl max-h-96 bg-green-50 opacity-30'></div>
          <div className=' rounded-xl max-h-96 bg-green-50 opacity-30'></div>
          <div className=' rounded-xl max-h-96 bg-green-50 opacity-30'></div>
        </div>
        <div className='col-span-3 h-[80vh] rounded-xl flex flex-col justify-end gap-1 p-1'>
          <div className='w-full h-full '>
            <>
              {/* Chat Bubble */}
              <ul className='space-y-5'>
                {/* Chat */}
                <li className='max-w-lg flex gap-x-2 sm:gap-x-4 me-11'>
                  <span className='shrink-0 inline-flex items-center justify-center size-[38px] rounded-full bg-gray-600'>
                    <span className='text-sm font-medium text-white leading-none'>
                      TZ
                    </span>
                  </span>
                  {/* Card */}
                  <div className='bg-black border border-gray-800 rounded-2xl p-4 space-y-3'>
                    <h2 className='font-medium text-gray-500'>
                      How can we help?
                    </h2>
                    <div className='space-y-1.5'>
                      <p className='mb-1.5 text-sm text-gray-500'>
                        You can ask questions like:
                      </p>
                      <ul className='list-disc list-outside space-y-1.5 ps-3.5'>
                        <li className='text-sm text-gray-500'>
                          What's Preline UI?
                        </li>
                        <li className='text-sm text-gray-500'>
                          How many Starter Pages &amp; Examples are there?
                        </li>
                        <li className='text-sm text-gray-500'>
                          Is there a PRO version?
                        </li>
                      </ul>
                    </div>
                  </div>
                  {/* End Card */}
                </li>
                {/* End Chat */}
                {/* Chat */}
                <li className='flex ms-auto gap-x-2 sm:gap-x-4'>
                  <div className='grow text-end space-y-3'>
                    {/* Card */}
                    <div className='inline-block bg-black rounded-2xl p-4 shadow-sm'>
                      <p className='text-sm text-white'>what's preline ui?</p>
                    </div>
                    {/* End Card */}
                  </div>
                  <span className='shrink-0 inline-flex items-center justify-center size-[38px] rounded-full bg-gray-600'>
                    <span className='text-sm font-medium text-white leading-none'>
                      TZ
                    </span>
                  </span>
                </li>
                {/* End Chat */}
              </ul>
              {/* End Chat Bubble */}
            </>
          </div>
          <div className='flex gap-1'>
            <Input
              type='text'
              className='text-white'
              placeholder='send message'
              label='send message'
            />
            <Button color='green'>Send</Button>
          </div>
        </div>
      </div>
      <div className='fixed z-50 h-32 bottom-2 w-full px-4'>
        <div className='bg-black h-full rounded-xl flex items-center justify-center gap-4'>
          <Button variant='gradient' color='teal'>
            <MicIcon />
          </Button>
          <Button variant='gradient' color='teal'>
            <CameraIcon />
          </Button>
          <Button variant='gradient' color='red' size='lg'>
            Leave Room
          </Button>
        </div>
      </div>
    </>
  );
};

export default LiveClass;
