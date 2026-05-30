function isMemberstackReady(ms) {
  return (
    ms &&
    (typeof ms.login === "function" ||
      typeof ms.signup === "function" ||
      typeof ms.logout === "function" ||
      typeof ms.getCurrentMember === "function" ||
      typeof ms.loginMemberEmailPassword === "function" ||
      typeof ms.signupMemberEmailPassword === "function" ||
      typeof ms.getMemberJSON === "function")
  );
}

export function getMemberstack() {
  if (typeof window === "undefined") return null;
  const raw =
    window.ms ||
    window.memberstack ||
    window.MemberStack ||
    window.$memberstackDom ||
    window.MemberstackPrebuiltUI ||
    null;
  return normalizeMemberstack(raw);
}

function normalizeMemberstack(raw) {
  if (!raw) return null;
  const client = {};

  if (typeof raw.getCurrentMember === "function") {
    client.getCurrentMember = (...args) => raw.getCurrentMember(...args);
  } else if (typeof raw.getMemberJSON === "function") {
    client.getCurrentMember = (...args) => raw.getMemberJSON(...args);
  }

  if (typeof raw.login === "function") {
    client.login = (...args) => raw.login(...args);
  } else if (typeof raw.loginMemberEmailPassword === "function") {
    client.login = ({ email, password }) => raw.loginMemberEmailPassword(email, password);
  } else if (typeof raw.loginMemberPasswordless === "function") {
    client.login = (...args) => raw.loginMemberPasswordless(...args);
  }

  if (typeof raw.signup === "function") {
    client.signup = (...args) => raw.signup(...args);
  } else if (typeof raw.signupMemberEmailPassword === "function") {
    client.signup = ({ email, password }) => raw.signupMemberEmailPassword(email, password);
  } else if (typeof raw.signupMemberPasswordless === "function") {
    client.signup = (...args) => raw.signupMemberPasswordless(...args);
  }

  if (typeof raw.logout === "function") {
    client.logout = (...args) => raw.logout(...args);
  } else if (typeof raw.logoutMember === "function") {
    client.logout = (...args) => raw.logoutMember(...args);
  }

  return client;
}

export function waitForMemberstack(timeoutMs = 5000) {
  return new Promise((resolve, reject) => {
    if (typeof window === "undefined") {
      reject(new Error("Memberstack is only available in the browser"));
      return;
    }

    const tryResolve = () => {
      const raw = getMemberstack();
      if (isMemberstackReady(raw)) {
        clearInterval(intervalId);
        clearTimeout(timeoutId);
        resolve(normalizeMemberstack(raw));
      }
    };

    const intervalId = setInterval(tryResolve, 100);
    const timeoutId = setTimeout(() => {
      clearInterval(intervalId);
      reject(new Error("Memberstack not available"));
    }, timeoutMs);

    tryResolve();
  });
}
