import { useCreateStreamMutation } from "@/api/stream";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useOCAuth } from "@opencampus/ocid-connect-js";
import { CopyIcon, RadioIcon } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function GoLiveDialog() {
  const { OCId } = useOCAuth();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [rtmpURL, setRtmpURL] = useState("");
  const [streamKey, setStreamKey] = useState("");
  const [slug, setSlug] = useState("");

  const { mutateAsync: createStream } = useCreateStreamMutation();

  const handleCreateStream = async () => {
    try {
      const res = await createStream({
        ocid: OCId,
        title,
        description,
      });
      setRtmpURL(res.rtmpURL);
      setStreamKey(res.streamKey);
      setSlug(res.slug);
    } catch (error) {
      console.log(error);
    }
  };

  const navigate = useNavigate();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <RadioIcon />
          Go Live
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Go Live</DialogTitle>
          <DialogDescription>
            Enter informations and create new stream
          </DialogDescription>
        </DialogHeader>
        <div className='grid gap-4 py-4'>
          <Label htmlFor='name'>Title</Label>
          <div className=' items-center gap-4'>
            <Input
              name='title'
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
          </div>
          <Label htmlFor='username'>Description</Label>
          <div className='items-center gap-4'>
            <Textarea
              name='description'
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
          </div>
          <Label htmlFor='link'>RTMP</Label>
          <div className='flex items-center space-x-2'>
            <div className='grid flex-1 gap-2'>
              <Input id='link' readOnly value={rtmpURL?.slice(0, 50)} />
            </div>
            <Button
              onClick={() => {
                navigator.clipboard.writeText(rtmpURL);
              }}
              size='sm'
              className='px-3'
            >
              <span className='sr-only'>Copy</span>
              <CopyIcon />
            </Button>
          </div>
          <Label htmlFor='link'>StreamKey</Label>
          <div className='flex items-center space-x-2'>
            <div className='grid flex-1 gap-2'>
              <Input
                id='link'
                readOnly
                type='password'
                value={streamKey?.slice(0, 45)}
              />
            </div>
            <Button
              onClick={() => {
                navigator.clipboard.writeText(streamKey);
              }}
              size='sm'
              className='px-3'
            >
              <span className='sr-only'>Copy</span>
              <CopyIcon />
            </Button>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleCreateStream} className='bg-green-500'>
            Go Live
          </Button>
          <Button
            onClick={() => {
              navigate("/class/" + slug);
            }}
            className='bg-secondary-foreground'
          >
            Go to Stream
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
