'use client';

import { useState, useEffect } from 'react';
import NanoCard from '../components/NanoCard';
import { Button } from '../components/ui/Button';
import { Icon } from '../components/ui/Icon';

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

export default function NanoPage() {
  const [nanos, setNanos] = useState<NanoData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('name');
  const [filterBy, setFilterBy] = useState<string>('all');
  const [filterValue, setFilterValue] = useState<string>('');

  useEffect(() => {
    loadNanos();
  }, []);

  const loadNanos = async () => {
    try {
      setLoading(true);
      
      // Datos de ejemplo de nanos
      const nanoData: NanoData[] = [
        {
          id: 1,
          name: "Quantum Core",
          type: "Procesador",
          level: 85,
          rarity: "Legendario",
          power: 95,
          speed: 88,
          durability: 92,
          special: "Overclock",
          description: "Núcleo cuántico de última generación con capacidades de procesamiento excepcionales.",
          image: "/api/placeholder/80/80",
          price: 2500000
        },
        {
          id: 2,
          name: "Neural Link",
          type: "Conectividad",
          level: 72,
          rarity: "Épico",
          power: 78,
          speed: 95,
          durability: 65,
          special: "Latencia Zero",
          description: "Sistema de conexión neural que elimina la latencia en comunicaciones.",
          image: "/api/placeholder/80/80",
          price: 1800000
        },
        {
          id: 3,
          name: "Crystal Memory",
          type: "Almacenamiento",
          level: 68,
          rarity: "Raro",
          power: 70,
          speed: 82,
          durability: 88,
          special: "Compresión",
          description: "Memoria cristalina con capacidades de compresión avanzada.",
          image: "/api/placeholder/80/80",
          price: 1200000
        },
        {
          id: 4,
          name: "Plasma Shield",
          type: "Defensa",
          level: 90,
          rarity: "Legendario",
          power: 92,
          speed: 75,
          durability: 98,
          special: "Absorción",
          description: "Escudo de plasma que absorbe y redirige energía de ataques.",
          image: "/api/placeholder/80/80",
          price: 3200000
        },
        {
          id: 5,
          name: "Data Stream",
          type: "Transmisión",
          level: 55,
          rarity: "Común",
          power: 60,
          speed: 70,
          durability: 55,
          special: "Multiplex",
          description: "Sistema básico de transmisión de datos con multiplexación.",
          image: "/api/placeholder/80/80",
          price: 450000
        },
        {
          id: 6,
          name: "Cyber Matrix",
          type: "Procesador",
          level: 78,
          rarity: "Épico",
          power: 85,
          speed: 80,
          durability: 75,
          special: "Paralelismo",
          description: "Matriz cibernética con procesamiento paralelo avanzado.",
          image: "/api/placeholder/80/80",
          price: 2100000
        },
        {
          id: 7,
          name: "Energy Cell",
          type: "Energía",
          level: 65,
          rarity: "Raro",
          power: 75,
          speed: 60,
          durability: 90,
          special: "Regeneración",
          description: "Célula de energía con capacidades de regeneración automática.",
          image: "/api/placeholder/80/80",
          price: 950000
        },
        {
          id: 8,
          name: "Logic Gate",
          type: "Lógica",
          level: 45,
          rarity: "Común",
          power: 50,
          speed: 55,
          durability: 60,
          special: "Optimización",
          description: "Puerta lógica básica con optimización de circuitos.",
          image: "/api/placeholder/80/80",
          price: 320000
        }
      ];
      
      setNanos(nanoData);
    } catch {
      setError('Error al cargar los nanos');
    } finally {
      setLoading(false);
    }
  };

  // Función para obtener opciones de filtro únicas
  const getFilterOptions = (attributeName: string): string[] => {
    const values = new Set<string>();
    nanos.forEach(nano => {
      let value = '';
      switch (attributeName) {
        case 'type':
          value = nano.type;
          break;
        case 'rarity':
          value = nano.rarity;
          break;
        case 'special':
          value = nano.special;
          break;
      }
      if (value) values.add(value);
    });
    return Array.from(values).sort();
  };

  const filteredAndSortedNanos = nanos
    .filter(nano => {
      // Filtro de búsqueda
      if (searchTerm.trim()) {
        const searchLower = searchTerm.toLowerCase();
        
        // Buscar en el nombre
        if (nano.name.toLowerCase().includes(searchLower)) return true;
        
        // Buscar en la descripción
        if (nano.description?.toLowerCase().includes(searchLower)) return true;
        
        // Buscar en tipo y especial
        if (nano.type.toLowerCase().includes(searchLower) || 
            nano.special.toLowerCase().includes(searchLower)) return true;
        
        return false;
      }

      // Filtro por atributo específico
      if (filterBy !== 'all' && filterValue) {
        let attrValue = '';
        switch (filterBy) {
          case 'type':
            attrValue = nano.type;
            break;
          case 'rarity':
            attrValue = nano.rarity;
            break;
          case 'special':
            attrValue = nano.special;
            break;
        }
        if (attrValue.toLowerCase() !== filterValue.toLowerCase()) {
          return false;
        }
      }

      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'level':
          return b.level - a.level;
        case 'power':
          return b.power - a.power;
        case 'speed':
          return b.speed - a.speed;
        case 'durability':
          return b.durability - a.durability;
        case 'price':
          return b.price - a.price;
        case 'rarity':
          const rarityOrder = { 'Legendario': 4, 'Épico': 3, 'Raro': 2, 'Común': 1 };
          return (rarityOrder[b.rarity as keyof typeof rarityOrder] || 0) - 
                 (rarityOrder[a.rarity as keyof typeof rarityOrder] || 0);
        default:
          return 0;
      }
    });

  if (loading) {
    return (
      <div className="min-h-full flex items-center justify-center">
        <div className="text-center">
          <div className="bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-800/30 dark:to-cyan-800/30 rounded-2xl p-8 border-2 border-blue-300 dark:border-blue-700 shadow-lg">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 dark:border-blue-400 mx-auto mb-4"></div>
            <p className="text-blue-800 dark:text-blue-200 text-xl font-medium">⚡ Cargando Nano Tecnología...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-full flex items-center justify-center">
        <div className="text-center">
          <div className="bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-800/30 dark:to-cyan-800/30 rounded-2xl p-8 border-2 border-blue-300 dark:border-blue-700 shadow-lg">
            <p className="text-red-600 dark:text-red-400 text-xl mb-4 font-medium">{error}</p>
            <Button onClick={loadNanos} className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg">
              Reintentar
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-full">
      <div className="container mx-auto px-4 py-6">
        {/* Header compacto */}
        <div className="text-center mb-6">
          <div className="bg-blue-100/60 dark:bg-blue-800/30 rounded-lg p-4 border border-blue-200 dark:border-blue-700">
            <h1 className="text-2xl md:text-3xl font-bold text-blue-800 dark:text-blue-200 font-display mb-1">
              Nano Tecnología
            </h1>
            <p className="text-blue-700 dark:text-blue-300 mb-1">
              {nanos.length} componentes únicos
            </p>
            <p className="text-sm text-blue-600 dark:text-blue-400">
              Tecnología de vanguardia para tu arsenal
            </p>
          </div>
        </div>

        {/* Búsqueda, Filtros y Ordenamiento compactos */}
        <div className="bg-gradient-to-br from-blue-100/80 to-cyan-100/80 dark:from-blue-800/30 dark:to-cyan-800/30 backdrop-blur-md rounded-xl p-4 mb-6 border-2 border-blue-300 dark:border-blue-700 shadow-lg">
          <div className="space-y-4">
            {/* Barra de búsqueda */}
            <div className="w-full">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Icon name="search" className="h-4 w-4 text-blue-700 dark:text-blue-300" />
                </div>
                <input
                  type="text"
                  placeholder="Buscar por nombre, tipo, especialidad..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-blue-50/80 dark:bg-blue-900/50 text-blue-900 dark:text-blue-100 placeholder-blue-600 dark:placeholder-blue-400 rounded-lg border-2 border-blue-300 dark:border-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    <Icon name="x" className="h-4 w-4 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200 transition-colors" />
                  </button>
                )}
              </div>
            </div>

            {/* Filtros lado a lado */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {/* Filtro por atributo */}
              <div className="space-y-1">
                <label className="text-blue-800 dark:text-blue-200 font-medium text-xs">
                  Filtrar por:
                </label>
                <select
                  value={filterBy}
                  onChange={(e) => {
                    setFilterBy(e.target.value);
                    setFilterValue('');
                  }}
                  className="w-full bg-blue-50/80 dark:bg-blue-900/50 text-blue-900 dark:text-blue-100 rounded-lg px-3 py-2 border-2 border-blue-300 dark:border-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                >
                  <option value="all">Todos</option>
                  <option value="type">Tipo</option>
                  <option value="rarity">Rareza</option>
                  <option value="special">Especialidad</option>
                </select>
              </div>

              {/* Filtro por valor o Ordenamiento */}
              <div className="space-y-1">
                <label className="text-blue-800 dark:text-blue-200 font-medium text-xs">
                  {filterBy !== 'all' ? 'Valor del filtro:' : 'Ordenar por:'}
                </label>
                {filterBy !== 'all' ? (
                  <div className="flex gap-2">
                    <select
                      value={filterValue}
                      onChange={(e) => setFilterValue(e.target.value)}
                      className="flex-1 bg-blue-50/80 dark:bg-blue-900/50 text-blue-900 dark:text-blue-100 rounded-lg px-3 py-2 border-2 border-blue-300 dark:border-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                    >
                      <option value="">Seleccionar...</option>
                      {getFilterOptions(filterBy).map(option => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                    {filterValue && (
                      <button
                        onClick={() => setFilterValue('')}
                        className="px-3 py-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200 transition-colors bg-blue-50/80 dark:bg-blue-900/50 rounded-lg border-2 border-blue-300 dark:border-blue-700"
                      >
                        <Icon name="x" className="h-3 w-3" />
                      </button>
                    )}
                  </div>
                ) : (
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full bg-blue-50/80 dark:bg-blue-900/50 text-blue-900 dark:text-blue-100 rounded-lg px-3 py-2 border-2 border-blue-300 dark:border-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                  >
                    <option value="name">Nombre</option>
                    <option value="level">Nivel</option>
                    <option value="power">Poder</option>
                    <option value="speed">Velocidad</option>
                    <option value="durability">Durabilidad</option>
                    <option value="price">Precio</option>
                    <option value="rarity">Rareza</option>
                  </select>
                )}
              </div>
            </div>

            {/* Información de resultados */}
            <div className="text-center">
              <p className="text-blue-700 dark:text-blue-300 text-xs">
                Mostrando {filteredAndSortedNanos.length} de {nanos.length} componentes
                {(searchTerm || filterValue) && (
                  <span className="ml-2 text-blue-600 dark:text-blue-400">
                    • {searchTerm && `Búsqueda: "${searchTerm}"`}
                    {searchTerm && filterValue && ' • '}
                    {filterValue && `Filtro: ${filterBy} = "${filterValue}"`}
                  </span>
                )}
              </p>
            </div>
          </div>
        </div>

        {/* Lista de Nanos con diseño compacto */}
        <div className="space-y-4">
          {filteredAndSortedNanos.map((nano, index) => (
            <NanoCard key={nano.id} nano={nano} index={index} />
          ))}
        </div>

        {filteredAndSortedNanos.length === 0 && (
          <div className="text-center py-8">
            <div className="bg-gradient-to-br from-blue-100/80 to-cyan-100/80 dark:from-blue-800/30 dark:to-cyan-800/30 rounded-xl p-6 border-2 border-blue-300 dark:border-blue-700 shadow-lg">
              <Icon name="search" className="w-12 h-12 text-blue-600 dark:text-blue-400 mx-auto mb-3" />
              <p className="text-blue-800 dark:text-blue-200 text-lg font-medium">
                {searchTerm || filterValue
                  ? `No se encontraron componentes que coincidan con los criterios`
                  : 'No se encontraron componentes'
                }
              </p>
              {(searchTerm || filterValue) && (
                <div className="text-blue-600 dark:text-blue-400 text-sm mt-2 space-y-1">
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
