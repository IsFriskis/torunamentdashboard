import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Tournament Dashboard API',
      version: '1.0.0',
      description: 'API documentation for the Tournament Dashboard application',
      contact: {
        name: 'API Support',
      },
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server',
      },
    ],
    tags: [
      { name: 'Users', description: 'User management endpoints' },
      { name: 'Tournaments', description: 'Tournament management endpoints' },
      { name: 'Registrations', description: 'Registration management endpoints' },
      { name: 'Teams', description: 'Team management endpoints' },
      { name: 'Matches', description: 'Match management endpoints' },
      { name: 'Payments', description: 'Payment management endpoints' },
    ],
    components: {
      schemas: {
        User: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            name: { type: 'string' },
            email: { type: 'string', format: 'email' },
            role: { type: 'string', enum: ['USER', 'ORGANIZER', 'ADMIN'] },
            emailVerified: { type: 'string', format: 'date-time', nullable: true },
            image: { type: 'string', nullable: true },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' },
          },
        },
        Tournament: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            name: { type: 'string' },
            description: { type: 'string', nullable: true },
            location: { type: 'string' },
            startDate: { type: 'string', format: 'date-time' },
            startTime: { type: 'string' },
            endDate: { type: 'string', format: 'date-time' },
            endTime: { type: 'string' },
            status: { type: 'string', enum: ['UPCOMING', 'ONGOING', 'COMPLETED', 'CANCELLED'] },
            entryFee: { type: 'integer', description: 'Entry fee in cents' },
            maxParticipants: { type: 'integer', nullable: true },
            organizerId: { type: 'string' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' },
          },
        },
        Registration: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            userId: { type: 'string' },
            tournamentId: { type: 'string' },
            status: { type: 'string', enum: ['PENDING', 'APPROVED', 'REJECTED', 'CANCELLED'] },
            registeredAt: { type: 'string', format: 'date-time' },
          },
        },
      },
    },
  },
  apis: ['./src/app/api/**/*.ts'],
};

export const swaggerSpec = swaggerJsdoc(options);
