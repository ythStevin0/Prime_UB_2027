import { z } from 'zod';
import { paginationSchema } from '@backend/lib/validation';

export const registrationStatusSchema = z.enum(['PENDING', 'APPROVED', 'REJECTED']);

// Schema for individual member payload
export const registerMemberSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(255),
  email: z.string().email('Invalid email address').toLowerCase(),
  studentIdCardUrl: z.string().url('Invalid URL').optional().nullable().default(null),
  proofOfEnrollmentUrl: z.string().url('Invalid URL').optional().nullable().default(null),
  isLeader: z.boolean().default(false),
});

// Schema for participants to submit registration
export const createRegistrationSchema = z.object({
  competitionId: z.string().uuid('Invalid competition ID'),
  teamName: z.string().max(255).optional().nullable().default(null),
  members: z.array(registerMemberSchema).min(1, 'At least one member is required'),
});

// Schema for Admin to approve/reject
export const updateRegistrationStatusSchema = z.object({
  status: registrationStatusSchema,
});

// Admin Query filters
export const registrationQuerySchema = paginationSchema.extend({
  search: z.string().optional(),
  status: registrationStatusSchema.optional(),
  competitionId: z.string().uuid().optional(),
});
