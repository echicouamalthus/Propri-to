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
import { SquarePen, Ticket, TicketPlus } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useServerAction } from 'zsa-react'
import { toast } from 'sonner'
import { useClientRole } from '@/lib/hook/use-check-client-role'
import { UpdateTicketAction } from './_action'

type TicketType = {
  type_de_demande: string
  priority: string
  statut: string
  description: string
  locataire: {
    id: string
    nom: string
    prenom: string
  }
  lot: {
    id: string
    nom_bien: string
  }
}

type UpdateProps = {
  params: {
    id: string
  }
}

export default function ReclamationFormUpdate({ params }: UpdateProps) {
  const [ticket, setTicket] = useState<TicketType>()

  const { execute } = useServerAction(UpdateTicketAction)

  const form = useForm<TypeTicket>({
    resolver: zodResolver(TicketSchema),
    defaultValues: {
      priority: 'Non-defini'
    }
  })

  useEffect(() => {
    const fetchTicketId = async () => {
      try {
        const response = await fetch(`/api/tenant/${params.id}`)
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des biens')
        }

        const data: TicketType = await response.json()
        form.reset({
          id: params.id,
          priority: data.priority || 'Non-defini',
          statut: data.statut,
          locataireId: data.locataire.id,
          lotId: data.lot.id,
          description: data.description,
          type_de_demande: data.type_de_demande
        })
        setTicket(data)
      } catch (error: any) {
        console.log(error.message)
      }
    }

    fetchTicketId()
  }, [form, params.id])

  async function onSubmit(_values: TypeTicket) {
    console.log(_values)
    await execute(_values)
  }

  return (
    <div className='mx-auto max-w-5xl space-y-8 px-4 py-6'>
      <div className='mx-auto flex max-w-3xl items-center bg-stone-50 p-4'>
        <Button variant={'ghost'}>
          <SquarePen className='h-16 w-16' />
        </Button>
        <div>
          <h3 className='font-mono lg:text-3xl'>
            Modification du Statut d&apos;un Ticket
          </h3>
          <p className='text-[9px] text-stone-600 lg:text-sm'>
            Afin de créer un nouveau Bien, veuillez complétez les information
            suivant. Les champs marqués d&apos;un * requis
          </p>
        </div>
      </div>
      {ticket && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='space-y-4 px-6'
          >
            {/* <FormField
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
            /> */}

            <FormField
              control={form.control}
              name='type_de_demande'
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Type de demande</FormLabel>
                    <FormControl>
                      <Input
                        disabled={true}
                        value={
                          ticket ? `${ticket.type_de_demande}` : field.value
                        }
                        onChange={field.onChange}
                      />
                    </FormControl>
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
                        disabled={true}
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
                          // console.log(ticket.priority)
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
              name='statut'
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Défini le statut de la demande</FormLabel>

                    <Select value={field.value} onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue
                            className='placeholder:text-stone-300'
                            placeholder='selectionnez'
                          />
                        </SelectTrigger>
                      </FormControl>

                      <SelectContent>
                        {['En Attente', 'En Cours', 'Terminer'].map(e => {
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
              name='description'
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        disabled={true}
                        value={field.value || ticket.description}
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
                        value={
                          ticket
                            ? `${ticket.locataire.nom} ${ticket.locataire.prenom}`
                            : field.value
                        }
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
                    <FormControl>
                      <Input
                        disabled={true}
                        value={ticket ? `${ticket.lot.nom_bien}` : field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )
              }}
            />

            {/* <FormField
              control={form.control}
              name='lotId'
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Assignez un Biens</FormLabel>

                    <Select
                      defaultValue={ticket.lot.nom_bien}
                      value={field.value}
                      onValueChange={field.onChange}
                      disabled
                    >
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
            /> */}

            <div className='flex justify-end'>
              <Button type='submit'>Enregistrer</Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  )
}
