import { pgTable, uuid, text, varchar, timestamp, integer, boolean } from "drizzle-orm/pg-core";

// Users Table
export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  role: varchar('role', { enum: ['USER', 'ADMIN', 'JURY'] }).default('USER').notNull(),
  phone: varchar('phone', { length: 50 }),
  institution: varchar('institution', { length: 255 }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Competitions Table
export const competitions = pgTable('competitions', {
  id: uuid('id').defaultRandom().primaryKey(),
  slug: varchar('slug', { length: 255 }).notNull().unique(),
  title: varchar('title', { length: 255 }).notNull(),
  type: varchar('type', { enum: ['TEAM', 'INDIVIDUAL'] }).notNull(),
  description: text('description'),
  price: integer('price').notNull().default(0),
  startDate: timestamp('start_date'),
  endDate: timestamp('end_date'),
});

// Registrations Table
export const registrations = pgTable('registrations', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').references(() => users.id).notNull(),
  competitionId: uuid('competition_id').references(() => competitions.id).notNull(),
  teamName: varchar('team_name', { length: 255 }),
  status: varchar('status', { enum: ['PENDING', 'APPROVED', 'REJECTED'] }).default('PENDING').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Registration Members Table
export const registrationMembers = pgTable('registration_members', {
  id: uuid('id').defaultRandom().primaryKey(),
  registrationId: uuid('registration_id').references(() => registrations.id).notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  studentIdCardUrl: text('student_id_card_url'),
  proofOfEnrollmentUrl: text('proof_of_enrollment_url'),
  isLeader: boolean('is_leader').default(false).notNull(),
});

// Payments Table
export const payments = pgTable('payments', {
  id: uuid('id').defaultRandom().primaryKey(),
  registrationId: uuid('registration_id').references(() => registrations.id).notNull(),
  orderId: varchar('order_id', { length: 255 }).notNull().unique(), // Midtrans Order ID
  grossAmount: integer('gross_amount').notNull(),
  status: varchar('status', { enum: ['PENDING', 'SETTLEMENT', 'EXPIRE', 'CANCEL'] }).default('PENDING').notNull(),
  paymentType: varchar('payment_type', { length: 100 }),
  transactionTime: timestamp('transaction_time'),
});

// Submissions Table
export const submissions = pgTable('submissions', {
  id: uuid('id').defaultRandom().primaryKey(),
  registrationId: uuid('registration_id').references(() => registrations.id).notNull(),
  fileUrl: text('file_url').notNull(),
  title: varchar('title', { length: 255 }),
  description: text('description'),
  submittedAt: timestamp('submitted_at').defaultNow().notNull(),
});
