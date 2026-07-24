import type { PlayerColor } from "@/models/Game";
import type { Feedback } from "@/models/Feedback";
import type {
  PlayComputerResponse,
  EvaluateMoveResponse,
  ImportPGNResponse,
} from "@/models/responses";
import { successFeedback, type ImportFeedback } from "@/models/ImportFeedback";
import { request, PLAY_COMPUTER_PATH, EVALUATE_PATH, IMPORT_PGN_PATH } from "@/services/Api";

export function createGame(): PlayerColor {
  const playerColor: PlayerColor = Math.random() > 0.5 ? "white" : "black";

  return playerColor;
}

export async function playComputer(fen: string): Promise<string> {
  const response = await request<PlayComputerResponse>(PLAY_COMPUTER_PATH, { fen: fen });
  return response.move;
}

export async function evaluatePlayerMove(before: string, move: string): Promise<Feedback> {
  const response = await request<EvaluateMoveResponse>(EVALUATE_PATH, {
    before: before,
    move: move,
  });
  return response.feedback;
}

export async function importPGN(pgn: string): Promise<ImportFeedback> {
  try {
    await request<ImportPGNResponse>(IMPORT_PGN_PATH, { pgn: pgn });
    return successFeedback;
  } catch (err) {
    if (err instanceof Error) {
      const errorFeedback: ImportFeedback = {
        status: "error",
        message: err.message,
      };
      return errorFeedback;
    }
    return {
      status: "error",
      message: "An unknown error occured.",
    };
  }
}
