import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { DEFAULT_LOGOUT_URL, NON_AUTH_FALLBACK_SLUG } from "@/app/auth/utils/enums";

const memberAuthTokenName = "_ms-mid";

export async function verifySession(redirectUnauth = false) {
  const cookieStore = cookies();
  const session = cookieStore.get(memberAuthTokenName)?.value;

  if (!session) {
    if (redirectUnauth) {
      redirect(NON_AUTH_FALLBACK_SLUG);
    }
    return null;
  }

  return session;
}

export async function createSession({ token, expires, sameSite = "lax" }) {
  const expirationInSeconds = expires ? getSessionDurationSeconds(expires) : 60 * 60 * 24 * 14;
  const cookieStore = cookies();

  cookieStore.set(memberAuthTokenName, token, {
    path: "/",
    sameSite,
    maxAge: expirationInSeconds,
  });
}

export const deleteSession = async () => {
  const cookieStore = cookies();
  cookieStore.delete(memberAuthTokenName);
  redirect(DEFAULT_LOGOUT_URL);
};

export function getSessionDurationSeconds(unixTimestampMillis) {
  const now = Date.now();
  const differenceMillis = unixTimestampMillis - now;
  return Math.max(0, Math.floor(differenceMillis / 1000));
}
