import { useState } from 'react';
import { useContract } from '@/hooks/useContract';
import { parseEther } from 'ethers';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { useOCAuth } from "@opencampus/ocid-connect-js";

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
    <div className="flex flex-col gap-4">
      <div className="flex gap-2">
        <Input
          type="number"
          placeholder="Amount in EDU"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          disabled={isLoading}
        />
        <Button 
          onClick={handleDonate}
          disabled={isLoading || !ethAddress}
          className="bg-gradient-to-br from-green-500 to-teal-500"
        >
          {!ethAddress ? 'Connect Wallet' : 'Donate'}
        </Button>
      </div>
    </div>
  );
} 