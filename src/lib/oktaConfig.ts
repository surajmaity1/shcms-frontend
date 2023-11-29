export const oktaConfig = {
  clientId: "0oad9dxzcbXXnSy3p5d7",
  issuer: "https://dev-26900359.okta.com/oauth2/default",
  redirectUri: "https://localhost:3000/login/callback",
  scopes: ["openid", "profile", "email"],
  pkce: true,
  disableHttpsCheck: true,
};
