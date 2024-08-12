"use client";
import { useClientRole } from "@/lib/hook/use-check-client-role";
import Image from "next/image";
import photo_Building from "../../public/assets/achitecture photo.jpg";
import LogoSvgIcon from "../../public/proprio-to.svg";
import { Button } from "./ui/button";

export default function RolePage({
  user,
  admin,
}: {
  user: React.ReactNode;
  admin: React.ReactNode;
}) {
  const { role, verifyRole } = useClientRole();

  return (
    <main>
      {role === null ? (
        <section className="grid lg:grid-cols-2 gap-3 h-screen">
          <div className="space-y-5 p-4 h-full flex flex-col gap-5 justify-center">
            <div className="space-y-3">
              <div className="flex items-center gap-5 justify-center">
                <Image
                  src={LogoSvgIcon}
                  alt="logo SVG"
                  width={100}
                  height={100}
                />
                <span className="font-mono text-4xl font-bold">Proprio-to</span>
              </div>
              <h1 className="text-center text-lg">Vous êtes ...</h1>
            </div>
            <div className="flex flex-col gap-5 justify-center">
              <Button onClick={() => verifyRole("admin")}>Gestionnaire</Button>
              <Button onClick={() => verifyRole("user")}>Locataire</Button>
            </div>
          </div>
          <div className="relative h-screen lg:block hidden">
            <Image
              src={photo_Building}
              alt="photo role"
              width={900}
              height={900}
              className="w-full h-full absolute"
            />
          </div>
        </section>
      ) : role === "admin" ? (
        admin
      ) : (
        user
      )}
    </main>
  );
}

// <div>
//       <Link href={"/dashboard"} onClick={() => verifyRole("admin")}>
//         Gestionnaire
//       </Link>
//       <Link href={"/dashboard"} onClick={() => verifyRole("user")}>
//         Locataire
//       </Link>
//     </div>
