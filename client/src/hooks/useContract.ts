import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import EduLiveABI from '../contracts/Edulive.json';

const CONTRACT_ADDRESS = "0xe4f764783dD165b275BFdbA20B5E95805f697098"; // Replace with the new deployed contract address

export function useContract() {
    const [contract, setContract] = useState<ethers.Contract | null>(null);

    useEffect(() => {
        const init = async () => {
            if (typeof window.ethereum !== 'undefined') {
                try {
                    const provider = new ethers.BrowserProvider(window.ethereum);
                    const signer = await provider.getSigner();
                    const contract = new ethers.Contract(
                        CONTRACT_ADDRESS,
                        EduLiveABI.abi,
                        signer
                    );
                    setContract(contract);
                } catch (error) {
                    console.error('Failed to initialize contract:', error);
                }
            }
        };

        init();
    }, []);

    return { contract };
} 