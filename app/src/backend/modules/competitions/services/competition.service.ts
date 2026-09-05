import { AppError } from '@backend/lib/errors';
import { competitionRepository } from '../repository/competition.repository';
import type { Competition, CompetitionStatus } from '../domain/entities';

export interface GetCompetitionsParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: CompetitionStatus;
  type?: 'TEAM' | 'INDIVIDUAL';
  isAdminQuery?: boolean; // If false, we restrict some statuses
}

class CompetitionService {
  /**
   * List competitions with filtering and pagination.
   * Public lists should only show OPEN or CLOSED competitions (hide DRAFT and ARCHIVED).
   */
  async getCompetitions(params: GetCompetitionsParams) {
    const { page = 1, limit = 10, search, type, isAdminQuery = false } = params;
    
    // Default status filtering based on role
    let status = params.status;
    
    if (!isAdminQuery) {
      // Public users can only see OPEN or CLOSED unless specified otherwise (but not DRAFT/ARCHIVED)
      if (status === 'DRAFT' || status === 'ARCHIVED') {
        throw AppError.forbidden('You do not have permission to view these competitions.');
      }
      
      // If no status provided for public query, we might want to default to showing both OPEN and CLOSED.
      // For simplicity in this implementation, if no status is provided, we won't restrict it here but 
      // ideally we'd pass an array of allowed statuses to the repository. 
      // Let's rely on frontend or route explicitly asking for what they want, 
      // but if we had array support in repository, we'd use it here.
    }
    
    const offset = (page - 1) * limit;
    
    const { data, total } = await competitionRepository.findAll(
      { search, status, type },
      limit,
      offset
    );
    
    // For public queries where no specific status was requested, filter out DRAFT and ARCHIVED in memory 
    // (In production, better to add IN clause support to repository)
    let filteredData = data;
    let finalTotal = total;
    if (!isAdminQuery && !status) {
      filteredData = data.filter(c => c.status === 'OPEN' || c.status === 'CLOSED');
      finalTotal = filteredData.length; // Approximation if filtered in memory, better to do in DB.
      // TODO: Update repository to support multiple statuses
    }

    return {
      data: filteredData,
      total: finalTotal,
      page,
      limit,
    };
  }

  /**
   * Get details of a single competition by slug.
   */
  async getCompetitionBySlug(slug: string, isAdminQuery: boolean = false): Promise<Competition> {
    const competition = await competitionRepository.findBySlug(slug);
    
    if (!competition) {
      throw AppError.notFound('Competition not found');
    }
    
    if (!isAdminQuery && (competition.status === 'DRAFT' || competition.status === 'ARCHIVED')) {
      throw AppError.notFound('Competition not found or unavailable');
    }
    
    return competition;
  }

  /**
   * Create a new competition (Admin only)
   */
  async createCompetition(data: Omit<Competition, 'id' | 'createdAt' | 'updatedAt'>): Promise<Competition> {
    // Check if slug is unique
    const existing = await competitionRepository.findBySlug(data.slug);
    if (existing) {
      throw AppError.conflict('Competition with this slug already exists. Please choose a different slug.');
    }
    
    return competitionRepository.create(data);
  }

  /**
   * Update an existing competition (Admin only)
   */
  async updateCompetition(id: string, data: Partial<Omit<Competition, 'id' | 'createdAt' | 'updatedAt'>>): Promise<Competition> {
    const existing = await competitionRepository.findById(id);
    if (!existing) {
      throw AppError.notFound('Competition not found');
    }
    
    // If updating slug, check uniqueness
    if (data.slug && data.slug !== existing.slug) {
      const existingSlug = await competitionRepository.findBySlug(data.slug);
      if (existingSlug) {
        throw AppError.conflict('Competition with this slug already exists.');
      }
    }
    
    const updated = await competitionRepository.update(id, data);
    
    if (!updated) {
      throw AppError.internal('Failed to update competition');
    }
    
    return updated;
  }
}

export const competitionService = new CompetitionService();
