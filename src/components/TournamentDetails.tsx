import React from 'react';
import type { Tournament, Team, Match } from '../types/tournament';

interface TournamentDetailsProps {
  tournament: Tournament;
  teams: Team[];
  matches: Match[];
}

const TournamentDetails: React.FC<TournamentDetailsProps> = ({
  tournament,
  teams,
  matches
}) => {
  const getTeamName = (teamId: number) => {
    const team = teams.find(t => t.id === teamId);
    return team ? team.name : 'Unknown';
  };

  const sortedTeams = [...teams].sort((a, b) => b.points - a.points);

  return (
    <div className="tournament-details">
      <div className="tournament-header">
        <h2>{tournament.name}</h2>
        <p className="description">{tournament.description}</p>
        <div className="header-info">
          <span>📍 {tournament.location}</span>
          <span>📅 {new Date(tournament.startDate).toLocaleDateString()} - {new Date(tournament.endDate).toLocaleDateString()}</span>
          <span className={`status-badge status-${tournament.status}`}>{tournament.status}</span>
        </div>
      </div>

      <div className="standings-section">
        <h3>Standings</h3>
        <table className="standings-table">
          <thead>
            <tr>
              <th>Rank</th>
              <th>Team</th>
              <th>W</th>
              <th>L</th>
              <th>Points</th>
            </tr>
          </thead>
          <tbody>
            {sortedTeams.map((team, index) => (
              <tr key={team.id}>
                <td className="rank">{index + 1}</td>
                <td className="team-name">{team.name}</td>
                <td>{team.wins}</td>
                <td>{team.losses}</td>
                <td className="points">{team.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="matches-section">
        <h3>Matches</h3>
        <div className="matches-list">
          {matches.length === 0 ? (
            <p>No matches scheduled</p>
          ) : (
            matches.map((match) => (
              <div key={match.id} className={`match-card match-${match.status}`}>
                <div className="match-date">
                  {new Date(match.matchDate).toLocaleDateString()}
                </div>
                <div className="match-teams">
                  <div className="team">
                    <span className="team-name">{getTeamName(match.team1Id)}</span>
                    <span className="score">{match.team1Score ?? '-'}</span>
                  </div>
                  <div className="vs">vs</div>
                  <div className="team">
                    <span className="score">{match.team2Score ?? '-'}</span>
                    <span className="team-name">{getTeamName(match.team2Id)}</span>
                  </div>
                </div>
                <div className="match-status">{match.status}</div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default TournamentDetails;
