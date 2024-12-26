import { Menu } from "../Home/components/menu";
import { Sidebar } from "../Home/components/sidebar";
import { playlists } from "../Home/data/playlist";
import LiveChatComponent from "./LiveChatComponent";
import LiveStreamComponent from "./LiveStreamComponent";

export default function App() {
  return (
    <div>
      <Menu />
      <div className='border-t'>
        <div className='bg-background'>
          <div className='grid lg:grid-cols-5'>
            <Sidebar playlists={playlists} className='hidden lg:block' />
            <div className='w-full grid grid-cols-6 col-span-4'>
              <div className='col-span-4'>
                <LiveStreamComponent />
              </div>
              <div className='col-span-2'>
                <LiveChatComponent />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
