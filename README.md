# IPL T20 Dashboard

A real-time IPL match information dashboard built with Next.js, TypeScript, and Tailwind CSS. Get live match details, points table, and complete schedule in one place.

## Features

- **Live Match Updates**: Real-time match information with detailed scorecards and commentary
- **Points Table**: Current standings with team statistics and qualification scenarios
- **Complete Schedule**: Full tournament schedule with match results and upcoming fixtures
- **Responsive Design**: Mobile-first approach with optimized layouts for all devices
- **Dark Mode Support**: Automatic theme switching based on system preferences

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm 9.x or later

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/ipl-dashboard.git
   cd ipl-dashboard
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Building for Production

```bash
npm run build
```

## Project Structure

```
├── app/                    # Next.js 13 app directory
│   ├── match/             # Match details pages
│   ├── points-table/      # Points table page
│   ├── schedule/          # Schedule page
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── layout/           # Layout components
│   ├── matches/          # Match-related components
│   ├── points-table/     # Points table components
│   ├── schedule/         # Schedule components
│   └── ui/               # Reusable UI components
├── lib/                  # Utility functions and API
│   ├── api.ts           # API functions
│   └── utils.ts         # Helper functions
├── public/              # Static assets
└── types/               # TypeScript type definitions
```

## Key Components

### Home Page (`app/page.tsx`)
- Live match banner
- Upcoming matches
- Recent results
- Client-side rendering for real-time updates

### Points Table (`app/points-table/page.tsx`)
- Server-side rendered table
- Team standings
- Qualification scenarios
- Responsive design with mobile optimization

### Schedule (`app/schedule/page.tsx`)
- Statically generated match schedule
- Match cards with team information
- Status indicators (Live/Upcoming/Completed)
- Group stage and playoff matches

### Match Details (`app/match/[id]/page.tsx`)
- Dynamic match pages
- Live scorecard
- Ball-by-ball commentary
- Match statistics
- Loading state with skeleton UI

## Data Handling

### API Routes (`pages/api/scrape.ts`)
- Data scraping endpoints
- Fallback to dummy data
- Caching implementation
- Error handling

### Data Generation (`lib/utils.ts`)
- Dummy data generation
- Match scheduling logic
- Points table calculation
- Date formatting utilities

## Mobile Features

### Navigation
- Bottom navigation bar on mobile
- Header navigation on desktop
- Responsive layout switching

### Optimizations
- Abbreviated team names on mobile
- Compact tables with essential information
- Touch-friendly interface

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Design inspired by ESPNcricinfo
- Built with [Next.js](https://nextjs.org/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Icons from [Lucide React](https://lucide.dev/)
