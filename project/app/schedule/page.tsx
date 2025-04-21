import React from 'react';
import ScheduleList from '@/components/schedule/ScheduleList';
import { getMatches } from '@/lib/api';
import { groupMatchesByDate } from '@/lib/utils';

export const revalidate = 86400; // Revalidate every day

export default async function SchedulePage() {
  const matches = await getMatches();
  const scheduleDays = groupMatchesByDate(matches);

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">IPL 2023 Schedule</h1>
      
      <div className="md:flex md:justify-between md:items-center mb-6">
        <p className="text-gray-600 dark:text-gray-400 mb-4 md:mb-0">
          View the complete schedule of the IPL 2023 season
        </p>
        
        <div className="flex flex-wrap gap-2">
          <span className="flex items-center text-xs">
            <span className="w-3 h-3 rounded-full bg-green-100 dark:bg-green-900/70 mr-1"></span>
            Upcoming
          </span>
          <span className="flex items-center text-xs">
            <span className="w-3 h-3 rounded-full bg-red-100 dark:bg-red-900/70 mr-1"></span>
            Live
          </span>
          <span className="flex items-center text-xs">
            <span className="w-3 h-3 rounded-full bg-gray-100 dark:bg-gray-700 mr-1"></span>
            Completed
          </span>
        </div>
      </div>
      
      <ScheduleList scheduleDays={scheduleDays} />
    </div>
  );
}