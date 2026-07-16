export interface Feedback {
  type: 'idle' | 'success' | 'nobest' | 'error' | 'end'
  message: string
  action?: {
    label: string
    callback: () => void
  }
}

export const idleFeedback: Feedback = {
  type: 'idle',
  message: 'Choisissez un coup candidat.',
}

export const endFeedback: Feedback = {
  type: 'end',
  message: 'Fin de l\'entraînement.'
}