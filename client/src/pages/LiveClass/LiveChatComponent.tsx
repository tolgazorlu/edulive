import {
  Chat,
  Channel,
  ChannelHeader,
  MessageInput,
  MessageList,
  Thread,
  Window,
  LoadingIndicator,
} from "stream-chat-react";
import "stream-chat-react/dist/css/v2/index.css";
import "../../index.css";
import { useEffect, useState } from "react";
import { useGetStreamInformation } from "@/api/stream";
import { useParams } from "react-router-dom";
import { StreamChat, Channel as StreamChannel } from "stream-chat";

const user = {
  id: "123",
  name: "John Doe",
  image: "https://getstream.io/random_png/?name=react",
};

const LiveChatComponent = () => {
  const { slug } = useParams();

  const apiKey = import.meta.env.VITE_API_KEY;

  const [client, setClient] = useState<StreamChat | null>(null);
  const [channel, setChannel] = useState<StreamChannel | null>(null);

  useEffect(() => {
    async function init() {
      const chatClient = StreamChat.getInstance(apiKey);
      await chatClient.connectUser(user, chatClient.devToken(user.id));

      const channel = chatClient.channel("messaging", slug, {
        members: [user.id],
      });

      await channel.watch();

      setClient(chatClient);
      setChannel(channel);
    }

    init();

    return () => {
      if (client) {
        client.disconnectUser();
      }
    };
  }, []);

  if (!client || !channel) return <LoadingIndicator />;

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
