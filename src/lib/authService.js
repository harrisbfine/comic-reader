import { getMemberstack, waitForMemberstack } from "./memberstack";

function sanitizeRedirect(redirect, defaultPath = "/library") {
  if (!redirect) return defaultPath;
  try {
    const url = new URL(redirect, window.location.origin);
    // In production, disallow localhost redirects
    if (window.location.hostname !== "localhost" && url.hostname === "localhost") {
      return defaultPath;
    }
    // Keep only path+search+hash to stay inside the app
    return url.pathname + url.search + url.hash;
  } catch (err) {
    return defaultPath;
  }
}

const authService = {
  async signup(email, password) {
    await waitForMemberstack();
    const ms = getMemberstack();
    if (!ms || typeof ms.signup !== "function") {
      throw new Error("Memberstack not available");
    }

    // Try object-shaped args first, fallback to positional
    try {
      const res = await ms.signup({ email, password });
      if (res && res.redirect) res.redirect = sanitizeRedirect(res.redirect);
      return res;
    } catch (err) {
      try {
        const res = await ms.signup(email, password);
        if (res && res.redirect) res.redirect = sanitizeRedirect(res.redirect);
        return res;
      } catch (err2) {
        throw err2 || err;
      }
    }
  },

  sanitizeRedirect,
};

export default authService;
