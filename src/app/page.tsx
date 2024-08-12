import NavBar from "@/components/NavBar";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <NavBar />

      <section className="mx-auto grid lg:min-h-[550px] max-w-5xl place-content-center gap-6 my-4">
        <h1 className="text-center font-mono lg:text-6xl text-5xl px-2">
          Une solution à long terme pour les contrats à court terme
        </h1>

        <h3 className="text-center text-2xl">
          Grâce à Ublo, réduisez vos coûts et améliorez l’expérience de vos
          résidents !
        </h3>

        <div className="flex flex-col  items-center lg:space-x-4 justify-center">
          <Button variant={"default"} className="" size={"lg"}>
            <Link href={"/dashboard"}>Lancez-vous - C&apos;est Gratuit !</Link>
          </Button>
          <Button asChild variant={"link"} className="">
            <Link href={"#"}>Contactez-nous si besoin</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
