import getCurrentUser from "@/components/currentUser/currentUser";
import { loginIsRequiredServer } from "@/lib/isLoginUser";

type Props = {
  children: React.ReactNode;
};
export default async function Layout({ children }: Props) {
  await loginIsRequiredServer();
  const session = await getCurrentUser();

  return <>{children}</>;
}
