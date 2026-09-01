export interface Feedback {
  type: "idle" | "success" | "nobest" | "error" | "end";
  message: string;
  solution?: string;
}

export const idleFeedback: Feedback = {
  type: "idle",
  message: "Choisissez un coup candidat.",
};

export const endFeedback: Feedback = {
  type: "end",
  message: "Fin de l'entraînement.",
};
