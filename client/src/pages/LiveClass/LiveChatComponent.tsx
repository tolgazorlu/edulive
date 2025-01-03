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
import { useGetStreamInformation } from "@/api/stream";
import { useParams } from "react-router-dom";

const apiKey = "dz5f4d5kzrue";
const userId = "solitary-unit-1";
const userName = "solitary";
const userToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoic29saXRhcnktdW5pdC0xIiwiZXhwIjoxNzM1OTA4MTgxfQ.qmhtRAAgREPhypRSBao6MmPKs07hHQIrerqqPG2Ehro";

const user: User = {
  id: userId,
  name: userName,
  image: `https://getstream.io/random_png/?name=${userName}`,
};

const LiveChatComponent = () => {
  const { slug } = useParams();
  const { data: stream } = useGetStreamInformation(slug as string);
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
            <ChannelHeader title={stream?.title} />
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
