import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Team, Match, PointsTableEntry, ScheduleDay } from '@/types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export function formatTime(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
}

export function generateDummyTeams(): Team[] {
  return [
    {
      id: 'csk',
      name: 'Chennai Super Kings',
      shortName: 'Chennai',
      abbreviation: 'CSK',
      primaryColor: '#FFFF00',
      secondaryColor: '#0081E9',
      logoUrl: 'https://scores.iplt20.com/ipl/teamlogos/CSK.png'
    },
    {
      id: 'mi',
      name: 'Mumbai Indians',
      shortName: 'Mumbai',
      abbreviation: 'MI',
      primaryColor: '#004BA0',
      secondaryColor: '#D1AB3E',
      logoUrl: 'https://scores.iplt20.com/ipl/teamlogos/MI.png'
    },
    {
      id: 'rcb',
      name: 'Royal Challengers Bangalore',
      shortName: 'Bangalore',
      abbreviation: 'RCB',
      primaryColor: '#EC1C24',
      secondaryColor: '#000000',
      logoUrl: 'https://scores.iplt20.com/ipl/teamlogos/RCB.png'
    },
    {
      id: 'kkr',
      name: 'Kolkata Knight Riders',
      shortName: 'Kolkata',
      abbreviation: 'KKR',
      primaryColor: '#3A225D',
      secondaryColor: '#B3A123',
      logoUrl: 'https://scores.iplt20.com/ipl/teamlogos/KKR.png'
    },
    {
      id: 'dc',
      name: 'Delhi Capitals',
      shortName: 'Delhi',
      abbreviation: 'DC',
      primaryColor: '#0078BC',
      secondaryColor: '#EF1B23',
      logoUrl: 'https://scores.iplt20.com/ipl/teamlogos/DC.png',
    },
    {
      id: 'srh',
      name: 'Sunrisers Hyderabad',
      shortName: 'Hyderabad',
      abbreviation: 'SRH',
      primaryColor: '#FF822A',
      secondaryColor: '#000000',
      logoUrl: 'https://scores.iplt20.com/ipl/teamlogos/SRH.png'
    },
    {
      id: 'pbks',
      name: 'Punjab Kings',
      shortName: 'Punjab',
      abbreviation: 'PBKS',
      primaryColor: '#D71920',
      secondaryColor: '#DCDDDF',
      logoUrl: 'https://scores.iplt20.com/ipl/teamlogos/PBKS.png'
    },
    {
      id: 'rr',
      name: 'Rajasthan Royals',
      shortName: 'Rajasthan',
      abbreviation: 'RR',
      primaryColor: '#254AA5',
      secondaryColor: '#FF1744',
      logoUrl: 'https://scores.iplt20.com/ipl/teamlogos/RR.png'
    },
    {
      id: 'gt',
      name: 'Gujarat Titans',
      shortName: 'Gujarat',
      abbreviation: 'GT',
      primaryColor: '#1C1C1C',
      secondaryColor: '#0B4973',
      logoUrl: 'https://scores.iplt20.com/ipl/teamlogos/GT.png'
    },
    {
      id: 'lsg',
      name: 'Lucknow Super Giants',
      shortName: 'Lucknow',
      abbreviation: 'LSG',
      primaryColor: '#A72056',
      secondaryColor: '#FFDB00',
      logoUrl: 'https://scores.iplt20.com/ipl/teamlogos/LSG.png'
    },
  ];
}

export function generateDummyMatches(teams: Team[]): Match[] {
  const venues = [
    'M.A. Chidambaram Stadium, Chennai',
    'Wankhede Stadium, Mumbai',
    'Eden Gardens, Kolkata',
    'Arun Jaitley Stadium, Delhi',
    'M. Chinnaswamy Stadium, Bangalore',
    'Rajiv Gandhi International Stadium, Hyderabad',
    'Punjab Cricket Association Stadium, Mohali',
    'Sawai Mansingh Stadium, Jaipur',
    'Narendra Modi Stadium, Ahmedabad',
    'Bharat Ratna Shri Atal Bihari Vajpayee Ekana Cricket Stadium, Lucknow',
  ];

  const matches: Match[] = [];
  let matchId = 1;

  // Generate group stage matches (14 matches per team)
  // Group A: Teams 0-4, Group B: Teams 5-9
  const groupA = teams.slice(0, 5);
  const groupB = teams.slice(5, 10);

  // Each team plays 2 matches with each team in their group
  for (let i = 0; i < groupA.length; i++) {
    for (let j = i + 1; j < groupA.length; j++) {
      // First match
      const match1Date = new Date(2023, 2, 20 + matchId);
      matches.push({
        id: `match-${matchId}`,
        matchNumber: matchId,
        date: match1Date.toISOString(),
        venue: venues[Math.floor(Math.random() * venues.length)],
        homeTeam: groupA[i],
        awayTeam: groupA[j],
        status: matchId <= 3 ? 'completed' : matchId === 4 ? 'live' : 'upcoming',
        matchType: 'league',
      });
      matchId++;

      // Second match
      const match2Date = new Date(2023, 3, 10 + matchId);
      matches.push({
        id: `match-${matchId}`,
        matchNumber: matchId,
        date: match2Date.toISOString(),
        venue: venues[Math.floor(Math.random() * venues.length)],
        homeTeam: groupA[j],
        awayTeam: groupA[i],
        status: 'upcoming',
        matchType: 'league',
      });
      matchId++;
    }
  }

  // Same for Group B
  for (let i = 0; i < groupB.length; i++) {
    for (let j = i + 1; j < groupB.length; j++) {
      // First match
      const match1Date = new Date(2023, 2, 20 + matchId);
      matches.push({
        id: `match-${matchId}`,
        matchNumber: matchId,
        date: match1Date.toISOString(),
        venue: venues[Math.floor(Math.random() * venues.length)],
        homeTeam: groupB[i],
        awayTeam: groupB[j],
        status: 'upcoming',
        matchType: 'league',
      });
      matchId++;

      // Second match
      const match2Date = new Date(2023, 3, 10 + matchId);
      matches.push({
        id: `match-${matchId}`,
        matchNumber: matchId,
        date: match2Date.toISOString(),
        venue: venues[Math.floor(Math.random() * venues.length)],
        homeTeam: groupB[j],
        awayTeam: groupB[i],
        status: 'upcoming',
        matchType: 'league',
      });
      matchId++;
    }
  }

  // Each team plays 1 match with each team from the other group
  // (except one team from the other group, which they play twice)
  for (let i = 0; i < groupA.length; i++) {
    for (let j = 0; j < groupB.length; j++) {
      if (j !== i) { // Skip one matchup
        const matchDate = new Date(2023, 3, 20 + matchId);
        matches.push({
          id: `match-${matchId}`,
          matchNumber: matchId,
          date: matchDate.toISOString(),
          venue: venues[Math.floor(Math.random() * venues.length)],
          homeTeam: groupA[i],
          awayTeam: groupB[j],
          status: 'upcoming',
          matchType: 'league',
        });
        matchId++;
      } else {
        // Play twice with the corresponding team
        const match1Date = new Date(2023, 3, 20 + matchId);
        matches.push({
          id: `match-${matchId}`,
          matchNumber: matchId,
          date: match1Date.toISOString(),
          venue: venues[Math.floor(Math.random() * venues.length)],
          homeTeam: groupA[i],
          awayTeam: groupB[j],
          status: 'upcoming',
          matchType: 'league',
        });
        matchId++;

        const match2Date = new Date(2023, 4, 5 + matchId);
        matches.push({
          id: `match-${matchId}`,
          matchNumber: matchId,
          date: match2Date.toISOString(),
          venue: venues[Math.floor(Math.random() * venues.length)],
          homeTeam: groupB[j],
          awayTeam: groupA[i],
          status: 'upcoming',
          matchType: 'league',
        });
        matchId++;
      }
    }
  }

  // Add playoff matches (based on dummy standings)
  const qualifier1Date = new Date(2023, 4, 20);
  matches.push({
    id: `match-${matchId}`,
    matchNumber: matchId,
    date: qualifier1Date.toISOString(),
    venue: venues[0],
    homeTeam: teams[0],
    awayTeam: teams[1],
    status: 'upcoming',
    matchType: 'qualifier1',
  });
  matchId++;

  const eliminatorDate = new Date(2023, 4, 21);
  matches.push({
    id: `match-${matchId}`,
    matchNumber: matchId,
    date: eliminatorDate.toISOString(),
    venue: venues[1],
    homeTeam: teams[2],
    awayTeam: teams[3],
    status: 'upcoming',
    matchType: 'eliminator',
  });
  matchId++;

  const qualifier2Date = new Date(2023, 4, 23);
  matches.push({
    id: `match-${matchId}`,
    matchNumber: matchId,
    date: qualifier2Date.toISOString(),
    venue: venues[2],
    homeTeam: teams[1], // Loser of Qualifier 1
    awayTeam: teams[2], // Winner of Eliminator
    status: 'upcoming',
    matchType: 'qualifier2',
  });
  matchId++;

  const finalDate = new Date(2023, 4, 26);
  matches.push({
    id: `match-${matchId}`,
    matchNumber: matchId,
    date: finalDate.toISOString(),
    venue: venues[4],
    homeTeam: teams[0], // Winner of Qualifier 1
    awayTeam: teams[1], // Winner of Qualifier 2
    status: 'upcoming',
    matchType: 'final',
  });

  // Add results for completed matches
  matches.filter(match => match.status === 'completed').forEach(match => {
    match.homeTeamScore = {
      runs: 150 + Math.floor(Math.random() * 100),
      wickets: Math.floor(Math.random() * 10),
      overs: 20,
    };
    match.awayTeamScore = {
      runs: 150 + Math.floor(Math.random() * 100),
      wickets: Math.floor(Math.random() * 10),
      overs: 20,
    };
    if (match.homeTeamScore.runs > match.awayTeamScore.runs) {
      match.result = `${match.homeTeam.name} won by ${match.homeTeamScore.runs - match.awayTeamScore.runs} runs`;
    } else {
      match.result = `${match.awayTeam.name} won by ${10 - match.awayTeamScore.wickets} wickets`;
    }
  });

  // Add live match data
  const liveMatch = matches.find(match => match.status === 'live');
  if (liveMatch) {
    liveMatch.homeTeamScore = {
      runs: 180,
      wickets: 3,
      overs: 15.2,
    };
    liveMatch.awayTeamScore = {
      runs: 0,
      wickets: 0,
      overs: 0,
    };
  }

  return matches;
}

export function generateDummyPointsTable(teams: Team[]): PointsTableEntry[] {
  return teams.map((team, index) => {
    const matches = 10 - Math.floor(index / 2);
    const won = matches - index > 0 ? matches - index : 1;
    const lost = matches - won - (index % 2);
    const noResult = index % 2;

    return {
      team,
      matches,
      won,
      lost,
      noResult,
      points: won * 2 + noResult,
      netRunRate: parseFloat((1 - index * 0.2).toFixed(3)),
    };
  }).sort((a, b) => b.points - a.points || b.netRunRate - a.netRunRate);
}

export function groupMatchesByDate(matches: Match[]): ScheduleDay[] {
  const matchesByDate: { [key: string]: Match[] } = {};

  matches.forEach(match => {
    const dateKey = match.date.split('T')[0];
    if (!matchesByDate[dateKey]) {
      matchesByDate[dateKey] = [];
    }
    matchesByDate[dateKey].push(match);
  });

  return Object.keys(matchesByDate)
    .sort()
    .map(date => ({
      date,
      matches: matchesByDate[date].sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateA.getTime() - dateB.getTime();
      }),
    }));
}

export function getCurrentLiveMatch(matches: Match[]) {
  return matches.find(match => match.status === 'live');
}

export function getUpcomingMatches(matches: Match[], limit = 3) {
  return matches
    .filter(match => match.status === 'upcoming')
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, limit);
}

export function getRecentMatches(matches: Match[], limit = 3) {
  return matches
    .filter(match => match.status === 'completed')
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit);
}