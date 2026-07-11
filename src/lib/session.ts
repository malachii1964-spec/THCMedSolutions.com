import { headers } from "next/headers";
import { auth } from "@/lib/auth";

/**
 * Session lookup used by server components. Kept behind this seam so UI
 * never imports auth internals.
 */
export type SessionUser = {
  id: string;
  name: string;
  email: string;
};

export async function getSessionUser(): Promise<SessionUser | null> {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return null;
  const { id, name, email } = session.user;
  return { id, name, email };
}
