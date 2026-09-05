import type { Competition } from './entities';

/**
 * Checks if the competition's registration window is currently open.
 */
export function isRegistrationOpen(competition: Competition, now: Date = new Date()): boolean {
  if (competition.status !== 'OPEN') {
    return false;
  }
  
  if (!competition.registrationStartDate || !competition.registrationEndDate) {
    return false;
  }
  
  return now >= competition.registrationStartDate && now <= competition.registrationEndDate;
}

/**
 * Checks if the competition's submission window is currently open.
 */
export function isSubmissionOpen(competition: Competition, now: Date = new Date()): boolean {
  if (competition.status !== 'OPEN') {
    return false;
  }
  
  if (!competition.submissionStartDate || !competition.submissionEndDate) {
    return false;
  }
  
  return now >= competition.submissionStartDate && now <= competition.submissionEndDate;
}

/**
 * Validates if the team size settings are logical.
 * E.g., minTeamSize should not be greater than maxTeamSize.
 */
export function hasValidTeamSizeConfiguration(type: 'TEAM' | 'INDIVIDUAL', minSize: number | null, maxSize: number | null): boolean {
  if (type === 'INDIVIDUAL') {
    return true; // Team size doesn't matter for individual
  }
  
  if (minSize === null || maxSize === null) {
    return false; // Team competitions must define team sizes
  }
  
  if (minSize < 1 || maxSize < 1) {
    return false;
  }
  
  return minSize <= maxSize;
}
