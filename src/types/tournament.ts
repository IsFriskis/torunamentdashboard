export interface Tournament {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  status: 'upcoming' | 'ongoing' | 'completed';
  location: string;
  description: string;
}

export interface Team {
  id: number;
  tournamentId: number;
  name: string;
  wins: number;
  losses: number;
  points: number;
}

export interface Match {
  id: number;
  tournamentId: number;
  team1Id: number;
  team2Id: number;
  team1Score: number | null;
  team2Score: number | null;
  matchDate: string;
  status: 'scheduled' | 'in-progress' | 'completed';
}
