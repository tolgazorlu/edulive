import { StreamChat, DefaultGenerics, ExtendableGenerics } from "stream-chat";
import { useEffect, useState } from "react";

export function useConnectUser<T extends ExtendableGenerics = DefaultGenerics>(
  apiKey: string,
  user: {
    id: string | undefined;
    name: string | undefined;
    role: string | undefined;
  },
  userToken: string
) {
  const [chatClient, setChatClient] = useState<StreamChat<T> | null>(null);

  useEffect(() => {
    if (!apiKey || !user?.id || !userToken) return;

    const client = StreamChat.getInstance<T>(apiKey);

    // Add exponential backoff for connection attempts
    const connectWithRetry = async (attempts = 0) => {
      try {
        await client.connectUser(
          {
            id: user.id!,
            name: user.name || user.id!,
            role: user.role || "user",
          },
          userToken
        );
        setChatClient(client);
      } catch (error) {
        if (attempts < 3) {
          // Max 3 retry attempts
          const delay = Math.min(1000 * Math.pow(2, attempts), 10000);
          setTimeout(() => connectWithRetry(attempts + 1), delay);
        } else {
          console.error("Failed to connect user after retries:", error);
        }
      }
    };

    connectWithRetry();

    return () => {
      client.disconnectUser();
      setChatClient(null);
    };
  }, [apiKey, user.id, userToken]);

  return chatClient;
}
