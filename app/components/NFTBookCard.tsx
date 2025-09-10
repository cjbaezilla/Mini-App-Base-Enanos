'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { NFTMetadata } from '../../types/nft';
import { Button } from './ui/Button';
import { Icon } from './ui/Icon';

// Componente para manejar texto con colapso
interface CollapsibleTextProps {
  text: string | number | undefined;
  maxLength?: number;
  className?: string;
}

function CollapsibleText({ text, maxLength = 15, className = '' }: CollapsibleTextProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  if (!text) return <span className={className}>-</span>;
  
  const textString = String(text);
  const shouldTruncate = textString.length > maxLength;
  const displayText = shouldTruncate && !isExpanded ? textString.substring(0, maxLength) + '...' : textString;
  
  return (
    <span 
      className={`${className} ${shouldTruncate ? 'cursor-pointer hover:underline' : ''}`}
      onClick={() => shouldTruncate && setIsExpanded(!isExpanded)}
      title={shouldTruncate ? textString : undefined}
    >
      {displayText}
    </span>
  );
}

interface NFTBookCardProps {
  nft: NFTMetadata;
  index: number; // Para alternar el diseño
}

export default function NFTBookCard({ nft, index }: NFTBookCardProps) {
  const [imageError, setImageError] = useState(false);
  const router = useRouter();

  const getAttributeValue = (traitType: string) => {
    return nft.attributes?.find(attr => attr.trait_type === traitType)?.value;
  };

  const getStatValue = (traitType: string) => {
    const attr = nft.attributes?.find(attr => attr.trait_type === traitType);
    return typeof attr?.value === 'number' ? attr.value : 0;
  };

  const getMaxValue = (traitType: string) => {
    const attr = nft.attributes?.find(attr => attr.trait_type === traitType);
    return attr?.max_value || 100;
  };

  const stats = [
    { name: 'Fuerza', value: getStatValue('Fuerza'), max: getMaxValue('Fuerza') },
    { name: 'Resistencia', value: getStatValue('Resistencia'), max: getMaxValue('Resistencia') },
    { name: 'Inteligencia', value: getStatValue('Inteligencia'), max: getMaxValue('Inteligencia') },
    { name: 'Sabiduría', value: getStatValue('Sabiduría'), max: getMaxValue('Sabiduría') },
    { name: 'Carisma', value: getStatValue('Carisma'), max: getMaxValue('Carisma') },
    { name: 'Destreza', value: getStatValue('Destreza'), max: getMaxValue('Destreza') },
  ];

  // Alternar diseño: pares (0,2,4...) imagen izquierda, impares (1,3,5...) imagen derecha
  const isImageLeft = index % 2 === 0;

  return (
    <div className="bg-gradient-to-br from-amber-50/90 to-orange-50/90 dark:from-amber-900/20 dark:to-orange-900/20 rounded-xl p-6 border-2 border-amber-200 dark:border-amber-800 shadow-lg hover:shadow-xl transition-all duration-300">
      <div className={`flex flex-row gap-4 items-start ${isImageLeft ? 'flex-row lg:flex-row' : 'flex-row-reverse lg:flex-row-reverse'}`}>
        
        {/* Columna de imagen y estadísticas */}
        <div className="flex flex-col items-center gap-2">
          {/* Imagen del NFT - Más pequeña */}
          <div className="w-24 h-24 flex-shrink-0">
            <div className="relative w-full h-full overflow-hidden rounded-lg border border-amber-300 dark:border-amber-700 shadow-md">
              {!imageError ? (
                <Image
                  src={nft.image}
                  alt={nft.name}
                  width={96}
                  height={96}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  onError={() => setImageError(true)}
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-amber-600 to-orange-600 flex items-center justify-center">
                  <Icon name="image" className="w-6 h-6 text-white/50" />
                </div>
              )}
              
            </div>
          </div>

          {/* Estadísticas debajo de la imagen */}
          <div className="w-full space-y-1">
            <h4 className="text-xs font-bold text-amber-900 dark:text-amber-100 text-center">
              Estadísticas
            </h4>
            <div className="space-y-1">
              {stats.slice(0, 3).map((stat) => (
                <div key={stat.name} className="bg-white/50 dark:bg-gray-800/50 rounded p-1 border border-amber-200 dark:border-amber-700">
                  <div className="flex items-center justify-between">
                    <span className="text-amber-800 dark:text-amber-200 font-medium text-xs">{stat.name}</span>
                    <span className="text-amber-900 dark:text-amber-100 font-bold text-xs">{stat.value}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Contenido del NFT - Simplificado */}
        <div className="flex-1 space-y-2">
          {/* Título principal con ID prominente */}
          <div className="text-left">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-sm font-bold text-amber-900 dark:text-amber-100 text-[9px]">
                <CollapsibleText 
                  text={nft.name} 
                  maxLength={20}
                  className="text-amber-900 dark:text-amber-100"
                />
              </h3>
              <div className="bg-amber-600 text-white px-1.5 py-0.5 rounded-full text-xs font-bold">
                #{nft.id}
              </div>
            </div>
            <p className="text-amber-700 dark:text-amber-300 text-[11px]">
              <CollapsibleText 
                text={getAttributeValue('Clase') || 'Enano'} 
                maxLength={12}
                className="text-amber-700 dark:text-amber-300"
              /> • {getAttributeValue('Edad')} años
            </p>
          </div>

          {/* Información básica compacta */}
          <div className="grid grid-cols-2 gap-1.5 text-left">
            <div className="bg-amber-100/50 dark:bg-amber-800/30 rounded p-1 border border-amber-300 dark:border-amber-700">
              <div className="text-amber-700 dark:text-amber-300 text-xs font-medium">Clan</div>
              <div className="text-amber-900 dark:text-amber-100 font-bold text-xs text-[8px]">
                <CollapsibleText 
                  text={getAttributeValue('Clan') || ''} 
                  maxLength={10}
                  className="text-amber-900 dark:text-amber-100"
                />
              </div>
            </div>
            <div className="bg-orange-100/50 dark:bg-orange-800/30 rounded p-1 border border-orange-300 dark:border-orange-700">
              <div className="text-orange-700 dark:text-orange-300 text-xs font-medium">Especialidad</div>
              <div className="text-orange-900 dark:text-orange-100 font-bold text-xs text-[8px]">
                <CollapsibleText 
                  text={getAttributeValue('Especialidad') || ''} 
                  maxLength={10}
                  className="text-orange-900 dark:text-orange-100"
                />
              </div>
            </div>
          </div>


          {/* Botones de acción */}
          <div className="pt-1 space-y-1">
            <Button
              onClick={() => router.push(`/nfts/${nft.id}`)}
              className="w-full bg-amber-600 hover:bg-amber-700 text-white py-1.5 px-3 rounded transition-colors text-xs"
            >
              Detalles
            </Button>
            <Button
              onClick={() => window.open(`https://opensea.io/item/base/${process.env.NEXT_PUBLIC_CONTRACT_ADDRESS}/${nft.id}`, '_blank')}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-1.5 px-3 rounded transition-colors text-xs flex items-center justify-center gap-1"
            >
              <Icon name="external-link" className="h-3 w-3" />
              OpenSea
            </Button>
          </div>

        </div>
      </div>
    </div>
  );
}
