import { NFTMetadata } from '../../../types/nft';
import { NFTDetailClient } from './NFTDetailClient';
import { readFileSync } from 'fs';
import { join } from 'path';

// Generar parámetros estáticos para todos los NFTs (1-188)
export async function generateStaticParams() {
  const nftIds = Array.from({ length: 188 }, (_, i) => i + 1);
  
  return nftIds.map((id) => ({
    id: id.toString(),
  }));
}

// Función para cargar los datos del NFT
async function getNFTData(id: string): Promise<NFTMetadata | null> {
  try {
    // Leer directamente desde el sistema de archivos para build estático
    const filePath = join(process.cwd(), 'public', 'metadata', 'json', `${id}.json`);
    const fileContents = readFileSync(filePath, 'utf8');
    const metadata = JSON.parse(fileContents);
    
    return {
      ...metadata,
      id: parseInt(id),
      image: `/metadata/imgs/${id}.png`
    };
  } catch {
    return null;
  }
}

export default async function NFTDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const nft = await getNFTData(id);

  if (!nft) {
    return (
      <div className="min-h-full flex items-center justify-center">
        <div className="text-center">
          <div className="bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-800/30 dark:to-orange-900/20 rounded-2xl p-8 border-2 border-amber-300 dark:border-amber-700 shadow-lg">
            <p className="text-red-600 dark:text-red-400 text-xl mb-4 font-medium">
              NFT no encontrado
            </p>
          </div>
        </div>
      </div>
    );
  }

  return <NFTDetailClient nft={nft} />;
}