# Tournament Dashboard

A full-stack tournament dashboard application with ASP.NET Core 10 backend and Next.js frontend.

## Project Structure

```
├── backend/                          # ASP.NET Core 10 Web API
│   └── TournamentDashboard.Api/     # Main API project
└── frontend/                         # Next.js application
```

## Backend - ASP.NET Core 10

### Features
- ASP.NET Core 10 Web API
- Swagger UI for API documentation (available at `/swagger`)
- Entity Framework Core with In-Memory Database (easily changeable)
- Minimal API endpoints

### Prerequisites
- .NET 10.0 SDK

### Running the Backend

```bash
cd backend/TournamentDashboard.Api
dotnet restore
dotnet build
dotnet run
```

The API will be available at:
- HTTP: `http://localhost:5020`
- HTTPS: `https://localhost:7266`
- Swagger UI: `http://localhost:5020/swagger` or `https://localhost:7266/swagger`

### API Endpoints
- `GET /` - Root endpoint with welcome message
- `GET /weatherforecast` - Sample weather forecast endpoint

### Database
The backend uses Entity Framework Core with an in-memory database for simplicity. To change to a different database:
1. Add the appropriate Entity Framework Core provider package
2. Update the `Program.cs` file to configure the new provider
3. Update the connection string in `appsettings.json`

## Frontend - Next.js

### Features
- Next.js 16 with App Router
- TypeScript
- Tailwind CSS
- ESLint configuration
- Simple "Hello World" landing page

### Prerequisites
- Node.js 18+ (recommended: v20)
- npm or yarn

### Running the Frontend

```bash
cd frontend
npm install
npm run dev
```

The application will be available at `http://localhost:3000`

### Building for Production

```bash
cd frontend
npm run build
npm start
```

## Development

### Backend Development
The backend uses hot reload during development. Changes to source files will automatically restart the application.

### Frontend Development
The frontend uses Next.js Fast Refresh. Changes to components will be instantly reflected in the browser.

## Git Ignore

The repository includes comprehensive `.gitignore` files that exclude:
- Build artifacts (`bin/`, `obj/`, `.next/`, `dist/`)
- Dependencies (`node_modules/`, NuGet packages)
- IDE-specific files (`.vscode/`, `.idea/`)
- Operating system files (`.DS_Store`, `Thumbs.db`)
- Environment variables (`.env*.local`)

## License

See [LICENSE](LICENSE) file for details.