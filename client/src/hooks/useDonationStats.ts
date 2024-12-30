import { useContract } from './useContract';
import { useEffect, useState } from 'react';
import { formatEther } from 'ethers';

export function useDonationStats(address: string | undefined) {
    const { contract } = useContract();
    const [totalDonated, setTotalDonated] = useState('0');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchDonationStats = async () => {
            if (!contract || !address) return;

            try {
                const total = await contract.getDonorTotalDonations(address);
                setTotalDonated(formatEther(total));
            } catch (error) {
                console.error('Error fetching donation stats:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchDonationStats();
    }, [contract, address]);

    return { totalDonated, isLoading };
} 