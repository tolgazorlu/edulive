import LiveStreamComponent from "./LiveStreamComponent";
import LiveChatComponent from "./LiveChatComponent";

export default function App() {
  return (
    <div className='grid grid-cols-12 h-screen p-4 gap-2'>
      <LiveStreamComponent />
      <LiveChatComponent />
    </div>
  );
}
