import { eq, ilike, and, count } from 'drizzle-orm';
import { db } from '@backend/lib/db';
import { competitions } from '@backend/lib/db/schema';
import type { Competition } from '../domain/entities';

export interface CompetitionFilters {
  search?: string;
  status?: Competition['status'];
  type?: Competition['type'];
}

class CompetitionRepository {
  /**
   * Find a competition by its slug.
   */
  async findBySlug(slug: string): Promise<Competition | null> {
    const result = await db.query.competitions.findFirst({
      where: eq(competitions.slug, slug),
    });
    
    return result ? (result as unknown as Competition) : null;
  }
  
  /**
   * Find a competition by its internal ID.
   */
  async findById(id: string): Promise<Competition | null> {
    const result = await db.query.competitions.findFirst({
      where: eq(competitions.id, id),
    });
    
    return result ? (result as unknown as Competition) : null;
  }

  /**
   * Find multiple competitions with filtering and pagination.
   */
  async findAll(
    filters: CompetitionFilters,
    limit: number,
    offset: number
  ): Promise<{ data: Competition[]; total: number }> {
    const conditions = [];

    if (filters.search) {
      conditions.push(ilike(competitions.title, `%${filters.search}%`));
    }

    if (filters.status) {
      conditions.push(eq(competitions.status, filters.status));
    }

    if (filters.type) {
      conditions.push(eq(competitions.type, filters.type));
    }

    const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

    // Get paginated data
    const data = await db.query.competitions.findMany({
      where: whereClause,
      limit,
      offset,
      orderBy: (competitions, { desc }) => [desc(competitions.createdAt)],
    });

    // Get total count
    const totalResult = await db
      .select({ count: count() })
      .from(competitions)
      .where(whereClause);
      
    const total = totalResult[0]?.count ?? 0;

    return {
      data: data as unknown as Competition[],
      total,
    };
  }

  /**
   * Insert a new competition.
   */
  async create(data: Omit<Competition, 'id' | 'createdAt' | 'updatedAt'>): Promise<Competition> {
    const [result] = await db
      .insert(competitions)
      .values(data)
      .returning();
      
    return result as unknown as Competition;
  }

  /**
   * Update an existing competition.
   */
  async update(id: string, data: Partial<Omit<Competition, 'id' | 'createdAt' | 'updatedAt'>>): Promise<Competition | null> {
    const [result] = await db
      .update(competitions)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(competitions.id, id))
      .returning();
      
    return result ? (result as unknown as Competition) : null;
  }
  
  /**
   * Delete a competition (hard delete).
   */
  async delete(id: string): Promise<boolean> {
    const [result] = await db
      .delete(competitions)
      .where(eq(competitions.id, id))
      .returning({ id: competitions.id });
      
    return !!result;
  }
}

export const competitionRepository = new CompetitionRepository();
