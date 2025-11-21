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
    location: string;
  };
  user: {
    id: string;
    name: string;
    email: string;
  };
}

export default function RegistrationsPage() {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("ALL");

  useEffect(() => {
    fetchRegistrations();
  }, [filter]);

  const fetchRegistrations = async () => {
    try {
      const url = filter === "ALL" ? "/api/registrations" : `/api/registrations?status=${filter}`;
      const response = await fetch(url);
      const data = await response.json();
      setRegistrations(data);
    } catch (error) {
      console.error("Error fetching registrations:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, status: string) => {
    try {
      const response = await fetch(`/api/registrations/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });

      if (response.ok) {
        const updated = await response.json();
        setRegistrations(registrations.map(r => r.id === id ? updated : r));
      }
    } catch (error) {
      console.error("Error updating registration:", error);
    }
  };

  const deleteRegistration = async (id: string) => {
    if (!confirm("Are you sure you want to delete this registration?")) return;

    try {
      const response = await fetch(`/api/registrations/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setRegistrations(registrations.filter(r => r.id !== id));
      }
    } catch (error) {
      console.error("Error deleting registration:", error);
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
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Registrations</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="mb-6 flex gap-2">
          {["ALL", "PENDING", "APPROVED", "REJECTED", "CANCELLED"].map(status => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === status
                  ? "bg-orange-600 text-white"
                  : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600"></div>
            <p className="mt-2 text-gray-600 dark:text-gray-400">Loading registrations...</p>
          </div>
        )}

        {!loading && registrations.length === 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-12 text-center">
            <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No registrations found</h3>
            <p className="text-gray-600 dark:text-gray-400">Registrations will appear here when users sign up for tournaments.</p>
          </div>
        )}

        {!loading && registrations.length > 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-900">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Tournament
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Registered At
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {registrations.map(registration => (
                  <tr key={registration.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-col">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {registration.user.name}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {registration.user.email}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {registration.tournament.name}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          {registration.tournament.location}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {new Date(registration.registeredAt).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(registration.status)}`}>
                        {registration.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                      {registration.status === "PENDING" && (
                        <>
                          <button
                            onClick={() => updateStatus(registration.id, "APPROVED")}
                            className="text-green-600 dark:text-green-400 hover:underline"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => updateStatus(registration.id, "REJECTED")}
                            className="text-red-600 dark:text-red-400 hover:underline"
                          >
                            Reject
                          </button>
                        </>
                      )}
                      <Link
                        href={`/dashboard/registrations/${registration.id}`}
                        className="text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        View
                      </Link>
                      <button
                        onClick={() => deleteRegistration(registration.id)}
                        className="text-red-600 dark:text-red-400 hover:underline"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}
