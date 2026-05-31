"use server";

import { signupEmailWithPasswordAction } from "@/app/auth/actions";

async function signupUserAction(prevState, formData) {
  const form = Object.fromEntries(formData.entries());
  const res = await signupEmailWithPasswordAction({
    email: form.email,
    password: form.password,
  });

  if (res.type === "success") {
    return {
      success: true,
      errorMessage: "",
    };
  }

  return {
    success: false,
    errorMessage: res.data || "Signup failed",
  };
}

export { signupUserAction };
