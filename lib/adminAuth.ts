/**
 * Shared server-side admin authorization check for /api/admin/* routes.
 * Accepts either the raw admin password or the base64 token issued by
 * /api/admin/auth as a Bearer token.
 */
export function isAuthorized(request: Request): boolean {
  const authHeader = request.headers.get("authorization") || "";
  const token = authHeader.replace("Bearer ", "").trim();
  const correctPassword = process.env.ADMIN_PASSWORD;

  if (!token || !correctPassword) return false;

  if (token === correctPassword) return true;

  try {
    const decoded = Buffer.from(token, "base64").toString("utf-8");
    const parts = decoded.split(":");
    return parts[0] === "admin" && (parts[2] === correctPassword || parts[1] === correctPassword);
  } catch {
    return false;
  }
}

export function unauthorized() {
  return Response.json({ error: "Unauthorized access" }, { status: 401 });
}
