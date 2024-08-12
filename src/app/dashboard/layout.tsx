import RolePage from "@/components/RolePage";

export default function layout({
  admin,
  user,
}: {
  admin: React.ReactNode;
  user: React.ReactNode;
}) {
  return <RolePage user={user} admin={admin} />;
}
