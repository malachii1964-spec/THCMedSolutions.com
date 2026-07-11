/**
 * Session lookup used by server components. Wired to Better Auth in
 * src/lib/auth.ts; kept behind this seam so UI never imports auth internals.
 */
export type SessionUser = {
  id: string;
  name: string;
  email: string;
};

export async function getSessionUser(): Promise<SessionUser | null> {
  // Auth lands with the membership feature; until then everyone is a visitor.
  return null;
}
