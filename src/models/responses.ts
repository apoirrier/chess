import type { Feedback } from "./Feedback";
import type { PlayerColor } from "./Game";

export interface PlayComputerResponse {
  move: string;
  message: string;
  date: string | null;
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

export interface PlayerColorResponse {
  playerColor: PlayerColor;
}
