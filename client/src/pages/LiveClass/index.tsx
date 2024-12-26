/* eslint-disable @typescript-eslint/no-explicit-any */
import { Typography } from "@material-tailwind/react";
import { useGetStreamInformation } from "../../api/stream";
import {
  StreamVideoClient,
  StreamVideo,
  User,
  StreamCall,
  LivestreamPlayer,
} from "@stream-io/video-react-sdk";
import { useCallStateHooks } from "@stream-io/video-react-sdk";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { EyeIcon } from "lucide-react";

export default function App() {
  const { slug } = useParams();

  const apiKey = "t43uy6ywwdj2";

  const user: User = {
    id: "tolga",
    name: "Tolga",
  };

  const { data: streamInformation } = useGetStreamInformation(slug!);

  const [token, setToken] = useState("");
  const [callId, setCallId] = useState("");

  // const token =
  //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoidG9sZ2EiLCJpYXQiOjE3MzUxOTA1MzAsImV4cCI6MTczNTE5NDEzMH0.uxTqgXDwvvWMQgCC1Qvwu2dDiyApSQZEXmacjYFM2kM";
  // const callId = "4e786f9b-4dd8-416a-ae5e-b0095f1a070e";

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
    <StreamVideo client={client}>
      <StreamCall call={call}>
        <LivestreamView
          call={call}
          callId={callId}
          streamInformation={streamInformation}
        />
      </StreamCall>
    </StreamVideo>
  );
}

const LivestreamView = ({ callId, streamInformation }: any) => {
  const { useParticipantCount, useParticipants } = useCallStateHooks();

  const participantCount = useParticipantCount();

  const [firstParticipant] = useParticipants();

  return (
    <div className='grid grid-cols-12 gap-2 p-4 h-full'>
      <div className='col-span-9 w-full h-full'>
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
      </div>
    </div>
  );
};
