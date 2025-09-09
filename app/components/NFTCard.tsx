'use client';

import { useState } from 'react';
import Image from 'next/image';
import { NFTMetadata } from '../../types/nft';
import { Button } from './ui/Button';
import { Icon } from './ui/Icon';

interface NFTCardProps {
  nft: NFTMetadata;
}

export default function NFTCard({ nft }: NFTCardProps) {
  const [imageError, setImageError] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

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

  return (
    <div className="bg-white/20 backdrop-blur-md rounded-2xl overflow-hidden hover:bg-white/25 transition-all duration-300 group border border-white/30 shadow-lg">
      {/* Imagen del NFT */}
      <div className="relative aspect-square overflow-hidden">
        {!imageError ? (
          <Image
            src={nft.image}
            alt={nft.name}
            width={400}
            height={400}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center">
            <Icon name="image" className="w-16 h-16 text-white/50" />
          </div>
        )}
        
        {/* Badge de ID */}
        <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-sm rounded-full px-3 py-1 border border-white/20">
          <span className="text-white text-sm font-medium">#{nft.id}</span>
        </div>

        {/* Badge de Clase */}
        <div className="absolute top-3 right-3 bg-blue-600/90 backdrop-blur-sm rounded-full px-3 py-1 border border-blue-400/50 shadow-lg">
          <span className="text-white text-xs font-medium">
            {getAttributeValue('Clase') || 'Enano'}
          </span>
        </div>
      </div>

      {/* Contenido de la tarjeta */}
      <div className="p-4">
        <h3 className="text-xl font-bold text-white mb-2 line-clamp-1">
          {nft.name}
        </h3>
        
        <p className="text-blue-100 text-sm mb-3 line-clamp-2">
          {nft.description}
        </p>

        {/* Estadísticas principales */}
        <div className="space-y-2 mb-4">
          {stats.slice(0, 3).map((stat) => (
            <div key={stat.name} className="flex items-center justify-between">
              <span className="text-white/90 text-sm">{stat.name}</span>
              <div className="flex items-center gap-2">
                <div className="w-16 h-2 bg-white/30 rounded-full overflow-hidden border border-white/20">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-300"
                    style={{ width: `${(stat.value / stat.max) * 100}%` }}
                  />
                </div>
                <span className="text-white text-sm font-medium w-8 text-right">
                  {stat.value}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Información adicional */}
        <div className="flex items-center justify-between text-sm text-white/85 mb-4">
          <div className="flex items-center gap-1">
            <Icon name="calendar" className="w-4 h-4" />
            <span>{getAttributeValue('Edad')} años</span>
          </div>
          <div className="flex items-center gap-1">
            <Icon name="ruler" className="w-4 h-4" />
            <span>{getAttributeValue('Altura')}</span>
          </div>
        </div>

        {/* Botones de acción */}
        <div className="flex gap-2">
          <Button
            onClick={() => setShowDetails(!showDetails)}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors"
          >
            {showDetails ? 'Menos' : 'Detalles'}
          </Button>
          <Button className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition-colors">
            <Icon name="shopping-cart" className="w-4 h-4" />
          </Button>
        </div>

        {/* Detalles expandibles */}
        {showDetails && (
          <div className="mt-4 pt-4 border-t border-white/30">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-white/80">Clan:</span>
                <span className="text-white">{getAttributeValue('Clan')}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-white/80">Montaña:</span>
                <span className="text-white">{getAttributeValue('Montaña Natal')}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-white/80">Especialidad:</span>
                <span className="text-white text-right">{getAttributeValue('Especialidad')}</span>
              </div>
            </div>

            {/* Todas las estadísticas */}
            <div className="mt-4">
              <h4 className="text-white font-medium mb-2">Estadísticas Completas</h4>
              <div className="space-y-1">
                {stats.map((stat) => (
                  <div key={stat.name} className="flex items-center justify-between">
                    <span className="text-white/80 text-xs">{stat.name}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-12 h-1.5 bg-white/30 rounded-full overflow-hidden border border-white/20">
                        <div
                          className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                          style={{ width: `${(stat.value / stat.max) * 100}%` }}
                        />
                      </div>
                      <span className="text-white text-xs font-medium w-6 text-right">
                        {stat.value}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
