import type { PlayerColor } from '@/models/Game'
import type { Feedback } from '@/models/Feedback'
import { goodFeedback, badFeedback, sicilianFeedback, frenchFeedback } from '@/models/Feedback'
import type { BoardApi, MoveEvent } from 'vue3-chessboard'

export async function createGame(): Promise<PlayerColor> {
  await new Promise(resolve => setTimeout(resolve, 500))

  const playerColor: PlayerColor =
    Math.random() > 0.5 ? 'white' : 'black'

  return playerColor
}

export function startGame(boardApi: BoardApi, playerColor: PlayerColor): void {
  if( playerColor === "black" ) {
    playComputer(boardApi)
  }
}

export function playComputer(boardApi: BoardApi): void {
  const fen = boardApi.getFen()
  switch(fen) {
    case "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1":
      boardApi.move('e4')
      break;
    case "rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq - 0 1":
      boardApi.move('e5')
      break;
    case "rnbqkbnr/pp1ppppp/8/2p5/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 2":
      boardApi.move('Nf3')
      break;
    default:
      alert(fen)
  }
}

export function evaluatePlayerMove(before: string, move: string): Feedback {
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
  }
}
