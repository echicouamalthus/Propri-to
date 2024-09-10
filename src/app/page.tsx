import NavBar from '@/components/NavBar'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <main>
      <NavBar />

      <section className='mx-auto my-4 grid max-w-5xl place-content-center gap-6 lg:min-h-[550px]'>
        <h1 className='px-2 text-center font-mono text-5xl lg:text-6xl'>
          Une solution à long terme pour les contrats de location optimisés.
        </h1>

        <h3 className='text-center text-2xl'>
          Grâce à <span className='font-mono font-bold'>Proprio-to</span>,
          réduisez vos coûts et améliorez l’expérience de vos résidents !
        </h3>

        <div className='flex flex-col items-center justify-center'>
          <Button variant={'default'} className='' size={'lg'}>
            <Link href={'/dashboard'}>Lancez-vous - C&apos;est Gratuit !</Link>
          </Button>
          <Button asChild variant={'link'} className=''>
            <Link href={'/contact'}>Contactez-nous</Link>
          </Button>
        </div>
      </section>
    </main>
  )
}
