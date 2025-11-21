import React from 'react';
import type { Tournament } from '../types/tournament';

interface TournamentListProps {
  tournaments: Tournament[];
  onSelectTournament: (tournament: Tournament) => void;
  selectedTournamentId: number | null;
}

const TournamentList: React.FC<TournamentListProps> = ({
  tournaments,
  onSelectTournament,
  selectedTournamentId
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming':
        return '#3498db';
      case 'ongoing':
        return '#2ecc71';
      case 'completed':
        return '#95a5a6';
      default:
        return '#000';
    }
  };

  return (
    <div className="tournament-list">
      <h2>Tournaments</h2>
      {tournaments.length === 0 ? (
        <p>No tournaments available</p>
      ) : (
        <div className="tournament-cards">
          {tournaments.map((tournament) => (
            <div
              key={tournament.id}
              className={`tournament-card ${selectedTournamentId === tournament.id ? 'selected' : ''}`}
              onClick={() => onSelectTournament(tournament)}
            >
              <h3>{tournament.name}</h3>
              <div className="tournament-info">
                <span className="status" style={{ color: getStatusColor(tournament.status) }}>
                  ● {tournament.status}
                </span>
                <p className="location">📍 {tournament.location}</p>
                <p className="dates">
                  📅 {new Date(tournament.startDate).toLocaleDateString()} - {new Date(tournament.endDate).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TournamentList;
