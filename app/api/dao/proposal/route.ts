import { NextRequest, NextResponse } from 'next/server';
import { createPublicClient, http } from 'viem';
import { base } from 'viem/chains';

const DAO_CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_DAO_CONTRACT_ADDRESS as `0x${string}`;
const RPC_URL = process.env.NEXT_PUBLIC_RPC_URL;

const DAO_ABI = [
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "proposalId",
        "type": "uint256"
      }
    ],
    "name": "getProposal",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "id",
            "type": "uint256"
          },
          {
            "internalType": "address",
            "name": "proposer",
            "type": "address"
          },
          {
            "internalType": "string",
            "name": "username",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "description",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "link",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "votesFor",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "votesAgainst",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "startTime",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "endTime",
            "type": "uint256"
          },
          {
            "internalType": "bool",
            "name": "cancelled",
            "type": "bool"
          }
        ],
        "internalType": "struct DAO.Proposal",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
] as const;

const client = createPublicClient({
  chain: base,
  transport: http(RPC_URL),
});

export async function POST(request: NextRequest) {
  try {
    const { proposalId } = await request.json();
    
    console.log('API received proposalId:', proposalId, 'type:', typeof proposalId);

    if (proposalId === undefined || proposalId === null) {
      return NextResponse.json(
        { success: false, error: 'Proposal ID is required' },
        { status: 400 }
      );
    }

    // Verificar que las variables de entorno estén definidas
    if (!DAO_CONTRACT_ADDRESS || !RPC_URL) {
      console.error('Missing environment variables:', { DAO_CONTRACT_ADDRESS, RPC_URL });
      return NextResponse.json(
        { success: false, error: 'Server configuration error' },
        { status: 500 }
      );
    }

    try {
      const proposal = await client.readContract({
        address: DAO_CONTRACT_ADDRESS,
        abi: DAO_ABI,
        functionName: 'getProposal',
        args: [BigInt(proposalId)],
      });

      // Convertir BigInts a strings para serialización JSON
      const serializedProposal = {
        id: proposal.id.toString(),
        proposer: proposal.proposer,
        username: proposal.username,
        description: proposal.description,
        link: proposal.link,
        votesFor: proposal.votesFor.toString(),
        votesAgainst: proposal.votesAgainst.toString(),
        startTime: proposal.startTime.toString(),
        endTime: proposal.endTime.toString(),
        cancelled: proposal.cancelled,
      };

      return NextResponse.json({
        success: true,
        data: serializedProposal,
      });
    } catch (contractError) {
      // Si hay un error del contrato (propuesta no existe, etc.), devolver error específico
      console.warn('Contract error for proposal', proposalId, ':', contractError);
      return NextResponse.json(
        { success: false, error: 'Proposal not found or contract error' },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error('Error fetching proposal:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch proposal' },
      { status: 500 }
    );
  }
}
