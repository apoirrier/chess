import type { PlayerColor } from "@/models/Game";
import type { Feedback } from "@/models/Feedback";
import type {
  PlayComputerResponse,
  EvaluateMoveResponse,
  ImportPGNResponse,
  OpeningNameResponse,
  PlayerColorResponse,
} from "@/models/responses";
import { successFeedback, type ImportFeedback } from "@/models/ImportFeedback";
import {
  request,
  PLAY_COMPUTER_PATH,
  EVALUATE_PATH,
  IMPORT_PGN_PATH,
  OPENING_NAME_PATH,
  END_VARIATION_PATH,
  PLAYER_COLOR_PATH,
} from "@/services/Api";

export async function createGame(): Promise<PlayerColor> {
  const response = await request<PlayerColorResponse>(PLAYER_COLOR_PATH, null);
  return response.playerColor;
}

export async function playComputer(fen: string): Promise<[string, string, string | null]> {
  const response = await request<PlayComputerResponse>(PLAY_COMPUTER_PATH, { fen: fen });
  return [response.move, response.message, response.date];
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

export async function getOpeningName(fen: string): Promise<string> {
  const openingName = await request<OpeningNameResponse>(OPENING_NAME_PATH, { fen: fen });
  return openingName.name;
}

export async function endVariation(
  pgn: string,
  errorMade: boolean,
  playerColor: PlayerColor,
): Promise<void> {
  await request<void>(END_VARIATION_PATH, {
    pgn: pgn,
    errorMade: errorMade,
    playerColor: playerColor,
  });
}
