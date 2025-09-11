'use client';

import { useState, useEffect, useCallback } from 'react';
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt, useGasPrice, useFeeData } from 'wagmi';

// ABI del contrato DAO
const DAO_ABI = [
  {
    "inputs": [{"internalType": "address", "name": "_nftContract", "type": "address"}],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [{"internalType": "address", "name": "owner", "type": "address"}],
    "name": "OwnableInvalidOwner",
    "type": "error"
  },
  {
    "inputs": [{"internalType": "address", "name": "account", "type": "address"}],
    "name": "OwnableUnauthorizedAccount",
    "type": "error"
  },
  {
    "anonymous": false,
    "inputs": [
      {"indexed": true, "internalType": "uint256", "name": "oldValue", "type": "uint256"},
      {"indexed": true, "internalType": "uint256", "name": "newValue", "type": "uint256"}
    ],
    "name": "MinProposalVotesUpdated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {"indexed": true, "internalType": "uint256", "name": "oldValue", "type": "uint256"},
      {"indexed": true, "internalType": "uint256", "name": "newValue", "type": "uint256"}
    ],
    "name": "MinTokensToApproveUpdated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {"indexed": true, "internalType": "uint256", "name": "oldValue", "type": "uint256"},
      {"indexed": true, "internalType": "uint256", "name": "newValue", "type": "uint256"}
    ],
    "name": "MinVotesToApproveUpdated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {"indexed": true, "internalType": "address", "name": "oldContract", "type": "address"},
      {"indexed": true, "internalType": "address", "name": "newContract", "type": "address"}
    ],
    "name": "NFTContractUpdated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {"indexed": true, "internalType": "address", "name": "previousOwner", "type": "address"},
      {"indexed": true, "internalType": "address", "name": "newOwner", "type": "address"}
    ],
    "name": "OwnershipTransferred",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [{"indexed": true, "internalType": "uint256", "name": "proposalId", "type": "uint256"}],
    "name": "ProposalCancelled",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {"indexed": true, "internalType": "uint256", "name": "proposalId", "type": "uint256"},
      {"indexed": true, "internalType": "address", "name": "proposer", "type": "address"},
      {"indexed": false, "internalType": "string", "name": "description", "type": "string"},
      {"indexed": false, "internalType": "uint256", "name": "startTime", "type": "uint256"},
      {"indexed": false, "internalType": "uint256", "name": "endTime", "type": "uint256"}
    ],
    "name": "ProposalCreated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {"indexed": true, "internalType": "uint256", "name": "proposalId", "type": "uint256"},
      {"indexed": true, "internalType": "address", "name": "voter", "type": "address"},
      {"indexed": false, "internalType": "bool", "name": "support", "type": "bool"},
      {"indexed": false, "internalType": "uint256", "name": "votes", "type": "uint256"}
    ],
    "name": "VoteCast",
    "type": "event"
  },
  {
    "inputs": [],
    "name": "MIN_PROPOSAL_VOTES",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "MIN_TOKENS_TO_APPROVE",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "MIN_VOTES_TO_APPROVE",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "uint256", "name": "proposalId", "type": "uint256"}],
    "name": "cancelProposal",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "string", "name": "username", "type": "string"},
      {"internalType": "string", "name": "description", "type": "string"},
      {"internalType": "string", "name": "link", "type": "string"},
      {"internalType": "uint256", "name": "startTime", "type": "uint256"},
      {"internalType": "uint256", "name": "endTime", "type": "uint256"}
    ],
    "name": "createProposal",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "uint256", "name": "proposalId", "type": "uint256"}],
    "name": "getProposal",
    "outputs": [
      {
        "components": [
          {"internalType": "uint256", "name": "id", "type": "uint256"},
          {"internalType": "address", "name": "proposer", "type": "address"},
          {"internalType": "string", "name": "username", "type": "string"},
          {"internalType": "string", "name": "description", "type": "string"},
          {"internalType": "string", "name": "link", "type": "string"},
          {"internalType": "uint256", "name": "votesFor", "type": "uint256"},
          {"internalType": "uint256", "name": "votesAgainst", "type": "uint256"},
          {"internalType": "uint256", "name": "startTime", "type": "uint256"},
          {"internalType": "uint256", "name": "endTime", "type": "uint256"},
          {"internalType": "bool", "name": "cancelled", "type": "bool"}
        ],
        "internalType": "struct DAO.Proposal",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "uint256", "name": "proposalId", "type": "uint256"}],
    "name": "getProposalStatus",
    "outputs": [{"internalType": "string", "name": "", "type": "string"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "uint256", "name": "proposalId", "type": "uint256"}],
    "name": "getProposalTotalVotingPower",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getTotalProposals",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "uint256", "name": "proposalId", "type": "uint256"}],
    "name": "getUniqueVotersCount",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "address", "name": "voter", "type": "address"}],
    "name": "getVotingPower",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "uint256", "name": "", "type": "uint256"},
      {"internalType": "address", "name": "", "type": "address"}
    ],
    "name": "hasVoted",
    "outputs": [{"internalType": "bool", "name": "", "type": "bool"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "address", "name": "", "type": "address"}],
    "name": "lastProposalTime",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "nftContract",
    "outputs": [{"internalType": "contract IERC721", "name": "", "type": "address"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [{"internalType": "address", "name": "", "type": "address"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "proposalCount",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "name": "proposalTotalVotingPowerSum",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "name": "proposalUniqueVotersCount",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "name": "proposals",
    "outputs": [
      {"internalType": "uint256", "name": "id", "type": "uint256"},
      {"internalType": "address", "name": "proposer", "type": "address"},
      {"internalType": "string", "name": "username", "type": "string"},
      {"internalType": "string", "name": "description", "type": "string"},
      {"internalType": "string", "name": "link", "type": "string"},
      {"internalType": "uint256", "name": "votesFor", "type": "uint256"},
      {"internalType": "uint256", "name": "votesAgainst", "type": "uint256"},
      {"internalType": "uint256", "name": "startTime", "type": "uint256"},
      {"internalType": "uint256", "name": "endTime", "type": "uint256"},
      {"internalType": "bool", "name": "cancelled", "type": "bool"}
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "renounceOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "address", "name": "newOwner", "type": "address"}],
    "name": "transferOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "uint256", "name": "_newMinProposalVotes", "type": "uint256"}],
    "name": "updateMinProposalVotes",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "uint256", "name": "_newMinTokensToApprove", "type": "uint256"}],
    "name": "updateMinTokensToApprove",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "uint256", "name": "_newMinVotesToApprove", "type": "uint256"}],
    "name": "updateMinVotesToApprove",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "address", "name": "_newNftContract", "type": "address"}],
    "name": "updateNFTContract",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "uint256", "name": "proposalId", "type": "uint256"},
      {"internalType": "bool", "name": "support", "type": "bool"}
    ],
    "name": "vote",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
] as const;

export interface Proposal {
  id: bigint;
  proposer: string;
  username: string;
  description: string;
  link: string;
  votesFor: bigint;
  votesAgainst: bigint;
  startTime: bigint;
  endTime: bigint;
  cancelled: boolean;
}

export interface ProposalWithStatus extends Proposal {
  status: 'active' | 'passed' | 'rejected' | 'pending' | 'cancelled';
  totalVotingPower: bigint;
  uniqueVoters: bigint;
  hasUserVoted: boolean;
  userVotingPower: bigint;
}

const DAO_CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_DAO_CONTRACT_ADDRESS as `0x${string}`;

export function useDAOContract() {
  const { address, isConnected } = useAccount();
  const { writeContract, data: hash, isPending, error } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  // Estados para propuestas
  const [proposals, setProposals] = useState<ProposalWithStatus[]>([]);
  const [loading, setLoading] = useState(true);
  const [contractError, setError] = useState<string | null>(null);

  // Leer configuración del contrato
  const { data: minProposalVotes } = useReadContract({
    address: DAO_CONTRACT_ADDRESS,
    abi: DAO_ABI,
    functionName: 'MIN_PROPOSAL_VOTES',
  });

  const { data: minTokensToApprove } = useReadContract({
    address: DAO_CONTRACT_ADDRESS,
    abi: DAO_ABI,
    functionName: 'MIN_TOKENS_TO_APPROVE',
  });

  const { data: minVotesToApprove } = useReadContract({
    address: DAO_CONTRACT_ADDRESS,
    abi: DAO_ABI,
    functionName: 'MIN_VOTES_TO_APPROVE',
  });

  const { data: totalProposals } = useReadContract({
    address: DAO_CONTRACT_ADDRESS,
    abi: DAO_ABI,
    functionName: 'getTotalProposals',
  });

  // Obtener poder de voto del usuario
  const { data: userVotingPower } = useReadContract({
    address: DAO_CONTRACT_ADDRESS,
    abi: DAO_ABI,
    functionName: 'getVotingPower',
    args: address ? [address] : undefined,
  });

  // Obtener datos de gas y fees
  const { data: gasPrice } = useGasPrice();
  const { data: feeData } = useFeeData();

  // Estados para estimación de gas
  const [gasEstimate, setGasEstimate] = useState<bigint | null>(null);
  const [isEstimatingGas, setIsEstimatingGas] = useState(false);
  const [gasCostEstimate, setGasCostEstimate] = useState<string | null>(null);

  // Función para obtener el estado de una propuesta
  const getProposalStatus = useCallback((proposal: Proposal): 'active' | 'passed' | 'rejected' | 'pending' | 'cancelled' => {
    if (proposal.cancelled) return 'cancelled';
    
    const now = BigInt(Math.floor(Date.now() / 1000));
    
    if (now < proposal.startTime) return 'pending';
    if (now > proposal.endTime) {
      return proposal.votesFor > proposal.votesAgainst ? 'passed' : 'rejected';
    }
    
    return 'active';
  }, []);

  // Función para cargar todas las propuestas
  const loadProposals = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      // Si no hay propuestas, establecer array vacío y terminar
      if (!totalProposals || Number(totalProposals) === 0) {
        setProposals([]);
        return;
      }

      const proposalPromises: Promise<ProposalWithStatus | null>[] = [];
      
      for (let i = 0; i < Number(totalProposals); i++) {
        const proposalPromise = (async () => {
          try {
            // Crear cliente viem para leer directamente del contrato
            const { createPublicClient, http } = await import('viem');
            const { base } = await import('viem/chains');
            
            const client = createPublicClient({
              chain: base,
              transport: http(process.env.NEXT_PUBLIC_RPC_URL),
            });

            // Obtener datos básicos de la propuesta directamente del contrato
            const proposal = await client.readContract({
              address: DAO_CONTRACT_ADDRESS,
              abi: DAO_ABI,
              functionName: 'getProposal',
              args: [BigInt(i)],
            }) as Proposal;
            
            // Obtener datos adicionales directamente del contrato
            const [totalVotingPower, uniqueVoters, hasVoted] = await Promise.all([
              client.readContract({
                address: DAO_CONTRACT_ADDRESS,
                abi: DAO_ABI,
                functionName: 'getProposalTotalVotingPower',
                args: [BigInt(i)],
              }).catch(err => {
                console.error(`Error fetching total voting power for proposal ${i}:`, err);
                return BigInt(0);
              }),
              
              client.readContract({
                address: DAO_CONTRACT_ADDRESS,
                abi: DAO_ABI,
                functionName: 'getUniqueVotersCount',
                args: [BigInt(i)],
              }).catch(err => {
                console.error(`Error fetching unique voters for proposal ${i}:`, err);
                return BigInt(0);
              }),
              
              address ? client.readContract({
                address: DAO_CONTRACT_ADDRESS,
                abi: DAO_ABI,
                functionName: 'hasVoted',
                args: [BigInt(i), address],
              }).catch(err => {
                console.error(`Error checking voting status for proposal ${i}:`, err);
                return false;
              }) : false
            ]);

            return {
              ...proposal,
              status: getProposalStatus(proposal),
              totalVotingPower,
              uniqueVoters,
              hasUserVoted: hasVoted,
              userVotingPower: userVotingPower || BigInt(0)
            };
          } catch (err) {
            console.error(`Error loading proposal ${i + 1}:`, err);
            return null;
          }
        })();

        proposalPromises.push(proposalPromise);
      }

      const results = await Promise.all(proposalPromises);
      const validProposals = results.filter((proposal): proposal is ProposalWithStatus => proposal !== null);
      
      setProposals(validProposals);
    } catch (err) {
      console.error('Error loading proposals:', err);
      setError('Error al cargar las propuestas');
    } finally {
      setLoading(false);
    }
  }, [totalProposals, address, userVotingPower, getProposalStatus]);

  // Cargar propuestas cuando cambie el total
  useEffect(() => {
    if (totalProposals !== undefined) {
      loadProposals();
    }
  }, [loadProposals, totalProposals]);

  // Función para votar
  const vote = useCallback(async (proposalId: bigint, support: boolean) => {
    if (!isConnected || !address) {
      throw new Error('Debes conectar tu wallet para votar');
    }

    try {
      await writeContract({
        address: DAO_CONTRACT_ADDRESS,
        abi: DAO_ABI,
        functionName: 'vote',
        args: [proposalId, support],
      });
    } catch (err) {
      console.error('Error voting:', err);
      throw err;
    }
  }, [isConnected, address, writeContract]);

  // Función para estimar gas de createProposal usando estimación real
  const estimateCreateProposalGas = useCallback(async (
    username: string,
    description: string,
    link: string,
    startTime?: bigint,
    endTime?: bigint
  ) => {
    if (!isConnected || !address) {
      throw new Error('Debes conectar tu wallet para estimar gas');
    }

    setIsEstimatingGas(true);
    
    try {
      // Usar fechas por defecto si no se proporcionan
      const defaultStartTime = startTime || BigInt(Math.floor(Date.now() / 1000) + 3600); // 1 hora en el futuro
      const defaultEndTime = endTime || BigInt(Math.floor(Date.now() / 1000) + 7 * 24 * 3600); // 7 días después

      // Crear la transacción simulada para estimar gas
      const simulatedTx = {
        address: DAO_CONTRACT_ADDRESS,
        abi: DAO_ABI,
        functionName: 'createProposal' as const,
        args: [username, description, link, defaultStartTime, defaultEndTime] as [string, string, string, bigint, bigint],
        account: address,
      };

      // Usar el cliente de viem para obtener una estimación real
      // Nota: En un hook personalizado, necesitamos usar el cliente de viem directamente
      const { createPublicClient, http } = await import('viem');
      const { base } = await import('viem/chains');
      
      const client = createPublicClient({
        chain: base,
        transport: http(process.env.NEXT_PUBLIC_RPC_URL),
      });

      const gasEstimate = await client.estimateContractGas({
        ...simulatedTx,
        account: address as `0x${string}`,
      });

      // Agregar un buffer del 20% para asegurar que la transacción no falle
      const gasWithBuffer = (gasEstimate * BigInt(120)) / BigInt(100);
      
      setGasEstimate(gasWithBuffer);

      // Calcular costo estimado
      const effectiveGasPrice = feeData?.gasPrice || gasPrice || BigInt(1000000000); // 1 gwei por defecto
      const costInWei = gasWithBuffer * effectiveGasPrice;
      const costInEth = Number(costInWei) / 1e18;
      setGasCostEstimate(`${costInEth.toFixed(6)} ETH`);

      return gasWithBuffer;
    } catch (err) {
      console.warn('Error estimating gas, using fallback:', err);
      
      // Fallback a un valor conservador basado en la longitud de los datos
      const stringLength = username.length + description.length + link.length;
      const baseGas = BigInt(150000);
      const additionalGas = BigInt(stringLength * 100);
      const fallbackGas = (baseGas + additionalGas) * BigInt(120) / BigInt(100);
      
      setGasEstimate(fallbackGas);
      
      // Calcular costo estimado con fallback
      const effectiveGasPrice = feeData?.gasPrice || gasPrice || BigInt(1000000000);
      const costInWei = fallbackGas * effectiveGasPrice;
      const costInEth = Number(costInWei) / 1e18;
      setGasCostEstimate(`${costInEth.toFixed(6)} ETH (estimado)`);
      
      return fallbackGas;
    } finally {
      setIsEstimatingGas(false);
    }
  }, [isConnected, address, gasPrice, feeData]);

  // Función para crear propuesta con estimación de gas optimizada
  const createProposal = useCallback(async (
    username: string,
    description: string,
    link: string,
    startTime: bigint,
    endTime: bigint
  ) => {
    if (!isConnected || !address) {
      throw new Error('Debes conectar tu wallet para crear propuestas');
    }

    try {
      // Estimar gas antes de enviar la transacción con las fechas reales
      await estimateCreateProposalGas(username, description, link, startTime, endTime);
      
      // Configurar la transacción con gas optimizado
      const baseConfig = {
        address: DAO_CONTRACT_ADDRESS,
        abi: DAO_ABI,
        functionName: 'createProposal' as const,
        args: [username, description, link, startTime, endTime] as [string, string, string, bigint, bigint],
        gas: gasEstimate || undefined,
      };

      // Configurar gas price según el tipo de red (EIP-1559 o legacy)
      let txConfig;
      if (feeData?.maxFeePerGas && feeData?.maxPriorityFeePerGas) {
        // Usar EIP-1559 (Base Network soporta esto)
        txConfig = {
          ...baseConfig,
          maxFeePerGas: feeData.maxFeePerGas,
          maxPriorityFeePerGas: feeData.maxPriorityFeePerGas,
        };
      } else if (gasPrice && gasPrice > 0) {
        // Usar gas price legacy como fallback
        txConfig = {
          ...baseConfig,
          gasPrice: gasPrice,
        };
      } else {
        // Fallback a un gas price mínimo
        txConfig = {
          ...baseConfig,
          gasPrice: BigInt(1000000000), // 1 gwei
        };
      }

      await writeContract(txConfig);
    } catch (err) {
      console.error('Error creating proposal:', err);
      
      // Proporcionar mensajes de error más específicos
      if (err instanceof Error) {
        if (err.message.includes('insufficient funds')) {
          throw new Error('Fondos insuficientes para pagar el gas de la transacción');
        } else if (err.message.includes('gas required exceeds allowance')) {
          throw new Error('El gas estimado es insuficiente. Intenta aumentar el gas limit.');
        } else if (err.message.includes('execution reverted')) {
          throw new Error('La transacción fue revertida. Verifica que tengas suficientes NFTs y que las fechas sean válidas.');
        }
      }
      
      throw err;
    }
  }, [isConnected, address, writeContract, estimateCreateProposalGas, gasPrice, gasEstimate, feeData]);

  // Función para cancelar propuesta
  const cancelProposal = useCallback(async (proposalId: bigint) => {
    if (!isConnected || !address) {
      throw new Error('Debes conectar tu wallet para cancelar propuestas');
    }

    try {
      await writeContract({
        address: DAO_CONTRACT_ADDRESS,
        abi: DAO_ABI,
        functionName: 'cancelProposal',
        args: [proposalId],
      });
    } catch (err) {
      console.error('Error cancelling proposal:', err);
      throw err;
    }
  }, [isConnected, address, writeContract]);

  // Función para refrescar propuestas
  const refreshProposals = useCallback(() => {
    loadProposals();
  }, [loadProposals]);

  return {
    // Datos
    proposals,
    minProposalVotes: minProposalVotes || BigInt(0),
    minTokensToApprove: minTokensToApprove || BigInt(0),
    minVotesToApprove: minVotesToApprove || BigInt(0),
    userVotingPower: userVotingPower || BigInt(0),
    totalProposals: totalProposals || BigInt(0),
    
    // Estados
    loading,
    error: contractError || error?.message || null,
    isPending,
    isConfirming,
    isConfirmed,
    isEstimatingGas,
    
    // Gas
    gasEstimate,
    gasPrice,
    gasCostEstimate,
    feeData,
    
    // Funciones
    vote,
    createProposal,
    cancelProposal,
    refreshProposals,
    estimateCreateProposalGas,
  };
}
