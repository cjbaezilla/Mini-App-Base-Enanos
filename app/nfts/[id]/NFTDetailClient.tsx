'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { NFTMetadata } from '../../../types/nft';
import { Button } from '../../components/ui/Button';
import { Icon } from '../../components/ui/Icon';

interface NFTDetailClientProps {
  nft: NFTMetadata;
}

export function NFTDetailClient({ nft }: NFTDetailClientProps) {
  const [imageError, setImageError] = useState(false);
  const router = useRouter();

  const getAttributeValue = (traitType: string) => {
    return nft?.attributes?.find(attr => attr.trait_type === traitType)?.value;
  };

  const getStatValue = (traitType: string) => {
    const attr = nft?.attributes?.find(attr => attr.trait_type === traitType);
    return typeof attr?.value === 'number' ? attr.value : 0;
  };

  const getMaxValue = (traitType: string) => {
    const attr = nft?.attributes?.find(attr => attr.trait_type === traitType);
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

  return (
    <div className="min-h-full">
      <div className="container mx-auto px-4 py-6">
        {/* Header con botón de regreso e ID */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <Button
              onClick={() => router.push('/nfts')}
              className="bg-amber-600 hover:bg-amber-700 text-white"
            >
              <Icon name="arrow-left" className="w-4 h-4 mr-2" />
              Volver a la Colección
            </Button>
            <div className="bg-amber-600 text-white px-4 py-2 rounded-full text-lg font-bold">
              #{nft.id}
            </div>
          </div>
        </div>

        {/* Contenido principal */}
        <div className="bg-gradient-to-br from-amber-50/90 to-orange-50/90 dark:from-amber-900/20 dark:to-orange-900/20 rounded-2xl p-6 border-2 border-amber-200 dark:border-amber-800 shadow-lg">
          <div className="space-y-8">
            
            {/* Sección de imagen centrada */}
            <div className="flex flex-col items-center gap-4">
              {/* Imagen del NFT - 100% del ancho del contenedor */}
              <div className="w-full max-w-md">
                <div className="relative w-full aspect-square overflow-hidden rounded-xl border-2 border-amber-300 dark:border-amber-700 shadow-lg">
                  {!imageError ? (
                    <Image
                      src={nft.image}
                      alt={nft.name}
                      width={400}
                      height={400}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      onError={() => setImageError(true)}
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-amber-600 to-orange-600 flex items-center justify-center">
                      <Icon name="image" className="w-16 h-16 text-white/50" />
                    </div>
                  )}
                </div>
              </div>

            </div>

            {/* Información del NFT */}
            <div className="space-y-6">
              {/* Título y descripción */}
              <div>
                <h1 className="text-3xl font-bold text-amber-900 dark:text-amber-100 mb-2">
                  {nft.name}
                </h1>
                {nft.description && (
                  <p className="text-amber-700 dark:text-amber-300 text-lg leading-relaxed">
                    {nft.description}
                  </p>
                )}
              </div>

              {/* Información básica */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="bg-amber-100/50 dark:bg-amber-800/30 rounded-lg p-4 border border-amber-300 dark:border-amber-700">
                  <div className="text-amber-700 dark:text-amber-300 text-sm font-medium">Clase</div>
                  <div className="text-amber-900 dark:text-amber-100 font-bold text-sm">{getAttributeValue('Clase')}</div>
                </div>
                <div className="bg-orange-100/50 dark:bg-orange-800/30 rounded-lg p-4 border border-orange-300 dark:border-orange-700">
                  <div className="text-orange-700 dark:text-orange-300 text-sm font-medium">Edad</div>
                  <div className="text-orange-900 dark:text-orange-100 font-bold text-sm">{getAttributeValue('Edad')} años</div>
                </div>
                <div className="bg-amber-100/50 dark:bg-amber-800/30 rounded-lg p-4 border border-amber-300 dark:border-amber-700">
                  <div className="text-amber-700 dark:text-amber-300 text-sm font-medium">Clan</div>
                  <div className="text-amber-900 dark:text-amber-100 font-bold text-sm">{getAttributeValue('Clan')}</div>
                </div>
                <div className="bg-orange-100/50 dark:bg-orange-800/30 rounded-lg p-4 border border-orange-300 dark:border-orange-700">
                  <div className="text-orange-700 dark:text-orange-300 text-sm font-medium">Especialidad</div>
                  <div className="text-orange-900 dark:text-orange-100 font-bold text-sm">{getAttributeValue('Especialidad')}</div>
                </div>
                <div className="bg-amber-100/50 dark:bg-amber-800/30 rounded-lg p-4 border border-amber-300 dark:border-amber-700">
                  <div className="text-amber-700 dark:text-amber-300 text-sm font-medium">Montaña Natal</div>
                  <div className="text-amber-900 dark:text-amber-100 font-bold text-sm">{getAttributeValue('Montaña Natal')}</div>
                </div>
                <div className="bg-orange-100/50 dark:bg-orange-800/30 rounded-lg p-4 border border-orange-300 dark:border-orange-700">
                  <div className="text-orange-700 dark:text-orange-300 text-sm font-medium">Personalidad</div>
                  <div className="text-orange-900 dark:text-orange-100 font-bold text-sm">{getAttributeValue('Personalidad')}</div>
                </div>
              </div>

              {/* Estadísticas */}
              <div>
                <h3 className="text-xl font-bold text-amber-900 dark:text-amber-100 mb-4">Estadísticas</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {stats.map((stat) => (
                    <div key={stat.name} className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-4 border border-amber-200 dark:border-amber-700">
                      <div className="text-center mb-2">
                        <div className="text-amber-800 dark:text-amber-200 font-medium mb-1">{stat.name}</div>
                        <div className="text-amber-900 dark:text-amber-100 font-bold text-lg">{stat.value}</div>
                      </div>
                      <div className="w-full bg-amber-200 dark:bg-amber-800 rounded-full h-2">
                        <div 
                          className="bg-amber-600 dark:bg-amber-400 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${(stat.value / stat.max) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
