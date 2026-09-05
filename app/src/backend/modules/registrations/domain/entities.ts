export type RegistrationStatus = 'PENDING' | 'APPROVED' | 'REJECTED';

export interface Registration {
  id: string;
  userId: string;
  competitionId: string;
  teamName: string | null;
  status: RegistrationStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface RegistrationMember {
  id: string;
  registrationId: string;
  name: string;
  email: string;
  studentIdCardUrl: string | null;
  proofOfEnrollmentUrl: string | null;
  isLeader: boolean;
}

export interface RegistrationWithMembers extends Registration {
  members: RegistrationMember[];
}
