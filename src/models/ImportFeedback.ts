export interface ImportFeedback {
  status: "success" | "pending" | "error";
  message: string;
}

export const pendingFeedback: ImportFeedback = {
  status: "pending",
  message: "Import en cours...",
};

export const successFeedback: ImportFeedback = {
  status: "success",
  message: "Import réussi.",
};
