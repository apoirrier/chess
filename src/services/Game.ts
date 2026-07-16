import type { PlayerColor } from '@/models/Game'
import type { Feedback } from '@/models/Feedback'
import { goodFeedback, badFeedback, sicilianFeedback, frenchFeedback } from '@/models/Feedback'
import type { BoardApi } from 'vue3-chessboard'

export function createGame(): PlayerColor {
  const playerColor: PlayerColor =
    Math.random() > 0.5 ? 'white' : 'black'

  return playerColor
}

export async function playComputer(fen: string): Promise<string | undefined> {
  switch(fen) {
    case "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1":
      return 'e4'
    case "rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq - 0 1":
      return 'e5'
    case "rnbqkbnr/pp1ppppp/8/2p5/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 2":
      return 'Nf3'
    default:
      return undefined
  }
}

export async function evaluatePlayerMove(before: string, move: string): Promise<Feedback> {
  switch(before) {
    case "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1":
      switch(move) {
        case 'e4':
          return goodFeedback
        default:
          return badFeedback
      }
    case "rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq - 0 1":
      switch(move) {
        case 'e6':
          return frenchFeedback
        case "c5":
          return sicilianFeedback
        default:
          return badFeedback
      }
    case "rnbqkbnr/pppp1ppp/8/4p3/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 2":
      switch(move) {
        case 'Nf3':
          return goodFeedback
        default:
          return badFeedback
      }
    default:
      return badFeedback
  }
}
