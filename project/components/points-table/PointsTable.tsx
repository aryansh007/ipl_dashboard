'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { PointsTableEntry } from '@/types';
import { cn } from '@/lib/utils';

interface PointsTableProps {
  pointsTable: PointsTableEntry[];
}

const PointsTable = ({ pointsTable }: PointsTableProps) => {
  const [sortField, setSortField] = useState<keyof PointsTableEntry>('points');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  
  const sortedTable = [...pointsTable].sort((a, b) => {
    if (sortField === 'team') {
      return sortDirection === 'asc'
        ? a.team.name.localeCompare(b.team.name)
        : b.team.name.localeCompare(a.team.name);
    }
    
    const aValue = a[sortField] as number;
    const bValue = b[sortField] as number;
    
    return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
  });
  
  const handleSort = (field: keyof PointsTableEntry) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };
  
  const renderSortIcon = (field: keyof PointsTableEntry) => {
    if (sortField !== field) return null;
    
    return (
      <span className="ml-1">
        {sortDirection === 'asc' ? '▲' : '▼'}
      </span>
    );
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Points Table</h2>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-900">
                <TableHeader 
                  label="#" 
                  className="w-10" 
                />
                <TableHeader 
                  label="Team" 
                  onClick={() => handleSort('team')} 
                  className="text-left"
                >
                  Team {renderSortIcon('team')}
                </TableHeader>
                <TableHeader 
                  label="P" 
                  onClick={() => handleSort('matches')} 
                  tooltip="Matches Played"
                >
                  P {renderSortIcon('matches')}
                </TableHeader>
                <TableHeader 
                  label="W" 
                  onClick={() => handleSort('won')} 
                  tooltip="Matches Won"
                >
                  W {renderSortIcon('won')}
                </TableHeader>
                <TableHeader 
                  label="L" 
                  onClick={() => handleSort('lost')} 
                  tooltip="Matches Lost"
                >
                  L {renderSortIcon('lost')}
                </TableHeader>
                <TableHeader 
                  label="NR" 
                  onClick={() => handleSort('noResult')} 
                  tooltip="No Result"
                >
                  NR {renderSortIcon('noResult')}
                </TableHeader>
                <TableHeader 
                  label="NRR" 
                  onClick={() => handleSort('netRunRate')} 
                  tooltip="Net Run Rate"
                  className="hidden sm:table-cell"
                >
                  NRR {renderSortIcon('netRunRate')}
                </TableHeader>
                <TableHeader 
                  label="PTS" 
                  onClick={() => handleSort('points')} 
                  tooltip="Points"
                >
                  PTS {renderSortIcon('points')}
                </TableHeader>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {sortedTable.map((entry, index) => (
                <tr 
                  key={entry.team.id}
                  className={cn(
                    "hover:bg-gray-50 dark:hover:bg-gray-800/80",
                    index < 4 && "bg-green-50 dark:bg-green-900/20"
                  )}
                >
                  <td className="py-3 px-4 text-sm text-center">{index + 1}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center">
                      <div className="relative w-8 h-8 mr-3">
                        <Image
                          src={entry.team.logoUrl || `https://via.placeholder.com/32?text=${entry.team.abbreviation}`}
                          alt={entry.team.name}
                          fill
                          className="object-contain"
                        />
                      </div>
                      <div>
                        <div className="font-medium hidden md:block">{entry.team.name}</div>
                        <div className="font-medium md:hidden">{entry.team.abbreviation}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-3 text-sm text-center">{entry.matches}</td>
                  <td className="py-3 px-3 text-sm text-center">{entry.won}</td>
                  <td className="py-3 px-3 text-sm text-center">{entry.lost}</td>
                  <td className="py-3 px-3 text-sm text-center">{entry.noResult}</td>
                  <td className="py-3 px-3 text-sm text-center hidden sm:table-cell">
                    {entry.netRunRate > 0 ? '+' : ''}{entry.netRunRate.toFixed(3)}
                  </td>
                  <td className="py-3 px-3 text-sm text-center font-bold">{entry.points}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-4 text-xs text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700">
          <p className="md:hidden">
            <strong>P:</strong> Matches Played | <strong>W:</strong> Won | <strong>L:</strong> Lost | 
            <strong>NR:</strong> No Result | <strong>PTS:</strong> Points
          </p>
          <p>Top 4 teams qualify for the playoffs</p>
        </div>
      </div>
    </div>
  );
};

interface TableHeaderProps {
  label: string;
  onClick?: () => void;
  tooltip?: string;
  className?: string;
  children?: React.ReactNode;
}

const TableHeader = ({ 
  label, 
  onClick, 
  tooltip, 
  className, 
  children 
}: TableHeaderProps) => {
  return (
    <th 
      className={cn(
        "py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400 text-center",
        onClick && "cursor-pointer hover:text-gray-700 dark:hover:text-gray-300",
        className
      )}
      onClick={onClick}
      title={tooltip}
      aria-label={tooltip || label}
    >
      {children || label}
    </th>
  );
};

export default PointsTable;