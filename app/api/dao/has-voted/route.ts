import { NextRequest, NextResponse } from 'next/server';
import { createPublicClient, http, parseAbi } from 'viem';
import { base } from 'viem/chains';

const DAO_CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_DAO_CONTRACT_ADDRESS as `0x${string}`;
const RPC_URL = process.env.NEXT_PUBLIC_RPC_URL;

const DAO_ABI = parseAbi([
  "function hasVoted(uint256, address) view returns (bool)"
]);

const client = createPublicClient({
  chain: base,
  transport: http(RPC_URL),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log('has-voted API received body:', body);
    
    const { proposalId, voter } = body;
    
    console.log('has-voted API received proposalId:', proposalId, 'voter:', voter, 'types:', typeof proposalId, typeof voter);

    if (proposalId === undefined || proposalId === null || !voter) {
      console.error('has-voted API: Missing required parameters', { proposalId, voter });
      return NextResponse.json(
        { success: false, error: 'Proposal ID and voter address are required' },
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
      const hasVoted = await client.readContract({
        address: DAO_CONTRACT_ADDRESS,
        abi: DAO_ABI,
        functionName: 'hasVoted',
        args: [BigInt(proposalId), voter as `0x${string}`],
      });

      console.log('Successfully checked voting status for proposal', proposalId, 'voter', voter, ':', hasVoted);
      return NextResponse.json({
        success: true,
        data: hasVoted,
      });
    } catch (contractError) {
      // Si hay un error del contrato (propuesta no existe, etc.), devolver false
      console.warn('Contract error for proposal', proposalId, 'voter', voter, ':', contractError);
      return NextResponse.json({
        success: true,
        data: false,
      });
    }
  } catch (error) {
    console.error('Error checking if user has voted:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to check voting status' },
      { status: 500 }
    );
  }
}
