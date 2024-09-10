'use client'

import { connectionAction } from '@/app/dashboard/@user/_action'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useGetLocator } from '@/lib/hook/use-get-Locator'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import { useServerAction } from 'zsa-react'

const UserSchema = z.object({
  email: z.string().email()
})

export function LoginForm() {
  const form = useForm<z.infer<typeof UserSchema>>({
    resolver: zodResolver(UserSchema)
  })

  const { getTenant } = useGetLocator()

  const { isPending, execute } = useServerAction(connectionAction)

  async function onSubmit(_values: z.infer<typeof UserSchema>) {
    const [data, err] = await execute(_values)

    if (!data) {
      toast.info('Email ne corresponds pas')
      console.log('quelque chose ne marche pas', err)
    } else {
      getTenant(data)
    }
  }

  return (
    <main className='grid h-screen place-content-center'>
      <Card className='mx-2 max-w-sm lg:mx-auto'>
        <CardHeader>
          <CardTitle className='text-2xl'>Espace Locataire</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-3'>
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type='email'
                          placeholder='joe@example.com'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )
                }}
              />
              <Button disabled={isPending} type='submit' className='w-full'>
                {isPending ? 'En cours...' : 'Se connecter'}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </main>
  )
}
