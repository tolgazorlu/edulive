/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetStreamInformation } from "../..//api/stream";
import {
  LivestreamPlayer,
  StreamCall,
  StreamVideo,
  StreamVideoClient,
  useCallStateHooks,
  User,
} from "@stream-io/video-react-sdk";
import { EyeIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const LiveStreamComponent = () => {
  const { slug } = useParams();

  const apiKey = "t43uy6ywwdj2";

  const user: User = {
    id: "tolga",
    name: "Tolga",
  };

  const { data: streamInformation } = useGetStreamInformation(slug!);

  const [token, setToken] = useState("");
  const [callId, setCallId] = useState("");

  useEffect(() => {
    if (streamInformation) {
      setToken(streamInformation.viewerToken);
      setCallId(streamInformation.callId);
    }
  }, [streamInformation]);

  const client = new StreamVideoClient({ apiKey, user, token });
  const call = client.call("livestream", callId);
  call.join({ create: true });

  return (
    <div className='col-span-9 h-auto rounded-xl'>
      <StreamVideo client={client}>
        <StreamCall call={call}>
          <LivestreamView
            call={call}
            callId={callId}
            streamInformation={streamInformation}
          />
        </StreamCall>
      </StreamVideo>
    </div>
  );
};

const LivestreamView = ({ callId, streamInformation }: any) => {
  const { useParticipantCount, useParticipants } = useCallStateHooks();

  const participantCount = useParticipantCount();

  const [firstParticipant] = useParticipants();

  return (
    <>
      {firstParticipant ? (
        <>
          <LivestreamPlayer callType='livestream' callId={callId} />

          <div className='my-4'>
            <div className='flex gap-2 items-center'>
              <EyeIcon className='text-pink-500' />
              <span className='text-pink-500'>Viewer: {participantCount}</span>
            </div>
            <span className='my-4 font-black text-4xl !leading-snug'>
              {streamInformation.title}
            </span>
            <span className='my-4 font-black !leading-snug'>
              {streamInformation.description}
            </span>
          </div>
        </>
      ) : (
        <div className='w-full h-96 bg-black flex items-center justify-center rounded-lg'>
          <span className='font-poppins uppercase text-white'>
            The Live Streaming not started yet!
          </span>
        </div>
      )}
    </>
  );
};

export default LiveStreamComponent;
