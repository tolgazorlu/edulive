import {
  StreamVideoClient,
  StreamVideo,
  User,
  StreamCall,
  LivestreamPlayer,
} from "@stream-io/video-react-sdk";
import { useCallStateHooks } from "@stream-io/video-react-sdk";

const apiKey = "t43uy6ywwdj2";
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoidG9sZ2EiLCJpYXQiOjE3MzUxOTA1MzAsImV4cCI6MTczNTE5NDEzMH0.uxTqgXDwvvWMQgCC1Qvwu2dDiyApSQZEXmacjYFM2kM";
const callId = "4e786f9b-4dd8-416a-ae5e-b0095f1a070e";

const user: User = {
  id: "tolga",
  name: "Tolga",
};
const client = new StreamVideoClient({ apiKey, user, token });
const call = client.call("livestream", callId);
call.join({ create: true });

export default function App() {
  return (
    <StreamVideo client={client}>
      <StreamCall call={call}>
        <LivestreamView />
      </StreamCall>
    </StreamVideo>
  );
}

const LivestreamView = () => {
  const {
    useCameraState,
    useMicrophoneState,
    useParticipantCount,
    useIsCallLive,
    useParticipants,
  } = useCallStateHooks();

  const { camera: cam, isEnabled: isCamEnabled } = useCameraState();
  const { microphone: mic, isEnabled: isMicEnabled } = useMicrophoneState();

  const participantCount = useParticipantCount();
  const isLive = useIsCallLive();

  const [firstParticipant] = useParticipants();

  return (
    <div className='grid grid-cols-12 gap-2 p-4'>
      <div className='col-span-9 w-full h-full'>
        <div>{isLive ? `Live: ${participantCount}` : `In Backstage`}</div>
        {firstParticipant ? (
          <LivestreamPlayer callType='livestream' callId={callId} />
        ) : (
          <div>The host hasn't joined yet</div>
        )}
        <div style={{ display: "flex", gap: "4px" }}>
          <button onClick={() => (isLive ? call.stopLive() : call.goLive())}>
            {isLive ? "Stop Live" : "Go Live"}
          </button>
          <button onClick={() => cam.toggle()}>
            {isCamEnabled ? "Disable camera" : "Enable camera"}
          </button>
          <button onClick={() => mic.toggle()}>
            {isMicEnabled ? "Mute Mic" : "Unmute Mic"}
          </button>
        </div>
      </div>
    </div>
  );
};
