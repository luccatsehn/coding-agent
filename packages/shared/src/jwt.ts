import jsonwebtoken from "jsonwebtoken";

/**
 * Generates a JWT for GitHub App authentication
 */
export function generateJWT(appId: string, privateKey: string): string {
  const now = Math.floor(Date.now() / 1000);

  const payload = {
    iat: now - 60, // 60 seconds in the past to protect against clock drift
    exp: now + 9 * 60, // 9 minutes in the future (540 seconds) to stay within GitHub's 10-minute limit
    iss: appId,
  };

  return jsonwebtoken.sign(payload, privateKey, { algorithm: "RS256" });
}

