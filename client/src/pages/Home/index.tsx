import { LogInIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { AlbumArtwork } from "./components/album-artwork";
import { Menu } from "./components/menu";
import { Sidebar } from "./components/sidebar";
import { listenNowAlbums } from "./data/albums";
import { playlists } from "./data/playlist";
import { Button } from "@/components/ui/button";
import { useOCAuth } from "@opencampus/ocid-connect-js";
import { GoLiveDialog } from "./components/go-live-dialog";
import { useGetActiveStreams } from "@/api/stream";
import { Stream } from "@/types/stream";
import { getRandomImage } from "@/utils/getRandomImage";

export default function HomePage() {
  const { OCId } = useOCAuth();
  const navigate = useNavigate();

  const { ocAuth } = useOCAuth();

  const { data: activeStreams, isLoading } = useGetActiveStreams();

  const handleLogin = async () => {
    await ocAuth.signInWithRedirect({
      state: "opencampus",
    });
  };

  return (
    <div>
      <Menu />
      <div className='border-t'>
        <div className='bg-background'>
          <div className='grid lg:grid-cols-5'>
            <Sidebar playlists={playlists} className='hidden lg:block' />
            <div className='col-span-3 lg:col-span-4 lg:border-l'>
              <div className='h-full px-4 py-6 lg:px-8'>
                <Tabs defaultValue='music' className='h-full space-y-6'>
                  <div className='space-between flex items-center'>
                    <TabsList>
                      <TabsTrigger value='music' className='relative'>
                        Live
                      </TabsTrigger>
                      <TabsTrigger value='podcasts' disabled>
                        Podcasts (Soon)
                      </TabsTrigger>
                    </TabsList>
                    <div className='ml-auto mr-4'>
                      {!OCId ? (
                        <Button onClick={handleLogin}>
                          Login with OCID
                          <LogInIcon />
                        </Button>
                      ) : (
                        <GoLiveDialog />
                      )}
                    </div>
                  </div>
                  <TabsContent
                    value='music'
                    className='border-none p-0 outline-none'
                  >
                    {OCId ? (
                      <>
                        <div className='space-y-4'>
                          <div className='flex items-center justify-between'>
                            <div className='space-y-1'>
                              <h2 className='text-2xl font-semibold tracking-tight'>
                                Live Now
                              </h2>
                              <p className='text-sm text-muted-foreground'>
                                Currently streaming educators.
                              </p>
                            </div>
                          </div>
                          <Separator className='my-4' />
                          <div className='relative'>
                            <ScrollArea>
                              <div className='flex space-x-4 pb-4'>
                                {isLoading ? (
                                  <div className='flex items-center justify-center w-full p-8'>
                                    <span className='text-muted-foreground'>
                                      Loading streams...
                                    </span>
                                  </div>
                                ) : (activeStreams?.liveStreams?.length ?? 0) >
                                  0 ? (
                                  activeStreams?.liveStreams.map(
                                    (stream: Stream) => (
                                      <AlbumArtwork
                                        key={stream._id}
                                        album={{
                                          name: stream.title,
                                          artist: stream.owner.name,
                                          cover: getRandomImage(),
                                        }}
                                        className='w-[250px]'
                                        aspectRatio='portrait'
                                        width={250}
                                        height={330}
                                        onClick={() =>
                                          navigate(`/class/${stream.slug}`)
                                        }
                                        isLive={true}
                                      />
                                    )
                                  )
                                ) : (
                                  <div className='flex items-center justify-center w-full p-8'>
                                    <span className='text-muted-foreground'>
                                      No active streams right now
                                    </span>
                                  </div>
                                )}
                              </div>
                              <ScrollBar orientation='horizontal' />
                            </ScrollArea>
                          </div>
                        </div>

                        <div className='space-y-4 mt-8'>
                          <div className='flex items-center justify-between'>
                            <div className='space-y-1'>
                              <h2 className='text-2xl font-semibold tracking-tight'>
                                Past Streams
                              </h2>
                              <p className='text-sm text-muted-foreground'>
                                Recent educational content you might have
                                missed.
                              </p>
                            </div>
                          </div>
                          <Separator className='my-4' />
                          <div className='relative'>
                            <ScrollArea>
                              <div className='flex space-x-4 pb-4'>
                                {isLoading ? (
                                  <div className='flex items-center justify-center w-full p-8'>
                                    <span className='text-muted-foreground'>
                                      Loading streams...
                                    </span>
                                  </div>
                                ) : (activeStreams?.pastStreams?.length ?? 0) >
                                  0 ? (
                                  activeStreams?.pastStreams.map(
                                    (stream: Stream) => (
                                      <AlbumArtwork
                                        key={stream._id}
                                        album={{
                                          name: stream.title,
                                          artist: stream.owner.name,
                                          cover: getRandomImage(),
                                        }}
                                        className='w-[250px]'
                                        aspectRatio='portrait'
                                        width={250}
                                        height={330}
                                        onClick={() =>
                                          navigate(`/class/${stream.slug}`)
                                        }
                                        isLive={false}
                                      />
                                    )
                                  )
                                ) : (
                                  <div className='flex items-center justify-center w-full p-8'>
                                    <span className='text-muted-foreground'>
                                      No past streams available
                                    </span>
                                  </div>
                                )}
                              </div>
                              <ScrollBar orientation='horizontal' />
                            </ScrollArea>
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className='text-center py-8'>
                        <p className='text-muted-foreground'>
                          Please login to view streams
                        </p>
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
