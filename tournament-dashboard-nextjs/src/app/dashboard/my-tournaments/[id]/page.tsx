'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface Tournament {
  id: string;
  name: string;
  description: string | null;
  location: string;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  status: string;
  entryFee: number;
  maxParticipants: number | null;
  organizerId: string;
  createdAt: string;
  updatedAt: string;
}

interface Registration {
  id: string;
  tournamentId: string;
  userId: string;
  status: string;
  registeredAt: string;
  updatedAt: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

export default function TournamentManagePage() {
  const params = useParams();
  const tournamentId = params.id as string;
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [tournament, setTournament] = useState<Tournament | null>(null);
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (!tournamentId) return;
    
    const userStr = localStorage.getItem('currentUser');
    if (!userStr) {
      router.push('/login');
      return;
    }
    const user = JSON.parse(userStr);
    setCurrentUser(user);

    if (user.role !== 'ORGANIZER' && user.role !== 'ADMIN') {
      router.push('/dashboard');
      return;
    }

    fetchTournamentDetails(user.id);
  }, [router, tournamentId]);

  const fetchTournamentDetails = async (userId: string) => {
    try {
      const [tournamentRes, registrationsRes] = await Promise.all([
        fetch(`/api/tournaments/${tournamentId}`),
        fetch('/api/registrations')
      ]);

      if (!tournamentRes.ok) {
        console.error('Tournament API error:', tournamentRes.status);
        setLoading(false);
        return;
      }

      const tournamentData = await tournamentRes.json();
      const allRegistrations = await registrationsRes.json();

      console.log('Tournament data:', tournamentData);
      console.log('Tournament ID from params:', tournamentId);

      if (tournamentData.error || !tournamentData.id) {
        console.error('Tournament not found or has error');
        setLoading(false);
        return;
      }

      if (tournamentData.organizerId !== userId && currentUser?.role !== 'ADMIN') {
        router.push('/dashboard/my-tournaments');
        return;
      }

      setTournament(tournamentData);
      
      const tournamentRegistrations = allRegistrations.filter(
        (reg: Registration) => reg.tournamentId === tournamentId
      );
      console.log('Filtered registrations:', tournamentRegistrations);
      setRegistrations(tournamentRegistrations);
    } catch (error) {
      console.error('Error fetching tournament details:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateRegistrationStatus = async (registrationId: string, newStatus: string) => {
    setUpdating(registrationId);
    try {
      const response = await fetch(`/api/registrations/${registrationId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        setRegistrations(prev =>
          prev.map(reg =>
            reg.id === registrationId ? { ...reg, status: newStatus } : reg
          )
        );
      }
    } catch (error) {
      console.error('Error updating registration:', error);
    } finally {
      setUpdating(null);
    }
  };

  const updateTournamentStatus = async (newStatus: string) => {
    try {
      const response = await fetch(`/api/tournaments/${tournamentId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        const updated = await response.json();
        setTournament(updated);
      }
    } catch (error) {
      console.error('Error updating tournament status:', error);
    }
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
      case 'APPROVED':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case 'REJECTED':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
      case 'CANCELLED':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
    }
  };

  if (!currentUser || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  if (!tournament) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <p className="text-gray-600 dark:text-gray-400">Tournament not found</p>
          <Link href="/dashboard/my-tournaments" className="text-blue-600 dark:text-blue-400 hover:underline mt-4 inline-block">
            Back to My Tournaments
          </Link>
        </div>
      </div>
    );
  }

  const pendingCount = registrations.filter(r => r.status === 'PENDING').length;
  const approvedCount = registrations.filter(r => r.status === 'APPROVED').length;
  const rejectedCount = registrations.filter(r => r.status === 'REJECTED').length;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-4 mb-4">
            <Link href="/dashboard/my-tournaments" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </Link>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{tournament.name}</h1>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Tournament Management</p>
            </div>
          </div>

          {/* Tournament Status */}
          <div className="flex items-center gap-4 mt-4">
            <span className="text-sm text-gray-600 dark:text-gray-400">Tournament Status:</span>
            <select
              value={tournament.status}
              onChange={(e) => updateTournamentStatus(e.target.value)}
              className="px-3 py-1 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="UPCOMING">UPCOMING</option>
              <option value="ONGOING">ONGOING</option>
              <option value="COMPLETED">COMPLETED</option>
              <option value="CANCELLED">CANCELLED</option>
            </select>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Registrations</p>
            <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{registrations.length}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Pending</p>
            <p className="text-3xl font-bold text-yellow-600 dark:text-yellow-400 mt-2">{pendingCount}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Approved</p>
            <p className="text-3xl font-bold text-green-600 dark:text-green-400 mt-2">{approvedCount}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Rejected</p>
            <p className="text-3xl font-bold text-red-600 dark:text-red-400 mt-2">{rejectedCount}</p>
          </div>
        </div>

        {/* Tournament Details */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Tournament Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Location</p>
              <p className="text-gray-900 dark:text-white font-medium">{tournament.location}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Entry Fee</p>
              <p className="text-gray-900 dark:text-white font-medium">
                {tournament.entryFee > 0 ? `$${(tournament.entryFee / 100).toFixed(2)}` : 'Free'}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Start Date</p>
              <p className="text-gray-900 dark:text-white font-medium">
                {new Date(tournament.startDate).toLocaleDateString()} at {tournament.startTime}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">End Date</p>
              <p className="text-gray-900 dark:text-white font-medium">
                {new Date(tournament.endDate).toLocaleDateString()} at {tournament.endTime}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Max Participants</p>
              <p className="text-gray-900 dark:text-white font-medium">
                {tournament.maxParticipants || 'Unlimited'}
              </p>
            </div>
          </div>
          {tournament.description && (
            <div className="mt-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">Description</p>
              <p className="text-gray-900 dark:text-white">{tournament.description}</p>
            </div>
          )}
        </div>

        {/* Registrations List */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Registrations</h2>
          </div>

          {registrations.length === 0 ? (
            <div className="p-12 text-center">
              <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <p className="text-gray-500 dark:text-gray-400">No registrations yet</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-900">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Player
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Registered
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {registrations.map((registration) => (
                    <tr key={registration.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {registration.user.name}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {registration.user.email}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {new Date(registration.registeredAt).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeColor(registration.status)}`}>
                          {registration.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <div className="flex gap-2">
                          {registration.status !== 'APPROVED' && (
                            <button
                              onClick={() => updateRegistrationStatus(registration.id, 'APPROVED')}
                              disabled={updating === registration.id}
                              className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
                            >
                              Approve
                            </button>
                          )}
                          {registration.status !== 'REJECTED' && (
                            <button
                              onClick={() => updateRegistrationStatus(registration.id, 'REJECTED')}
                              disabled={updating === registration.id}
                              className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50"
                            >
                              Reject
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
