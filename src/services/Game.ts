import type { PlayerColor } from "@/models/Game";
import type { Feedback } from "@/models/Feedback";
import { successFeedback, type ImportFeedback } from "@/models/ImportFeedback";
import { request, PLAY_COMPUTER_PATH, EVALUATE_PATH } from "@/services/Api";

export function createGame(): PlayerColor {
  const playerColor: PlayerColor = Math.random() > 0.5 ? "white" : "black";

  return playerColor;
}

export async function playComputer(fen: string): Promise<string> {
  const response = await request(PLAY_COMPUTER_PATH, JSON.stringify({ fen: fen }));
  return response.move;
}

export async function evaluatePlayerMove(before: string, move: string): Promise<Feedback> {
  const response = await request(EVALUATE_PATH, JSON.stringify({ before: before, move: move }));
  return response.feedback;
}

export async function importPGN(pgn: string): Promise<ImportFeedback> {
  return new Promise((resolve) =>
    setTimeout(() => {
      console.log(pgn);
      resolve(successFeedback);
    }, 500),
  );
}
