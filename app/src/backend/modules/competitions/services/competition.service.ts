import { AppError } from '@backend/lib/errors';
import { competitionRepository } from '../repository/competition.repository';
import type { Competition, CompetitionStatus } from '../domain/entities';

export interface GetCompetitionsParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: CompetitionStatus;
  type?: 'TEAM' | 'INDIVIDUAL';
}

class CompetitionService {
  /**
   * List competitions with filtering and pagination.
   * Public lists should only show OPEN or CLOSED competitions (hide DRAFT and ARCHIVED).
   */
  async getCompetitions(params: GetCompetitionsParams) {
    const { page = 1, limit = 10, search, type } = params;
    const status = params.status;
    
    // Public users can only see OPEN or CLOSED unless specified otherwise (but not DRAFT/ARCHIVED)
    if (status === 'DRAFT' || status === 'ARCHIVED') {
      throw AppError.forbidden('You do not have permission to view these competitions.');
    }
    
    const offset = (page - 1) * limit;
    
    const { data, total } = await competitionRepository.findAll(
      { search, status, type },
      limit,
      offset
    );
    
    // For public queries where no specific status was requested, filter out DRAFT and ARCHIVED in memory 
    let filteredData = data;
    let finalTotal = total;
    if (!status) {
      filteredData = data.filter(c => c.status === 'OPEN' || c.status === 'CLOSED');
      finalTotal = filteredData.length;
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
  async getCompetitionBySlug(slug: string): Promise<Competition> {
    const competition = await competitionRepository.findBySlug(slug);
    
    if (!competition) {
      throw AppError.notFound('Competition not found');
    }
    
    if (competition.status === 'DRAFT' || competition.status === 'ARCHIVED') {
      throw AppError.notFound('Competition not found or unavailable');
    }
    
    return competition;
  }
}

export const competitionService = new CompetitionService();
