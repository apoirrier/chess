import { UserManager } from "oidc-client-ts";

const SSO_URL = import.meta.env.VITE_SSO_URL || "";
const SSO_CLIENT_ID = import.meta.env.VITE_SSO_CLIENT_ID || "";

export const userManager = new UserManager({
  authority: SSO_URL,
  client_id: SSO_CLIENT_ID,
  redirect_uri: `${window.location.origin}/auth/callback`,
  post_logout_redirect_uri: window.location.origin,

  response_type: "code",
  scope: "openid profile email",

  automaticSilentRenew: true,
  loadUserInfo: true,
});
