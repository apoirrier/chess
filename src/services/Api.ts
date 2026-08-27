import { userManager } from "@/auth/userManager";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

export const PLAY_COMPUTER_PATH = "/computer/play";
export const END_VARIATION_PATH = "/computer/end-variation";
export const EVALUATE_PATH = "/feedback/evaluate";
export const IMPORT_PGN_PATH = "/pgn";
export const OPENING_NAME_PATH = "/opening-name";

export async function request<T>(path: string, body: unknown): Promise<T> {
  if (!API_BASE_URL) {
    throw new Error("API_BASE_URL is not defined");
  }

  const user = await userManager.getUser();
  if (!user || user.expired) {
    throw new Error("User is not authenticated");
  }

  const url = `${API_BASE_URL}${path}`;
  const accessToken = user.access_token;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to fetch ${url}: [${response.status}] ${errorText}`);
  }

  return response.json();
}
