"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Registration {
  id: string;
  status: string;
  registeredAt: string;
  tournament: {
    id: string;
    name: string;
    status: string;
    startDate: string;
    endDate: string;
    location: string;
    entryFee: number;
  };
}

export default function MyRegistrationsPage() {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMyRegistrations();
  }, []);

  const fetchMyRegistrations = async () => {
    try {
      // In a real app, you would filter by the current user's ID
      // For now, we'll fetch all registrations as a demo
      const response = await fetch("/api/registrations");
      const data = await response.json();
      setRegistrations(data);
    } catch (error) {
      console.error("Error fetching registrations:", error);
    } finally {
      setLoading(false);
    }
  };

  const cancelRegistration = async (id: string) => {
    if (!confirm("Are you sure you want to cancel this registration?")) return;

    try {
      const response = await fetch(`/api/registrations/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "CANCELLED" }),
      });

      if (response.ok) {
        const updated = await response.json();
        setRegistrations(registrations.map(r => r.id === id ? updated : r));
      }
    } catch (error) {
      console.error("Error cancelling registration:", error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "PENDING": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      case "APPROVED": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "REJECTED": return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      case "CANCELLED": return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getTournamentStatusColor = (status: string) => {
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
      <header className="bg-white dark:bg-gray-800 shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </Link>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">My Registrations</h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
            <p className="mt-2 text-gray-600 dark:text-gray-400">Loading your registrations...</p>
          </div>
        )}

        {!loading && registrations.length === 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-12 text-center">
            <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No registrations yet</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">You haven't registered for any tournaments yet.</p>
            <Link
              href="/dashboard/tournaments"
              className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Browse Tournaments
            </Link>
          </div>
        )}

        {!loading && registrations.length > 0 && (
          <div className="space-y-4">
            {registrations.map(registration => (
              <div key={registration.id} className="bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition-shadow overflow-hidden">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                          {registration.tournament.name}
                        </h3>
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getTournamentStatusColor(registration.tournament.status)}`}>
                          {registration.tournament.status}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-2">
                        <div className="flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          {registration.tournament.location}
                        </div>
                        <div className="flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          {new Date(registration.tournament.startDate).toLocaleDateString()} - {new Date(registration.tournament.endDate).toLocaleDateString()}
                        </div>
                        <div className="flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          ${registration.tournament.entryFee}
                        </div>
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-500">
                        Registered on {new Date(registration.registeredAt).toLocaleDateString()}
                      </div>
                    </div>
                    <span className={`px-3 py-1 text-sm font-semibold rounded-full ${getStatusColor(registration.status)}`}>
                      {registration.status}
                    </span>
                  </div>

                  <div className="flex gap-2 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <Link
                      href={`/dashboard/tournaments/${registration.tournament.id}`}
                      className="flex-1 px-4 py-2 bg-blue-600 text-white text-center rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                    >
                      View Tournament
                    </Link>
                    {(registration.status === "PENDING" || registration.status === "APPROVED") && (
                      <button
                        onClick={() => cancelRegistration(registration.id)}
                        className="px-4 py-2 bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-300 rounded-lg hover:bg-red-200 dark:hover:bg-red-800 transition-colors text-sm font-medium"
                      >
                        Cancel Registration
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
