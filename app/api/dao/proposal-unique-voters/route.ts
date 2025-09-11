import { NextRequest, NextResponse } from 'next/server';
import { createPublicClient, http, parseAbi } from 'viem';
import { base } from 'viem/chains';

const DAO_CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_DAO_CONTRACT_ADDRESS as `0x${string}`;
const RPC_URL = process.env.NEXT_PUBLIC_RPC_URL;

const DAO_ABI = parseAbi([
  "function getUniqueVotersCount(uint256 proposalId) view returns (uint256)"
]);

const client = createPublicClient({
  chain: base,
  transport: http(RPC_URL),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log('proposal-unique-voters API received body:', body);
    
    const { proposalId } = body;
    
    console.log('proposal-unique-voters API received proposalId:', proposalId, 'type:', typeof proposalId);

    if (proposalId === undefined || proposalId === null) {
      console.error('proposal-unique-voters API: Proposal ID is missing');
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
      const uniqueVoters = await client.readContract({
        address: DAO_CONTRACT_ADDRESS,
        abi: DAO_ABI,
        functionName: 'getUniqueVotersCount',
        args: [BigInt(proposalId)],
      });

      console.log('Successfully fetched unique voters for proposal', proposalId, ':', uniqueVoters);
      return NextResponse.json({
        success: true,
        data: uniqueVoters.toString(),
      });
    } catch (contractError) {
      // Si hay un error del contrato (propuesta no existe, etc.), devolver 0
      console.warn('Contract error for proposal', proposalId, ':', contractError);
      return NextResponse.json({
        success: true,
        data: "0",
      });
    }
  } catch (error) {
    console.error('Error fetching proposal unique voters count:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch proposal unique voters count' },
      { status: 500 }
    );
  }
}
