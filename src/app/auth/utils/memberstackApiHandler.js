import { verifySession } from "@/app/auth/utils/session";
import { AuthError } from "@/app/auth/utils/errors";

const API_ENDPOINT = "https://client.memberstack.com";

class MemberstackApiHandler {
  constructor() {
    this.baseUrl = API_ENDPOINT;
    this.apiKey = process.env.MEMBERSTACK_PUBLIC_KEY || process.env.NEXT_PUBLIC_MEMBERSTACK_PUBLIC_KEY || "";

    if (!this.apiKey) {
      throw new Error("API key is missing from environment variables.");
    }
  }

  async request(params) {
    try {
      const token = await verifySession(false);
      const headers = {
        ...(token ? { authorization: `Bearer ${token}` } : {}),
        "X-API-Key": this.apiKey,
        "Content-Type": "application/json",
      };

      const res = await fetch(`${this.baseUrl}/${params.routeParams}`, {
        method: params.method,
        headers,
        body: params.body ? JSON.stringify(params.body) : undefined,
        credentials: "include",
      });

      const resData = await res.json();

      if (res.ok) {
        return {
          type: "success",
          data: resData.data,
        };
      }

      if (res.status >= 400 && res.status < 500) {
        throw new AuthError(resData?.message || "Memberstack validation error", res.status);
      }

      throw new Error("An unknown error occurred.");
    } catch (err) {
      if (err instanceof AuthError) {
        return {
          type: "error",
          data: err.message,
        };
      }

      throw err;
    }
  }
}

export { MemberstackApiHandler };
