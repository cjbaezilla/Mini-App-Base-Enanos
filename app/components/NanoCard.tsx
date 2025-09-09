'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Button } from './ui/Button';
import { Icon } from './ui/Icon';

interface NanoData {
  id: number;
  name: string;
  type: string;
  level: number;
  rarity: string;
  power: number;
  speed: number;
  durability: number;
  special: string;
  description: string;
  image: string;
  price: number;
}

interface NanoCardProps {
  nano: NanoData;
  index: number;
}

export default function NanoCard({ nano, index }: NanoCardProps) {
  const [imageError, setImageError] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const stats = [
    { name: 'Poder', value: nano.power, max: 100 },
    { name: 'Velocidad', value: nano.speed, max: 100 },
    { name: 'Durabilidad', value: nano.durability, max: 100 },
  ];

  // Alternar diseño: pares imagen izquierda, impares imagen derecha
  const isImageLeft = index % 2 === 0;

  const getRarityColor = (rarity: string) => {
    switch (rarity.toLowerCase()) {
      case 'legendario':
        return 'from-purple-500 to-pink-500';
      case 'épico':
        return 'from-blue-500 to-purple-500';
      case 'raro':
        return 'from-green-500 to-blue-500';
      case 'común':
        return 'from-gray-500 to-gray-600';
      default:
        return 'from-amber-500 to-orange-500';
    }
  };

  const getRarityTextColor = (rarity: string) => {
    switch (rarity.toLowerCase()) {
      case 'legendario':
        return 'text-purple-600 dark:text-purple-400';
      case 'épico':
        return 'text-blue-600 dark:text-blue-400';
      case 'raro':
        return 'text-green-600 dark:text-green-400';
      case 'común':
        return 'text-gray-600 dark:text-gray-400';
      default:
        return 'text-amber-600 dark:text-amber-400';
    }
  };

  return (
    <div className="bg-gradient-to-br from-blue-50/90 to-cyan-50/90 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl p-4 border-2 border-blue-200 dark:border-blue-800 shadow-lg hover:shadow-xl transition-all duration-300">
      <div className={`flex flex-col lg:flex-row gap-4 items-start ${isImageLeft ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
        
        {/* Columna de imagen y estadísticas */}
        <div className="flex flex-col items-center gap-2">
          {/* Imagen del Nano - Más pequeña */}
          <div className="w-20 h-20 flex-shrink-0">
            <div className="relative w-full h-full overflow-hidden rounded-lg border border-blue-300 dark:border-blue-700 shadow-md">
              {!imageError ? (
                <Image
                  src={nano.image}
                  alt={nano.name}
                  width={80}
                  height={80}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  onError={() => setImageError(true)}
                />
              ) : (
                <div className={`w-full h-full bg-gradient-to-br ${getRarityColor(nano.rarity)} flex items-center justify-center`}>
                  <Icon name="cpu" className="w-6 h-6 text-white/70" />
                </div>
              )}
            </div>
          </div>

          {/* Estadísticas debajo de la imagen */}
          <div className="w-full space-y-1">
            <h4 className="text-xs font-bold text-blue-900 dark:text-blue-100 text-center">
              Stats
            </h4>
            <div className="space-y-1">
              {stats.map((stat) => (
                <div key={stat.name} className="bg-white/50 dark:bg-gray-800/50 rounded p-1 border border-blue-200 dark:border-blue-700">
                  <div className="flex items-center justify-between">
                    <span className="text-blue-800 dark:text-blue-200 font-medium text-xs">{stat.name}</span>
                    <span className="text-blue-900 dark:text-blue-100 font-bold text-xs">{stat.value}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Contenido del Nano - Simplificado */}
        <div className="flex-1 space-y-2">
          {/* Título principal con ID prominente */}
          <div className="text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-2 mb-1">
              <h3 className="text-base lg:text-lg font-bold text-blue-900 dark:text-blue-100">
                {nano.name}
              </h3>
              <div className="bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-bold">
                #{nano.id}
              </div>
            </div>
            <div className="flex items-center justify-center lg:justify-start gap-2 text-xs">
              <span className={`font-medium ${getRarityTextColor(nano.rarity)}`}>
                {nano.rarity}
              </span>
              <span className="text-blue-700 dark:text-blue-300">•</span>
              <span className="text-blue-700 dark:text-blue-300">
                Nivel {nano.level}
              </span>
            </div>
          </div>

          {/* Información básica compacta */}
          <div className="grid grid-cols-2 gap-2 text-center lg:text-left">
            <div className="bg-blue-100/50 dark:bg-blue-800/30 rounded p-1.5 border border-blue-300 dark:border-blue-700">
              <div className="text-blue-700 dark:text-blue-300 text-xs font-medium">Tipo</div>
              <div className="text-blue-900 dark:text-blue-100 font-bold text-xs">{nano.type}</div>
            </div>
            <div className="bg-cyan-100/50 dark:bg-cyan-800/30 rounded p-1.5 border border-cyan-300 dark:border-cyan-700">
              <div className="text-cyan-700 dark:text-cyan-300 text-xs font-medium">Especial</div>
              <div className="text-cyan-900 dark:text-cyan-100 font-bold text-xs">{nano.special}</div>
            </div>
          </div>

          {/* Precio */}
          <div className="text-center lg:text-left">
            <div className="bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-800/30 dark:to-emerald-800/30 rounded p-2 border border-green-300 dark:border-green-700">
              <div className="text-green-700 dark:text-green-300 text-xs font-medium">Precio</div>
              <div className="text-green-900 dark:text-green-100 font-bold text-sm">
                ${nano.price.toLocaleString('es-CL')} CLP
              </div>
            </div>
          </div>

          {/* Botones de acción compactos */}
          <div className="flex gap-1 pt-1">
            <Button
              onClick={() => setShowDetails(!showDetails)}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-1.5 px-3 rounded transition-colors text-xs"
            >
              {showDetails ? 'Menos' : 'Detalles'}
            </Button>
            <Button className="bg-green-600 hover:bg-green-700 text-white py-1.5 px-3 rounded transition-colors text-xs">
              <Icon name="shopping-cart" className="w-3 h-3" />
            </Button>
          </div>

          {/* Detalles expandibles */}
          {showDetails && (
            <div className="mt-2 pt-2 border-t border-blue-300 dark:border-blue-700">
              <div className="space-y-2">
                <div className="text-blue-800 dark:text-blue-200 text-xs">
                  <span className="font-medium">Descripción:</span> {nano.description}
                </div>
                <div className="grid grid-cols-3 gap-1">
                  {stats.map((stat) => (
                    <div key={stat.name} className="bg-white/40 dark:bg-gray-800/40 rounded p-1 border border-blue-200 dark:border-blue-700">
                      <div className="text-blue-800 dark:text-blue-200 font-medium text-xs text-center">{stat.name}</div>
                      <div className="text-blue-900 dark:text-blue-100 font-bold text-xs text-center">{stat.value}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
