import { Team, Match, LiveMatchDetails, PointsTableEntry } from '@/types';
import { 
  generateDummyTeams, 
  generateDummyMatches, 
  generateDummyPointsTable 
} from './utils';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000/api';

// Time to cache data (in seconds)
const CACHE_DURATION = {
  TEAMS: 24 * 60 * 60, // 24 hours
  MATCHES: 5 * 60, // 5 minutes
  LIVE_MATCH: 30, // 30 seconds
  POINTS_TABLE: 60 * 60, // 1 hour
};

// Create a simple in-memory cache
const cache: Record<string, { data: any; timestamp: number }> = {};

async function fetchWithCache<T>(
  url: string, 
  cacheDuration: number,
  fallbackFn: () => T
): Promise<T> {
  const now = Date.now();
  
  // Check cache first
  if (cache[url] && now - cache[url].timestamp < cacheDuration * 1000) {
    return cache[url].data as T;
  }
  
  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }
    
    const data = await response.json();
    
    // Update cache
    cache[url] = {
      data,
      timestamp: now,
    };
    
    return data;
  } catch (error) {
    console.error(`Error fetching from ${url}:`, error);
    
    // Use fallback data if API fails
    const fallbackData = fallbackFn();
    
    // Cache the fallback data too, but with a shorter duration
    cache[url] = {
      data: fallbackData,
      timestamp: now,
    };
    
    return fallbackData;
  }
}

export async function getTeams(): Promise<Team[]> {
  return fetchWithCache<Team[]>(
    `${API_BASE_URL}/teams`,
    CACHE_DURATION.TEAMS,
    generateDummyTeams
  );
}

export async function getMatches(): Promise<Match[]> {
  const teams = await getTeams();
  
  return fetchWithCache<Match[]>(
    `${API_BASE_URL}/matches`,
    CACHE_DURATION.MATCHES,
    () => generateDummyMatches(teams)
  );
}

export async function getMatchById(id: string): Promise<Match | null> {
  const matches = await getMatches();
  return matches.find(match => match.id === id) || null;
}

export async function getLiveMatch(): Promise<LiveMatchDetails | null> {
  const teams = await getTeams();
  
  return fetchWithCache<LiveMatchDetails | null>(
    `${API_BASE_URL}/live-match`,
    CACHE_DURATION.LIVE_MATCH,
    () => {
      const matches = generateDummyMatches(teams);
      const liveMatch = matches.find(match => match.status === 'live');
      
      if (!liveMatch) return null;
      
      return {
        ...liveMatch,
        currentBatsmen: [
          {
            id: 'player1',
            name: 'MS Dhoni',
            team: liveMatch.homeTeam,
            battingStats: {
              runs: 42,
              balls: 28,
              fours: 3,
              sixes: 2,
              strikeRate: 150.00,
            },
          },
          {
            id: 'player2',
            name: 'Ravindra Jadeja',
            team: liveMatch.homeTeam,
            battingStats: {
              runs: 22,
              balls: 16,
              fours: 2,
              sixes: 1,
              strikeRate: 137.50,
            },
          },
        ],
        currentBowler: {
          id: 'player3',
          name: 'Jasprit Bumrah',
          team: liveMatch.awayTeam,
          bowlingStats: {
            overs: 3.2,
            maidens: 0,
            runs: 28,
            wickets: 2,
            economy: 8.40,
          },
        },
        recentOvers: ['1', '4', '6', 'W', '2', '1'],
        partnership: '64(42)',
        currentRunRate: 9.63,
        requiredRunRate: 0,
        lastWicket: 'Ruturaj Gaikwad c Rohit b Bumrah 54(38)',
      };
    }
  );
}

export async function getPointsTable(): Promise<PointsTableEntry[]> {
  const teams = await getTeams();
  
  return fetchWithCache<PointsTableEntry[]>(
    `${API_BASE_URL}/points-table`,
    CACHE_DURATION.POINTS_TABLE,
    () => generateDummyPointsTable(teams)
  );
}