"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Tournament {
  id: string;
  name: string;
  description?: string;
  location: string;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  status: string;
  entryFee: number;
  maxParticipants?: number;
  organizer: {
    id: string;
    name: string;
    email: string;
  };
  _count?: {
    registrations: number;
    teams: number;
    matches: number;
  };
}

export default function TournamentsPage() {
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("ALL");

  useEffect(() => {
    fetchTournaments();
  }, [filter]);

  const fetchTournaments = async () => {
    try {
      const url = filter === "ALL" ? "/api/tournaments" : `/api/tournaments?status=${filter}`;
      const response = await fetch(url);
      const data = await response.json();
      setTournaments(data);
    } catch (error) {
      console.error("Error fetching tournaments:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteTournament = async (id: string) => {
    if (!confirm("Are you sure you want to delete this tournament?")) return;

    try {
      const response = await fetch(`/api/tournaments/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setTournaments(tournaments.filter(t => t.id !== id));
      }
    } catch (error) {
      console.error("Error deleting tournament:", error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "UPCOMING": return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      case "ONGOING": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "COMPLETED": return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
      case "CANCELLED": return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/dashboard" className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </Link>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Available Tournaments</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="mb-6 flex gap-2">
          {["ALL", "UPCOMING", "ONGOING", "COMPLETED", "CANCELLED"].map(status => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === status
                  ? "bg-blue-600 text-white"
                  : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="mt-2 text-gray-600 dark:text-gray-400">Loading tournaments...</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && tournaments.length === 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-12 text-center">
            <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No tournaments found</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">Get started by creating your first tournament.</p>
            <Link
              href="/dashboard/tournaments/new"
              className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Create Tournament
            </Link>
          </div>
        )}

        {/* Tournaments Grid */}
        {!loading && tournaments.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tournaments.map(tournament => (
              <div key={tournament.id} className="bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition-shadow overflow-hidden">
                {/* Card Header */}
                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white flex-1">
                      {tournament.name}
                    </h3>
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(tournament.status)}`}>
                      {tournament.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                    {tournament.description || "No description"}
                  </p>
                </div>

                {/* Card Body */}
                <div className="p-6 space-y-3">
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {tournament.location}
                  </div>

                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {new Date(tournament.startDate).toLocaleDateString()} - {new Date(tournament.endDate).toLocaleDateString()}
                  </div>

                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Entry Fee: ${tournament.entryFee}
                  </div>

                  {tournament._count && (
                    <div className="pt-3 border-t border-gray-200 dark:border-gray-700 flex justify-around text-center">
                      <div>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">{tournament._count.registrations}</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">Registrations</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">
                          {tournament.maxParticipants ? `${tournament.maxParticipants - tournament._count.registrations}` : '∞'}
                        </p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">Spots Left</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Card Footer */}
                <div className="px-6 py-4 bg-gray-50 dark:bg-gray-900 flex gap-2">
                  <Link
                    href={`/dashboard/tournaments/${tournament.id}`}
                    className="flex-1 px-3 py-2 bg-blue-600 text-white text-center rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                  >
                    View & Register
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
