import type { Feedback } from "./Feedback";

export interface PlayComputerResponse {
  move: string;
}

export interface EvaluateMoveResponse {
  feedback: Feedback;
}

export interface ImportPGNResponse {
  message: string;
}
