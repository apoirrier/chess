export interface Feedback {
  type: 'idle' | 'success' | 'nobest' | 'error'
  message?: string
  action?: {
    label: string
    callback: () => void
  }
}

export const goodFeedback: Feedback = {
  type: 'success'
}

export const badFeedback: Feedback = {
  type: 'error'
}

export const sicilianFeedback: Feedback = {
  type: 'success',
  message: 'La défense Sicilienne'
}

export const frenchFeedback: Feedback = {
  type: 'nobest',
  message: 'La défense Francaise. Jouons plutôt la défense Icilienne.'
}
