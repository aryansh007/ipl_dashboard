'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LiveMatchDetails } from '@/types';
import { formatDate, formatTime } from '@/lib/utils';

interface MatchDetailsProps {
  match: LiveMatchDetails;
}

const MatchDetails = ({ match }: MatchDetailsProps) => {
  const router = useRouter();
  const {
    matchNumber,
    date,
    venue,
    homeTeam,
    awayTeam,
    homeTeamScore,
    awayTeamScore,
    currentBatsmen,
    currentBowler,
    status,
    matchType,
  } = match;

  const getMatchTitle = () => {
    switch (matchType) {
      case 'qualifier1':
        return 'Qualifier 1';
      case 'eliminator':
        return 'Eliminator';
      case 'qualifier2':
        return 'Qualifier 2';
      case 'final':
        return 'Final';
      default:
        return `Match ${matchNumber}`;
    }
  };

  return (
    <>
      <button
        onClick={() => router.back()}
        className="mb-6 flex items-center text-sm text-gray-600 hover:text-primary transition-colors"
      >
        <ArrowLeft size={16} className="mr-1" />
        Back
      </button>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <div className="bg-gradient-to-r from-gray-200 to-gray-100 dark:from-gray-700 dark:to-gray-800 p-4">
          <div className="flex justify-between items-center mb-2">
            <h1 className="text-lg font-bold">{getMatchTitle()}</h1>
            <span
              className={
                status === 'live'
                  ? "bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-200 px-2 py-1 rounded-full text-xs font-bold animate-pulse"
                  : status === 'completed'
                    ? "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300 px-2 py-1 rounded-full text-xs font-bold"
                    : "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-200 px-2 py-1 rounded-full text-xs font-bold"
              }
            >
              {status === 'live' ? 'LIVE' : status === 'completed' ? 'COMPLETED' : 'UPCOMING'}
            </span>
          </div>

          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            {formatDate(date)} | {formatTime(date)} | {venue}
          </p>

          <div className="flex justify-center items-center space-x-8 py-4">
            <TeamInfo
              team={homeTeam}
              score={homeTeamScore}
              showFullName
            />
            <div className="text-xl font-bold">vs</div>
            <TeamInfo
              team={awayTeam}
              score={awayTeamScore}
              showFullName
            />
          </div>
        </div>

        <Tabs defaultValue="scorecard">
          <TabsList className="w-full justify-start border-b border-gray-200 dark:border-gray-700 bg-transparent">
            <TabsTrigger value="scorecard">Scorecard</TabsTrigger>
            <TabsTrigger value="commentary">Commentary</TabsTrigger>
            <TabsTrigger value="info">Info</TabsTrigger>
          </TabsList>
          <TabsContent value="scorecard" className="p-4">
            {status === 'live' || status === 'completed' ? (
              <ScorecardTab match={match} />
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500 dark:text-gray-400">
                  Match hasn't started yet. Check back later for live scorecard.
                </p>
              </div>
            )}
          </TabsContent>
          <TabsContent value="commentary" className="p-4">
            {status === 'live' || status === 'completed' ? (
              <CommentaryTab match={match} />
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500 dark:text-gray-400">
                  Match hasn't started yet. Check back later for live commentary.
                </p>
              </div>
            )}
          </TabsContent>
          <TabsContent value="info" className="p-4">
            <InfoTab match={match} />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

interface TeamInfoProps {
  team: LiveMatchDetails['homeTeam'];
  score?: LiveMatchDetails['homeTeamScore'];
  showFullName?: boolean;
}

const TeamInfo = ({ team, score, showFullName = false }: TeamInfoProps) => {
  return (
    <div className="flex flex-col items-center">
      <div className="relative w-16 h-16">
        <Image
          src={team.logoUrl || `https://via.placeholder.com/64?text=${team.abbreviation}`}
          alt={team.name}
          fill
          className="object-contain"
        />
      </div>
      <p className="font-bold text-sm mt-2">{showFullName ? team.name : team.abbreviation}</p>
      {score && (
        <p className="text-lg font-bold mt-1">
          {score.runs}/{score.wickets} <span className="text-sm">({score.overs})</span>
        </p>
      )}
    </div>
  );
};

interface ScorecardTabProps {
  match: LiveMatchDetails;
}

const ScorecardTab = ({ match }: ScorecardTabProps) => {
  const [activeTeam, setActiveTeam] = useState<'home' | 'away'>('home');

  const batsmen = [
    {
      id: 'bat1',
      name: 'MS Dhoni',
      runs: 54,
      balls: 38,
      fours: 5,
      sixes: 2,
      strikeRate: 142.11,
      dismissal: 'c Rohit b Bumrah',
    },
    {
      id: 'bat2',
      name: 'Ruturaj Gaikwad',
      runs: 42,
      balls: 30,
      fours: 4,
      sixes: 1,
      strikeRate: 140.00,
      dismissal: 'c de Kock b Boult',
    },
    ...match.currentBatsmen.map(player => ({
      id: player.id,
      name: player.name,
      runs: player.battingStats?.runs || 0,
      balls: player.battingStats?.balls || 0,
      fours: player.battingStats?.fours || 0,
      sixes: player.battingStats?.sixes || 0,
      strikeRate: player.battingStats?.strikeRate || 0,
      dismissal: '',
    })),
  ];

  const bowlers = [
    {
      id: 'bowl1',
      name: 'Jasprit Bumrah',
      overs: 4,
      maidens: 0,
      runs: 29,
      wickets: 2,
      economy: 7.25,
    },
    {
      id: 'bowl2',
      name: 'Trent Boult',
      overs: 4,
      maidens: 0,
      runs: 32,
      wickets: 1,
      economy: 8.00,
    },
    {
      id: match.currentBowler.id,
      name: match.currentBowler.name,
      overs: match.currentBowler.bowlingStats?.overs || 0,
      maidens: match.currentBowler.bowlingStats?.maidens || 0,
      runs: match.currentBowler.bowlingStats?.runs || 0,
      wickets: match.currentBowler.bowlingStats?.wickets || 0,
      economy: match.currentBowler.bowlingStats?.economy || 0,
    },
  ];

  return (
    <div>
      <div className="flex mb-4">
        <button
          className={`px-4 py-2 text-sm font-medium rounded-l-md ${activeTeam === 'home'
            ? 'bg-primary text-primary-foreground'
            : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
          onClick={() => setActiveTeam('home')}
        >
          {match.homeTeam.name}
        </button>
        <button
          className={`px-4 py-2 text-sm font-medium rounded-r-md ${activeTeam === 'away'
            ? 'bg-primary text-primary-foreground'
            : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
          onClick={() => setActiveTeam('away')}
        >
          {match.awayTeam.name}
        </button>
      </div>

      <h3 className="font-bold text-lg mb-2">Batting</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead>
            <tr className="text-xs text-gray-500 dark:text-gray-400">
              <th className="px-4 py-2 text-left">Batter</th>
              <th className="px-4 py-2 text-center">R</th>
              <th className="px-4 py-2 text-center">B</th>
              <th className="px-4 py-2 text-center">4s</th>
              <th className="px-4 py-2 text-center">6s</th>
              <th className="px-4 py-2 text-center">SR</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
            {batsmen.map((batter) => (
              <tr key={batter.id} className="text-sm">
                <td className="px-4 py-3">
                  <div>
                    <div className="font-medium">{batter.name}</div>
                    {batter.dismissal && (
                      <div className="text-xs text-gray-500 dark:text-gray-400">{batter.dismissal}</div>
                    )}
                  </div>
                </td>
                <td className="px-4 py-3 text-center font-bold">{batter.runs}</td>
                <td className="px-4 py-3 text-center">{batter.balls}</td>
                <td className="px-4 py-3 text-center">{batter.fours}</td>
                <td className="px-4 py-3 text-center">{batter.sixes}</td>
                <td className="px-4 py-3 text-center">{batter.strikeRate.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3 className="font-bold text-lg mt-6 mb-2">Bowling</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead>
            <tr className="text-xs text-gray-500 dark:text-gray-400">
              <th className="px-4 py-2 text-left">Bowler</th>
              <th className="px-4 py-2 text-center">O</th>
              <th className="px-4 py-2 text-center">M</th>
              <th className="px-4 py-2 text-center">R</th>
              <th className="px-4 py-2 text-center">W</th>
              <th className="px-4 py-2 text-center">ECON</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
            {bowlers.map((bowler) => (
              <tr key={bowler.id} className="text-sm">
                <td className="px-4 py-3 font-medium">{bowler.name}</td>
                <td className="px-4 py-3 text-center">{bowler.overs}</td>
                <td className="px-4 py-3 text-center">{bowler.maidens}</td>
                <td className="px-4 py-3 text-center">{bowler.runs}</td>
                <td className="px-4 py-3 text-center font-bold">{bowler.wickets}</td>
                <td className="px-4 py-3 text-center">{bowler.economy.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

interface CommentaryTabProps {
  match: LiveMatchDetails;
}

const CommentaryTab = ({ match }: CommentaryTabProps) => {
  const commentary = [
    {
      id: 'ball1',
      over: '15.2',
      description: 'Bumrah to Dhoni, SIX! Massive hit over long-on!',
      runs: 6,
    },
    {
      id: 'ball2',
      over: '15.1',
      description: 'Bumrah to Dhoni, no run, defended back to the bowler.',
      runs: 0,
    },
    {
      id: 'ball3',
      over: '14.6',
      description: 'Boult to Jadeja, FOUR! Beautiful cover drive!',
      runs: 4,
    },
    {
      id: 'ball4',
      over: '14.5',
      description: 'Boult to Jadeja, single, pushed to mid-off.',
      runs: 1,
    },
    {
      id: 'ball5',
      over: '14.4',
      description: 'Boult to Dhoni, one run, worked to the leg side.',
      runs: 1,
    },
  ];

  return (
    <div>
      <div className="border border-gray-200 dark:border-gray-700 rounded-md overflow-hidden mb-4">
        <div className="bg-gray-50 dark:bg-gray-800 px-4 py-2 flex justify-between">
          <span className="font-medium">Recent</span>
          <div className="flex space-x-1">
            {match.recentOvers.map((ball, index) => (
              <span
                key={index}
                className={`
                  w-6 h-6 flex items-center justify-center rounded-full text-xs font-bold
                  ${ball === 'W'
                    ? "bg-red-600 text-white"
                    : parseInt(ball) >= 4
                      ? "bg-green-600 text-white"
                      : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"}
                `}
              >
                {ball}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {commentary.map((item) => (
          <div
            key={item.id}
            className="border-l-4 border-gray-300 dark:border-gray-600 pl-3 pb-3"
          >
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-full">
                {item.over}
              </span>
              <span
                className={`
                  text-xs font-bold px-2 py-1 rounded-full
                  ${item.runs === 4 || item.runs === 6
                    ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                    : item.runs === 0
                      ? "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100"
                      : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100"}
                `}
              >
                {item.runs === 0 ? 'DOT' : item.runs}
              </span>
            </div>
            <p className="text-sm">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

interface InfoTabProps {
  match: LiveMatchDetails;
}

const InfoTab = ({ match }: InfoTabProps) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-bold text-lg mb-3">Match Details</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between py-2 border-b border-gray-100 dark:border-gray-800">
            <span className="text-gray-600 dark:text-gray-400">Series</span>
            <span className="font-medium">Indian Premier League 2023</span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-100 dark:border-gray-800">
            <span className="text-gray-600 dark:text-gray-400">Match</span>
            <span className="font-medium">{match.homeTeam.name} vs {match.awayTeam.name}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-100 dark:border-gray-800">
            <span className="text-gray-600 dark:text-gray-400">Date</span>
            <span className="font-medium">{formatDate(match.date)}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-100 dark:border-gray-800">
            <span className="text-gray-600 dark:text-gray-400">Time</span>
            <span className="font-medium">{formatTime(match.date)} IST</span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-100 dark:border-gray-800">
            <span className="text-gray-600 dark:text-gray-400">Venue</span>
            <span className="font-medium">{match.venue}</span>
          </div>
          <div className="flex justify-between py-2">
            <span className="text-gray-600 dark:text-gray-400">Toss</span>
            <span className="font-medium">{match.homeTeam.name} won the toss and chose to bat</span>
          </div>
        </div>
      </div>

      <div>
        <h3 className="font-bold text-lg mb-3">Playing XIs</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium mb-2 flex items-center">
              <div className="relative w-6 h-6 mr-2">
                <Image
                  src={match.homeTeam.logoUrl || `https://via.placeholder.com/24?text=${match.homeTeam.abbreviation}`}
                  alt={match.homeTeam.name}
                  fill
                  className="object-contain"
                />
              </div>
              {match.homeTeam.name}
            </h4>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>MS Dhoni (c & wk)</li>
              <li>Ruturaj Gaikwad</li>
              <li>Devon Conway</li>
              <li>Moeen Ali</li>
              <li>Ravindra Jadeja</li>
              <li>Shivam Dube</li>
              <li>Mitchell Santner</li>
              <li>Deepak Chahar</li>
              <li>Tushar Deshpande</li>
              <li>Maheesh Theekshana</li>
              <li>Matheesha Pathirana</li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium mb-2 flex items-center">
              <div className="relative w-6 h-6 mr-2">
                <Image
                  src={match.awayTeam.logoUrl || `https://via.placeholder.com/24?text=${match.awayTeam.abbreviation}`}
                  alt={match.awayTeam.name}
                  fill
                  className="object-contain"
                />
              </div>
              {match.awayTeam.name}
            </h4>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>Rohit Sharma (c)</li>
              <li>Quinton de Kock (wk)</li>
              <li>Suryakumar Yadav</li>
              <li>Ishan Kishan</li>
              <li>Tilak Varma</li>
              <li>Tim David</li>
              <li>Hardik Pandya</li>
              <li>Jasprit Bumrah</li>
              <li>Trent Boult</li>
              <li>Piyush Chawla</li>
              <li>Arshad Khan</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchDetails;