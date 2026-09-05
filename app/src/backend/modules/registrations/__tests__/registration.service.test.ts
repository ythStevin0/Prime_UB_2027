import { describe, it, expect, vi, beforeEach } from 'vitest';
import { registrationService } from '../services/registration.service';
import { registrationRepository } from '../repository/registration.repository';
import { competitionRepository } from '../../competitions/repository/competition.repository';
import type { Competition } from '../../competitions/domain/entities';
import type { Registration, RegistrationWithMembers } from '../domain/entities';

// Mock dependencies
vi.mock('../repository/registration.repository', () => ({
  registrationRepository: {
    findUserRegistration: vi.fn(),
    create: vi.fn(),
    findById: vi.fn(),
    findAllByUserId: vi.fn(),
    findAll: vi.fn(),
    updateStatus: vi.fn(),
  },
}));

vi.mock('../../competitions/repository/competition.repository', () => ({
  competitionRepository: {
    findById: vi.fn(),
  },
}));

describe('Registration Service', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const mockCompetitionIndividual = {
    id: 'comp-1',
    status: 'OPEN',
    type: 'INDIVIDUAL',
    registrationStartDate: new Date(Date.now() - 10000), // past
    registrationEndDate: new Date(Date.now() + 100000), // future
  } as unknown as Competition;
  
  const mockCompetitionTeam = {
    id: 'comp-2',
    status: 'OPEN',
    type: 'TEAM',
    minTeamSize: 2,
    maxTeamSize: 3,
    registrationStartDate: new Date(Date.now() - 10000),
    registrationEndDate: new Date(Date.now() + 100000),
  } as unknown as Competition;

  describe('registerToCompetition()', () => {
    it('creates registration successfully for INDIVIDUAL', async () => {
      vi.mocked(competitionRepository.findById).mockResolvedValue(mockCompetitionIndividual);
      vi.mocked(registrationRepository.findUserRegistration).mockResolvedValue(null);
      vi.mocked(registrationRepository.create).mockResolvedValue({ id: 'reg-1', members: [] } as unknown as RegistrationWithMembers);

      const payload = {
        competitionId: 'comp-1',
        teamName: null,
        members: [{ name: 'User 1', email: 'user1@test.com', isLeader: true, studentIdCardUrl: null, proofOfEnrollmentUrl: null }],
      };

      const result = await registrationService.registerToCompetition('user-1', payload);

      expect(result.id).toBe('reg-1');
      expect(registrationRepository.create).toHaveBeenCalled();
    });

    it('creates registration successfully for TEAM', async () => {
      vi.mocked(competitionRepository.findById).mockResolvedValue(mockCompetitionTeam);
      vi.mocked(registrationRepository.findUserRegistration).mockResolvedValue(null);
      vi.mocked(registrationRepository.create).mockResolvedValue({ id: 'reg-2', members: [] } as unknown as RegistrationWithMembers);

      const payload = {
        competitionId: 'comp-2',
        teamName: 'Team Awesome',
        members: [
          { name: 'Leader', email: 'lead@test.com', isLeader: true, studentIdCardUrl: null, proofOfEnrollmentUrl: null },
          { name: 'Member', email: 'mem@test.com', isLeader: false, studentIdCardUrl: null, proofOfEnrollmentUrl: null },
        ],
      };

      await registrationService.registerToCompetition('user-2', payload);
      expect(registrationRepository.create).toHaveBeenCalled();
    });

    it('throws error if competition not found', async () => {
      vi.mocked(competitionRepository.findById).mockResolvedValue(null);

      await expect(registrationService.registerToCompetition('user-1', {
        competitionId: 'comp-x',
        teamName: null,
        members: [{ name: 'Test', email: 't@t.com', isLeader: true, studentIdCardUrl: null, proofOfEnrollmentUrl: null }]
      })).rejects.toThrow('Competition not found');
    });

    it('throws error if user already registered', async () => {
      vi.mocked(competitionRepository.findById).mockResolvedValue(mockCompetitionIndividual);
      vi.mocked(registrationRepository.findUserRegistration).mockResolvedValue({ id: 'existing' } as unknown as Registration);

      await expect(registrationService.registerToCompetition('user-1', {
        competitionId: 'comp-1',
        teamName: null,
        members: [{ name: 'Test', email: 't@t.com', isLeader: true, studentIdCardUrl: null, proofOfEnrollmentUrl: null }]
      })).rejects.toThrow('already registered');
    });

    it('throws error if INDIVIDUAL has > 1 member', async () => {
      vi.mocked(competitionRepository.findById).mockResolvedValue(mockCompetitionIndividual);
      vi.mocked(registrationRepository.findUserRegistration).mockResolvedValue(null);

      await expect(registrationService.registerToCompetition('user-1', {
        competitionId: 'comp-1',
        teamName: null,
        members: [
          { name: 'Test1', email: 't1@t.com', isLeader: true, studentIdCardUrl: null, proofOfEnrollmentUrl: null },
          { name: 'Test2', email: 't2@t.com', isLeader: false, studentIdCardUrl: null, proofOfEnrollmentUrl: null }
        ]
      })).rejects.toThrow('Individual competitions can only have 1 member');
    });

    it('throws error if TEAM has less than minTeamSize', async () => {
      vi.mocked(competitionRepository.findById).mockResolvedValue(mockCompetitionTeam);
      vi.mocked(registrationRepository.findUserRegistration).mockResolvedValue(null);

      await expect(registrationService.registerToCompetition('user-1', {
        competitionId: 'comp-2',
        teamName: 'Solo Team',
        members: [
          { name: 'Test1', email: 't1@t.com', isLeader: true, studentIdCardUrl: null, proofOfEnrollmentUrl: null },
        ]
      })).rejects.toThrow('requires at least 2 members');
    });
  });
});
