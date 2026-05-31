import { deleteSession } from "@/app/auth/utils/session";

export default async function LogoutPage() {
  await deleteSession();
  return null;
}
