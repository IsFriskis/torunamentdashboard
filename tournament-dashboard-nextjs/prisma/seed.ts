import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Create users
  console.log('Creating users...');
  
  const users = await Promise.all([
    prisma.user.upsert({
      where: { email: 'john.doe@example.com' },
      update: {},
      create: {
        name: 'John Doe',
        email: 'john.doe@example.com',
        role: 'ORGANIZER',
        emailVerified: new Date(),
      },
    }),
    prisma.user.upsert({
      where: { email: 'jane.smith@example.com' },
      update: {},
      create: {
        name: 'Jane Smith',
        email: 'jane.smith@example.com',
        role: 'ORGANIZER',
        emailVerified: new Date(),
      },
    }),
    prisma.user.upsert({
      where: { email: 'mike.johnson@example.com' },
      update: {},
      create: {
        name: 'Mike Johnson',
        email: 'mike.johnson@example.com',
        role: 'USER',
        emailVerified: new Date(),
      },
    }),
    prisma.user.upsert({
      where: { email: 'sarah.williams@example.com' },
      update: {},
      create: {
        name: 'Sarah Williams',
        email: 'sarah.williams@example.com',
        role: 'USER',
        emailVerified: new Date(),
      },
    }),
    prisma.user.upsert({
      where: { email: 'david.brown@example.com' },
      update: {},
      create: {
        name: 'David Brown',
        email: 'david.brown@example.com',
        role: 'USER',
        emailVerified: new Date(),
      },
    }),
    prisma.user.upsert({
      where: { email: 'emma.davis@example.com' },
      update: {},
      create: {
        name: 'Emma Davis',
        email: 'emma.davis@example.com',
        role: 'USER',
        emailVerified: new Date(),
      },
    }),
  ]);

  console.log(`✅ Created ${users.length} users`);

  // Create tournaments
  console.log('Creating tournaments...');

  const tournaments = await Promise.all([
    prisma.tournament.upsert({
      where: { id: 'tournament-1' },
      update: {},
      create: {
        id: 'tournament-1',
        name: 'Summer Championship 2025',
        description: 'Join us for the biggest summer tournament of the year! Compete against the best players and win amazing prizes. All skill levels welcome.',
        location: 'Los Angeles, CA',
        startDate: new Date('2025-07-15'),
        startTime: '09:00',
        endDate: new Date('2025-07-17'),
        endTime: '18:00',
        status: 'UPCOMING',
        entryFee: 5000,
        maxParticipants: 32,
        organizerId: users[0].id,
      },
    }),
    prisma.tournament.upsert({
      where: { id: 'tournament-2' },
      update: {},
      create: {
        id: 'tournament-2',
        name: 'Spring Open Tournament',
        description: 'Spring into action with our open tournament. Perfect for beginners and intermediate players looking to test their skills.',
        location: 'New York, NY',
        startDate: new Date('2025-04-20'),
        startTime: '10:00',
        endDate: new Date('2025-04-21'),
        endTime: '17:00',
        status: 'UPCOMING',
        entryFee: 2500,
        maxParticipants: 16,
        organizerId: users[1].id,
      },
    }),
    prisma.tournament.upsert({
      where: { id: 'tournament-3' },
      update: {},
      create: {
        id: 'tournament-3',
        name: 'Winter Cup 2025',
        description: 'End the year with a bang! Join our prestigious winter tournament featuring top-tier competition and excellent prizes.',
        location: 'Chicago, IL',
        startDate: new Date('2025-12-10'),
        startTime: '08:00',
        endDate: new Date('2025-12-12'),
        endTime: '19:00',
        status: 'UPCOMING',
        entryFee: 7500,
        maxParticipants: 64,
        organizerId: users[0].id,
      },
    }),
    prisma.tournament.upsert({
      where: { id: 'tournament-4' },
      update: {},
      create: {
        id: 'tournament-4',
        name: 'Local Community League',
        description: 'Free community tournament for local players. Come join us for a fun day of competition and community building!',
        location: 'Seattle, WA',
        startDate: new Date('2025-06-05'),
        startTime: '11:00',
        endDate: new Date('2025-06-05'),
        endTime: '16:00',
        status: 'UPCOMING',
        entryFee: 0,
        maxParticipants: 24,
        organizerId: users[1].id,
      },
    }),
    prisma.tournament.upsert({
      where: { id: 'tournament-5' },
      update: {},
      create: {
        id: 'tournament-5',
        name: 'National Championship Finals',
        description: 'The ultimate showdown! Top players from across the nation compete for the national championship title and grand prize.',
        location: 'Las Vegas, NV',
        startDate: new Date('2025-11-01'),
        startTime: '09:00',
        endDate: new Date('2025-11-03'),
        endTime: '20:00',
        status: 'UPCOMING',
        entryFee: 10000,
        maxParticipants: 128,
        organizerId: users[0].id,
      },
    }),
    prisma.tournament.upsert({
      where: { id: 'tournament-6' },
      update: {},
      create: {
        id: 'tournament-6',
        name: 'College Invitational',
        description: 'Exclusive tournament for college students. Show your school spirit and compete for scholarships and prizes!',
        location: 'Boston, MA',
        startDate: new Date('2025-09-15'),
        startTime: '10:00',
        endDate: new Date('2025-09-16'),
        endTime: '18:00',
        status: 'UPCOMING',
        entryFee: 1500,
        maxParticipants: 48,
        organizerId: users[1].id,
      },
    }),
    prisma.tournament.upsert({
      where: { id: 'tournament-7' },
      update: {},
      create: {
        id: 'tournament-7',
        name: 'Weekend Warriors Tournament',
        description: 'Perfect for working professionals! Weekend tournament with flexible scheduling and casual atmosphere.',
        location: 'Austin, TX',
        startDate: new Date('2025-08-23'),
        startTime: '12:00',
        endDate: new Date('2025-08-24'),
        endTime: '17:00',
        status: 'UPCOMING',
        entryFee: 3000,
        maxParticipants: 20,
        organizerId: users[0].id,
      },
    }),
    prisma.tournament.upsert({
      where: { id: 'tournament-8' },
      update: {},
      create: {
        id: 'tournament-8',
        name: 'Youth Development Cup',
        description: 'Tournament designed for young players under 18. Great opportunity to develop skills and meet other young competitors.',
        location: 'Miami, FL',
        startDate: new Date('2025-05-10'),
        startTime: '09:00',
        endDate: new Date('2025-05-11'),
        endTime: '16:00',
        status: 'UPCOMING',
        entryFee: 1000,
        maxParticipants: 40,
        organizerId: users[1].id,
      },
    }),
  ]);

  console.log(`✅ Created ${tournaments.length} tournaments`);

  // Create some sample registrations
  console.log('Creating registrations...');

  const registrations = await Promise.all([
    prisma.tournamentRegistration.create({
      data: {
        tournamentId: tournaments[0].id,
        userId: users[2].id,
        status: 'APPROVED',
      },
    }),
    prisma.tournamentRegistration.create({
      data: {
        tournamentId: tournaments[0].id,
        userId: users[3].id,
        status: 'PENDING',
      },
    }),
    prisma.tournamentRegistration.create({
      data: {
        tournamentId: tournaments[1].id,
        userId: users[4].id,
        status: 'APPROVED',
      },
    }),
    prisma.tournamentRegistration.create({
      data: {
        tournamentId: tournaments[2].id,
        userId: users[2].id,
        status: 'PENDING',
      },
    }),
    prisma.tournamentRegistration.create({
      data: {
        tournamentId: tournaments[3].id,
        userId: users[5].id,
        status: 'APPROVED',
      },
    }),
    prisma.tournamentRegistration.create({
      data: {
        tournamentId: tournaments[4].id,
        userId: users[3].id,
        status: 'PENDING',
      },
    }),
  ]);

  console.log(`✅ Created ${registrations.length} registrations`);

  console.log('');
  console.log('🎉 Database seeding completed successfully!');
  console.log('');
  console.log('📊 Summary:');
  console.log(`   - Users: ${users.length}`);
  console.log(`   - Tournaments: ${tournaments.length}`);
  console.log(`   - Registrations: ${registrations.length}`);
  console.log('');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
