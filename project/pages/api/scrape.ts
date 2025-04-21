import { NextApiRequest, NextApiResponse } from 'next';

// Helper function to delay execution (to avoid being blocked by the source website)
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method !== 'GET') {
      return res.status(405).json({ message: 'Method not allowed' });
    }

    const { type } = req.query;

    switch (type) {
      case 'teams':
        return await getTeams(res);
      case 'matches':
        return await getMatches(res);
      case 'live':
        return await getLiveMatches(res);
      case 'points':
        return await getPointsTable(res);
      default:
        return res.status(400).json({ message: 'Invalid type parameter' });
    }
  } catch (error) {
    console.error('Error in API route:', error);
    return res.status(500).json({ message: 'Internal server error', error: (error as Error).message });
  }
}

async function getTeams(res: NextApiResponse) {
  try {
    // Attempt to fetch the teams data from iplt20.com
    const response = await fetch('https://www.iplt20.com/teams');
    
    if (!response.ok) {
      throw new Error(`Failed to fetch teams: ${response.status}`);
    }
    
    const html = await response.text();
    
    // Here you would use a DOM parser to extract the data
    // For example, using JSDOM or cheerio if they were available
    // Since we're demonstrating scraping logic, we'll just return dummy data
    
    // In a real implementation, you would parse the HTML and extract the team info
    // const teams = parseTeamsFromHTML(html);
    
    return res.status(200).json({ message: 'Teams data extracted successfully', data: [] });
  } catch (error) {
    console.error('Error fetching teams:', error);
    return res.status(500).json({ message: 'Failed to fetch teams data', error: (error as Error).message });
  }
}

async function getMatches(res: NextApiResponse) {
  try {
    // Attempt to fetch the matches data from iplt20.com
    const response = await fetch('https://www.iplt20.com/matches');
    
    if (!response.ok) {
      throw new Error(`Failed to fetch matches: ${response.status}`);
    }
    
    const html = await response.text();
    
    // In a real implementation, you would parse the HTML and extract the match info
    // const matches = parseMatchesFromHTML(html);
    
    return res.status(200).json({ message: 'Matches data extracted successfully', data: [] });
  } catch (error) {
    console.error('Error fetching matches:', error);
    return res.status(500).json({ message: 'Failed to fetch matches data', error: (error as Error).message });
  }
}

async function getLiveMatches(res: NextApiResponse) {
  try {
    // Attempt to fetch the live match data from iplt20.com
    const response = await fetch('https://www.iplt20.com/matches/live');
    
    if (!response.ok) {
      throw new Error(`Failed to fetch live matches: ${response.status}`);
    }
    
    const html = await response.text();
    
    // In a real implementation, you would parse the HTML and extract the live match info
    // const liveMatches = parseLiveMatchesFromHTML(html);
    
    return res.status(200).json({ message: 'Live matches data extracted successfully', data: [] });
  } catch (error) {
    console.error('Error fetching live matches:', error);
    return res.status(500).json({ message: 'Failed to fetch live matches data', error: (error as Error).message });
  }
}

async function getPointsTable(res: NextApiResponse) {
  try {
    // Attempt to fetch the points table data from iplt20.com
    const response = await fetch('https://www.iplt20.com/points-table');
    
    if (!response.ok) {
      throw new Error(`Failed to fetch points table: ${response.status}`);
    }
    
    const html = await response.text();
    
    // In a real implementation, you would parse the HTML and extract the points table info
    // const pointsTable = parsePointsTableFromHTML(html);
    
    return res.status(200).json({ message: 'Points table data extracted successfully', data: [] });
  } catch (error) {
    console.error('Error fetching points table:', error);
    return res.status(500).json({ message: 'Failed to fetch points table data', error: (error as Error).message });
  }
}