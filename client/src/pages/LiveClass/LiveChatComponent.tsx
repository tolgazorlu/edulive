import { useState, useEffect } from "react";
import type { User, Channel as StreamChannel } from "stream-chat";
import {
  useCreateChatClient,
  Chat,
  Channel,
  ChannelHeader,
  MessageInput,
  MessageList,
  Thread,
  Window,
} from "stream-chat-react";

import "stream-chat-react/dist/css/v2/index.css";
import "../../index.css";

const apiKey = "dz5f4d5kzrue";
const userId = "mute-dew-2";
const userName = "mute";
const userToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoibXV0ZS1kZXctMiIsImV4cCI6MTczNTg1MDk1MH0.ZjzKUC81PIgxTYjCg_Xcks-jshy370CpuGn9tdap3KQ";

const user: User = {
  id: userId,
  name: userName,
  image: `https://getstream.io/random_png/?name=${userName}`,
};

const LiveChatComponent = () => {
  const [channel, setChannel] = useState<StreamChannel>();
  const client = useCreateChatClient({
    apiKey,
    tokenOrProvider: userToken,
    userData: user,
  });

  useEffect(() => {
    if (!client) return;

    const channel = client.channel("messaging", "custom_channel_id", {
      image: "https://getstream.io/random_png/?name=react",
      name: "Talk about React",
      members: [userId],
    });

    setChannel(channel);
  }, [client]);

  if (!client) return <div>Setting up client & connection...</div>;

  return (
    <div className='col-span-3 h-[96vh] rounded-xl'>
      <Chat client={client}>
        <Channel channel={channel}>
          <Window>
            <ChannelHeader />
            <MessageList />
            <MessageInput />
          </Window>
          <Thread />
        </Channel>
      </Chat>
    </div>
  );
};

export default LiveChatComponent;
