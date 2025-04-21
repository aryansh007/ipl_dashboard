import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Match } from '@/types';
import { formatDate, formatTime, cn } from '@/lib/utils';

interface MatchCardProps {
  match: Match;
  isDetailed?: boolean;
}

const MatchCard = ({ match, isDetailed = false }: MatchCardProps) => {
  const {
    id,
    matchNumber,
    date,
    venue,
    homeTeam,
    awayTeam,
    status,
    homeTeamScore,
    awayTeamScore,
    result,
    matchType,
  } = match;

  const matchDate = new Date(date);
  const isToday = new Date().toDateString() === matchDate.toDateString();
  
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
    <Link href={`/match/${id}`}>
      <div className={cn(
        "bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow",
        isDetailed ? "p-6" : "p-4"
      )}>
        <div className="flex justify-between items-center mb-3">
          <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
            {getMatchTitle()}
          </span>
          <span 
            className={cn(
              "text-xs font-semibold px-2 py-1 rounded-full",
              status === 'live' 
                ? "bg-red-100 text-red-600 animate-pulse" 
                : status === 'completed' 
                  ? "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300" 
                  : "bg-green-100 text-green-600"
            )}
          >
            {status === 'live' ? 'LIVE' : status === 'completed' ? 'COMPLETED' : 'UPCOMING'}
          </span>
        </div>
        
        <div className="flex justify-between items-center mb-4">
          <TeamInfo 
            team={homeTeam} 
            score={homeTeamScore} 
            isDetailed={isDetailed} 
          />
          <span className="text-sm font-bold mx-2">vs</span>
          <TeamInfo 
            team={awayTeam} 
            score={awayTeamScore} 
            isDetailed={isDetailed} 
            isReversed 
          />
        </div>
        
        {result && (
          <div className="text-sm font-medium text-primary mb-2">{result}</div>
        )}
        
        <div className="mt-3 text-xs text-gray-500 dark:text-gray-400">
          <div className="flex items-center justify-between">
            <div>
              <p className="mb-1">{venue}</p>
              <p>{isToday ? 'Today' : formatDate(date)}, {formatTime(date)}</p>
            </div>
            
            {isDetailed && status === 'upcoming' && (
              <button className="bg-primary text-primary-foreground rounded px-3 py-1 text-xs font-medium">
                Set Reminder
              </button>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

interface TeamInfoProps {
  team: Match['homeTeam'];
  score?: Match['homeTeamScore'];
  isDetailed?: boolean;
  isReversed?: boolean;
}

const TeamInfo = ({ team, score, isDetailed = false, isReversed = false }: TeamInfoProps) => {
  const scoreDisplay = score ? `${score.runs}/${score.wickets} (${score.overs})` : undefined;
  
  return (
    <div className={cn(
      "flex items-center",
      isReversed ? "flex-row-reverse text-right" : "text-left"
    )}>
      <div className={cn(
        "relative w-10 h-10",
        isReversed ? "ml-3" : "mr-3"
      )}>
        <Image 
          src={team.logoUrl || `https://via.placeholder.com/40?text=${team.abbreviation}`}
          alt={team.name}
          fill
          className="object-contain"
        />
      </div>
      <div>
        <p className={cn(
          "font-bold",
          isDetailed ? "text-sm md:text-base" : "text-xs md:text-sm"
        )}>
          {isDetailed ? team.name : team.abbreviation}
        </p>
        {scoreDisplay && (
          <p className="text-xs md:text-sm">{scoreDisplay}</p>
        )}
      </div>
    </div>
  );
};

export default MatchCard;