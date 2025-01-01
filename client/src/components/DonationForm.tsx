import { useState } from 'react';
import { useContract } from '@/hooks/useContract';
import { parseEther } from 'ethers';
import { toast } from 'sonner';
import { useOCAuth } from "@opencampus/ocid-connect-js";

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { HeartHandshakeIcon } from 'lucide-react';
interface DonationFormProps {
  streamId: number;
  streamerAddress: string;
}

export function DonationForm({ streamId, streamerAddress }: DonationFormProps) {
  const { contract } = useContract();
  const { ethAddress } = useOCAuth();
  const [amount, setAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleDonate = async () => {
    if (!contract) {
      toast.error('Contract not initialized');
      return;
    }

    if (!ethAddress) {
      toast.error('Please connect your wallet');
      return;
    }

    if (!streamerAddress) {
      toast.error('Streamer address not found');
      return;
    }

    if (!amount || parseFloat(amount) <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }

    try {
      setIsLoading(true);
      const toastId = toast.loading('Processing donation...');

      const tx = await contract.sendMoney(
        streamerAddress,
        parseEther(amount),
        `Donation for stream ${streamId}`
      );

      await tx.wait();
      
      toast.dismiss(toastId);
      toast.success('Donation successful!');
      setAmount('');
    } catch (error: any) {
      toast.error(error.message || 'Failed to process donation');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className='bg-gradient-to-br from-green-500 to-teal-500'>
            Support <HeartHandshakeIcon />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Support</DialogTitle>
          <DialogDescription>
            Donate to the streamer
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              defaultValue="Pedro Duarte"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Donation Amount
            </Label>
            <Input
              type="number"
              placeholder="Amount in EDU"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              disabled={isLoading}
              defaultValue="0.01"
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button 
          onClick={handleDonate}
          disabled={isLoading || !ethAddress}
          className="bg-gradient-to-br from-green-500 to-teal-500"
        >
          {!ethAddress ? 'Connect Wallet' : 'Donate'}
        </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
} 