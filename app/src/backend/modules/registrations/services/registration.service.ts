import { AppError } from '@backend/lib/errors';
import { registrationRepository, type RegistrationFilters } from '../repository/registration.repository';
import { competitionRepository } from '../../competitions/repository/competition.repository';
import { validateRegistrationAllowed, validateTeamMembers } from '../domain/rules';
import type { Registration, RegistrationMember, RegistrationWithMembers, RegistrationStatus } from '../domain/entities';

export interface RegisterPayload {
  competitionId: string;
  teamName: string | null;
  members: Omit<RegistrationMember, 'id' | 'registrationId'>[];
}

class RegistrationService {
  /**
   * Register a user to a competition.
   */
  async registerToCompetition(userId: string, payload: RegisterPayload): Promise<RegistrationWithMembers> {
    // 1. Validate competition existence
    const competition = await competitionRepository.findById(payload.competitionId);
    if (!competition) {
      throw AppError.notFound('Competition not found');
    }

    // 2. Validate competition rules (is open? is registration window open?)
    validateRegistrationAllowed(competition);

    // 3. Prevent double registration
    const existingRegistration = await registrationRepository.findUserRegistration(userId, payload.competitionId);
    if (existingRegistration) {
      throw AppError.conflict('You are already registered for this competition.');
    }

    // 4. Validate team configuration & members
    validateTeamMembers(competition, payload.members);
    
    if (competition.type === 'TEAM' && !payload.teamName) {
      throw AppError.badRequest('Team name is required for team competitions.');
    }
    
    if (competition.type === 'INDIVIDUAL' && payload.teamName) {
      // Ignore or reject. Rejecting is safer.
      throw AppError.badRequest('Team name should not be provided for individual competitions.');
    }

    // 5. Create registration and members via repository
    return registrationRepository.create(
      {
        userId,
        competitionId: payload.competitionId,
        teamName: payload.teamName,
      },
      payload.members
    );
  }

  /**
   * Get all registrations belonging to the current user.
   */
  async getMyRegistrations(userId: string): Promise<RegistrationWithMembers[]> {
    return registrationRepository.findAllByUserId(userId);
  }

  /**
   * Get specific registration detail. Assumes caller is already verified to own this or is admin.
   */
  async getRegistrationDetail(id: string, userId: string, isAdmin: boolean = false): Promise<RegistrationWithMembers> {
    const registration = await registrationRepository.findById(id);
    
    if (!registration) {
      throw AppError.notFound('Registration not found');
    }

    // Authorization check
    if (!isAdmin && registration.userId !== userId) {
      throw AppError.forbidden('You do not have permission to view this registration.');
    }

    return registration;
  }

  /**
   * List all registrations (Admin only)
   */
  async getAdminRegistrations(filters: RegistrationFilters, page: number = 1, limit: number = 10) {
    const offset = (page - 1) * limit;
    
    const result = await registrationRepository.findAll(filters, limit, offset);
    
    return {
      data: result.data,
      total: result.total,
      page,
      limit,
    };
  }

  /**
   * Update Registration Status (Admin only)
   */
  async updateRegistrationStatus(id: string, status: RegistrationStatus): Promise<Registration> {
    const existing = await registrationRepository.findById(id);
    if (!existing) {
      throw AppError.notFound('Registration not found');
    }
    
    const updated = await registrationRepository.updateStatus(id, status);
    if (!updated) {
      throw AppError.internal('Failed to update registration status');
    }
    
    return updated;
  }
}

export const registrationService = new RegistrationService();
