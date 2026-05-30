export function getMemberstack() {
  if (typeof window === "undefined") return null;
  return window.ms || window.memberstack || window.MemberStack || null;
}
