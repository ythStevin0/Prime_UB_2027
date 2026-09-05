import { AppError } from '@backend/lib/errors';
import type { Competition } from '../../competitions/domain/entities';
import { isRegistrationOpen } from '../../competitions/domain/rules';
import type { RegistrationMember } from './entities';

/**
 * Validates if registration for a competition is currently allowed.
 */
export function validateRegistrationAllowed(competition: Competition): void {
  if (competition.status !== 'OPEN') {
    throw AppError.forbidden('Registration is not open for this competition.');
  }

  if (!isRegistrationOpen(competition)) {
    throw AppError.forbidden('Registration period is currently closed.');
  }
}

/**
 * Validates team members against competition constraints.
 */
export function validateTeamMembers(
  competition: Competition,
  members: Omit<RegistrationMember, 'id' | 'registrationId'>[]
): void {
  // Check empty members
  if (!members || members.length === 0) {
    throw AppError.badRequest('At least one member is required for registration.');
  }

  // INDIVIDUAL validation
  if (competition.type === 'INDIVIDUAL') {
    if (members.length > 1) {
      throw AppError.badRequest('Individual competitions can only have 1 member.');
    }
  } 
  
  // TEAM validation
  if (competition.type === 'TEAM') {
    const minSize = competition.minTeamSize ?? 1;
    const maxSize = competition.maxTeamSize ?? 999;
    
    if (members.length < minSize) {
      throw AppError.badRequest(`This team competition requires at least ${minSize} members.`);
    }
    
    if (members.length > maxSize) {
      throw AppError.badRequest(`This team competition allows a maximum of ${maxSize} members.`);
    }
  }

  // Check leader constraints
  const leaderCount = members.filter(m => m.isLeader).length;
  if (leaderCount !== 1) {
    throw AppError.badRequest('Exactly one member must be designated as the leader.');
  }
}
