export interface UserInfo {
  nickname: string;
  rank: string;
  gender: string;
  birthDate: string;
  categoryIds: number[];
}

export interface UserStatistics {
  category: string;
  total: number;
}

export interface UserRole {
  role: string | null;
}