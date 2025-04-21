'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { LiveMatchDetails } from '@/types';
import { cn } from '@/lib/utils';

interface LiveMatchBannerProps {
  match: LiveMatchDetails;
}

const LiveMatchBanner = ({ match }: LiveMatchBannerProps) => {
  const {
    id,
    homeTeam,
    awayTeam,
    homeTeamScore,
    awayTeamScore,
    currentBatsmen,
    currentBowler,
    recentOvers,
    partnership,
    currentRunRate,
    requiredRunRate,
    lastWicket,
  } = match;

  return (
    <div className="bg-gradient-to-r from-[#FF4D4D] to-[#F9CB28] dark:from-[#D30000] dark:to-[#F9A826] rounded-lg overflow-hidden shadow-lg p-4 mb-6 text-white animate-pulse">
      <div className="flex justify-between items-center mb-2">
        <span className="bg-red-700 text-white text-xs font-bold px-2 py-1 rounded uppercase">
          Live
        </span>
        <Link 
          href={`/match/${id}`} 
          className="text-xs font-semibold underline"
        >
          View Full Scorecard
        </Link>
      </div>
      
      <div className="flex justify-between items-center mb-4">
        <TeamScoreCard 
          team={homeTeam} 
          score={homeTeamScore} 
        />
        <div className="text-center mx-2">
          <span className="text-lg font-bold">vs</span>
        </div>
        <TeamScoreCard 
          team={awayTeam} 
          score={awayTeamScore} 
          isReversed 
        />
      </div>
      
      <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 mt-2">
        <div className="flex justify-between mb-2">
          <div>
            <span className="text-xs font-semibold">CRR: {currentRunRate.toFixed(2)}</span>
            {requiredRunRate > 0 && (
              <span className="text-xs font-semibold ml-3">
                REQ: {requiredRunRate.toFixed(2)}
              </span>
            )}
          </div>
          <span className="text-xs font-semibold">
            Partnership: {partnership}
          </span>
        </div>
        
        <div className="flex flex-wrap justify-between text-xs">
          <div className="w-full md:w-auto mb-2 md:mb-0">
            <div className="font-semibold mb-1">Batsmen</div>
            {currentBatsmen.map((batsman) => (
              <div key={batsman.id} className="flex justify-between">
                <span>{batsman.name} {batsman.battingStats?.runs !== undefined && `(${batsman.battingStats.balls})`}</span>
                <span className="font-bold ml-2">{batsman.battingStats?.runs}</span>
              </div>
            ))}
          </div>
          
          <div className="w-full md:w-auto">
            <div className="font-semibold mb-1">Bowler</div>
            <div>
              {currentBowler.name} {currentBowler.bowlingStats && 
                `${currentBowler.bowlingStats.wickets}-${currentBowler.bowlingStats.runs} (${currentBowler.bowlingStats.overs})`
              }
            </div>
          </div>
        </div>
        
        <div className="mt-2">
          <div className="text-xs font-semibold mb-1">Recent</div>
          <div className="flex space-x-1">
            {recentOvers.map((ball, index) => (
              <span 
                key={index} 
                className={cn(
                  "w-6 h-6 flex items-center justify-center rounded-full text-xs font-bold",
                  ball === 'W' 
                    ? "bg-red-600" 
                    : parseInt(ball) >= 4 
                      ? "bg-green-600" 
                      : "bg-white/30"
                )}
              >
                {ball}
              </span>
            ))}
          </div>
        </div>
        
        {lastWicket && (
          <div className="mt-2 text-xs">
            <span className="font-semibold">Last wicket: </span>
            <span>{lastWicket}</span>
          </div>
        )}
      </div>
    </div>
  );
};

interface TeamScoreCardProps {
  team: LiveMatchDetails['homeTeam'];
  score?: LiveMatchDetails['homeTeamScore'];
  isReversed?: boolean;
}

const TeamScoreCard = ({ team, score, isReversed = false }: TeamScoreCardProps) => {
  return (
    <div className={cn(
      "flex items-center",
      isReversed ? "flex-row-reverse text-right" : "text-left"
    )}>
      <div className={cn(
        "relative w-12 h-12 bg-white rounded-full p-1",
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
        <p className="font-bold text-sm md:text-base">{team.abbreviation}</p>
        {score && score.runs > 0 ? (
          <p className="text-sm md:text-lg font-bold">
            {score.runs}/{score.wickets} ({score.overs})
          </p>
        ) : (
          <p className="text-sm">Yet to bat</p>
        )}
      </div>
    </div>
  );
};

export default LiveMatchBanner;