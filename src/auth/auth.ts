import { userManager } from "./userManager";
import type { User } from "oidc-client-ts";

type LoginState = {
  target?: string;
};

export async function login() {
  await userManager.signinRedirect();
}

export async function logout() {
  await userManager.signoutRedirect();
}

export async function finishLogin(): Promise<User & { state: LoginState }> {
  return (await userManager.signinRedirectCallback()) as User & {
    state: LoginState;
  };
}

export async function getUser() {
  return await userManager.getUser();
}
