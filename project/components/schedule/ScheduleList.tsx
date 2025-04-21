import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Match, ScheduleDay } from '@/types';
import { formatDate, formatTime, cn } from '@/lib/utils';

interface ScheduleListProps {
  scheduleDays: ScheduleDay[];
}

const ScheduleList = ({ scheduleDays }: ScheduleListProps) => {
  const getMatchTypeLabel = (match: Match) => {
    switch (match.matchType) {
      case 'qualifier1':
        return 'Qualifier 1';
      case 'eliminator':
        return 'Eliminator';
      case 'qualifier2':
        return 'Qualifier 2';
      case 'final':
        return 'Final';
      default:
        return `Match ${match.matchNumber}`;
    }
  };

  return (
    <div className="space-y-6">
      {scheduleDays.map((day) => (
        <div key={day.date} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
          <div className="bg-gray-50 dark:bg-gray-850 px-4 py-3 border-b border-gray-200 dark:border-gray-700">
            <h3 className="font-medium">{formatDate(day.date)}</h3>
          </div>
          
          <div className="divide-y divide-gray-100 dark:divide-gray-800">
            {day.matches.map((match) => (
              <Link key={match.id} href={`/match/${match.id}`}>
                <div className="p-4 hover:bg-gray-50 dark:hover:bg-gray-800/80 transition-colors">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs text-gray-500 dark:text-gray-400">{getMatchTypeLabel(match)}</span>
                    <span 
                      className={cn(
                        "text-xs font-semibold px-2 py-1 rounded-full",
                        match.status === 'live' 
                          ? "bg-red-100 text-red-600 animate-pulse dark:bg-red-900 dark:text-red-300" 
                          : match.status === 'completed' 
                            ? "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400" 
                            : "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300"
                      )}
                    >
                      {match.status === 'live' ? 'LIVE' : match.status === 'completed' ? 'COMPLETED' : 'UPCOMING'}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <TeamInfo 
                      team={match.homeTeam} 
                      score={match.homeTeamScore} 
                    />
                    <span className="text-xs font-medium mx-2">vs</span>
                    <TeamInfo 
                      team={match.awayTeam} 
                      score={match.awayTeamScore} 
                      isReversed 
                    />
                  </div>
                  
                  {match.result && (
                    <div className="mt-2 text-xs font-medium text-primary">{match.result}</div>
                  )}
                  
                  <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                    <p>{match.venue}</p>
                    <p>{formatTime(match.date)} IST</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

interface TeamInfoProps {
  team: Match['homeTeam'];
  score?: Match['homeTeamScore'];
  isReversed?: boolean;
}

const TeamInfo = ({ team, score, isReversed = false }: TeamInfoProps) => {
  const scoreDisplay = score ? `${score.runs}/${score.wickets}` : undefined;
  
  return (
    <div className={cn(
      "flex items-center",
      isReversed ? "flex-row-reverse text-right" : "text-left"
    )}>
      <div className={cn(
        "relative w-8 h-8",
        isReversed ? "ml-2" : "mr-2"
      )}>
        <Image 
          src={team.logoUrl || `https://via.placeholder.com/32?text=${team.abbreviation}`}
          alt={team.name}
          fill
          className="object-contain"
        />
      </div>
      <div>
        <p className="text-sm font-medium">{team.abbreviation}</p>
        {scoreDisplay && (
          <p className="text-xs">{scoreDisplay}</p>
        )}
      </div>
    </div>
  );
};

export default ScheduleList;