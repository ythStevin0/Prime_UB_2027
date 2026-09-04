/**
 * Database Schema — PRIME UB 2027
 *
 * Central schema definition using Drizzle ORM.
 * Organized by domain: Identity, Competition, Registration, Payment, Submission.
 *
 * Conventions:
 * - All tables use UUID v4 as primary key
 * - Timestamps use `timestamp` (with timezone implied by PostgreSQL default)
 * - Snake_case for database column names
 * - CamelCase for TypeScript property names (Drizzle handles mapping)
 * - Foreign keys reference parent table's primary key
 * - Enums stored as varchar with Drizzle enum validation
 */

import {
  pgTable,
  uuid,
  text,
  varchar,
  timestamp,
  integer,
  boolean,
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// ═══════════════════════════════════════════════════════════
// IDENTITY DOMAIN
// ═══════════════════════════════════════════════════════════

/**
 * Users — Core identity table.
 * Stores authenticated user profiles and credentials.
 */
export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  emailVerifiedAt: timestamp('email_verified_at'),
  passwordHash: text('password_hash'),
  role: varchar('role', { enum: ['USER', 'ADMIN'] })
    .default('USER')
    .notNull(),
  phone: varchar('phone', { length: 50 }),
  institution: varchar('institution', { length: 255 }),
  image: text('image'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

/**
 * Accounts — OAuth provider accounts (Auth.js).
 * Links external identity providers (Google, GitHub) to users.
 */
export const accounts = pgTable('accounts', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id')
    .references(() => users.id, { onDelete: 'cascade' })
    .notNull(),
  type: varchar('type', { length: 255 }).notNull(),
  provider: varchar('provider', { length: 255 }).notNull(),
  providerAccountId: varchar('provider_account_id', { length: 255 }).notNull(),
  refreshToken: text('refresh_token'),
  accessToken: text('access_token'),
  expiresAt: integer('expires_at'),
  tokenType: varchar('token_type', { length: 255 }),
  scope: varchar('scope', { length: 255 }),
  idToken: text('id_token'),
  sessionState: varchar('session_state', { length: 255 }),
});

/**
 * Sessions — Database-backed sessions (Auth.js).
 * Stores active user sessions with expiration.
 */
export const sessions = pgTable('sessions', {
  id: uuid('id').defaultRandom().primaryKey(),
  sessionToken: varchar('session_token', { length: 255 }).notNull().unique(),
  userId: uuid('user_id')
    .references(() => users.id, { onDelete: 'cascade' })
    .notNull(),
  expires: timestamp('expires', { mode: 'date' }).notNull(),
});

/**
 * Verification Tokens — Email verification & password reset (Auth.js).
 */
export const verificationTokens = pgTable('verification_tokens', {
  identifier: varchar('identifier', { length: 255 }).notNull(),
  token: varchar('token', { length: 255 }).notNull().unique(),
  expires: timestamp('expires', { mode: 'date' }).notNull(),
});

// ═══════════════════════════════════════════════════════════
// COMPETITION DOMAIN
// ═══════════════════════════════════════════════════════════

/**
 * Competitions — Competition definitions managed by admins.
 */
export const competitions = pgTable('competitions', {
  id: uuid('id').defaultRandom().primaryKey(),
  slug: varchar('slug', { length: 255 }).notNull().unique(),
  title: varchar('title', { length: 255 }).notNull(),
  type: varchar('type', { enum: ['TEAM', 'INDIVIDUAL'] }).notNull(),
  description: text('description'),
  rules: text('rules'),
  eligibility: text('eligibility'),
  price: integer('price').notNull().default(0),
  maxTeamSize: integer('max_team_size'),
  minTeamSize: integer('min_team_size'),
  registrationStartDate: timestamp('registration_start_date'),
  registrationEndDate: timestamp('registration_end_date'),
  submissionStartDate: timestamp('submission_start_date'),
  submissionEndDate: timestamp('submission_end_date'),
  status: varchar('status', {
    enum: ['DRAFT', 'OPEN', 'CLOSED', 'ARCHIVED'],
  })
    .default('DRAFT')
    .notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// ═══════════════════════════════════════════════════════════
// REGISTRATION DOMAIN
// ═══════════════════════════════════════════════════════════

/**
 * Registrations — Links a user (participant) to a competition.
 */
export const registrations = pgTable('registrations', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id')
    .references(() => users.id)
    .notNull(),
  competitionId: uuid('competition_id')
    .references(() => competitions.id)
    .notNull(),
  teamName: varchar('team_name', { length: 255 }),
  status: varchar('status', {
    enum: ['PENDING', 'APPROVED', 'REJECTED'],
  })
    .default('PENDING')
    .notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

/**
 * Registration Members — Individual team members in a team registration.
 */
export const registrationMembers = pgTable('registration_members', {
  id: uuid('id').defaultRandom().primaryKey(),
  registrationId: uuid('registration_id')
    .references(() => registrations.id, { onDelete: 'cascade' })
    .notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  studentIdCardUrl: text('student_id_card_url'),
  proofOfEnrollmentUrl: text('proof_of_enrollment_url'),
  isLeader: boolean('is_leader').default(false).notNull(),
});

// ═══════════════════════════════════════════════════════════
// PAYMENT DOMAIN
// ═══════════════════════════════════════════════════════════

/**
 * Payments — Payment records linked to registrations.
 * Tracks Midtrans transaction lifecycle.
 */
export const payments = pgTable('payments', {
  id: uuid('id').defaultRandom().primaryKey(),
  registrationId: uuid('registration_id')
    .references(() => registrations.id)
    .notNull(),
  orderId: varchar('order_id', { length: 255 }).notNull().unique(),
  grossAmount: integer('gross_amount').notNull(),
  status: varchar('status', {
    enum: ['PENDING', 'SETTLEMENT', 'EXPIRE', 'CANCEL', 'DENY', 'REFUND'],
  })
    .default('PENDING')
    .notNull(),
  paymentType: varchar('payment_type', { length: 100 }),
  snapToken: text('snap_token'),
  snapRedirectUrl: text('snap_redirect_url'),
  transactionId: varchar('transaction_id', { length: 255 }),
  transactionTime: timestamp('transaction_time'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// ═══════════════════════════════════════════════════════════
// SUBMISSION DOMAIN
// ═══════════════════════════════════════════════════════════

/**
 * Submissions — Competition work submitted by participants.
 */
export const submissions = pgTable('submissions', {
  id: uuid('id').defaultRandom().primaryKey(),
  registrationId: uuid('registration_id')
    .references(() => registrations.id)
    .notNull(),
  title: varchar('title', { length: 255 }),
  description: text('description'),
  fileUrl: text('file_url').notNull(),
  fileName: varchar('file_name', { length: 255 }),
  fileSize: integer('file_size'),
  fileType: varchar('file_type', { length: 100 }),
  status: varchar('status', {
    enum: ['DRAFT', 'SUBMITTED', 'UNDER_REVIEW', 'ACCEPTED', 'REJECTED'],
  })
    .default('DRAFT')
    .notNull(),
  submittedAt: timestamp('submitted_at'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// ═══════════════════════════════════════════════════════════
// RELATIONS (Drizzle type-safe joins)
// ═══════════════════════════════════════════════════════════

export const usersRelations = relations(users, ({ many }) => ({
  accounts: many(accounts),
  sessions: many(sessions),
  registrations: many(registrations),
}));

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, {
    fields: [accounts.userId],
    references: [users.id],
  }),
}));

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, {
    fields: [sessions.userId],
    references: [users.id],
  }),
}));

export const competitionsRelations = relations(competitions, ({ many }) => ({
  registrations: many(registrations),
}));

export const registrationsRelations = relations(
  registrations,
  ({ one, many }) => ({
    user: one(users, {
      fields: [registrations.userId],
      references: [users.id],
    }),
    competition: one(competitions, {
      fields: [registrations.competitionId],
      references: [competitions.id],
    }),
    members: many(registrationMembers),
    payments: many(payments),
    submissions: many(submissions),
  }),
);

export const registrationMembersRelations = relations(
  registrationMembers,
  ({ one }) => ({
    registration: one(registrations, {
      fields: [registrationMembers.registrationId],
      references: [registrations.id],
    }),
  }),
);

export const paymentsRelations = relations(payments, ({ one }) => ({
  registration: one(registrations, {
    fields: [payments.registrationId],
    references: [registrations.id],
  }),
}));

export const submissionsRelations = relations(submissions, ({ one }) => ({
  registration: one(registrations, {
    fields: [submissions.registrationId],
    references: [registrations.id],
  }),
}));
