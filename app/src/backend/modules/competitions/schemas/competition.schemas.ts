import { z } from 'zod';
import { paginationSchema } from '@backend/lib/validation';

export const competitionTypeSchema = z.enum(['TEAM', 'INDIVIDUAL']);
export const competitionStatusSchema = z.enum(['DRAFT', 'OPEN', 'CLOSED', 'ARCHIVED']);

// Schema for Admin to create a new competition
export const createCompetitionSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters').max(255, 'Title too long'),
  slug: z.string().min(3).max(255).regex(/^[a-z0-9-]+$/, 'Slug can only contain lowercase letters, numbers, and hyphens'),
  type: competitionTypeSchema,
  description: z.string().nullable().default(null),
  rules: z.string().nullable().default(null),
  eligibility: z.string().nullable().default(null),
  price: z.number().int().min(0, 'Price cannot be negative').default(0),
  maxTeamSize: z.number().int().min(1).nullable().default(null),
  minTeamSize: z.number().int().min(1).nullable().default(null),
  registrationStartDate: z.coerce.date().nullable().default(null),
  registrationEndDate: z.coerce.date().nullable().default(null),
  submissionStartDate: z.coerce.date().nullable().default(null),
  submissionEndDate: z.coerce.date().nullable().default(null),
  status: competitionStatusSchema.default('DRAFT'),
}).refine(data => {
  if (data.type === 'TEAM') {
    return data.minTeamSize != null && data.maxTeamSize != null;
  }
  return true;
}, {
  message: "Team size (min and max) is required for TEAM competitions",
  path: ["minTeamSize"], // Pointing to minTeamSize just to have a target path
}).refine(data => {
  if (data.type === 'TEAM' && data.minTeamSize != null && data.maxTeamSize != null) {
    return data.minTeamSize <= data.maxTeamSize;
  }
  return true;
}, {
  message: "minTeamSize cannot be greater than maxTeamSize",
  path: ["minTeamSize"],
}).refine(data => {
  if (data.registrationStartDate && data.registrationEndDate) {
    return data.registrationStartDate < data.registrationEndDate;
  }
  return true;
}, {
  message: "Registration start date must be before end date",
  path: ["registrationStartDate"],
}).refine(data => {
  if (data.submissionStartDate && data.submissionEndDate) {
    return data.submissionStartDate < data.submissionEndDate;
  }
  return true;
}, {
  message: "Submission start date must be before end date",
  path: ["submissionStartDate"],
});

// Schema for Admin to update a competition (all fields optional)
export const updateCompetitionSchema = createCompetitionSchema.partial();

// Schema for querying competitions list (Pagination + filters)
export const competitionQuerySchema = paginationSchema.extend({
  search: z.string().optional(),
  status: competitionStatusSchema.optional(),
  type: competitionTypeSchema.optional(),
});
