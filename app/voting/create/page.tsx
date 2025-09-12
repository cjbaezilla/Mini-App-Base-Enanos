'use client';

import { useState, useCallback, useEffect } from 'react';
import { NFTBottomNav } from '../../components/NFTBottomNav';
import { NFTHeader } from '../../components/NFTHeader';
import { useRouter } from 'next/navigation';
import { Button } from '../../components/ui/Button';
import { Icon } from '../../components/ui/Icon';
import { Toast, useToast } from '../../components/ui/Toast';
import { useDAOContract } from '../../../lib/hooks/useDAOContract';
import { useAccount } from 'wagmi';
import { useMiniKit } from '@coinbase/onchainkit/minikit';
import { useHydration } from '../../../lib/hooks/useHydration';

// Diccionario de nombres épicos de enanos
const DWARF_FIRST_NAMES = [
  'Thorin', 'Balin', 'Dwalin', 'Fili', 'Kili', 'Dori', 'Nori', 'Ori', 'Oin', 'Gloin',
  'Bifur', 'Bofur', 'Bombur', 'Dain', 'Gimli', 'Gloin', 'Balin', 'Dwalin', 'Fili', 'Kili',
  'Durin', 'Thrain', 'Thror', 'Azaghâl', 'Telchar', 'Narvi', 'Celebrimbor', 'Mîm', 'Azaghâl', 'Telchar',
  'Gundabad', 'Erebor', 'Moria', 'Khazad-dûm', 'Nogrod', 'Belegost', 'Ironforge', 'Stormwind', 'Thunder', 'Stone',
  'Iron', 'Steel', 'Bronze', 'Copper', 'Silver', 'Gold', 'Mithril', 'Adamant', 'Diamond', 'Ruby',
  'Sapphire', 'Emerald', 'Onyx', 'Jade', 'Crystal', 'Quartz', 'Granite', 'Marble', 'Basalt', 'Obsidian',
  'Flint', 'Coal', 'Tin', 'Lead', 'Zinc', 'Nickel', 'Cobalt', 'Titanium', 'Tungsten', 'Platinum',
  'Hammer', 'Axe', 'Pick', 'Sword', 'Shield', 'Armor', 'Helm', 'Gauntlet', 'Boot', 'Belt',
  'Forge', 'Anvil', 'Bellows', 'Tongs', 'Chisel', 'Mallet', 'Sledge', 'Drill', 'Saw', 'File',
  'Mountain', 'Peak', 'Summit', 'Ridge', 'Crag', 'Cliff', 'Valley', 'Cavern', 'Tunnel', 'Mine',
  'Deep', 'Dark', 'Shadow', 'Gloom', 'Frost', 'Ice', 'Snow', 'Storm', 'Thunder', 'Lightning'
];

// Diccionario de apellidos épicos de enanos
const DWARF_LAST_NAMES = [
  'Ironbeard', 'Stonefist', 'Goldhammer', 'Silveraxe', 'Bronzebreaker', 'Steelheart', 'Ironfoot', 'Stonehelm', 'Goldbeard', 'Silverhand',
  'Bronzearm', 'Steeltooth', 'Ironback', 'Stonechest', 'Goldfoot', 'Silvereye', 'Bronzebrow', 'Steeljaw', 'Ironclaw', 'Stonefist',
  'Goldheart', 'Silverbeard', 'Bronzefoot', 'Steelhelm', 'Ironarm', 'Stonehand', 'Goldtooth', 'Silverclaw', 'Bronzeback', 'Steelchest',
  'Ironbrow', 'Stonefoot', 'Goldarm', 'Silvertooth', 'Bronzehelm', 'Steelhand', 'Ironchest', 'Stonebrow', 'Goldclaw', 'Silverfoot',
  'Bronzearm', 'Steeltooth', 'Ironback', 'Stonechest', 'Goldfoot', 'Silvereye', 'Bronzebrow', 'Steeljaw', 'Ironclaw', 'Stonefist',
  'Mountainborn', 'Deepdelver', 'Caverncrawler', 'Tunneldigger', 'Mineworker', 'Forgefire', 'Anvilstriker', 'Hammerwielder', 'Axebearer', 'Pickwielder',
  'Swordmaster', 'Shieldbearer', 'Armorforger', 'Helmcreator', 'Gauntletmaker', 'Bootcraft', 'Beltweaver', 'Ringforger', 'Crownmaker', 'Thronebuilder',
  'Kingsguard', 'Queensguard', 'Lordprotector', 'Ladydefender', 'Champion', 'Hero', 'Legend', 'Myth', 'Saga', 'Epic',
  'Ancient', 'Elder', 'Wise', 'Cunning', 'Brave', 'Bold', 'Fierce', 'Strong', 'Mighty', 'Powerful',
  'Noble', 'Honorable', 'Loyal', 'True', 'Faithful', 'Steadfast', 'Resolute', 'Determined', 'Persistent', 'Enduring',
  'Thunder', 'Lightning', 'Storm', 'Tempest', 'Hurricane', 'Blizzard', 'Avalanche', 'Earthquake', 'Volcano', 'Tsunami'
];

// Función para generar nombre de enano basado en dirección
const generateDwarfName = (address: string): string => {
  if (!address) return 'Anónimo';
  
  // Convertir dirección a número para usar como seed determinístico
  let hash = 0;
  for (let i = 0; i < address.length; i++) {
    const char = address.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convertir a 32bit integer
  }
  
  // Usar valor absoluto para asegurar positividad
  const seed = Math.abs(hash);
  
  // Seleccionar nombre y apellido basado en el seed
  const firstNameIndex = seed % DWARF_FIRST_NAMES.length;
  const lastNameIndex = Math.floor(seed / DWARF_FIRST_NAMES.length) % DWARF_LAST_NAMES.length;
  
  return `${DWARF_FIRST_NAMES[firstNameIndex]} ${DWARF_LAST_NAMES[lastNameIndex]}`;
};

export default function CreateProposalPage() {
  const [activeTab, setActiveTab] = useState('voting');
  
  // Hook de hidratación para evitar problemas de SSR - debe ir primero
  const isHydrated = useHydration();
  
  // Función para formatear fecha a DD-MM-YYYY
  const formatDateToDDMMYYYY = (date: Date): string => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  // Función para validar formato DD-MM-YYYY
  const isValidDateFormat = (dateString: string): boolean => {
    const regex = /^(\d{2})-(\d{2})-(\d{4})$/;
    if (!regex.test(dateString)) return false;
    
    const [, day, month, year] = dateString.match(regex)!;
    const dayNum = parseInt(day, 10);
    const monthNum = parseInt(month, 10);
    const yearNum = parseInt(year, 10);
    
    // Validar rangos
    if (monthNum < 1 || monthNum > 12) return false;
    if (dayNum < 1 || dayNum > 31) return false;
    if (yearNum < 2024 || yearNum > 2030) return false;
    
    // Validar fecha real
    const date = new Date(yearNum, monthNum - 1, dayNum);
    return date.getDate() === dayNum && date.getMonth() === monthNum - 1 && date.getFullYear() === yearNum;
  };

  // Función para convertir DD-MM-YYYY a Date
  const parseDDMMYYYY = useCallback((dateString: string): Date | null => {
    if (!isValidDateFormat(dateString)) return null;
    const [day, month, year] = dateString.split('-');
    return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
  }, []);

  // Función para formatear input mientras el usuario escribe
  const formatDateInput = (value: string): string => {
    // Remover caracteres no numéricos
    const numbers = value.replace(/\D/g, '');
    
    // Aplicar formato DD-MM-YYYY
    if (numbers.length <= 2) {
      return numbers;
    } else if (numbers.length <= 4) {
      return `${numbers.slice(0, 2)}-${numbers.slice(2)}`;
    } else {
      return `${numbers.slice(0, 2)}-${numbers.slice(2, 4)}-${numbers.slice(4, 8)}`;
    }
  };

  // Calcular fechas por defecto - solo en el cliente después de la hidratación
  const getDefaultDates = useCallback(() => {
    if (!isHydrated) {
      return {
        startDate: '',
        endDate: ''
      };
    }
    
    const now = new Date();
    const startDate = new Date(now.getTime() + 2 * 60 * 60 * 1000); // 2 horas en el futuro
    const endDate = new Date(startDate.getTime() + 7 * 24 * 60 * 60 * 1000); // 7 días después
    
    return {
      startDate: formatDateToDDMMYYYY(startDate),
      endDate: formatDateToDDMMYYYY(endDate)
    };
  }, [isHydrated]);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    link: '',
    startDate: '',
    endDate: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  
  // Hook de toast para notificaciones
  const { toasts, showError, showWarning, removeToast } = useToast();
  
  // Hooks del contrato y wallet
  const { address, isConnected } = useAccount();
  const { 
    createProposal, 
    isPending, 
    isConfirming, 
    isConfirmed, 
    error, 
    userVotingPower, 
    estimateCreateProposalGas,
    gasEstimate,
    gasCostEstimate,
    isEstimatingGas
  } = useDAOContract();
  
  // Obtener información del usuario de Farcaster
  const { context } = useMiniKit();
  
  // Generar nombre de usuario: Farcaster si está disponible, sino nombre de enano generado
  const getUsername = useCallback(() => {
    // No generar username hasta que esté hidratado
    if (!isHydrated) {
      return 'Cargando...';
    }
    
    if (context?.user?.displayName || context?.user?.username) {
      return context?.user?.displayName || context?.user?.username || 'Usuario';
    }
    // Si no está en Farcaster, usar nombre de enano generado basado en la dirección
    return address ? generateDwarfName(address) : 'Anónimo';
  }, [context?.user, address, isHydrated]);
  
  const username = getUsername();

  // Establecer fechas por defecto cuando esté hidratado
  useEffect(() => {
    if (isHydrated && (!formData.startDate || !formData.endDate)) {
      const defaultDates = getDefaultDates();
      setFormData(prev => ({
        ...prev,
        startDate: defaultDates.startDate,
        endDate: defaultDates.endDate
      }));
    }
  }, [isHydrated, getDefaultDates, formData.startDate, formData.endDate]);

  // Función para calcular el costo estimado de gas
  const calculateGasCost = useCallback(async () => {
    if (!isConnected || !address || !formData.description.trim() || !formData.link.trim()) {
      return;
    }

    try {
      // Convertir fechas DD-MM-YYYY a timestamps Unix para la estimación
      const startDate = parseDDMMYYYY(formData.startDate);
      const endDate = parseDDMMYYYY(formData.endDate);
      
      if (!startDate || !endDate) {
        console.warn('Invalid date format for gas estimation');
        return;
      }
      
      const startTime = BigInt(Math.floor(startDate.getTime() / 1000));
      const endTime = BigInt(Math.floor(endDate.getTime() / 1000));
      
      await estimateCreateProposalGas(
        username.trim(),
        formData.description.trim(),
        formData.link.trim(),
        startTime,
        endTime
      );
    } catch (err) {
      console.warn('Error calculating gas cost:', err);
    }
  }, [isConnected, address, formData, username, estimateCreateProposalGas, parseDDMMYYYY]);

  // Redirigir automáticamente cuando la transacción se confirme
  useEffect(() => {
    if (isConfirmed) {
      const timer = setTimeout(() => {
        router.push('/voting');
      }, 2000); // Esperar 2 segundos para mostrar el mensaje de éxito
      
      return () => clearTimeout(timer);
    }
  }, [isConfirmed, router]);

  // Calcular gas cuando cambien los campos relevantes
  useEffect(() => {
    const timer = setTimeout(() => {
      calculateGasCost();
    }, 500); // Debounce de 500ms

    return () => clearTimeout(timer);
  }, [calculateGasCost]);

  const handleTabChange = useCallback((tabId: string) => {
    setActiveTab(tabId);
    if (tabId === 'nft') {
      router.push('/nfts');
    } else if (tabId === 'mint') {
      router.push('/mint');
    } else if (tabId === 'home') {
      router.push('/');
    } else if (tabId === 'democracy') {
      router.push('/democracy');
    } else if (tabId === 'voting') {
      router.push('/voting');
    }
  }, [router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => {
      const newData = {
        ...prev,
        [name]: value
      };
      
      // Validar fechas en tiempo real
      if (name === 'startDate' && value && newData.endDate) {
        const startDate = parseDDMMYYYY(value);
        const endDate = parseDDMMYYYY(newData.endDate);
        
        if (startDate && endDate) {
          const startTime = startDate.getTime();
          const endTime = endDate.getTime();
          
          // Si la fecha de fin es anterior o igual a la de inicio, ajustar automáticamente
          if (endTime <= startTime) {
            const newEndDate = new Date(startTime + 24 * 60 * 60 * 1000); // 1 día después
            newData.endDate = formatDateToDDMMYYYY(newEndDate);
          }
        }
      }
      
      return newData;
    });
  };

  const handleDateInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const formattedValue = formatDateInput(value);
    
    // Actualizar el valor formateado
    setFormData(prev => {
      const newData = {
        ...prev,
        [name]: formattedValue
      };
      
      // Validar fechas en tiempo real
      if (name === 'startDate' && formattedValue && newData.endDate) {
        const startDate = parseDDMMYYYY(formattedValue);
        const endDate = parseDDMMYYYY(newData.endDate);
        
        if (startDate && endDate) {
          const startTime = startDate.getTime();
          const endTime = endDate.getTime();
          
          // Si la fecha de fin es anterior o igual a la de inicio, ajustar automáticamente
          if (endTime <= startTime) {
            const newEndDate = new Date(startTime + 24 * 60 * 60 * 1000); // 1 día después
            newData.endDate = formatDateToDDMMYYYY(newEndDate);
          }
        }
      }
      
      return newData;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validar conexión de wallet
    if (!isConnected || !address) {
      showError('Wallet no conectado', 'Debes conectar tu wallet para crear una propuesta');
      return;
    }

    // Validar que tengamos un nombre de usuario (Farcaster o enano generado)
    if (!username || username === 'Anónimo') {
      showError('Usuario no identificado', 'No se pudo identificar al usuario para crear la propuesta');
      return;
    }

    // Validar campos requeridos
    if (!formData.title.trim() || !formData.description.trim() || !formData.link.trim() || !formData.startDate || !formData.endDate) {
      showWarning('Campos incompletos', 'Por favor completa todos los campos requeridos');
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Convertir fechas DD-MM-YYYY a timestamps Unix
      const startDate = parseDDMMYYYY(formData.startDate);
      const endDate = parseDDMMYYYY(formData.endDate);
      
      if (!startDate || !endDate) {
        showWarning('Formato de fecha inválido', 'Por favor ingresa las fechas en formato DD-MM-YYYY');
        setIsSubmitting(false);
        return;
      }
      
      const startTime = BigInt(Math.floor(startDate.getTime() / 1000));
      const endTime = BigInt(Math.floor(endDate.getTime() / 1000));
      const currentTime = BigInt(Math.floor(Date.now() / 1000));
      
      // Validar que la fecha de inicio sea en el futuro (al menos 1 hora)
      const minStartTime = currentTime + BigInt(3600); // 1 hora en el futuro
      if (startTime < minStartTime) {
        showWarning('Fecha inválida', 'La fecha de inicio debe ser al menos 1 hora en el futuro');
        setIsSubmitting(false);
        return;
      }
      
      // Validar que la fecha de fin sea posterior a la de inicio
      if (endTime <= startTime) {
        showWarning('Fecha inválida', 'La fecha de fin debe ser posterior a la fecha de inicio');
        setIsSubmitting(false);
        return;
      }

      // Validar que la duración de la votación sea razonable (mínimo 1 hora, máximo 30 días)
      const duration = endTime - startTime;
      const minDuration = BigInt(3600); // 1 hora
      const maxDuration = BigInt(30 * 24 * 3600); // 30 días
      
      if (duration < minDuration) {
        showWarning('Duración inválida', 'La duración de la votación debe ser de al menos 1 hora');
        setIsSubmitting(false);
        return;
      }
      
      if (duration > maxDuration) {
        showWarning('Duración inválida', 'La duración de la votación no puede exceder 30 días');
        setIsSubmitting(false);
        return;
      }

      // Validar que el usuario tenga suficientes NFTs (verificar con el hook)
      if (userVotingPower < BigInt(10)) {
        showError('NFTs insuficientes', `Necesitas al menos 10 NFTs para crear una propuesta. Actualmente tienes: ${userVotingPower.toString()}`);
        setIsSubmitting(false);
        return;
      }

      // Crear la propuesta usando el contrato
      await createProposal(
        username.trim(),
        formData.description.trim(),
        formData.link.trim(),
        startTime,
        endTime
      );
      
      // La redirección se manejará automáticamente cuando isConfirmed sea true
    } catch (err) {
      console.error('Error creating proposal:', err);
      
      // Manejar errores específicos del contrato
      let errorMessage = 'Error desconocido';
      
      if (err instanceof Error) {
        const errorMsg = err.message.toLowerCase();
        
        if (errorMsg.includes('necesitas al menos 10 nfts')) {
          errorMessage = 'Necesitas al menos 10 NFTs para crear una propuesta';
        } else if (errorMsg.includes('starttime debe ser en el futuro')) {
          errorMessage = 'La fecha de inicio debe ser en el futuro';
        } else if (errorMsg.includes('endtime debe ser mayor que starttime')) {
          errorMessage = 'La fecha de fin debe ser posterior a la fecha de inicio';
        } else if (errorMsg.includes('solo puedes crear una propuesta cada 24 horas')) {
          errorMessage = 'Solo puedes crear una propuesta cada 24 horas. Intenta más tarde.';
        } else if (errorMsg.includes('reverted')) {
          errorMessage = 'La transacción fue revertida. Verifica que tengas suficientes NFTs y que las fechas sean válidas.';
        } else {
          errorMessage = err.message;
        }
      }
      
      showError('Error al crear propuesta', errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };



  return (
    <div className="flex flex-col min-h-screen font-body text-foreground mini-app-theme bg-background">
      <div className="w-full max-w-md mx-auto relative flex flex-col min-h-screen">
        {/* App Header */}
        <NFTHeader 
          title="Crear Propuesta"
          subtitle="Nueva propuesta DAO"
        />
        
        {/* Main Content */}
        <main className="flex-1 px-4 py-6 relative pb-28">
          <div className="space-y-6">
            {/* Hero Section */}
            <div className="bg-amber-100/60 dark:bg-amber-800/30 rounded-lg p-6 border border-amber-200 dark:border-amber-700 text-center">
              <h1 className="text-2xl font-bold text-amber-800 dark:text-amber-200 font-display mb-2">
                📝 Nueva Propuesta
              </h1>
              <p className="text-amber-700 dark:text-amber-300 text-sm">
                Comparte tu idea con la comunidad
              </p>
            </div>

            {/* Requirements */}
            <div className="bg-gradient-to-br from-blue-50/80 to-indigo-50/80 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-xl p-4 border border-blue-200 dark:border-blue-700">
              <h3 className="text-sm font-bold text-blue-800 dark:text-blue-200 mb-2">
                ⚠️ Requisitos para Crear Propuestas
              </h3>
              <ul className="text-xs text-blue-700 dark:text-blue-300 space-y-1">
                <li className={`flex items-center ${(userVotingPower || BigInt(0)) >= BigInt(10) ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                  <Icon name={userVotingPower && userVotingPower >= BigInt(10) ? "check-circle" : "x-circle"} size="sm" className="mr-1" />
                  Mínimo 10 NFTs (tienes: {userVotingPower?.toString() || '0'})
                </li>
                <li className="flex items-center text-blue-600 dark:text-blue-400">
                  <Icon name="clock" size="sm" className="mr-1" />
                  Fecha de inicio debe ser al menos 1 día en el futuro
                </li>
                <li className="flex items-center text-blue-600 dark:text-blue-400">
                  <Icon name="timer" size="sm" className="mr-1" />
                  Solo 1 propuesta cada 24 horas
                </li>
              </ul>
            </div>

            {/* Gas Information */}
            {isConnected && (gasEstimate || isEstimatingGas) && (
              <div className="bg-gradient-to-br from-amber-50/80 to-orange-50/80 dark:from-amber-900/30 dark:to-orange-900/30 rounded-xl p-4 border border-amber-200 dark:border-amber-700">
                <h3 className="text-sm font-bold text-amber-800 dark:text-amber-200 mb-2">
                  ⛽ Información de Gas
                </h3>
                <div className="space-y-2">
                  {isEstimatingGas ? (
                    <div className="flex items-center text-amber-700 dark:text-amber-300">
                      <div className="w-4 h-4 border-2 border-amber-600 border-t-transparent rounded-full animate-spin mr-2"></div>
                      <span className="text-xs">Estimando gas...</span>
                    </div>
                  ) : gasEstimate ? (
                    <>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-amber-700 dark:text-amber-300">Gas estimado:</span>
                        <span className="text-xs font-mono text-amber-800 dark:text-amber-200">
                          {gasEstimate.toString()}
                        </span>
                      </div>
                      {gasCostEstimate && (
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-amber-700 dark:text-amber-300">Costo estimado:</span>
                          <span className="text-xs font-mono text-amber-800 dark:text-amber-200">
                            {gasCostEstimate}
                          </span>
                        </div>
                      )}
                    </>
                  ) : null}
                </div>
              </div>
            )}

            {/* Proposal Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-lg">
                <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                  Detalles de la Propuesta
                </h2>
                
                <div className="space-y-4">
                  {/* Username Display */}
                  <div className="bg-amber-50 dark:bg-amber-900/30 rounded-lg p-4 border border-amber-200 dark:border-amber-700">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Icon name="user" size="sm" className="text-amber-600 dark:text-amber-400 mr-2" />
                        <div>
                          <p className="text-sm font-medium text-amber-800 dark:text-amber-200">
                            Creando propuesta como:
                          </p>
                          <div className="text-lg font-bold text-amber-900 dark:text-amber-100">
                            {username === 'Cargando...' ? (
                              <span className="flex items-center">
                                <div className="w-4 h-4 border-2 border-amber-600 border-t-transparent rounded-full animate-spin mr-2"></div>
                                {username}
                              </span>
                            ) : (
                              username
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-amber-700 dark:text-amber-300">
                          Poder de voto:
                        </p>
                        <p className="text-sm font-bold text-amber-800 dark:text-amber-200">
                          {userVotingPower?.toString() || '0'} NFTs
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Title */}
                  <div>
                    <label htmlFor="title" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Título de la Propuesta *
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      placeholder="Ej: Reducir comisiones del marketplace"
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                      required
                    />
                  </div>

                  {/* Description */}
                  <div>
                    <label htmlFor="description" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Descripción Detallada *
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      placeholder="Explica tu propuesta en detalle. Incluye el problema que resuelve, la solución propuesta y los beneficios para la comunidad..."
                      rows={6}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 resize-none"
                      required
                    />
                  </div>

                  {/* Link */}
                  <div>
                    <label htmlFor="link" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Enlace *
                    </label>
                    <input
                      type="url"
                      id="link"
                      name="link"
                      value={formData.link}
                      onChange={handleInputChange}
                      placeholder="https://ejemplo.com"
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                      required
                    />
                  </div>

                  {/* Date Range */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="startDate" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Fecha de Inicio *
                      </label>
                      <input
                        type="text"
                        id="startDate"
                        name="startDate"
                        value={formData.startDate}
                        onChange={handleDateInputChange}
                        placeholder="DD-MM-YYYY"
                        maxLength={10}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 ${
                          formData.startDate && !isValidDateFormat(formData.startDate) 
                            ? 'border-red-500 dark:border-red-500' 
                            : 'border-gray-300 dark:border-gray-600'
                        }`}
                        required
                      />
                      {formData.startDate && !isValidDateFormat(formData.startDate) && (
                        <p className="text-xs text-red-500 mt-1">Formato inválido. Use DD-MM-YYYY</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="endDate" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Fecha de Fin *
                      </label>
                      <input
                        type="text"
                        id="endDate"
                        name="endDate"
                        value={formData.endDate}
                        onChange={handleDateInputChange}
                        placeholder="DD-MM-YYYY"
                        maxLength={10}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 ${
                          formData.endDate && !isValidDateFormat(formData.endDate) 
                            ? 'border-red-500 dark:border-red-500' 
                            : 'border-gray-300 dark:border-gray-600'
                        }`}
                        required
                      />
                      {formData.endDate && !isValidDateFormat(formData.endDate) && (
                        <p className="text-xs text-red-500 mt-1">Formato inválido. Use DD-MM-YYYY</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Success Message */}
              {isConfirmed && (
                <div className="bg-green-50 dark:bg-green-900/30 rounded-xl p-4 border border-green-200 dark:border-green-700">
                  <div className="flex items-center">
                    <Icon name="check-circle" size="sm" className="text-green-600 dark:text-green-400 mr-2" />
                    <p className="text-sm text-green-700 dark:text-green-300 font-medium">
                      ¡Propuesta creada exitosamente! Redirigiendo...
                    </p>
                  </div>
                </div>
              )}

              {/* Error Message */}
              {error && (
                <div className="bg-red-50 dark:bg-red-900/30 rounded-xl p-4 border border-red-200 dark:border-red-700">
                  <div className="flex items-center">
                    <Icon name="alert-circle" size="sm" className="text-red-600 dark:text-red-400 mr-2" />
                    <p className="text-sm text-red-700 dark:text-red-300 font-medium">
                      Error: {error}
                    </p>
                  </div>
                </div>
              )}


              {/* Guidelines */}
              <div className="bg-gradient-to-br from-amber-50/80 to-orange-50/80 dark:from-amber-900/30 dark:to-orange-900/30 rounded-xl p-4 border border-amber-200 dark:border-amber-700">
                <h3 className="text-sm font-bold text-amber-800 dark:text-amber-200 mb-2">
                  📋 Directrices para Propuestas
                </h3>
                <ul className="text-xs text-amber-700 dark:text-amber-300 space-y-1">
                  <li>• Sé claro y específico en tu propuesta</li>
                  <li>• Incluye argumentos sólidos y evidencia</li>
                  <li>• Considera el impacto en toda la comunidad</li>
                </ul>
              </div>

              {/* Submit Buttons */}
              <div className="flex space-x-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.push('/voting')}
                  className="flex-1 border-gray-300 text-gray-600 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-800"
                >
                  <Icon name="arrow-left" size="sm" className="mr-2" />
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting || isPending || isConfirming || !isHydrated || !isConnected || !username || username === 'Anónimo' || username === 'Cargando...' || !formData.title.trim() || !formData.description.trim() || !formData.link.trim() || !formData.startDate || !formData.endDate || (userVotingPower || BigInt(0)) < BigInt(10)}
                  className="flex-1 bg-amber-600 hover:bg-amber-700 disabled:bg-gray-400 text-white font-semibold"
                >
                  {isSubmitting || isPending ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      {isPending ? 'Enviando transacción...' : 'Enviando...'}
                    </>
                  ) : isConfirming ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Confirmando...
                    </>
                  ) : !isHydrated ? (
                    <>
                      <Icon name="user" size="sm" className="mr-2" />
                      Cargando...
                    </>
                  ) : !isConnected ? (
                    <>
                      <Icon name="wallet" size="sm" className="mr-2" />
                      Conectar Wallet
                    </>
                  ) : !username || username === 'Anónimo' || username === 'Cargando...' ? (
                    <>
                      <Icon name="user" size="sm" className="mr-2" />
                      {username === 'Cargando...' ? 'Cargando Usuario...' : 'Identificar Usuario'}
                    </>
                  ) : (userVotingPower || BigInt(0)) < BigInt(10) ? (
                    <>
                      <Icon name="x-circle" size="sm" className="mr-2" />
                      Necesitas 10+ NFTs
                    </>
                  ) : (
                    <>
                      <Icon name="check" size="sm" className="mr-2" />
                      Crear Propuesta
                    </>
                  )}
                </Button>
              </div>
            </form>
          </div>
        </main>

        {/* Bottom Navigation */}
        <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-md">
          <NFTBottomNav activeTab={activeTab} onTabChange={handleTabChange} />
        </div>
      </div>

      {/* Toast Notifications */}
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          id={toast.id}
          type={toast.type}
          title={toast.title}
          message={toast.message}
          duration={toast.duration}
          onClose={removeToast}
        />
      ))}
    </div>
  );
}
