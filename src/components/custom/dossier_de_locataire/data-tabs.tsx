'use client'

import {
  FormField,
  Form,
  FormControl,
  FormMessage,
  FormLabel,
  FormItem
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { useEffect, useState } from 'react'
import {
  LucideIcon,
  LayoutDashboard,
  FileText,
  Info,
  CalendarIcon,
  User
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import {
  Dossier_de_locataireSchema,
  TDossier_de_locataire
} from '@/entites/dossier_de_locataire'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import {
  TooltipProvider,
  TooltipContent,
  TooltipTrigger,
  Tooltip
} from '@/components/ui/tooltip'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import { Calendar } from '@/components/ui/calendar'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import { useServerAction } from 'zsa-react'
import { UpdateDossierLocationAction } from './_action'
import { toast } from 'sonner'

interface Tab {
  id: string
  label: string
  icon: LucideIcon
}

export default function DataTab({ data }: { data: TDossier_de_locataire }) {
  const [activeTab, setActiveTab] = useState('tab1')

  const tabs: Tab[] = [
    { id: 'tab1', label: 'information général', icon: FileText },
    { id: 'tab2', label: 'entité', icon: User },
    { id: 'tab3', label: 'échéance', icon: CalendarIcon }
  ]

  const { execute } = useServerAction(UpdateDossierLocationAction)

  const form = useForm<TDossier_de_locataire>({
    resolver: zodResolver(Dossier_de_locataireSchema)
  })

  useEffect(() => {
    form.reset({
      id: data.id,
      nom_dossier: data.nom_dossier,
      etat_locatif: data.etat_locatif,
      date_de_signature: data.date_de_signature,
      prise_effet: data.prise_effet,
      date_de_fin: data.date_de_fin,
      language: data.language,
      clause: data.clause,
      type_de_contrat: data.type_de_contrat,
      jour_de_paiement: data.jour_de_paiement,
      frequence_de_paiement: data.frequence_de_paiement,
      locataireId: data.locataireId,
      lotId: data.lotId
    })
  }, [form, data])

  async function onSubmit(_values: TDossier_de_locataire) {
    console.log(_values)

    const [data, error] = await execute(_values)

    if (data) {
      toast.success(data)
    } else {
      console.log('voici mon erreur', error?.message)
    }
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'tab1':
        return (
          <div className='space-y-5'>
            <div>
              <h2 className='mb-4 text-2xl font-bold'>Dashboard Overview</h2>
              <p>
                Welcome to your dashboard. Here you can see an overview of your
                project&apos;s performance.
              </p>
            </div>
            
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className='space-y-6'
              >
                <FormField
                  control={form.control}
                  name='nom_dossier'
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Nom du dossier</FormLabel>
                        <FormControl>
                          <Input
                            type='text'
                            placeholder='Veuillez nommé ce dossier.'
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )
                  }}
                />

                <FormField
                  control={form.control}
                  name='etat_locatif'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Etat du bien</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue
                              className='placeholder:text-stone-300'
                              placeholder='Veuillez choisir etat du bien. Exemple: Active, en Attente, Terminer'
                            />
                          </SelectTrigger>
                        </FormControl>

                        <SelectContent>
                          {[
                            { label: 'active', valeur: 'ACTIVE' },
                            { label: 'en attente', valeur: 'EN ATTENTE' },
                            { label: 'terminer', valeur: 'TERMINER' }
                          ].map((e: { label: string; valeur: string }) => {
                            return (
                              <SelectItem key={e.label} value={e.valeur}>
                                {e.label}
                              </SelectItem>
                            )
                          })}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='language'
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Langue de communication</FormLabel>
                        <FormControl>
                          <RadioGroup
                            value={field.value}
                            onValueChange={field.onChange}
                          >
                            {['anglais', 'français'].map(
                              (e: string, index: number) => {
                                return (
                                  <FormItem
                                    key={index}
                                    className='cursor-pointer border'
                                  >
                                    <FormLabel className='flex cursor-pointer items-start justify-between gap-2 p-4 [&:has(:checked)]:border-stone-800 dark:[&:has(:checked)]:ring-stone-800'>
                                      <span className='capitalize'>{e}</span>
                                      <FormControl>
                                        <RadioGroupItem value={e} />
                                      </FormControl>
                                    </FormLabel>
                                  </FormItem>
                                )
                              }
                            )}
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )
                  }}
                />

                <FormField
                  control={form.control}
                  name='clause'
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>
                          A combien de mois s&apos;éleve la caution
                        </FormLabel>
                        <FormControl>
                          <Input
                            type='number'
                            placeholder='veuillez sélectionné un nombre entre 1 et 5'
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )
                  }}
                />

                <Button type='submit'>Enregistrer</Button>
              </form>
            </Form>
          </div>
        )
      case 'tab2':
        return (
          <div className='space-y-5'>
            <div>
              <h2 className='mb-4 text-2xl font-bold'>Analytics Data</h2>
              <p>View detailed analytics and metrics for your project here.</p>
            </div>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className='space-y-6'
              >
                <FormField
                  control={form.control}
                  name='type_de_contrat'
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Le type de bail (contrat)</FormLabel>
                        <FormControl>
                          <RadioGroup
                            value={field.value || data.type_de_contrat}
                            onValueChange={field.onChange}
                            className='grid gap-2 lg:grid-cols-3'
                          >
                            {[
                              'civil',
                              'résidence principale',
                              'logement étudiant'
                            ].map((e: string, index: number) => {
                              return (
                                <FormItem
                                  key={index}
                                  className='cursor-pointer border'
                                >
                                  <FormLabel className='flex cursor-pointer items-start justify-between gap-2 p-4 [&:has(:checked)]:border-stone-800 dark:[&:has(:checked)]:ring-stone-800'>
                                    <div className='flex items-center gap-2'>
                                      <span className='capitalize'>{e}</span>
                                      {e === 'civil' ? (
                                        <TooltipProvider>
                                          <Tooltip>
                                            <TooltipTrigger>
                                              <Info className='h-4 w-4' />
                                            </TooltipTrigger>
                                            <TooltipContent className='w-72 rounded border bg-stone-500 px-2 text-xs text-white'>
                                              Ce type de contrat concerne les
                                              parkings, les bureaux et
                                              résidences secondaires
                                            </TooltipContent>
                                          </Tooltip>
                                        </TooltipProvider>
                                      ) : null}
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
                        <FormMessage />
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
                        <FormLabel>Assignez à </FormLabel>
                        <FormControl>
                          <Input
                            disabled={true}
                            value={
                              data
                                ? `${data.locataire.nom} ${data.locataire.prenom}`
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
                        <FormLabel>Assignez au</FormLabel>
                        <FormControl>
                          <Input
                            disabled={true}
                            value={data ? data.lot.nom_bien : field.value}
                            onChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )
                  }}
                />

                <Button type='submit'>Enregistrer</Button>
              </form>
            </Form>
          </div>
        )
      case 'tab3':
        return (
          <div className='space-y-5'>
            <div>
              <h2 className='mb-4 text-2xl font-bold'>Generated Reports</h2>
              <p>
                Access and download various reports related to your
                project&apos;s progress.
              </p>
            </div>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className='space-y-6'
              >
                <FormField
                  control={form.control}
                  name='date_de_signature'
                  render={({ field }) => (
                    <FormItem className='flex flex-col'>
                      <FormLabel> La date de signature du contrat</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              disabled={true}
                              variant={'outline'}
                              className={cn(
                                'w-full pl-3 text-left font-normal',
                                !field.value && 'text-muted-foreground'
                              )}
                            >
                              {field.value ? (
                                format(data.date_de_signature, 'dd/MM/yyyy')
                              ) : (
                                <span>Choisissez une date</span>
                              )}
                              <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className='w-auto p-0' align='start'>
                          <Calendar
                            className='w-full'
                            mode='single'
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={date => date < new Date('1900-01-01')}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='prise_effet'
                  render={({ field }) => (
                    <FormItem className='flex flex-col'>
                      <FormLabel>
                        La date de prise d&apos;effet du contrat
                      </FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={'outline'}
                              className={cn(
                                'w-full pl-3 text-left font-normal',
                                !field.value && 'text-muted-foreground'
                              )}
                            >
                              {field.value ? (
                                format(data.prise_effet, 'dd/MM/yyyy')
                              ) : (
                                <span>Choisissez une date</span>
                              )}
                              <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className='w-auto p-0' align='start'>
                          <Calendar
                            className='w-full'
                            mode='single'
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={date => date < new Date('1900-01-01')}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='date_de_fin'
                  render={({ field }) => (
                    <FormItem className='flex flex-col'>
                      <FormLabel>La date de fin du contrat</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={'outline'}
                              className={cn(
                                'w-full pl-3 text-left font-normal',
                                !field.value && 'text-muted-foreground'
                              )}
                            >
                              {field.value ? (
                                format(data.date_de_fin, 'dd/MM/yyyy')
                              ) : (
                                <span>Choisissez une date</span>
                              )}
                              <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className='w-auto p-0' align='start'>
                          <Calendar
                            className='w-full'
                            mode='single'
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={date => date < new Date('1900-01-01')}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='jour_de_paiement'
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Le jour d paiement du loyer</FormLabel>
                        <FormControl>
                          <Input
                            type='number'
                            placeholder='veuillez sélectionné un nombre entre 1 et 30'
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )
                  }}
                />

                <FormField
                  control={form.control}
                  name='frequence_de_paiement'
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Frquence de paiement du loyer</FormLabel>

                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue
                                className='placeholder:text-stone-300'
                                placeholder='selectionnez la périodicité du loyer'
                              />
                            </SelectTrigger>
                          </FormControl>

                          <SelectContent>
                            {[
                              'mensuel',
                              'bimestriel',
                              'trimestriel',
                              'annuel'
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

                <Button type='submit'>Enregistrer</Button>
              </form>
            </Form>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className='mx-auto w-full max-w-4xl p-4'>
      <div className='mb-4 grid space-x-1 rounded-lg bg-muted p-1 lg:grid-cols-3'>
        {tabs.map(tab => {
          const Icon = tab.icon
          return (
            <button
              key={tab.id}
              className={`flex items-center justify-center space-x-2 rounded-md px-3 py-1.5 text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-primary text-white shadow-sm'
                  : 'text-muted-foreground hover:bg-background/50 hover:text-foreground'
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              <Icon className='h-4 w-4' />
              <span>{tab.label}</span>
            </button>
          )
        })}
      </div>
      <Card>
        <CardContent className='p-6'>{renderContent()}</CardContent>
      </Card>
    </div>
  )
}
