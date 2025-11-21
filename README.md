# Tournament Dashboard

A React + TypeScript tournament management dashboard application built with Vite.

![Tournament Dashboard](https://github.com/user-attachments/assets/c85ad185-a5c1-4c50-bd67-4bab49f5de6b)

## Features

- 🏆 **Tournament Management**: View and manage multiple tournaments
- 📊 **Live Standings**: Real-time standings table showing team rankings
- 🎮 **Match Tracking**: Track completed, in-progress, and scheduled matches
- 💾 **Local Database**: Data persistence using localStorage (browser-based storage)
- 🎨 **Modern UI**: Beautiful gradient design with responsive layout
- ⚡ **Fast Performance**: Built with Vite for optimal development and production builds

## Technology Stack

- **React 19**: Modern UI library
- **TypeScript**: Type-safe development
- **Vite**: Next-generation frontend tooling
- **LocalStorage**: Browser-based data persistence
- **ESLint**: Code quality and consistency

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/IsFriskis/torunamentdashboard.git

# Navigate to project directory
cd torunamentdashboard

# Install dependencies
npm install
```

### Development

```bash
# Start development server
npm run dev
```

The application will be available at `http://localhost:5173/`

### Build

```bash
# Build for production
npm run build
```

The build output will be in the `dist/` directory.

### Linting

```bash
# Run ESLint
npm run lint
```

### Preview Production Build

```bash
# Preview the production build locally
npm run preview
```

## Project Structure

```
torunamentdashboard/
├── src/
│   ├── components/          # React components
│   │   ├── TournamentList.tsx
│   │   └── TournamentDetails.tsx
│   ├── db/                  # Database logic
│   │   └── database.ts
│   ├── types/               # TypeScript type definitions
│   │   └── tournament.ts
│   ├── App.tsx              # Main App component
│   ├── App.css              # App styles
│   ├── main.tsx             # Application entry point
│   └── index.css            # Global styles
├── public/                  # Static assets
├── index.html               # HTML template
└── vite.config.ts          # Vite configuration
```

## Database Schema

The application uses a simple localStorage-based database with three main entities:

### Tournament
- `id`: Unique identifier
- `name`: Tournament name
- `startDate`: Start date
- `endDate`: End date
- `status`: upcoming | ongoing | completed
- `location`: Tournament location
- `description`: Tournament description

### Team
- `id`: Unique identifier
- `tournamentId`: Reference to tournament
- `name`: Team name
- `wins`: Number of wins
- `losses`: Number of losses
- `points`: Total points

### Match
- `id`: Unique identifier
- `tournamentId`: Reference to tournament
- `team1Id`: First team reference
- `team2Id`: Second team reference
- `team1Score`: First team score
- `team2Score`: Second team score
- `matchDate`: Match date
- `status`: scheduled | in-progress | completed

## Sample Data

The application comes with sample tournament data that is automatically loaded on first run:
- Summer Championship 2025
- 4 teams (Alpha, Beta, Gamma, Delta)
- 3 matches (2 completed, 1 scheduled)

## Future Enhancements

Potential improvements for production use:
- Backend API with PostgreSQL/MySQL database
- User authentication and authorization
- Real-time updates with WebSockets
- Advanced statistics and analytics
- Tournament bracket visualization
- Team and player management
- Export data to PDF/Excel

## License

See LICENSE file for details.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
