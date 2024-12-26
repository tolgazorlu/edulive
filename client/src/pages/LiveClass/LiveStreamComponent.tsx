/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetStreamInformation } from "../..//api/stream";
import { Typography } from "@material-tailwind/react";
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
          <div className='w-full bg-black flex items-center justify-center rounded-xl'>
            <LivestreamPlayer callType='livestream' callId={callId} />
          </div>
          <div className='my-4'>
            <div className='flex gap-2 items-center'>
              <EyeIcon className='text-pink-500' />
              <Typography className='text-pink-500'>
                Viewer: {participantCount}
              </Typography>
            </div>
            <Typography
              variant='h2'
              color='white'
              className='my-4 font-black text-4xl !leading-snug'
            >
              {streamInformation.title}
            </Typography>
            <Typography
              variant='paragraph'
              color='white'
              className='my-4 font-black !leading-snug'
            >
              {streamInformation.description}
            </Typography>
          </div>
        </>
      ) : (
        <div className='w-full h-full bg-black flex items-center justify-center rounded-lg'>
          <Typography variant='h3' className='font-poppins uppercase'>
            The Live Streaming not started yet!
          </Typography>
        </div>
      )}
    </>
  );
};

export default LiveStreamComponent;
