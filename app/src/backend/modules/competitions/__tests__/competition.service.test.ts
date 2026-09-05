import { describe, it, expect, vi, beforeEach } from 'vitest';
import { competitionService } from '../services/competition.service';
import { competitionRepository } from '../repository/competition.repository';
import { AppError } from '@backend/lib/errors';
import type { Competition } from '../domain/entities';

// Mock the repository
vi.mock('../repository/competition.repository', () => ({
  competitionRepository: {
    findBySlug: vi.fn(),
    findById: vi.fn(),
    findAll: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
  },
}));

describe('Competition Service', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const mockCompetition: Competition = {
    id: 'comp-1',
    slug: 'tech-war-2027',
    title: 'Tech War 2027',
    type: 'TEAM',
    description: null,
    rules: null,
    eligibility: null,
    price: 100000,
    maxTeamSize: 3,
    minTeamSize: 1,
    registrationStartDate: null,
    registrationEndDate: null,
    submissionStartDate: null,
    submissionEndDate: null,
    status: 'OPEN',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  describe('getCompetitionBySlug()', () => {
    it('returns competition if found and OPEN for public', async () => {
      vi.mocked(competitionRepository.findBySlug).mockResolvedValue(mockCompetition);
      
      const result = await competitionService.getCompetitionBySlug('tech-war-2027', false);
      
      expect(result).toEqual(mockCompetition);
      expect(competitionRepository.findBySlug).toHaveBeenCalledWith('tech-war-2027');
    });

    it('throws 404 if competition not found', async () => {
      vi.mocked(competitionRepository.findBySlug).mockResolvedValue(null);
      
      await expect(competitionService.getCompetitionBySlug('unknown', false))
        .rejects.toThrow(AppError);
    });

    it('throws 404 if competition is DRAFT for public query', async () => {
      vi.mocked(competitionRepository.findBySlug).mockResolvedValue({
        ...mockCompetition,
        status: 'DRAFT'
      });
      
      await expect(competitionService.getCompetitionBySlug('tech-war-2027', false))
        .rejects.toThrow(AppError);
    });

    it('returns DRAFT competition for admin query', async () => {
      const draftComp = { ...mockCompetition, status: 'DRAFT' as const };
      vi.mocked(competitionRepository.findBySlug).mockResolvedValue(draftComp);
      
      const result = await competitionService.getCompetitionBySlug('tech-war-2027', true);
      
      expect(result).toEqual(draftComp);
    });
  });

  describe('createCompetition()', () => {
    it('creates competition if slug is unique', async () => {
      vi.mocked(competitionRepository.findBySlug).mockResolvedValue(null);
      vi.mocked(competitionRepository.create).mockResolvedValue(mockCompetition);
      
      const data = {
        title: 'Tech War 2027',
        slug: 'tech-war-2027',
        type: 'TEAM' as const,
        description: null,
        rules: null,
        eligibility: null,
        price: 100000,
        maxTeamSize: 3,
        minTeamSize: 1,
        registrationStartDate: null,
        registrationEndDate: null,
        submissionStartDate: null,
        submissionEndDate: null,
        status: 'DRAFT' as const,
      };
      
      const result = await competitionService.createCompetition(data);
      
      expect(result).toEqual(mockCompetition);
      expect(competitionRepository.findBySlug).toHaveBeenCalledWith('tech-war-2027');
      expect(competitionRepository.create).toHaveBeenCalledWith(data);
    });

    it('throws 409 conflict if slug already exists', async () => {
      vi.mocked(competitionRepository.findBySlug).mockResolvedValue(mockCompetition);
      
      const data = {
        title: 'Another Tech War',
        slug: 'tech-war-2027', // Duplicate
        type: 'INDIVIDUAL' as const,
        description: null,
        rules: null,
        eligibility: null,
        price: 0,
        maxTeamSize: null,
        minTeamSize: null,
        registrationStartDate: null,
        registrationEndDate: null,
        submissionStartDate: null,
        submissionEndDate: null,
        status: 'DRAFT' as const,
      };
      
      await expect(competitionService.createCompetition(data))
        .rejects.toThrow(AppError);
        
      expect(competitionRepository.create).not.toHaveBeenCalled();
    });
  });
});
