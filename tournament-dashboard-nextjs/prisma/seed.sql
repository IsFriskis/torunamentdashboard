-- Users
INSERT INTO User (id, name, email, emailVerified, role, createdAt, updatedAt) VALUES
('user-1', 'John Doe', 'john.doe@example.com', NOW(), 'ORGANIZER', NOW(), NOW()),
('user-2', 'Jane Smith', 'jane.smith@example.com', NOW(), 'ORGANIZER', NOW(), NOW()),
('user-3', 'Mike Johnson', 'mike.johnson@example.com', NOW(), 'USER', NOW(), NOW()),
('user-4', 'Sarah Williams', 'sarah.williams@example.com', NOW(), 'USER', NOW(), NOW()),
('user-5', 'David Brown', 'david.brown@example.com', NOW(), 'USER', NOW(), NOW()),
('user-6', 'Emma Davis', 'emma.davis@example.com', NOW(), 'USER', NOW(), NOW())
ON DUPLICATE KEY UPDATE name=VALUES(name);

-- Tournaments
INSERT INTO Tournament (id, name, description, location, startDate, startTime, endDate, endTime, status, entryFee, maxParticipants, organizerId, createdAt, updatedAt) VALUES
('tournament-1', 'Summer Championship 2025', 'Join us for the biggest summer tournament of the year! Compete against the best players and win amazing prizes. All skill levels welcome.', 'Los Angeles, CA', '2025-07-15', '09:00', '2025-07-17', '18:00', 'UPCOMING', 5000, 32, 'user-1', NOW(), NOW()),
('tournament-2', 'Spring Open Tournament', 'Spring into action with our open tournament. Perfect for beginners and intermediate players looking to test their skills.', 'New York, NY', '2025-04-20', '10:00', '2025-04-21', '17:00', 'UPCOMING', 2500, 16, 'user-2', NOW(), NOW()),
('tournament-3', 'Winter Cup 2025', 'End the year with a bang! Join our prestigious winter tournament featuring top-tier competition and excellent prizes.', 'Chicago, IL', '2025-12-10', '08:00', '2025-12-12', '19:00', 'UPCOMING', 7500, 64, 'user-1', NOW(), NOW()),
('tournament-4', 'Local Community League', 'Free community tournament for local players. Come join us for a fun day of competition and community building!', 'Seattle, WA', '2025-06-05', '11:00', '2025-06-05', '16:00', 'UPCOMING', 0, 24, 'user-2', NOW(), NOW()),
('tournament-5', 'National Championship Finals', 'The ultimate showdown! Top players from across the nation compete for the national championship title and grand prize.', 'Las Vegas, NV', '2025-11-01', '09:00', '2025-11-03', '20:00', 'UPCOMING', 10000, 128, 'user-1', NOW(), NOW()),
('tournament-6', 'College Invitational', 'Exclusive tournament for college students. Show your school spirit and compete for scholarships and prizes!', 'Boston, MA', '2025-09-15', '10:00', '2025-09-16', '18:00', 'UPCOMING', 1500, 48, 'user-2', NOW(), NOW()),
('tournament-7', 'Weekend Warriors Tournament', 'Perfect for working professionals! Weekend tournament with flexible scheduling and casual atmosphere.', 'Austin, TX', '2025-08-23', '12:00', '2025-08-24', '17:00', 'UPCOMING', 3000, 20, 'user-1', NOW(), NOW()),
('tournament-8', 'Youth Development Cup', 'Tournament designed for young players under 18. Great opportunity to develop skills and meet other young competitors.', 'Miami, FL', '2025-05-10', '09:00', '2025-05-11', '16:00', 'UPCOMING', 1000, 40, 'user-2', NOW(), NOW())
ON DUPLICATE KEY UPDATE name=VALUES(name), description=VALUES(description);

-- Tournament Registrations
INSERT INTO TournamentRegistration (id, tournamentId, userId, status, createdAt, updatedAt) VALUES
('reg-1', 'tournament-1', 'user-3', 'APPROVED', NOW(), NOW()),
('reg-2', 'tournament-1', 'user-4', 'PENDING', NOW(), NOW()),
('reg-3', 'tournament-2', 'user-5', 'APPROVED', NOW(), NOW()),
('reg-4', 'tournament-3', 'user-3', 'PENDING', NOW(), NOW()),
('reg-5', 'tournament-4', 'user-6', 'APPROVED', NOW(), NOW()),
('reg-6', 'tournament-5', 'user-4', 'PENDING', NOW(), NOW())
ON DUPLICATE KEY UPDATE status=VALUES(status);
