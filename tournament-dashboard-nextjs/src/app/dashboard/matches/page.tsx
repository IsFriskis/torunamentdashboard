"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Match {
  id: string;
  matchDate: string;
  matchTime: string;
  status: string;
  homeScore?: number;
  awayScore?: number;
  tournament: {
    id: string;
    name: string;
  };
  homeTeam: {
    id: string;
    name: string;
  };
  awayTeam: {
    id: string;
    name: string;
  };
}

export default function MatchesPage() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("ALL");

  useEffect(() => {
    fetchMatches();
  }, [filter]);

  const fetchMatches = async () => {
    try {
      const url = filter === "ALL" ? "/api/matches" : `/api/matches?status=${filter}`;
      const response = await fetch(url);
      const data = await response.json();
      setMatches(data);
    } catch (error) {
      console.error("Error fetching matches:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteMatch = async (id: string) => {
    if (!confirm("Are you sure you want to delete this match?")) return;

    try {
      const response = await fetch(`/api/matches/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setMatches(matches.filter(m => m.id !== id));
      }
    } catch (error) {
      console.error("Error deleting match:", error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "SCHEDULED": return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      case "IN_PROGRESS": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "COMPLETED": return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
      case "CANCELLED": return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/dashboard" className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </Link>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Matches</h1>
            </div>
            <Link
              href="/dashboard/matches/new"
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Schedule Match
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="mb-6 flex gap-2">
          {["ALL", "SCHEDULED", "IN_PROGRESS", "COMPLETED", "CANCELLED"].map(status => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === status
                  ? "bg-purple-600 text-white"
                  : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              {status.replace("_", " ")}
            </button>
          ))}
        </div>

        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
            <p className="mt-2 text-gray-600 dark:text-gray-400">Loading matches...</p>
          </div>
        )}

        {!loading && matches.length === 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-12 text-center">
            <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No matches found</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">Schedule your first match to get started.</p>
            <Link
              href="/dashboard/matches/new"
              className="inline-block px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              Schedule Match
            </Link>
          </div>
        )}

        {!loading && matches.length > 0 && (
          <div className="space-y-4">
            {matches.map(match => (
              <div key={match.id} className="bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition-shadow p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {match.tournament.name}
                  </div>
                  <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(match.status)}`}>
                    {match.status.replace("_", " ")}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-4 items-center mb-4">
                  {/* Home Team */}
                  <div className="text-right">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                      {match.homeTeam.name}
                    </h3>
                    {match.status === "COMPLETED" && match.homeScore !== undefined && (
                      <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                        {match.homeScore}
                      </div>
                    )}
                  </div>

                  {/* VS */}
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-400">VS</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                      {new Date(match.matchDate).toLocaleDateString()}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-500">
                      {match.matchTime}
                    </div>
                  </div>

                  {/* Away Team */}
                  <div className="text-left">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                      {match.awayTeam.name}
                    </h3>
                    {match.status === "COMPLETED" && match.awayScore !== undefined && (
                      <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                        {match.awayScore}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex gap-2 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <Link
                    href={`/dashboard/matches/${match.id}`}
                    className="flex-1 px-3 py-2 bg-purple-600 text-white text-center rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium"
                  >
                    View Details
                  </Link>
                  <Link
                    href={`/dashboard/matches/${match.id}/edit`}
                    className="px-3 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors text-sm font-medium"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => deleteMatch(match.id)}
                    className="px-3 py-2 bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-300 rounded-lg hover:bg-red-200 dark:hover:bg-red-800 transition-colors text-sm font-medium"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
