export type CompetitionType = 'TEAM' | 'INDIVIDUAL';
export type CompetitionStatus = 'DRAFT' | 'OPEN' | 'CLOSED' | 'ARCHIVED';

export interface Competition {
  id: string;
  slug: string;
  title: string;
  type: CompetitionType;
  description: string | null;
  rules: string | null;
  eligibility: string | null;
  price: number;
  maxTeamSize: number | null;
  minTeamSize: number | null;
  registrationStartDate: Date | null;
  registrationEndDate: Date | null;
  submissionStartDate: Date | null;
  submissionEndDate: Date | null;
  status: CompetitionStatus;
  createdAt: Date;
  updatedAt: Date;
}
