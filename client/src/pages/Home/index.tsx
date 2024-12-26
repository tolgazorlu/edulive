import { LogInIcon, RadioIcon } from "lucide-react";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { AlbumArtwork } from "./components/album-artwork";
import { Menu } from "./components/menu";
import { PodcastEmptyPlaceholder } from "./components/podcast-empty-placeholder";
import { Sidebar } from "./components/sidebar";
import { listenNowAlbums } from "./data/albums";
import { playlists } from "./data/playlist";
import { Button } from "@/components/ui/button";
import { useOCAuth } from "@opencampus/ocid-connect-js";

export default function HomePage() {
  const { OCId } = useOCAuth();

  const { ocAuth } = useOCAuth();

  const handleLogin = async () => {
    await ocAuth.signInWithRedirect({
      state: "opencampus",
    });
  };

  return (
    <>
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
                          <Button>
                            <RadioIcon />
                            Go Live
                          </Button>
                        )}
                      </div>
                    </div>
                    <TabsContent
                      value='music'
                      className='border-none p-0 outline-none'
                    >
                      <div className='flex items-center justify-between'>
                        <div className='space-y-1'>
                          <h2 className='text-2xl font-semibold tracking-tight'>
                            Popular Streams
                          </h2>
                          <p className='text-sm text-muted-foreground'>
                            Top picks for you. Updated daily.
                          </p>
                        </div>
                      </div>
                      <Separator className='my-4' />
                      <div className='relative'>
                        <ScrollArea>
                          <div className='flex space-x-4 pb-4'>
                            {listenNowAlbums.map((album) => (
                              <AlbumArtwork
                                key={album.name}
                                album={album}
                                className='w-[250px]'
                                aspectRatio='portrait'
                                width={250}
                                height={330}
                              />
                            ))}
                          </div>
                          <ScrollBar orientation='horizontal' />
                        </ScrollArea>
                      </div>
                    </TabsContent>
                    <TabsContent
                      value='music'
                      className='h-full flex-col border-none p-0 data-[state=active]:flex'
                    >
                      <div className='flex items-center justify-between'>
                        <div className='space-y-1'>
                          <h2 className='text-2xl font-semibold tracking-tight'>
                            New Episodes
                          </h2>
                          <p className='text-sm text-muted-foreground'>
                            Your favorite podcasts. Updated daily.
                          </p>
                        </div>
                      </div>
                      <Separator className='my-4' />
                      <PodcastEmptyPlaceholder />
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
