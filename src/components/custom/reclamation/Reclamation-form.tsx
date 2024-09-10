'use client'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { TicketSchema, TypeTicket } from '@/entites/ticket'
import { useGetLocator } from '@/lib/hook/use-get-Locator'
import { zodResolver } from '@hookform/resolvers/zod'
import { Ticket, TicketPlus } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useServerAction } from 'zsa-react'
import { ticketAction } from './_action'
import { toast } from 'sonner'
import { SheetClose, SheetContent } from '@/components/ui/sheet'
import { useClientRole } from '@/lib/hook/use-check-client-role'

export default function ReclamationForm() {
  const { tenant } = useGetLocator()
  const [lot, setLot] = useState<any[]>([])
  const { execute } = useServerAction(ticketAction)

  const form = useForm<TypeTicket>({
    resolver: zodResolver(
      TicketSchema.pick({
        type_de_demande: true,
        priority: true,
        statut: true,
        description: true,
        locataireId: true,
        lotId: true
      })
    ),
    defaultValues: {
      statut: 'En Attente',
      locataireId: tenant?.id
    }
  })

  // console.log(ticketId)

  useEffect(() => {
    const fetchLot = async () => {
      try {
        const response = await fetch('/api/property')
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des biens')
        }

        const data: any[] = await response.json()
        setLot(data)
      } catch (error: any) {
        console.log(error.message)
      }
    }

    fetchLot()

  }, [])

  async function onSubmit(_values: TypeTicket) {
    console.log(_values)

    const [data, error] = await execute(_values)

    if (data) {
      toast.info('votre demande à été enregistrer')
    } else {
      console.log("le message d'erreur", error)
    }
  }

  return (
    <SheetContent side={'bottom'} className='lg:h-[400px]'>
      <div className='scrollbar-thin scrollbar-thumb-stone-700 scrollbar-track-transparent mx-auto h-[350px] max-w-5xl overflow-y-scroll'>
        <div className='sticky top-0 flex items-center gap-4 bg-white p-3'>
          <TicketPlus className='h-8 w-8 lg:h-8 lg:w-8' />
          <h1 className='font-mono text-lg lg:text-2xl'>
            Créer une nouvelle demande
          </h1>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='space-y-4 px-6'
          >
            <FormField
              control={form.control}
              name='type_de_demande'
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Type de demande</FormLabel>

                    <Select value={field.value} onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue
                            className='placeholder:text-stone-300'
                            placeholder='sélectionné le type de demande'
                          />
                        </SelectTrigger>
                      </FormControl>

                      <SelectContent>
                        {[
                          'réparation',
                          'entretien',
                          'réclamation',
                          'question',
                          'autre'
                        ].map(e => {
                          return (
                            <SelectItem key={e} value={e}>
                              {e}
                            </SelectItem>
                          )
                        })}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )
              }}
            />

            <FormField
              control={form.control}
              name='priority'
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Type de demande</FormLabel>

                    <FormControl>
                      <RadioGroup
                        value={field.value}
                        onValueChange={field.onChange}
                        className='grid gap-2 lg:grid-cols-5'
                      >
                        {[
                          'Non-defini',
                          'Normal (72h)',
                          'Modérée (48h)',
                          'Haute (24h)',
                          'Critique (12h)'
                        ].map((e: string, index: number) => {
                          return (
                            <FormItem
                              key={index}
                              className='cursor-pointer border'
                            >
                              <FormLabel className='flex cursor-pointer items-start justify-between gap-2 p-4 [&:has(:checked)]:border-stone-800 dark:[&:has(:checked)]:ring-stone-800'>
                                <div className='flex items-center gap-2'>
                                  <span className='capitalize'>{e}</span>
                                </div>
                                <FormControl>
                                  <RadioGroupItem value={e} />
                                </FormControl>
                              </FormLabel>
                            </FormItem>
                          )
                        })}
                      </RadioGroup>
                    </FormControl>
                  </FormItem>
                )
              }}
            />

            <FormField
              control={form.control}
              name='description'
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Descriprtion</FormLabel>
                    <FormControl>
                      <Textarea
                        value={field.value || ''}
                        rows={4}
                        placeholder='Décrivez nous votre demande'
                        onChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )
              }}
            />

            <FormField
              control={form.control}
              name='locataireId'
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Emetteur</FormLabel>
                    <FormControl>
                      <Input
                        disabled={true}
                        value={tenant ? `${tenant?.nom} ${tenant?.prenom}` : ''}
                        onChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )
              }}
            />

            <FormField
              control={form.control}
              name='lotId'
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Assignez un Biens</FormLabel>

                    <Select value={field.value} onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue
                            className='placeholder:text-stone-300'
                            placeholder='selectionnez un biens'
                          />
                        </SelectTrigger>
                      </FormControl>

                      <SelectContent>
                        {lot.map(e => {
                          return (
                            <SelectItem key={e.id} value={e.id}>
                              {e.nom_bien}
                            </SelectItem>
                          )
                        })}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )
              }}
            />

            <SheetClose asChild>
              <div className='flex justify-end'>
                <Button type='submit'>
                  Enregistrer
                </Button>
              </div>
            </SheetClose>
          </form>
        </Form>
      </div>
    </SheetContent>
  )
}
