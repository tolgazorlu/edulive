/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import {
  useGetStreamInformation,
  useUpdateStreamStatus,
} from "../..//api/stream";
import {
  LivestreamPlayer,
  StreamCall,
  StreamVideo,
  StreamVideoClient,
  useCallStateHooks,
  User,
} from "@stream-io/video-react-sdk";
import { HeartHandshakeIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useContract } from "@/hooks/useContract";
import { parseEther } from "ethers";
import { toast } from "sonner";
import { DonationForm } from "@/components/DonationForm";
import { useOCAuth } from "@opencampus/ocid-connect-js";

const LiveStreamComponent = () => {
  const { slug } = useParams();
  const { OCId } = useOCAuth();

  const apiKey = import.meta.env.VITE_API_KEY;

  const username = OCId?.split(".")[0];
  const user: User = {
    id: username,
    name: username,
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
  const { OCId } = useOCAuth();
  const { useParticipantCount, useParticipants } = useCallStateHooks();
  const { contract } = useContract();
  const [donationAmount, setDonationAmount] = useState("");

  const participantCount = useParticipantCount();

  const [firstParticipant] = useParticipants();

  const { mutate: updateStatus } = useUpdateStreamStatus();

  const handleEndStream = () => {
    updateStatus(
      { streamId: streamInformation._id, isLive: false },
      {
        onSuccess: () => {
          toast.success("Stream ended successfully");
          window.location.href = "/";
        },
      }
    );
  };

  return (
    <div className='min-h-screen'>
      {firstParticipant ? (
        <div>
          <div className='w-full h-96 bg-gray-900 flex items-center justify-center rounded-lg overflow-hidden'>
            <LivestreamPlayer
              layoutProps={{
                showDuration: false,
                showParticipantCount: false,
                showLiveBadge: false,
                enableFullScreen: true,
              }}
              callType='livestream'
              callId={callId}
            />
          </div>
          <div className='flex flex-col gap-2 z-50 mt-2'>
            <span className='font-black text-xl !leading-snug dark:text-white'>
              {streamInformation.title}
            </span>
            <div className='flex gap-2 justify-between'>
              <div className='flex gap-2'>
                <div className='p-2 bg-gray-300 w-12 h-12 flex items-center justify-center rounded-full'>
                  <span>{streamInformation?.owner.name?.slice(0, 2)}</span>
                </div>
                <div className='flex flex-col justify-center'>
                  <span className='text-sm font-bold dark:text-gray-400'>
                    {streamInformation?.owner.name}
                  </span>
                  <span className='text-sm dark:text-gray-500'>
                    {streamInformation?.owner.job || "Teacher"}
                  </span>
                </div>
              </div>
              <div className='flex gap-2'>
                {streamInformation?.owner.ocid !== OCId && (
                  <Button className='bg-red-500'>Follow</Button>
                )}

                <div className='flex gap-2'>
                  {streamInformation && OCId && (
                    <DonationForm
                      streamId={streamInformation.id}
                      streamerAddress={streamInformation.owner.edu_address}
                    />
                  )}
                  {streamInformation?.owner.ocid === OCId && (
                    <Button variant='destructive' onClick={handleEndStream}>
                      End Stream
                    </Button>
                  )}
                </div>
              </div>
            </div>
            <div className='w-full bg-gray-100 rounded-xl min-h-32 p-2 flex flex-col gap-1 dark:bg-gray-800'>
              <span className='text-green-500'>
                {participantCount} people are watching
              </span>
              <span className='!leading-snug whitespace-pre-wrap dark:text-gray-400'>
                {streamInformation?.description}
              </span>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div className='w-full h-96 bg-gray-900 flex items-center justify-center rounded-lg'>
            <span className='font-poppins uppercase text-white'>
              The Live Streaming not started yet!
            </span>
          </div>
          <div className='my-2 flex flex-col gap-2'>
            <span className='font-black text-xl !leading-snug dark:text-white'>
              KELİME USTALARI KARŞI KARŞIYA! | CODENAMES
            </span>
            <div className='flex gap-2 justify-between'>
              <div className='flex gap-2'>
                <div className='p-2 bg-gray-300 w-12 h-12 flex items-center justify-center rounded-full'>
                  <span>TZ</span>
                </div>
                <div className='flex flex-col justify-center'>
                  <span className='text-sm font-bold dark:text-gray-400'>
                    Tolga Zorlu
                  </span>
                  <span className='text-sm dark:text-gray-500'>
                    Software Engineer
                  </span>
                </div>
              </div>
              <div className='flex gap-2'>
                <Button className='bg-red-500'>Follow</Button>
                <Button className='bg-gradient-to-br from-green-500 to-teal-500'>
                  Support <HeartHandshakeIcon />
                </Button>
                {streamInformation?.owner.ocid === OCId && (
                  <Button variant='destructive' onClick={handleEndStream}>
                    End Stream
                  </Button>
                )}
              </div>
            </div>
            <div className='w-full bg-gray-100 rounded-xl min-h-32 p-2 flex flex-col gap-1 dark:bg-gray-800'>
              <span className='text-green-500'>
                {participantCount} people are watching
              </span>
              <span className='!leading-snug dark:text-gray-400'>
                Our on-chain education network is formed with key players within
                education and Web3 who are dedicated to building on EDU Chain.
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LiveStreamComponent;
