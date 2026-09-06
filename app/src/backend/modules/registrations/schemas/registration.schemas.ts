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

export const createRegistrationSchema = z.object({
  competitionId: z.string().uuid('Invalid competition ID'),
  teamName: z.string().max(255).min(1, 'Nama Tim is required'),
  whatsapp: z.string().min(5, 'WhatsApp number is required').max(255),
  domisili: z.string().min(2, 'Domisili is required').max(255),
  instansi: z.string().min(2, 'Instansi is required').max(255),
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
