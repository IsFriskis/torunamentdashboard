import { useState, useEffect } from 'react'
import './App.css'
import { db } from './db/database'
import type { Tournament, Team, Match } from './types/tournament'
import TournamentList from './components/TournamentList'
import TournamentDetails from './components/TournamentDetails'

function App() {
  const [tournaments, setTournaments] = useState<Tournament[]>([])
  const [selectedTournament, setSelectedTournament] = useState<Tournament | null>(null)
  const [teams, setTeams] = useState<Team[]>([])
  const [matches, setMatches] = useState<Match[]>([])

  const handleSelectTournament = (tournament: Tournament) => {
    setSelectedTournament(tournament)
    setTeams(db.getTeamsByTournament(tournament.id))
    setMatches(db.getMatchesByTournament(tournament.id))
  }

  useEffect(() => {
    // Load all tournaments on mount
    const allTournaments = db.getAllTournaments()
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTournaments(allTournaments)
    
    // Select the first tournament by default
    if (allTournaments.length > 0) {
      handleSelectTournament(allTournaments[0])
    }
  }, [])

  return (
    <div className="app">
      <header className="app-header">
        <h1>🏆 Tournament Dashboard</h1>
        <p>Manage and track your tournaments</p>
      </header>
      
      <div className="dashboard-container">
        <aside className="sidebar">
          <TournamentList
            tournaments={tournaments}
            onSelectTournament={handleSelectTournament}
            selectedTournamentId={selectedTournament?.id || null}
          />
        </aside>
        
        <main className="main-content">
          {selectedTournament ? (
            <TournamentDetails
              tournament={selectedTournament}
              teams={teams}
              matches={matches}
            />
          ) : (
            <div className="empty-state">
              <h2>Select a tournament to view details</h2>
              <p>Choose a tournament from the list to see standings and matches</p>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

export default App
