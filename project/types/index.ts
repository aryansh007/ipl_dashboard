export interface Team {
  id: string;
  name: string;
  shortName: string;
  abbreviation: string;
  primaryColor: string;
  secondaryColor: string;
  logoUrl: string;
}

export interface Match {
  id: string;
  matchNumber: number;
  date: string;
  venue: string;
  homeTeam: Team;
  awayTeam: Team;
  result?: string;
  status: 'upcoming' | 'live' | 'completed';
  homeTeamScore?: Score;
  awayTeamScore?: Score;
  matchType?: 'league' | 'qualifier1' | 'eliminator' | 'qualifier2' | 'final';
}

export interface Score {
  runs: number;
  wickets: number;
  overs: number;
}

export interface LiveMatchDetails extends Match {
  currentBatsmen: Player[];
  currentBowler: Player;
  recentOvers: string[];
  partnership: string;
  requiredRunRate?: number;
  currentRunRate: number;
  lastWicket?: string;
}

export interface Player {
  id: string;
  name: string;
  team: Team;
  role?: string;
  battingStats?: {
    runs: number;
    balls: number;
    fours: number;
    sixes: number;
    strikeRate: number;
  };
  bowlingStats?: {
    overs: number;
    maidens: number;
    runs: number;
    wickets: number;
    economy: number;
  };
}

export interface PointsTableEntry {
  team: Team;
  matches: number;
  won: number;
  lost: number;
  noResult: number;
  points: number;
  netRunRate: number;
}

export interface ScheduleDay {
  date: string;
  matches: Match[];
}