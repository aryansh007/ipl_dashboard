import React from 'react';
import { Metadata } from 'next';
import MatchDetails from '@/components/matches/MatchDetails';
import { getMatchById, getLiveMatch, getMatches } from '@/lib/api';
import { formatDate } from '@/lib/utils';

interface MatchPageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: MatchPageProps): Promise<Metadata> {
  const match = await getMatchById(params.id);

  if (!match) {
    return {
      title: 'Match Not Found',
      description: 'The requested match could not be found',
    };
  }

  return {
    title: `${match.homeTeam.abbreviation} vs ${match.awayTeam.abbreviation} | IPL 2023`,
    description: `${match.homeTeam.name} vs ${match.awayTeam.name} at ${match.venue} on ${formatDate(match.date)}`,
  };
}

// Generate static params for all matches
export async function generateStaticParams() {
  const matches = await getMatches();
  return matches.map((match) => ({
    id: match.id,
  }));
}

export default async function MatchPage({ params }: MatchPageProps) {
  // First check if this is a live match
  const liveMatch = await getLiveMatch();
  if (liveMatch && liveMatch.id === params.id) {
    return (
      <div className="container mx-auto px-4 py-6">
        <MatchDetails match={liveMatch} />
      </div>
    );
  }

  // If not a live match, get the regular match
  const match = await getMatchById(params.id);

  if (!match) {
    return (
      <div className="container mx-auto px-4 py-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center">
          <h1 className="text-2xl font-bold mb-4">Match Not Found</h1>
          <p>The match you're looking for could not be found.</p>
        </div>
      </div>
    );
  }

  // Convert to LiveMatchDetails format expected by MatchDetails component
  const matchDetails = {
    ...match,
    currentBatsmen: [],
    currentBowler: {
      id: 'default',
      name: '',
      team: match.awayTeam,
    },
    recentOvers: [],
    partnership: '',
    currentRunRate: 0,
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <MatchDetails match={matchDetails} />
    </div>
  );
}