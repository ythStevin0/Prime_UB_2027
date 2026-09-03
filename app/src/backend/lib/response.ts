/**
 * Standardized API Response Helpers for PRIME UB 2027 Backend
 *
 * Ensures every API endpoint returns a consistent response shape:
 *
 * Success:
 *   { success: true, data: T, meta?: { pagination } }
 *
 * Error:
 *   { success: false, error: { code, message, statusCode } }
 *
 * Usage:
 *   import { ApiResponse } from '@backend/lib/response';
 *
 *   return c.json(ApiResponse.success(data));
 *   return c.json(ApiResponse.paginated(items, { page, limit, total }));
 */

// ─── Types ────────────────────────────────────────────────

export interface PaginationMeta {
  /** Current page number (1-indexed) */
  page: number;
  /** Items per page */
  limit: number;
  /** Total items across all pages */
  total: number;
  /** Total number of pages */
  totalPages: number;
}

export interface SuccessResponse<T> {
  success: true;
  data: T;
  meta?: {
    pagination?: PaginationMeta;
  };
}

export interface ErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
    statusCode: number;
  };
}

export type ApiResponseType<T> = SuccessResponse<T> | ErrorResponse;

// ─── Response Builders ────────────────────────────────────

export const ApiResponse = {
  /**
   * Build a success response.
   *
   * @example
   *   return c.json(ApiResponse.success({ user: { id: '...' } }));
   */
  success<T>(data: T): SuccessResponse<T> {
    return {
      success: true,
      data,
    };
  },

  /**
   * Build a paginated success response.
   *
   * @example
   *   const { items, total } = await repo.findAll({ page: 1, limit: 20 });
   *   return c.json(ApiResponse.paginated(items, { page: 1, limit: 20, total }));
   */
  paginated<T>(
    data: T,
    pagination: { page: number; limit: number; total: number },
  ): SuccessResponse<T> {
    const totalPages = Math.ceil(pagination.total / pagination.limit);

    return {
      success: true,
      data,
      meta: {
        pagination: {
          page: pagination.page,
          limit: pagination.limit,
          total: pagination.total,
          totalPages,
        },
      },
    };
  },
} as const;

// ─── Pagination Utility ───────────────────────────────────

/**
 * Calculate SQL offset from page and limit.
 *
 * @example
 *   const { offset, limit } = calcPagination({ page: 2, limit: 20 });
 *   // offset = 20, limit = 20
 */
export function calcPagination(input: { page: number; limit: number }): {
  offset: number;
  limit: number;
} {
  return {
    offset: (input.page - 1) * input.limit,
    limit: input.limit,
  };
}
