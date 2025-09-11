'use client';

import { useState, useCallback, useEffect } from 'react';
import { NFTBottomNav } from '../components/NFTBottomNav';
import { NFTHeader } from '../components/NFTHeader';
import { useRouter } from 'next/navigation';
import { Button } from '../components/ui/Button';
import { Icon } from '../components/ui/Icon';
import { Toast, useToast } from '../components/ui/Toast';
import { useDAOContract } from '../../lib/hooks/useDAOContract';
import { useAccount } from 'wagmi';

// La interfaz Proposal ahora se importa desde el hook

export default function VotingPage() {
  const [activeTab, setActiveTab] = useState('voting');
  const [userVotes, setUserVotes] = useState<Record<string, 'for' | 'against' | null>>({});
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [votingInProgress, setVotingInProgress] = useState<Record<string, boolean>>({});
  const router = useRouter();
  const { isConnected } = useAccount();
  
  // Hook de toast para notificaciones
  const { toasts, showError, showWarning, removeToast } = useToast();
  
  // Hook del contrato DAO
  const {
    proposals,
    minProposalVotes,
    minTokensToApprove,
    minVotesToApprove,
    userVotingPower,
    loading,
    error,
    isPending,
    isConfirming,
    isConfirmed,
    vote,
    refreshProposals,
  } = useDAOContract();

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
    }
  }, [router]);

  const handleVote = useCallback(async (proposalId: string, voteType: 'for' | 'against') => {
    if (!isConnected) {
      showError('Wallet no conectado', 'Debes conectar tu wallet para votar');
      return;
    }

    if (userVotingPower === BigInt(0)) {
      showWarning('Sin poder de voto', 'No tienes poder de voto. Necesitas poseer NFTs de Enanos para votar.');
      return;
    }

    setVotingInProgress(prev => ({ ...prev, [proposalId]: true }));

    try {
      await vote(BigInt(proposalId), voteType === 'for');
      setUserVotes(prev => ({
        ...prev,
        [proposalId]: voteType
      }));
      // Refrescar propuestas después de votar
      setTimeout(() => {
        refreshProposals();
      }, 2000);
    } catch (err) {
      console.error('Error voting:', err);
      showError('Error al votar', 'Inténtalo de nuevo.');
    } finally {
      setVotingInProgress(prev => ({ ...prev, [proposalId]: false }));
    }
  }, [isConnected, userVotingPower, vote, refreshProposals, showError, showWarning]);

  // Refrescar propuestas cuando se confirme una transacción
  useEffect(() => {
    if (isConfirmed) {
      refreshProposals();
    }
  }, [isConfirmed, refreshProposals]);

  // Función para formatear fechas
  const formatDate = (timestamp: bigint) => {
    const date = new Date(Number(timestamp) * 1000);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 border-green-200 dark:border-green-700';
      case 'passed':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 border-blue-200 dark:border-blue-700';
      case 'rejected':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 border-red-200 dark:border-red-700';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 border-yellow-200 dark:border-yellow-700';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200 border-gray-200 dark:border-gray-700';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return 'En curso';
      case 'passed':
        return 'Aprobada';
      case 'rejected':
        return 'Rechazada';
      case 'pending':
        return 'Pendiente';
      case 'cancelled':
        return 'Cancelada';
      default:
        return status;
    }
  };

  // Filtrar propuestas
  const filteredProposals = proposals.filter(proposal => {
    const matchesStatus = filterStatus === 'all' || proposal.status === filterStatus;
    const matchesSearch = searchQuery === '' || 
      proposal.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proposal.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proposal.proposer.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="flex flex-col min-h-screen font-body text-foreground mini-app-theme bg-background">
      <div className="w-full max-w-md mx-auto relative flex flex-col min-h-screen">
        {/* App Header */}
        <NFTHeader 
          title="Votar Propuestas"
          subtitle="Democracia de Enanos"
        />
        
        {/* Main Content */}
        <main className="flex-1 px-4 py-6 relative pb-28">
          <div className="space-y-6">
            {/* Hero Section */}
            <div className="bg-amber-100/60 dark:bg-amber-800/30 rounded-lg p-6 border border-amber-200 dark:border-amber-700 text-center">
              <h1 className="text-2xl font-bold text-amber-800 dark:text-amber-200 font-display mb-2">
                🗳️ Votaciones DAO
              </h1>
              <p className="text-amber-700 dark:text-amber-300 text-sm">
                Participa en las decisiones de la comunidad
              </p>
              
              {/* User Voting Power */}
              {isConnected && (
                <div className="mt-4 bg-amber-50/80 dark:bg-amber-900/50 rounded-lg p-3 border border-amber-300 dark:border-amber-600">
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-6 h-6 bg-amber-200 dark:bg-amber-800 rounded-full flex items-center justify-center">
                      <span className="text-amber-700 dark:text-amber-300 text-xs">⚡</span>
                    </div>
                    <span className="text-amber-800 dark:text-amber-200 text-sm font-semibold">
                      Tu poder de voto: {Number(userVotingPower)} NFTs
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Voting Requirements Info Section */}
            <div className="grid grid-cols-2 gap-3">
              {/* Unique Voters Required Card */}
              <div className="bg-gradient-to-br from-blue-100/80 to-indigo-100/80 dark:from-blue-800/30 dark:to-indigo-800/30 backdrop-blur-md rounded-lg p-4 border-2 border-blue-300 dark:border-blue-700 shadow-lg">
                <div className="text-center space-y-2">
                  <div className="w-8 h-8 mx-auto bg-blue-200 dark:bg-blue-800 rounded-full flex items-center justify-center border border-blue-300 dark:border-blue-600">
                    <span className="text-blue-600 dark:text-blue-400 text-sm">👥</span>
                  </div>
                  <h3 className="text-sm font-bold text-blue-800 dark:text-blue-200">
                    Votantes Únicos
                  </h3>
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {Number(minVotesToApprove)}
                  </div>
                  <p className="text-blue-700 dark:text-blue-300 text-xs leading-tight">
                    Mínimo votantes únicos necesarios para aprobar propuestas
                  </p>
                </div>
              </div>

              {/* Total Voting Power Required Card */}
              <div className="bg-gradient-to-br from-purple-100/80 to-pink-100/80 dark:from-purple-800/30 dark:to-pink-800/30 backdrop-blur-md rounded-lg p-4 border-2 border-purple-300 dark:border-purple-700 shadow-lg">
                <div className="text-center space-y-2">
                  <div className="w-8 h-8 mx-auto bg-purple-200 dark:bg-purple-800 rounded-full flex items-center justify-center border border-purple-300 dark:border-purple-600">
                    <span className="text-purple-600 dark:text-purple-400 text-sm">⚡</span>
                  </div>
                  <h3 className="text-sm font-bold text-purple-800 dark:text-purple-200">
                    Poder Voto
                  </h3>
                  <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                    {Number(minTokensToApprove)}
                  </div>
                  <p className="text-purple-700 dark:text-purple-300 text-xs leading-tight">
                    Mínimo NFTs como poder de voto necesarios para aprobar propuestas
                  </p>
                </div>
              </div>
            </div>

            {/* Create Proposal Section */}
            <div className="bg-gradient-to-br from-amber-100/80 to-orange-100/80 dark:from-amber-800/30 dark:to-orange-800/30 backdrop-blur-md rounded-2xl p-6 border-2 border-amber-300 dark:border-amber-700 shadow-lg">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 mx-auto bg-amber-200 dark:bg-amber-800 rounded-full flex items-center justify-center border-2 border-amber-300 dark:border-amber-600">
                  <Icon name="plus" size="lg" className="text-amber-700 dark:text-amber-300" />
                </div>
                
                <div>
                  <h3 className="text-xl font-bold text-amber-800 dark:text-amber-200 mb-2">
                    Crear Nueva Propuesta
                  </h3>
                  <p className="text-amber-700 dark:text-amber-300 text-sm mb-4">
                    ¿Tienes una idea para mejorar la comunidad?
                  </p>
                </div>

                {/* NFT Requirement Info */}
                <div className="bg-gradient-to-br from-amber-50/80 to-orange-50/80 dark:from-amber-900/50 dark:to-orange-900/50 rounded-xl p-4 border-2 border-amber-300 dark:border-amber-600 shadow-lg">
                  <div className="flex items-center justify-center space-x-3 mb-3">
                    <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center border border-blue-300 dark:border-blue-600">
                      <span className="text-blue-600 dark:text-blue-400 text-sm">🔐</span>
                    </div>
                    <h4 className="font-semibold text-amber-800 dark:text-amber-200 text-sm">Requisito para Crear Propuestas</h4>
                  </div>
                  <p className="text-amber-700 dark:text-amber-300 text-xs text-center">
                    Necesitas poseer al menos <span className="font-bold text-amber-800 dark:text-amber-200">{Number(minProposalVotes)} NFTs de Enanos</span> para crear nuevas propuestas en la DAO.
                  </p>
                </div>

                <Button
                  variant="primary"
                  onClick={() => router.push('/voting/create')}
                  className="w-full bg-amber-600 hover:bg-amber-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 shadow-lg"
                >
                  <Icon name="plus" size="sm" className="mr-2" />
                  Crear Propuesta
                </Button>
              </div>
            </div>

            {/* Filter Section */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                🔍 Filtrar Propuestas
              </h3>
              
              {/* Search Bar */}
              <div className="mb-4">
                <div className="relative">
                  <Icon name="search" size="sm" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Buscar por título, descripción o proponente..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Status Filter */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Estado de la propuesta
                </label>
                <div className="relative">
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="w-full appearance-none bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 pr-8 text-gray-900 dark:text-white focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  >
                    {[
                      { value: 'all', label: 'Todas las propuestas', count: proposals.length },
                      { value: 'active', label: 'En curso', count: proposals.filter(p => p.status === 'active').length },
                      { value: 'passed', label: 'Aprobadas', count: proposals.filter(p => p.status === 'passed').length },
                      { value: 'rejected', label: 'Rechazadas', count: proposals.filter(p => p.status === 'rejected').length },
                      { value: 'pending', label: 'Pendientes', count: proposals.filter(p => p.status === 'pending').length },
                      { value: 'cancelled', label: 'Canceladas', count: proposals.filter(p => p.status === 'cancelled').length }
                    ].map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label} ({option.count})
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <Icon name="chevron-down" size="sm" className="text-gray-400" />
                  </div>
                </div>
              </div>

              {/* Results Count */}
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Mostrando {filteredProposals.length} de {proposals.length} propuestas
              </div>
            </div>

            {/* Loading State */}
            {loading && (
              <div className="text-center py-8">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-amber-600"></div>
                <p className="mt-2 text-gray-600 dark:text-gray-400">Cargando propuestas...</p>
              </div>
            )}

            {/* Error State */}
            {error && (
              <div className="bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700 rounded-lg p-4 text-center">
                <p className="text-red-800 dark:text-red-200 text-sm">
                  Error: {String(error)}
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={refreshProposals}
                  className="mt-2"
                >
                  Reintentar
                </Button>
              </div>
            )}

            {/* Proposals List */}
            {!loading && !error && (
              <div className="space-y-4">
                {filteredProposals.length === 0 ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 mx-auto bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
                      <Icon name="file-text" size="lg" className="text-gray-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      No hay propuestas
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      {filterStatus === 'all' 
                        ? 'Aún no se han creado propuestas en la DAO.'
                        : `No hay propuestas con estado "${filterStatus}".`
                      }
                    </p>
                  </div>
                ) : (
                  filteredProposals.map((proposal) => (
                    <div 
                      key={proposal.id.toString()}
                      className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-shadow duration-200"
                    >
                      {/* Header */}
                      <div className="mb-4">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                          {proposal.description}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                          Propuesto por @{proposal.username}
                        </p>
                    
                      {/* Status Badge and External Link */}
                      <div className="flex items-center gap-3 mb-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(proposal.status)}`}>
                          {getStatusText(proposal.status)}
                        </span>
                        {proposal.link && (
                          <a
                            href={proposal.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center text-xs text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors duration-200"
                          >
                            <Icon name="external-link" size="sm" className="mr-1" />
                            Ver detalles
                          </a>
                        )}
                      </div>
                  </div>

                      {/* Stats */}
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                            {Number(proposal.votesFor)}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">A favor</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                            {Number(proposal.votesAgainst)}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">En contra</div>
                        </div>
                      </div>

                      {/* Voting Stats */}
                      <div className="mb-4">
                        <div className="grid grid-cols-2 gap-4 mb-3">
                          <div className="text-center bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                            <div className="text-lg font-bold text-blue-600 dark:text-blue-400">
                              {Number(proposal.uniqueVoters)}
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">
                              votantes únicos
                            </div>
                          </div>
                          <div className="text-center bg-gray-50 dark:bg-gray-700 rounded-lg p-3">
                            <div className="text-lg font-bold text-purple-600 dark:text-purple-400">
                              {Number(proposal.totalVotingPower)}
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">
                              poder voto utilizado
                            </div>
                          </div>
                        </div>
                    
                        {/* Progress Bar */}
                        <div>
                          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
                            <span>Progreso</span>
                            <span>{Number(proposal.votesFor)} a favor de {Number(proposal.votesFor) + Number(proposal.votesAgainst)}</span>
                          </div>
                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                            <div 
                              className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full transition-all duration-300"
                              style={{ 
                                width: `${(Number(proposal.votesFor) + Number(proposal.votesAgainst)) > 0 ? (Number(proposal.votesFor) / (Number(proposal.votesFor) + Number(proposal.votesAgainst))) * 100 : 0}%` 
                              }}
                            ></div>
                          </div>
                        </div>
                      </div>

                      {/* Vote Buttons */}
                      {proposal.status === 'active' && !proposal.hasUserVoted && (
                        <div className="flex space-x-3">
                          <Button
                            variant={userVotes[proposal.id.toString()] === 'for' ? 'primary' : 'outline'}
                            size="sm"
                            onClick={() => handleVote(proposal.id.toString(), 'for')}
                            disabled={votingInProgress[proposal.id.toString()] || isPending || isConfirming}
                            className={`flex-1 ${
                              userVotes[proposal.id.toString()] === 'for' 
                                ? 'bg-green-600 hover:bg-green-700 text-white' 
                                : 'border-green-300 text-green-600 hover:bg-green-50 dark:border-green-600 dark:text-green-400 dark:hover:bg-green-900/20'
                            }`}
                          >
                            {votingInProgress[proposal.id.toString()] ? (
                              <div className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                            ) : (
                              <>
                                <Icon name="thumbs-up" size="sm" className="mr-2" />
                                A favor
                              </>
                            )}
                          </Button>
                          <Button
                            variant={userVotes[proposal.id.toString()] === 'against' ? 'primary' : 'outline'}
                            size="sm"
                            onClick={() => handleVote(proposal.id.toString(), 'against')}
                            disabled={votingInProgress[proposal.id.toString()] || isPending || isConfirming}
                            className={`flex-1 ${
                              userVotes[proposal.id.toString()] === 'against' 
                                ? 'bg-red-600 hover:bg-red-700 text-white' 
                                : 'border-red-300 text-red-600 hover:bg-red-50 dark:border-red-600 dark:text-red-400 dark:hover:bg-red-900/20'
                            }`}
                          >
                            {votingInProgress[proposal.id.toString()] ? (
                              <div className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                            ) : (
                              <>
                                <Icon name="thumbs-down" size="sm" className="mr-2" />
                                En contra
                              </>
                            )}
                          </Button>
                        </div>
                      )}

                      {/* Already Voted Message */}
                      {proposal.status === 'active' && proposal.hasUserVoted && (
                        <div className="bg-blue-100 dark:bg-blue-900/30 border border-blue-300 dark:border-blue-700 rounded-lg p-3 text-center">
                          <p className="text-blue-800 dark:text-blue-200 text-sm">
                            ✅ Ya has votado en esta propuesta
                          </p>
                        </div>
                      )}

                      {/* No Voting Power Message */}
                      {proposal.status === 'active' && !proposal.hasUserVoted && userVotingPower === BigInt(0) && (
                        <div className="bg-amber-100 dark:bg-amber-900/30 border border-amber-300 dark:border-amber-700 rounded-lg p-3 text-center">
                          <p className="text-amber-800 dark:text-amber-200 text-sm">
                            🔐 Necesitas poseer NFTs de Enanos para votar
                          </p>
                        </div>
                      )}

                      {/* Footer */}
                      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                        <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400">
                          <span>Propuesto por {proposal.proposer.slice(0, 6)}...{proposal.proposer.slice(-4)}</span>
                          <span>Termina: {formatDate(proposal.endTime)}</span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

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
