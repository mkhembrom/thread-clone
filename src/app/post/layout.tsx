import getCurrentUser from "@/components/currentUser/currentUser";
import { redirect } from "next/navigation";
import { loginIsRequiredServer } from "../api/auth/[...nextauth]/route";

type Props = {
  children: React.ReactNode;
};
export default async function Layout({ children }: Props) {
  await loginIsRequiredServer();
  const session = await getCurrentUser();

  return <>{children}</>;
}
