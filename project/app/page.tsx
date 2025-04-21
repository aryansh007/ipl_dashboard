'use client';

import { useEffect, useState } from 'react';
import MatchCard from '@/components/matches/MatchCard';
import LiveMatchBanner from '@/components/matches/LiveMatchBanner';
import { Match, LiveMatchDetails } from '@/types';
import { getLiveMatch, getMatches } from '@/lib/api';
import { getUpcomingMatches, getRecentMatches } from '@/lib/utils';

export default function Home() {
  const [liveMatch, setLiveMatch] = useState<LiveMatchDetails | null>(null);
  const [upcomingMatches, setUpcomingMatches] = useState<Match[]>([]);
  const [recentMatches, setRecentMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch live match data
        const liveMatchData = await getLiveMatch();
        setLiveMatch(liveMatchData);

        // Fetch upcoming and recent matches
        const matches = await getMatches();
        setUpcomingMatches(getUpcomingMatches(matches, 3));
        setRecentMatches(getRecentMatches(matches, 3));
      } catch (error) {
        console.error('Error fetching match data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();

    // Periodically refresh live match data
    const interval = setInterval(async () => {
      try {
        const liveMatchData = await getLiveMatch();
        setLiveMatch(liveMatchData);
      } catch (error) {
        console.error('Error refreshing live match data:', error);
      }
    }, 30000); // Refresh every 30 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">IPL 2023 Matches</h1>

      {loading ? (
        <div className="flex justify-center items-center h-48">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      ) : (
        <>
          {liveMatch ? (
            <>
              <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Live Match</h2>
                <LiveMatchBanner match={liveMatch} />
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Upcoming Matches</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {upcomingMatches.map((match) => (
                    <MatchCard key={match.id} match={match} />
                  ))}
                </div>
              </section>
            </>
          ) : (
            <>
              <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Recent Results</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {recentMatches.map((match) => (
                    <MatchCard key={match.id} match={match} />
                  ))}
                </div>
              </section>
              <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Upcoming Matches</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {upcomingMatches.map((match) => (
                    <MatchCard key={match.id} match={match} />
                  ))}
                </div>
              </section>
            </>
          )}


        </>
      )}
    </div>
  );
}