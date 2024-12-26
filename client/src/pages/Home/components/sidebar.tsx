import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

import { Playlist } from "../data/playlist";
import { CircleCheck } from "lucide-react";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  playlists: Playlist[];
}

export function Sidebar({ className, playlists }: SidebarProps) {
  return (
    <div className={cn("pb-12", className)}>
      <div className='space-y-4 py-4'>
        <div className='px-3 py-2'>
          <h2 className='mb-2 px-4 text-lg font-semibold tracking-tight'>
            Discover
          </h2>
          <div className='space-y-1'>
            <Button variant='secondary' className='w-full justify-start'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
                className='mr-2 h-4 w-4'
              >
                <path d='M4.9 19.1C1 15.2 1 8.8 4.9 4.9' />
                <path d='M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.5' />
                <circle cx='12' cy='12' r='2' />
                <path d='M16.2 7.8c2.3 2.3 2.3 6.1 0 8.5' />
                <path d='M19.1 4.9C23 8.8 23 15.1 19.1 19' />
              </svg>
              Live
            </Button>
            <Button
              variant='ghost'
              className='w-full justify-start text-gray-300'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
                className='mr-2 h-4 w-4'
              >
                <path d='M4.9 19.1C1 15.2 1 8.8 4.9 4.9' />
                <path d='M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.5' />
                <circle cx='12' cy='12' r='2' />
                <path d='M16.2 7.8c2.3 2.3 2.3 6.1 0 8.5' />
                <path d='M19.1 4.9C23 8.8 23 15.1 19.1 19' />
              </svg>
              Podcast (Soon)
            </Button>
          </div>
        </div>
        <div>
          <h2 className='relative px-7 text-lg font-semibold tracking-tight'>
            Teachers
          </h2>
          <ScrollArea className=' px-1'>
            <div className='space-y-1 p-2'>
              {playlists?.map((playlist, i) => (
                <Button
                  key={`${playlist}-${i}`}
                  variant='ghost'
                  className='w-full justify-start font-normal'
                >
                  <CircleCheck className='text-primary' />
                  {playlist}
                </Button>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}
