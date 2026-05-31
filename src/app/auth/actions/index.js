"use server";

import { MemberstackApiHandler } from "@/app/auth/utils/memberstackApiHandler";
import { createSession } from "@/app/auth/utils/session";

const memberstackApiHandler = new MemberstackApiHandler();

export const signupEmailWithPasswordAction = async ({
  email,
  password,
  customFields,
  metaData,
  captchaToken,
  plans,
}) => {
  const formattedUrl = `auth/signup`;
  const body = {
    email,
    password,
    customFields,
    metaData,
    captchaToken,
    plans,
  };

  const res = await memberstackApiHandler.request({
    method: "POST",
    routeParams: formattedUrl,
    body,
  });

  if (res.type === "success") {
    await createSession({
      token: res.data.tokens.accessToken,
      expires: res.data.tokens.expires,
      sameSite: "lax",
    });
  }

  return res;
};
