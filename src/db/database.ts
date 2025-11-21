import type { Tournament, Team, Match } from '../types/tournament';

// Mock database using localStorage for browser compatibility
// In a real production app, this would connect to a backend API with SQLite/PostgreSQL

class TournamentDatabase {
  private TOURNAMENTS_KEY = 'tournaments';
  private TEAMS_KEY = 'teams';
  private MATCHES_KEY = 'matches';

  constructor() {
    this.initializeDatabase();
  }

  private initializeDatabase() {
    if (!localStorage.getItem(this.TOURNAMENTS_KEY)) {
      localStorage.setItem(this.TOURNAMENTS_KEY, JSON.stringify([]));
    }
    if (!localStorage.getItem(this.TEAMS_KEY)) {
      localStorage.setItem(this.TEAMS_KEY, JSON.stringify([]));
    }
    if (!localStorage.getItem(this.MATCHES_KEY)) {
      localStorage.setItem(this.MATCHES_KEY, JSON.stringify([]));
    }
    
    // Add sample data if database is empty
    if (this.getAllTournaments().length === 0) {
      this.seedDatabase();
    }
  }

  private seedDatabase() {
    // Sample tournament
    const tournament: Tournament = {
      id: 1,
      name: 'Summer Championship 2025',
      startDate: '2025-06-01',
      endDate: '2025-06-15',
      status: 'upcoming',
      location: 'Central Arena',
      description: 'Annual summer championship tournament featuring top teams'
    };
    this.addTournament(tournament);

    // Sample teams
    const teams: Team[] = [
      { id: 1, tournamentId: 1, name: 'Team Alpha', wins: 3, losses: 1, points: 9 },
      { id: 2, tournamentId: 1, name: 'Team Beta', wins: 2, losses: 2, points: 6 },
      { id: 3, tournamentId: 1, name: 'Team Gamma', wins: 1, losses: 3, points: 3 },
      { id: 4, tournamentId: 1, name: 'Team Delta', wins: 4, losses: 0, points: 12 }
    ];
    teams.forEach(team => this.addTeam(team));

    // Sample matches
    const matches: Match[] = [
      { id: 1, tournamentId: 1, team1Id: 1, team2Id: 2, team1Score: 3, team2Score: 2, matchDate: '2025-06-01', status: 'completed' },
      { id: 2, tournamentId: 1, team1Id: 3, team2Id: 4, team1Score: 1, team2Score: 4, matchDate: '2025-06-02', status: 'completed' },
      { id: 3, tournamentId: 1, team1Id: 1, team2Id: 4, team1Score: null, team2Score: null, matchDate: '2025-06-05', status: 'scheduled' }
    ];
    matches.forEach(match => this.addMatch(match));
  }

  // Tournament methods
  getAllTournaments(): Tournament[] {
    const data = localStorage.getItem(this.TOURNAMENTS_KEY);
    return data ? JSON.parse(data) : [];
  }

  getTournamentById(id: number): Tournament | null {
    const tournaments = this.getAllTournaments();
    return tournaments.find(t => t.id === id) || null;
  }

  addTournament(tournament: Tournament): void {
    const tournaments = this.getAllTournaments();
    const maxId = tournaments.reduce((max, t) => Math.max(max, t.id), 0);
    tournament.id = maxId + 1;
    tournaments.push(tournament);
    localStorage.setItem(this.TOURNAMENTS_KEY, JSON.stringify(tournaments));
  }

  updateTournament(tournament: Tournament): void {
    const tournaments = this.getAllTournaments();
    const index = tournaments.findIndex(t => t.id === tournament.id);
    if (index !== -1) {
      tournaments[index] = tournament;
      localStorage.setItem(this.TOURNAMENTS_KEY, JSON.stringify(tournaments));
    }
  }

  deleteTournament(id: number): void {
    const tournaments = this.getAllTournaments().filter(t => t.id !== id);
    localStorage.setItem(this.TOURNAMENTS_KEY, JSON.stringify(tournaments));
    
    // Delete associated teams and matches
    const teams = this.getAllTeams().filter(t => t.tournamentId !== id);
    localStorage.setItem(this.TEAMS_KEY, JSON.stringify(teams));
    
    const matches = this.getAllMatches().filter(m => m.tournamentId !== id);
    localStorage.setItem(this.MATCHES_KEY, JSON.stringify(matches));
  }

  // Team methods
  getAllTeams(): Team[] {
    const data = localStorage.getItem(this.TEAMS_KEY);
    return data ? JSON.parse(data) : [];
  }

  getTeamsByTournament(tournamentId: number): Team[] {
    return this.getAllTeams().filter(t => t.tournamentId === tournamentId);
  }

  addTeam(team: Team): void {
    const teams = this.getAllTeams();
    const maxId = teams.reduce((max, t) => Math.max(max, t.id), 0);
    team.id = maxId + 1;
    teams.push(team);
    localStorage.setItem(this.TEAMS_KEY, JSON.stringify(teams));
  }

  updateTeam(team: Team): void {
    const teams = this.getAllTeams();
    const index = teams.findIndex(t => t.id === team.id);
    if (index !== -1) {
      teams[index] = team;
      localStorage.setItem(this.TEAMS_KEY, JSON.stringify(teams));
    }
  }

  deleteTeam(id: number): void {
    const teams = this.getAllTeams().filter(t => t.id !== id);
    localStorage.setItem(this.TEAMS_KEY, JSON.stringify(teams));
  }

  // Match methods
  getAllMatches(): Match[] {
    const data = localStorage.getItem(this.MATCHES_KEY);
    return data ? JSON.parse(data) : [];
  }

  getMatchesByTournament(tournamentId: number): Match[] {
    return this.getAllMatches().filter(m => m.tournamentId === tournamentId);
  }

  addMatch(match: Match): void {
    const matches = this.getAllMatches();
    const maxId = matches.reduce((max, m) => Math.max(max, m.id), 0);
    match.id = maxId + 1;
    matches.push(match);
    localStorage.setItem(this.MATCHES_KEY, JSON.stringify(matches));
  }

  updateMatch(match: Match): void {
    const matches = this.getAllMatches();
    const index = matches.findIndex(m => m.id === match.id);
    if (index !== -1) {
      matches[index] = match;
      localStorage.setItem(this.MATCHES_KEY, JSON.stringify(matches));
    }
  }

  deleteMatch(id: number): void {
    const matches = this.getAllMatches().filter(m => m.id !== id);
    localStorage.setItem(this.MATCHES_KEY, JSON.stringify(matches));
  }
}

export const db = new TournamentDatabase();
