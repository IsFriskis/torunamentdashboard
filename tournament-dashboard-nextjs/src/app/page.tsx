import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Tournament Dashboard</h1>
            </div>
            <nav className="flex gap-4">
              <Link href="/dashboard" className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400">
                Dashboard
              </Link>
              <Link href="/tournaments" className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400">
                Tournaments
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Welcome to Tournament Management
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Organize, manage, and track your tournaments with ease
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 max-w-2xl mx-auto">
          <Link href="/dashboard/tournaments" className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 hover:shadow-xl transition-shadow">
            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-4 mx-auto">
              <svg className="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 text-center">Browse Tournaments</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 text-center">View available tournaments and register</p>
          </Link>

          <Link href="/dashboard/my-registrations" className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 hover:shadow-xl transition-shadow">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mb-4 mx-auto">
              <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 text-center">My Registrations</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 text-center">View your tournament registrations</p>
          </Link>
        </div>

        {/* Stats Overview */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">How It Works</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border-l-4 border-blue-500 pl-4">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">1. Browse Tournaments</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Explore available tournaments, view details like location, dates, and entry fees.</p>
            </div>
            <div className="border-l-4 border-green-500 pl-4">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">2. Register</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Sign up for tournaments that interest you with just a few clicks.</p>
            </div>
            <div className="border-l-4 border-purple-500 pl-4">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">3. Track Status</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Monitor your registration status and receive updates about your tournaments.</p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-20 border-t border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-center text-gray-600 dark:text-gray-400">
            © 2025 Tournament Dashboard. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
