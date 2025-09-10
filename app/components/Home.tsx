import React from 'react';
import Image from 'next/image';
import { Icon } from './ui/Icon';

export const Home: React.FC = () => {

  return (
    <div className="min-h-full">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center space-y-6 mb-8">
          <div className="space-y-3">
            <div className="bg-amber-100/60 dark:bg-amber-800/30 rounded-lg p-6 border border-amber-200 dark:border-amber-700">
              <h1 className="text-3xl md:text-4xl font-bold text-amber-800 dark:text-amber-200 font-display mb-2">
                Enanos Club
              </h1>
              <p className="text-amber-700 dark:text-amber-300 mb-1">
                188 enanos únicos de las montañas legendarias
              </p>
              <p className="text-sm text-amber-600 dark:text-amber-400">
                Cada uno con su propia historia épica y poderes mágicos extraordinarios
              </p>
            </div>
          </div>
        </div>

        {/* Collection Stats */}
        <div className="bg-gradient-to-br from-amber-100/80 to-orange-100/80 dark:from-amber-800/30 dark:to-orange-800/30 backdrop-blur-md rounded-2xl p-6 mb-8 border-2 border-amber-300 dark:border-amber-700 shadow-lg">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-amber-50/80 to-orange-50/80 dark:from-amber-900/50 dark:to-orange-900/50 rounded-xl p-4 border-2 border-amber-300 dark:border-amber-600 shadow-lg">
              <div className="text-center space-y-2">
                <div className="text-2xl font-bold text-amber-800 dark:text-amber-200">188</div>
                <div className="text-sm font-medium text-amber-700 dark:text-amber-300">NFTs Únicos</div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-amber-50/80 to-orange-50/80 dark:from-amber-900/50 dark:to-orange-900/50 rounded-xl p-4 border-2 border-amber-300 dark:border-amber-600 shadow-lg">
              <div className="text-center space-y-2">
                <div className="text-2xl font-bold text-amber-800 dark:text-amber-200">10</div>
                <div className="text-sm font-medium text-amber-700 dark:text-amber-300">Series Épicas</div>
              </div>
            </div>
          </div>
        </div>

        {/* Specialties Section */}
        <div className="bg-gradient-to-br from-amber-100/80 to-orange-100/80 dark:from-amber-800/30 dark:to-orange-800/30 backdrop-blur-md rounded-2xl p-6 mb-8 border-2 border-amber-300 dark:border-amber-700 shadow-lg">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-amber-800 dark:text-amber-200 font-display mb-2">
              Especialidades de los Enanos
            </h2>
            <p className="text-amber-700 dark:text-amber-300 text-sm">
              Maestros de diferentes artes y oficios legendarios
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {/* Herreros y Forjadores */}
            <div className="bg-gradient-to-br from-red-100 to-orange-100 dark:from-red-900/40 dark:to-orange-900/40 rounded-lg p-3 border-2 border-amber-300 dark:border-amber-600 shadow-md">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center shadow-sm">
                  <Icon name="fire" size="sm" className="text-white" />
                </div>
                <div>
                  <div className="font-semibold text-sm text-amber-800 dark:text-amber-200">Herreros</div>
                  <div className="text-xs text-amber-700 dark:text-amber-300">11 maestros</div>
                </div>
              </div>
            </div>
          
            {/* Maestros Elementales */}
            <div className="bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/40 dark:to-pink-900/40 rounded-lg p-3 border-2 border-amber-300 dark:border-amber-600 shadow-md">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center shadow-sm">
                  <Icon name="sparkles" size="sm" className="text-white" />
                </div>
                <div>
                  <div className="font-semibold text-sm text-amber-800 dark:text-amber-200">Elementales</div>
                  <div className="text-xs text-amber-700 dark:text-amber-300">18 maestros</div>
                </div>
              </div>
            </div>
          
          {/* Artesanos y Talladores */}
          <div className="bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/40 dark:to-emerald-900/40 rounded-lg p-3 border-2 border-amber-300 dark:border-amber-600 shadow-md">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center shadow-sm">
                <Icon name="hammer" size="sm" className="text-white" />
              </div>
              <div>
                <div className="font-semibold text-sm text-amber-800 dark:text-amber-200">Artesanos</div>
                <div className="text-xs text-amber-700 dark:text-amber-300">12 talladores</div>
              </div>
            </div>
          </div>
          
          {/* Comerciantes y Especialistas */}
          <div className="bg-gradient-to-br from-yellow-100 to-amber-100 dark:from-yellow-900/40 dark:to-amber-900/40 rounded-lg p-3 border-2 border-amber-300 dark:border-amber-600 shadow-md">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-yellow-600 rounded-lg flex items-center justify-center shadow-sm">
                <Icon name="coins" size="sm" className="text-white" />
              </div>
              <div>
                <div className="font-semibold text-sm text-amber-800 dark:text-amber-200">Comerciantes</div>
                <div className="text-xs text-amber-700 dark:text-amber-300">8 especialistas</div>
              </div>
            </div>
          </div>
          
          {/* Maestros de Versos Infinitos */}
          <div className="bg-gradient-to-br from-indigo-100 to-blue-100 dark:from-indigo-900/40 dark:to-blue-900/40 rounded-lg p-3 border-2 border-amber-300 dark:border-amber-600 shadow-md">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center shadow-sm">
                <Icon name="star" size="sm" className="text-white" />
              </div>
              <div>
                <div className="font-semibold text-sm text-amber-800 dark:text-amber-200">Versos Infinitos</div>
                <div className="text-xs text-amber-700 dark:text-amber-300">61 maestros</div>
              </div>
            </div>
          </div>
          
          {/* Maestros de Runas */}
          <div className="bg-gradient-to-br from-violet-100 to-purple-100 dark:from-violet-900/40 dark:to-purple-900/40 rounded-lg p-3 border-2 border-amber-300 dark:border-amber-600 shadow-md">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-violet-600 rounded-lg flex items-center justify-center shadow-sm">
                <Icon name="zap" size="sm" className="text-white" />
              </div>
              <div>
                <div className="font-semibold text-sm text-amber-800 dark:text-amber-200">Runas</div>
                <div className="text-xs text-amber-700 dark:text-amber-300">2 maestros</div>
              </div>
            </div>
          </div>
          
          {/* Forjadores de Armaduras */}
          <div className="bg-gradient-to-br from-gray-100 to-slate-100 dark:from-gray-900/40 dark:to-slate-900/40 rounded-lg p-3 border-2 border-amber-300 dark:border-amber-600 shadow-md">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gray-600 rounded-lg flex items-center justify-center shadow-sm">
                <Icon name="shield" size="sm" className="text-white" />
              </div>
              <div>
                <div className="font-semibold text-sm text-amber-800 dark:text-amber-200">Armaduras</div>
                <div className="text-xs text-amber-700 dark:text-amber-300">2 forjadores</div>
              </div>
            </div>
          </div>
          
          {/* Talladores de Hueso */}
          <div className="bg-gradient-to-br from-rose-100 to-pink-100 dark:from-rose-900/40 dark:to-pink-900/40 rounded-lg p-3 border-2 border-amber-300 dark:border-amber-600 shadow-md">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-rose-600 rounded-lg flex items-center justify-center shadow-sm">
                <Icon name="bone" size="sm" className="text-white" />
              </div>
              <div>
                <div className="font-semibold text-sm text-amber-800 dark:text-amber-200">Hueso</div>
                <div className="text-xs text-amber-700 dark:text-amber-300">2 talladores</div>
              </div>
            </div>
          </div>
          
          {/* Maestros de Venenos */}
          <div className="bg-gradient-to-br from-emerald-100 to-teal-100 dark:from-emerald-900/40 dark:to-teal-900/40 rounded-lg p-3 border-2 border-amber-300 dark:border-amber-600 shadow-md">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center shadow-sm">
                <Icon name="droplet" size="sm" className="text-white" />
              </div>
              <div>
                <div className="font-semibold text-sm text-amber-800 dark:text-amber-200">Venenos</div>
                <div className="text-xs text-amber-700 dark:text-amber-300">2 maestros</div>
              </div>
            </div>
          </div>
          
          {/* Creadores de Pociones */}
          <div className="bg-gradient-to-br from-cyan-100 to-blue-100 dark:from-cyan-900/40 dark:to-blue-900/40 rounded-lg p-3 border-2 border-amber-300 dark:border-amber-600 shadow-md">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-cyan-600 rounded-lg flex items-center justify-center shadow-sm">
                <Icon name="flask" size="sm" className="text-white" />
              </div>
              <div>
                <div className="font-semibold text-sm text-amber-800 dark:text-amber-200">Pociones</div>
                <div className="text-xs text-amber-700 dark:text-amber-300">2 creadores</div>
              </div>
            </div>
          </div>
          
          {/* Maestros de Bestias */}
          <div className="bg-gradient-to-br from-orange-100 to-red-100 dark:from-orange-900/40 dark:to-red-900/40 rounded-lg p-3 border-2 border-amber-300 dark:border-amber-600 shadow-md">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-orange-600 rounded-lg flex items-center justify-center shadow-sm">
                <Icon name="paw" size="sm" className="text-white" />
              </div>
              <div>
                <div className="font-semibold text-sm text-amber-800 dark:text-amber-200">Bestias</div>
                <div className="text-xs text-amber-700 dark:text-amber-300">2 maestros</div>
              </div>
            </div>
          </div>
          
          {/* Forjadores de Escudos */}
          <div className="bg-gradient-to-br from-slate-100 to-gray-100 dark:from-slate-900/40 dark:to-gray-900/40 rounded-lg p-3 border-2 border-amber-300 dark:border-amber-600 shadow-md">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-slate-600 rounded-lg flex items-center justify-center shadow-sm">
                <Icon name="shield-check" size="sm" className="text-white" />
              </div>
              <div>
                <div className="font-semibold text-sm text-amber-800 dark:text-amber-200">Escudos</div>
                <div className="text-xs text-amber-700 dark:text-amber-300">2 forjadores</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Elementos Mágicos Detallados */}
        <div className="mt-4">
          <h3 className="text-lg font-semibold text-amber-800 dark:text-amber-200 text-center mb-3 drop-shadow-sm">
            Elementos Mágicos
          </h3>
          <div className="grid grid-cols-3 gap-2">
            <div className="bg-red-200 dark:bg-red-900/40 rounded-lg p-2 text-center border border-red-300 dark:border-red-600">
              <div className="text-xs font-bold text-red-800 dark:text-red-200">Fuego</div>
              <div className="text-xs font-medium text-red-700 dark:text-red-300">2 maestros</div>
            </div>
            <div className="bg-blue-200 dark:bg-blue-900/40 rounded-lg p-2 text-center border border-blue-300 dark:border-blue-600">
              <div className="text-xs font-bold text-blue-800 dark:text-blue-200">Hielo</div>
              <div className="text-xs font-medium text-blue-700 dark:text-blue-300">2 maestros</div>
            </div>
            <div className="bg-green-200 dark:bg-green-900/40 rounded-lg p-2 text-center border border-green-300 dark:border-green-600">
              <div className="text-xs font-bold text-green-800 dark:text-green-200">Viento</div>
              <div className="text-xs font-medium text-green-700 dark:text-green-300">2 maestros</div>
            </div>
            <div className="bg-yellow-200 dark:bg-yellow-900/40 rounded-lg p-2 text-center border border-yellow-300 dark:border-yellow-600">
              <div className="text-xs font-bold text-yellow-800 dark:text-yellow-200">Tierra</div>
              <div className="text-xs font-medium text-yellow-700 dark:text-yellow-300">2 maestros</div>
            </div>
            <div className="bg-cyan-200 dark:bg-cyan-900/40 rounded-lg p-2 text-center border border-cyan-300 dark:border-cyan-600">
              <div className="text-xs font-bold text-cyan-800 dark:text-cyan-200">Agua</div>
              <div className="text-xs font-medium text-cyan-700 dark:text-cyan-300">2 maestros</div>
            </div>
            <div className="bg-purple-200 dark:bg-purple-900/40 rounded-lg p-2 text-center border border-purple-300 dark:border-purple-600">
              <div className="text-xs font-bold text-purple-800 dark:text-purple-200">Rayo</div>
              <div className="text-xs font-medium text-purple-700 dark:text-purple-300">2 maestros</div>
            </div>
            <div className="bg-indigo-200 dark:bg-indigo-900/40 rounded-lg p-2 text-center border border-indigo-300 dark:border-indigo-600">
              <div className="text-xs font-bold text-indigo-800 dark:text-indigo-200">Luna</div>
              <div className="text-xs font-medium text-indigo-700 dark:text-indigo-300">2 maestros</div>
            </div>
            <div className="bg-orange-200 dark:bg-orange-900/40 rounded-lg p-2 text-center border border-orange-300 dark:border-orange-600">
              <div className="text-xs font-bold text-orange-800 dark:text-orange-200">Sol</div>
              <div className="text-xs font-medium text-orange-700 dark:text-orange-300">2 maestros</div>
            </div>
            <div className="bg-pink-200 dark:bg-pink-900/40 rounded-lg p-2 text-center border border-pink-300 dark:border-pink-600">
              <div className="text-xs font-bold text-pink-800 dark:text-pink-200">Estrellas</div>
              <div className="text-xs font-medium text-pink-700 dark:text-pink-300">2 maestros</div>
            </div>
          </div>
        </div>
      </div>

        {/* Featured Characters */}
        <div className="bg-gradient-to-br from-amber-100/80 to-orange-100/80 dark:from-amber-800/30 dark:to-orange-800/30 backdrop-blur-md rounded-2xl p-6 mb-8 border-2 border-amber-300 dark:border-amber-700 shadow-lg">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-amber-800 dark:text-amber-200 font-display mb-2">
              Enanos Destacados
            </h2>
            <p className="text-amber-700 dark:text-amber-300 text-sm">
              Los maestros más legendarios de las montañas
            </p>
          </div>
        <div className="space-y-3">
          <div className="bg-gradient-to-r from-amber-100 to-yellow-100 dark:from-amber-900/40 dark:to-yellow-900/40 rounded-lg p-4 border-2 border-amber-300 dark:border-amber-600 shadow-lg">
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <Image 
                  src="/metadata/imgs/1.png" 
                  alt="Gimli Piedrabrillante"
                  width={64}
                  height={64}
                  className="w-16 h-16 rounded-lg object-cover border-2 border-amber-400 dark:border-amber-500 shadow-md"
                />
              </div>
              <div className="flex-1">
                <div className="font-bold text-amber-800 dark:text-amber-200">Gimli Piedrabrillante</div>
                <div className="text-sm font-medium text-amber-700 dark:text-amber-300">Tallador de Gemas Mágicas</div>
                <div className="text-xs font-medium text-amber-700 dark:text-amber-300">Maestro de las Piedras Cantantes</div>
              </div>
              <div className="text-right">
                <div className="text-amber-700 dark:text-amber-300 font-bold">203 años</div>
                <div className="text-xs font-medium text-amber-700 dark:text-amber-300">Maestría: 99</div>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-r from-blue-100 to-cyan-100 dark:from-blue-900/40 dark:to-cyan-900/40 rounded-lg p-4 border-2 border-amber-300 dark:border-amber-600 shadow-lg">
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <Image 
                  src="/metadata/imgs/10.png" 
                  alt="Fili Barbaoro"
                  width={64}
                  height={64}
                  className="w-16 h-16 rounded-lg object-cover border-2 border-blue-400 dark:border-blue-500 shadow-md"
                />
              </div>
              <div className="flex-1">
                <div className="font-bold text-amber-800 dark:text-amber-200">Fili Barbaoro</div>
                <div className="text-sm font-medium text-amber-700 dark:text-amber-300">Buscador de Oro Mágico</div>
                <div className="text-xs font-medium text-blue-700 dark:text-blue-300">Rey de los Tesoros</div>
              </div>
              <div className="text-right">
                <div className="text-blue-700 dark:text-blue-300 font-bold">210 años</div>
                <div className="text-xs font-medium text-amber-700 dark:text-amber-300">Maestría: 94</div>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-r from-purple-100 to-violet-100 dark:from-purple-900/40 dark:to-violet-900/40 rounded-lg p-4 border-2 border-amber-300 dark:border-amber-600 shadow-lg">
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <Image 
                  src="/metadata/imgs/100.png" 
                  alt="Nori Octaversoeterno"
                  width={64}
                  height={64}
                  className="w-16 h-16 rounded-lg object-cover border-2 border-purple-400 dark:border-purple-500 shadow-md"
                />
              </div>
              <div className="flex-1">
                <div className="font-bold text-amber-800 dark:text-amber-200">Nori Octaversoeterno</div>
                <div className="text-sm font-medium text-amber-700 dark:text-amber-300">Maestro del Octaverso</div>
                <div className="text-xs font-medium text-purple-700 dark:text-purple-300">Maestro del Octaverso Eterno</div>
              </div>
              <div className="text-right">
                <div className="text-purple-700 dark:text-purple-300 font-bold">235 años</div>
                <div className="text-xs font-medium text-amber-700 dark:text-amber-300">Maestría: 100</div>
              </div>
            </div>
          </div>
        </div>
      </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-br from-amber-100/80 to-orange-100/80 dark:from-amber-800/30 dark:to-orange-800/30 backdrop-blur-md rounded-2xl p-6 border-2 border-amber-300 dark:border-amber-700 shadow-lg">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-amber-800 dark:text-amber-200 font-display mb-2">
              Explora el Enanos Club
            </h3>
            <p className="text-sm text-amber-600 dark:text-amber-400 mb-2">
              Versión 1.3.0
            </p>
            <p className="text-amber-700 dark:text-amber-300 mb-4 leading-relaxed">
              Cada enano tiene una historia épica única, estadísticas especiales y poderes mágicos extraordinarios. 
              Desde herreros legendarios hasta maestros de versos infinitos que controlan la realidad misma.
            </p>
            <div className="flex justify-center space-x-4 text-sm font-medium text-amber-800 dark:text-amber-200">
              <span>• Edades: 167-278 años</span>
              <span>• Maestría: 91-100</span>
              <span>• 30+ atributos únicos</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
