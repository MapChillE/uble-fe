import { Dispatch, SetStateAction } from "react";
import { responseStatus } from "./api";

export interface UserInfo {
  nickname?: string;
  rank: string;
  gender: "MALE" | "FEMALE";
  birthDate: string;
  categoryIds: number[];
  barcodeNumber?: string;
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
  barcodeNumber?: string;
}

export interface StepProps {
  info: InfoForm;
  setInfo: Dispatch<SetStateAction<InfoForm>>;
}

export interface SetUserInfo extends responseStatus {
  data: InfoForm;
}

export interface LogoutRes extends responseStatus {
  data: null;
}

export interface FeedbackForm {
  title: string;
  content: string;
  score: number;
}

interface FeedbackId {
  feedbackId: number;
}
export interface FeedbackRegistRes extends responseStatus {
  data: FeedbackId;
}
