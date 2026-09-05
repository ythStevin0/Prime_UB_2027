import { eq, and, ilike, count } from 'drizzle-orm';
import { db } from '@backend/lib/db';
import { registrations, registrationMembers } from '@backend/lib/db/schema';
import type { Registration, RegistrationMember, RegistrationWithMembers, RegistrationStatus } from '../domain/entities';

export interface RegistrationFilters {
  search?: string;
  status?: RegistrationStatus;
  competitionId?: string;
}

class RegistrationRepository {
  /**
   * Check if user is already registered for a specific competition.
   */
  async findUserRegistration(userId: string, competitionId: string): Promise<Registration | null> {
    const result = await db.query.registrations.findFirst({
      where: and(
        eq(registrations.userId, userId),
        eq(registrations.competitionId, competitionId)
      ),
    });
    
    return result ? (result as unknown as Registration) : null;
  }

  /**
   * Find detailed registration by ID.
   */
  async findById(id: string): Promise<RegistrationWithMembers | null> {
    const result = await db.query.registrations.findFirst({
      where: eq(registrations.id, id),
      with: {
        members: true,
      },
    });

    return result ? (result as unknown as RegistrationWithMembers) : null;
  }

  /**
   * Create a registration and its members inside a database transaction.
   */
  async create(
    data: Omit<Registration, 'id' | 'createdAt' | 'updatedAt' | 'status'>,
    members: Omit<RegistrationMember, 'id' | 'registrationId'>[]
  ): Promise<RegistrationWithMembers> {
    return db.transaction(async (tx) => {
      // 1. Insert Registration
      const [newRegistration] = await tx
        .insert(registrations)
        .values({
          ...data,
          status: 'PENDING',
        })
        .returning();

      // 2. Map members to include registrationId
      const membersToInsert = members.map(m => ({
        ...m,
        registrationId: newRegistration.id,
      }));

      // 3. Insert Members
      const newMembers = await tx
        .insert(registrationMembers)
        .values(membersToInsert)
        .returning();

      return {
        ...(newRegistration as unknown as Registration),
        members: newMembers as unknown as RegistrationMember[],
      };
    });
  }

  /**
   * List all registrations for a specific user (My Registrations)
   */
  async findAllByUserId(userId: string): Promise<RegistrationWithMembers[]> {
    const data = await db.query.registrations.findMany({
      where: eq(registrations.userId, userId),
      with: {
        members: true,
      },
      orderBy: (registrations, { desc }) => [desc(registrations.createdAt)],
    });
    
    return data as unknown as RegistrationWithMembers[];
  }

  /**
   * List all registrations with filters (Admin only)
   */
  async findAll(
    filters: RegistrationFilters,
    limit: number,
    offset: number
  ): Promise<{ data: Registration[]; total: number }> {
    const conditions = [];

    if (filters.status) {
      conditions.push(eq(registrations.status, filters.status));
    }

    if (filters.competitionId) {
      conditions.push(eq(registrations.competitionId, filters.competitionId));
    }

    if (filters.search) {
      conditions.push(ilike(registrations.teamName, `%${filters.search}%`));
    }

    const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

    const data = await db.query.registrations.findMany({
      where: whereClause,
      limit,
      offset,
      orderBy: (registrations, { desc }) => [desc(registrations.createdAt)],
    });

    const totalResult = await db
      .select({ count: count() })
      .from(registrations)
      .where(whereClause);

    return {
      data: data as unknown as Registration[],
      total: totalResult[0]?.count ?? 0,
    };
  }

  /**
   * Update Registration Status (Admin)
   */
  async updateStatus(id: string, status: RegistrationStatus): Promise<Registration | null> {
    const [result] = await db
      .update(registrations)
      .set({ status, updatedAt: new Date() })
      .where(eq(registrations.id, id))
      .returning();
      
    return result ? (result as unknown as Registration) : null;
  }
}

export const registrationRepository = new RegistrationRepository();
