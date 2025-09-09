import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { address } = await request.json();

    if (!address) {
      return NextResponse.json(
        { error: 'Dirección de wallet requerida' },
        { status: 400 }
      );
    }

    // Obtener balance de USDC directamente desde la blockchain
    const usdcAddress = process.env.NEXT_PUBLIC_USDC_ADDRESS;
    const rpcUrl = process.env.NEXT_PUBLIC_RPC_URL;
    
    if (!usdcAddress || !rpcUrl) {
      return NextResponse.json(
        { error: 'Configuración de red no encontrada' },
        { status: 500 }
      );
    }

    // Llamada directa al contrato USDC para obtener balance
    const balanceResponse = await fetch(rpcUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        jsonrpc: '2.0',
        method: 'eth_call',
        params: [
          {
            to: usdcAddress,
            data: `0x70a08231000000000000000000000000${address.slice(2)}` // balanceOf(address)
          },
          'latest'
        ],
        id: 1
      }),
    });

    const balanceData = await balanceResponse.json();
    
    if (balanceData.error) {
      throw new Error(balanceData.error.message);
    }

    // Obtener decimales del contrato USDC
    const decimalsResponse = await fetch(rpcUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        jsonrpc: '2.0',
        method: 'eth_call',
        params: [
          {
            to: usdcAddress,
            data: '0x313ce567' // decimals()
          },
          'latest'
        ],
        id: 2
      }),
    });

    const decimalsData = await decimalsResponse.json();
    
    if (decimalsData.error) {
      throw new Error(decimalsData.error.message);
    }

    // Convertir de wei a USDC usando los decimales correctos
    const balanceWei = parseInt(balanceData.result, 16);
    const decimals = parseInt(decimalsData.result, 16);
    const balance = balanceWei / Math.pow(10, decimals);

    return NextResponse.json({ balance });

  } catch {
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
