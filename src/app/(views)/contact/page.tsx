'use client'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { PhoneInput } from '@/components/ui/phone-input'
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { contactSchema, TContactShema } from '@/lib/constante'
import { zodResolver } from '@hookform/resolvers/zod'
import { SelectContent } from '@radix-ui/react-select'
import React from 'react'
import { useForm } from 'react-hook-form'

export default function Contact() {
  const form = useForm<TContactShema>({
    resolver: zodResolver(contactSchema)
  })

  async function Submit(_data: TContactShema) {
    console.log(_data)
  }

  return (
    <main>
      <header className='grid min-h-44 place-content-center bg-stone-50 lg:min-h-96'>
        <div className='space-y-2 text-center lg:space-y-4'>
          <h1 className='font-mono text-4xl lg:text-7xl'>
            Pour nous contacter
          </h1>
          <p className='w-72 text-sm lg:w-auto lg:text-xl'>
            Vous avez une question ou vous voulez juste nous dire bonjour ?
          </p>
        </div>
      </header>

      <section className='mx-auto max-w-4xl py-8'>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(Submit)}
            className='grid gap-4 px-4 lg:grid-cols-2 lg:px-0'
          >
            <FormField
              control={form.control}
              name='nom'
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Nom</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Votre Nom. Ex:John Doe...'
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )
              }}
            />

            <FormField
              control={form.control}
              name='entreprise'
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Entreprise</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Votre Entreprise. Ex: la pâtisserie'
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )
              }}
            />

            <FormField
              control={form.control}
              name='email'
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Votre Email. Ex: johndoe@example.com'
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )
              }}
            />

            <FormField
              control={form.control}
              name='phone_number'
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Telephone</FormLabel>
                    <FormControl>
                      <PhoneInput
                        {...field}
                        defaultCountry='CI'
                        placeholder='Votre numéro de téléphone.'
                      />
                    </FormControl>
                  </FormItem>
                )
              }}
            />

            <FormField
              control={form.control}
              name='sujet'
              render={({ field }) => {
                return (
                  <FormItem className='col-span-full'>
                    <FormLabel>Sujet</FormLabel>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Demande d'informations" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {["Demande d'informations", 'Candidature', 'Autre'].map(
                          (e: string, index: number) => {
                            return (
                              <SelectItem key={index} value={e}>
                                {e}
                              </SelectItem>
                            )
                          }
                        )}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )
              }}
            />

            <FormField
              control={form.control}
              name='message'
              render={({ field }) => {
                return (
                  <FormItem className='col-span-full'>
                    <FormLabel>Telephone</FormLabel>
                    <FormControl>
                      <Textarea
                        rows={6}
                        placeholder='Décrivez nous les raisons pour lesquelles vous nous contactez.Nous vous reviendrons au plus vite.'
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )
              }}
            />
          </form>
        </Form>
      </section>
    </main>
  )
}
