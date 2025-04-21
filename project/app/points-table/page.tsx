import React from 'react';
import PointsTable from '@/components/points-table/PointsTable';
import { getPointsTable } from '@/lib/api';

export const revalidate = 3600; // Revalidate every hour

export default async function PointsTablePage() {
  const pointsTable = await getPointsTable();

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">IPL 2023 Points Table</h1>
      
      <PointsTable pointsTable={pointsTable} />
      
      <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
        <h2 className="text-lg font-bold mb-4">Qualification Scenarios</h2>
        <div className="text-sm space-y-2">
          <p>
            • The top 4 teams on the points table qualify for the playoffs.
          </p>
          <p>
            • Teams are ranked by points, and then by Net Run Rate (NRR) if points are equal.
          </p>
          <p>
            • The first and second placed teams play in Qualifier 1, with the winner advancing directly to the final.
          </p>
          <p>
            • The third and fourth placed teams play in the Eliminator.
          </p>
          <p>
            • The loser of Qualifier 1 and the winner of the Eliminator play in Qualifier 2.
          </p>
          <p>
            • The winner of Qualifier 2 advances to the final.
          </p>
        </div>
      </div>
    </div>
  );
}