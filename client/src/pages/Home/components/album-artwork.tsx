import { PlusCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { cn } from "@/lib/utils";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";

import { Album } from "../data/albums";
import { playlists } from "../data/playlist";

interface AlbumArtworkProps extends React.HTMLAttributes<HTMLDivElement> {
  album: Album;
  aspectRatio?: "portrait" | "square";
  width?: number;
  height?: number;
  onClick?: () => void;
  isLive?: boolean;
  viewerCount?: number;
}

export function AlbumArtwork({
  album,
  aspectRatio = "portrait",
  width,
  height,
  className,
  onClick,
  isLive,
  viewerCount,
  ...props
}: AlbumArtworkProps & { viewerCount?: number }) {
  return (
    <div
      className={cn("space-y-2 relative group cursor-pointer", className)}
      {...props}
      onClick={onClick}
    >
      <div className='relative'>
        {/* Live badge with viewer count */}
        {isLive && (
          <div className='absolute top-2 left-2 z-10 flex items-center gap-2'>
            <span className='inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-red-500 text-white'>
              LIVE
            </span>
            {viewerCount && (
              <span className='text-white text-sm font-medium'>
                {viewerCount.toLocaleString()} watching
              </span>
            )}
          </div>
        )}

        {/* Image container */}
        <div className='overflow-hidden rounded-sm'>
          <img
            src={album.cover}
            alt={album.name}
            width={width}
            height={height}
            className={cn(
              "w-full object-cover",
              aspectRatio === "portrait" ? "aspect-[16/9]" : "aspect-square"
            )}
          />
        </div>
      </div>

      {/* Stream info */}
      <div className='flex gap-3 items-start px-1'>
        {/* Streamer Avatar */}

        <div className='p-2 bg-gray-300 flex items-center justify-center rounded-full w-10 h-10 text-gray-500'>
          <span>{album.artist.slice(0, 2)}</span>
        </div>

        {/* Stream details */}
        <div className='flex-1 space-y-1'>
          <h3 className='font-medium leading-tight text-base dark:text-white line-clamp-1'>
            {album.name}
          </h3>
          <p className='text-sm text-muted-foreground line-clamp-1'>
            {album.artist}
          </p>

          {/* Categories/Tags */}
          <div className='flex flex-wrap gap-1 mt-1'>
            {album.category && (
              <span className='px-2 py-0.5 bg-muted text-xs rounded-full dark:text-gray-300'>
                {album.category}
              </span>
            )}
            {album.language && (
              <span className='px-2 py-0.5 bg-muted text-xs rounded-full dark:text-gray-300'>
                {album.language}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
