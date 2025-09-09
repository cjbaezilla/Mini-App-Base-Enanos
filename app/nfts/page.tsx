'use client';

import { useState } from 'react';
import { NFTMetadata } from '../../types/nft';
import NFTBookCard from '../components/NFTBookCard';
import { Button } from '../components/ui/Button';
import { Icon } from '../components/ui/Icon';
import { useNFTsCache } from '../../lib/useNFTsCache';

export default function NFTsPage() {
  const { nfts, loading, error, isFromCache, refreshNFTs } = useNFTsCache();
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('name');
  const [filterBy, setFilterBy] = useState<string>('all');
  const [filterValue, setFilterValue] = useState<string>('');

  // Función para obtener valor de atributo
  const getAttributeValue = (nft: NFTMetadata, attributeName: string): string | number => {
    const attr = nft.attributes?.find(attr => attr.trait_type === attributeName);
    return attr?.value || '';
  };

  // Función para obtener opciones de filtro únicas
  const getFilterOptions = (attributeName: string): string[] => {
    const values = new Set<string>();
    nfts.forEach(nft => {
      const value = getAttributeValue(nft, attributeName);
      if (value) values.add(String(value));
    });
    return Array.from(values).sort();
  };

  const filteredAndSortedNFTs = nfts
    .filter(nft => {
      // Filtro de búsqueda
      if (searchTerm.trim()) {
        const searchLower = searchTerm.toLowerCase();
        
        // Buscar en el nombre
        if (nft.name.toLowerCase().includes(searchLower)) return true;
        
        // Buscar en la descripción
        if (nft.description?.toLowerCase().includes(searchLower)) return true;
        
        // Buscar en atributos
        const hasMatchingAttribute = nft.attributes?.some(attr => {
          const value = String(attr.value).toLowerCase();
          return value.includes(searchLower);
        });
        
        if (!hasMatchingAttribute) return false;
      }

      // Filtro por atributo específico
      if (filterBy !== 'all' && filterValue) {
        const attrValue = getAttributeValue(nft, filterBy);
        if (String(attrValue).toLowerCase() !== filterValue.toLowerCase()) {
          return false;
        }
      }

      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'age':
          const ageA = getAttributeValue(a, 'Edad') as number || 0;
          const ageB = getAttributeValue(b, 'Edad') as number || 0;
          return ageB - ageA;
        case 'strength':
          const strengthA = getAttributeValue(a, 'Fuerza') as number || 0;
          const strengthB = getAttributeValue(b, 'Fuerza') as number || 0;
          return strengthB - strengthA;
        case 'intelligence':
          const intA = getAttributeValue(a, 'Inteligencia') as number || 0;
          const intB = getAttributeValue(b, 'Inteligencia') as number || 0;
          return intB - intA;
        case 'mastery':
          const masteryA = getAttributeValue(a, 'Nivel de Maestría') as number || 0;
          const masteryB = getAttributeValue(b, 'Nivel de Maestría') as number || 0;
          return masteryB - masteryA;
        case 'class':
          const classA = getAttributeValue(a, 'Clase') as string || '';
          const classB = getAttributeValue(b, 'Clase') as string || '';
          return classA.localeCompare(classB);
        case 'mountain':
          const mountainA = getAttributeValue(a, 'Montaña Natal') as string || '';
          const mountainB = getAttributeValue(b, 'Montaña Natal') as string || '';
          return mountainA.localeCompare(mountainB);
        default:
          return 0;
      }
    });


  if (loading) {
    return (
      <div className="min-h-full flex items-center justify-center px-4">
        <div className="text-center w-full max-w-md">
          <div className="bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-800/30 dark:to-orange-800/30 rounded-2xl p-8 border-2 border-amber-300 dark:border-amber-700 shadow-lg">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-amber-600 dark:border-amber-400 mx-auto mb-4"></div>
            <p className="text-amber-800 dark:text-amber-200 text-xl font-medium">📚 Cargando el Libro de Leyendas...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-full flex items-center justify-center px-4">
        <div className="text-center w-full max-w-md">
          <div className="bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-800/30 dark:to-orange-800/30 rounded-2xl p-8 border-2 border-amber-300 dark:border-amber-700 shadow-lg">
            <p className="text-red-600 dark:text-red-400 text-xl mb-4 font-medium">{error}</p>
            <Button onClick={refreshNFTs} className="bg-amber-600 hover:bg-amber-700 text-white shadow-lg">
              Reintentar
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-full">
      <div className="container mx-auto px-4 py-8">
        {/* Header simple */}
        <div className="text-center mb-8">
          <div className="bg-amber-100/60 dark:bg-amber-800/30 rounded-lg p-6 border border-amber-200 dark:border-amber-700">
            <div className="flex items-center justify-center gap-2 mb-2">
              <h1 className="text-3xl md:text-4xl font-bold text-amber-800 dark:text-amber-200 font-display">
                Colección de Enanos
              </h1>
              <button
                onClick={refreshNFTs}
                className="p-2 text-amber-600 dark:text-amber-400 hover:text-amber-800 dark:hover:text-amber-200 hover:bg-amber-200/50 dark:hover:bg-amber-700/50 rounded-lg transition-colors"
                title="Actualizar datos"
              >
                <Icon name="refresh-cw" className="h-5 w-5" />
              </button>
            </div>
            <p className="text-amber-700 dark:text-amber-300 mb-1">
              {nfts.length} enanos únicos
            </p>
            <div className="flex items-center justify-center gap-2 text-sm text-amber-600 dark:text-amber-400">
              <span>Cada uno con su propia historia</span>
              {isFromCache && (
                <span className="flex items-center gap-1 px-2 py-1 bg-amber-200/50 dark:bg-amber-700/50 rounded-full text-xs">
                  <Icon name="database" className="h-3 w-3" />
                  Cache
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Búsqueda, Filtros y Ordenamiento con estilo de libro antiguo */}
        <div className="bg-gradient-to-br from-amber-100/80 to-orange-100/80 dark:from-amber-800/30 dark:to-orange-800/30 backdrop-blur-md rounded-2xl p-6 mb-8 border-2 border-amber-300 dark:border-amber-700 shadow-lg">
          <div className="space-y-6">
            {/* Barra de búsqueda - 100% de ancho */}
            <div className="w-full">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Icon name="search" className="h-5 w-5 text-amber-700 dark:text-amber-300" />
                </div>
                <input
                  type="text"
                  placeholder="Buscar por nombre, clase, atributos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-amber-50/80 dark:bg-amber-900/50 text-amber-900 dark:text-amber-100 placeholder-amber-600 dark:placeholder-amber-400 rounded-lg border-2 border-amber-300 dark:border-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    <Icon name="x" className="h-5 w-5 text-amber-600 dark:text-amber-400 hover:text-amber-800 dark:hover:text-amber-200 transition-colors" />
                  </button>
                )}
              </div>
            </div>

            {/* Filtros lado a lado - siempre en 2 columnas */}
            <div className="grid grid-cols-2 gap-2 sm:gap-4">
              {/* Filtro por atributo */}
              <div className="space-y-1 sm:space-y-2">
                <label className="text-amber-800 dark:text-amber-200 font-medium text-xs sm:text-sm">
                  Filtrar por:
                </label>
                <select
                  value={filterBy}
                  onChange={(e) => {
                    setFilterBy(e.target.value);
                    setFilterValue('');
                  }}
                  className="w-full bg-amber-50/80 dark:bg-amber-900/50 text-amber-900 dark:text-amber-100 rounded-lg px-2 sm:px-3 py-1.5 sm:py-2 border-2 border-amber-300 dark:border-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-xs sm:text-sm"
                >
                  <option value="all">Todos</option>
                  <option value="Clase">Clase</option>
                  <option value="Montaña Natal">Montaña</option>
                  <option value="Especialidad">Especialidad</option>
                  <option value="Clan">Clan</option>
                  <option value="Color de Barba">Barba</option>
                  <option value="Personalidad">Personalidad</option>
                </select>
              </div>

              {/* Filtro por valor o Ordenamiento */}
              <div className="space-y-1 sm:space-y-2">
                <label className="text-amber-800 dark:text-amber-200 font-medium text-xs sm:text-sm">
                  {filterBy !== 'all' ? 'Valor:' : 'Ordenar:'}
                </label>
                {filterBy !== 'all' ? (
                  <div className="flex gap-1 sm:gap-2">
                    <select
                      value={filterValue}
                      onChange={(e) => setFilterValue(e.target.value)}
                      className="flex-1 bg-amber-50/80 dark:bg-amber-900/50 text-amber-900 dark:text-amber-100 rounded-lg px-2 sm:px-3 py-1.5 sm:py-2 border-2 border-amber-300 dark:border-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-xs sm:text-sm"
                    >
                      <option value="">Seleccionar...</option>
                      {getFilterOptions(filterBy).map(option => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                    {filterValue && (
                      <button
                        onClick={() => setFilterValue('')}
                        className="px-2 sm:px-3 py-1.5 sm:py-2 text-amber-600 dark:text-amber-400 hover:text-amber-800 dark:hover:text-amber-200 transition-colors bg-amber-50/80 dark:bg-amber-900/50 rounded-lg border-2 border-amber-300 dark:border-amber-700"
                      >
                        <Icon name="x" className="h-3 w-3 sm:h-4 sm:w-4" />
                      </button>
                    )}
                  </div>
                ) : (
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full bg-amber-50/80 dark:bg-amber-900/50 text-amber-900 dark:text-amber-100 rounded-lg px-2 sm:px-3 py-1.5 sm:py-2 border-2 border-amber-300 dark:border-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-xs sm:text-sm"
                  >
                    <option value="name">Nombre</option>
                    <option value="age">Edad</option>
                    <option value="strength">Fuerza</option>
                    <option value="intelligence">Inteligencia</option>
                    <option value="mastery">Maestría</option>
                    <option value="class">Clase</option>
                    <option value="mountain">Montaña</option>
                  </select>
                )}
              </div>
            </div>

            {/* Información de resultados */}
            <div className="text-center">
              <p className="text-amber-700 dark:text-amber-300 text-sm">
                Mostrando {filteredAndSortedNFTs.length} de {nfts.length} enanos
                {(searchTerm || filterValue) && (
                  <span className="ml-2 text-amber-600 dark:text-amber-400">
                    • {searchTerm && `Búsqueda: "${searchTerm}"`}
                    {searchTerm && filterValue && ' • '}
                    {filterValue && `Filtro: ${filterBy} = "${filterValue}"`}
                  </span>
                )}
              </p>
            </div>
          </div>
        </div>

        {/* Lista de NFTs con diseño de libro antiguo - 1 por fila */}
        <div className="space-y-6">
          {filteredAndSortedNFTs.map((nft, index) => (
            <NFTBookCard key={nft.id} nft={nft} index={index} />
          ))}
        </div>

        {filteredAndSortedNFTs.length === 0 && (
          <div className="text-center py-12">
            <div className="bg-gradient-to-br from-amber-100/80 to-orange-100/80 dark:from-amber-800/30 dark:to-orange-800/30 rounded-2xl p-8 border-2 border-amber-300 dark:border-amber-700 shadow-lg">
              <Icon name="search" className="w-16 h-16 text-amber-600 dark:text-amber-400 mx-auto mb-4" />
              <p className="text-amber-800 dark:text-amber-200 text-xl font-medium">
                {searchTerm || filterValue
                  ? `No se encontraron enanos que coincidan con los criterios`
                  : 'No se encontraron enanos'
                }
              </p>
              {(searchTerm || filterValue) && (
                <div className="text-amber-600 dark:text-amber-400 text-sm mt-2 space-y-1">
                  {searchTerm && <p>• Búsqueda: &quot;{searchTerm}&quot;</p>}
                  {filterValue && <p>• Filtro: {filterBy} = &quot;{filterValue}&quot;</p>}
                  <p className="mt-2">Intenta con otros términos de búsqueda o cambia los filtros</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
