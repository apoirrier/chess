const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

export const PLAY_COMPUTER_PATH = "/computer/play";
export const EVALUATE_PATH = "/feedback/evaluate";
export const IMPORT_PGN_PATH = "/pgn";
export const OPENING_NAME_PATH = "/opening-name";

export async function request<T>(path: string, body: unknown): Promise<T> {
  if (!API_BASE_URL) {
    throw new Error("API_BASE_URL is not defined");
  }

  const url = `${API_BASE_URL}${path}`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to fetch ${url}: [${response.status}] ${errorText}`);
  }

  return response.json();
}
