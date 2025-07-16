import { Dispatch, SetStateAction } from "react";

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

export interface InfoForm {
  rank: string;
  gender: string;
  birthDate: string;
  categoryIds: number[];
}

export interface StepProps {
  info: InfoForm;
  setInfo: Dispatch<SetStateAction<InfoForm>>;
};