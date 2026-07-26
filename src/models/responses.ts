import type { Feedback } from "./Feedback";

export interface PlayComputerResponse {
  move: string;
  message: string;
}

export interface EvaluateMoveResponse {
  feedback: Feedback;
}

export interface ImportPGNResponse {
  message: string;
}

export interface OpeningNameResponse {
  name: string;
}
