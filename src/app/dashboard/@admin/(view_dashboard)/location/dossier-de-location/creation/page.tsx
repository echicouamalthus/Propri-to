'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Step, Stepper, useStepper } from '@/components/ui/stepper'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useEffect, useState } from 'react'
import { TProprietaire } from '@/entites/proprietaire'
import { CalendarIcon, FolderPlus, Info, Paperclip } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Switch } from '@/components/ui/switch'
import { Card, CardContent } from '@/components/ui/card'
import { LotSchema, TLot } from '@/entites/lot'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import {
  MultiSelector,
  MultiSelectorContent,
  MultiSelectorInput,
  MultiSelectorItem,
  MultiSelectorList,
  MultiSelectorTrigger
} from '@/components/ui/multi-select'
import { DropzoneOptions } from 'react-dropzone'
import {
  FileInput,
  FileUploader,
  FileUploaderContent,
  FileUploaderItem
} from '@/components/ui/file-upload'
import {
  Dossier_de_locataireSchema,
  TDossier_de_locataire
} from '@/entites/dossier_de_locataire'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { ListOption, ListOption2 } from '@/lib/constant/list-option'
import { Label } from '@/components/ui/label'
import { TooltipContent, TooltipTrigger } from '@radix-ui/react-tooltip'
import { Tooltip, TooltipProvider } from '@/components/ui/tooltip'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import { format } from 'date-fns'
import { Calendar } from '@/components/ui/calendar'
import { createDossierLocationAction } from './_action'
import { useServerAction } from 'zsa-react'

const steps = [
  { label: 'informations générales' },
  { label: 'personnes associé' },
  { label: 'suivi du contrat' }
]

export default function CreateOwnerForm() {
  const [formData, setFormData] = useState<TDossier_de_locataire>()

  const updateForm = (newData: TDossier_de_locataire) => {
    setFormData(prevData => ({ ...prevData, ...newData }))
  }

  return (
    <main className='mx-auto max-w-5xl space-y-8 px-4 py-6'>
      <div className='mx-auto flex max-w-3xl items-center bg-stone-50 p-4'>
        <Button variant={'ghost'}>
          <FolderPlus className='h-16 w-16' />
        </Button>
        <div>
          <h3 className='font-mono lg:text-3xl'>Nouveau Dossier de location</h3>
          <p className='text-[9px] text-stone-600 lg:text-sm'>
            Afin de créer un nouveau dossier de location, veuillez complétez les
            information suivant. Les champs marqués d&apos;un * requis
          </p>
        </div>
      </div>
      <div className='flex w-full flex-col gap-4'>
        <Stepper
          variant='circle-alt'
          initialStep={0}
          steps={steps}
          className='capitalize'
        >
          {steps.map((stepProps, index) => {
            return (
              <Step key={stepProps.label} {...stepProps}>
                {index === 0 ? (
                  <FirstStepForm updateFormData={updateForm} />
                ) : index === 1 ? (
                  <SecondStepForm updateFormData={updateForm} />
                ) : index === 2 ? (
                  <ThirdStepForm
                    updateFormData={updateForm}
                    formData={formData}
                  />
                ) : null}
              </Step>
            )
          })}
          <MyStepperFooter />
        </Stepper>
      </div>
    </main>
  )
}

function FirstStepForm({
  updateFormData
}: {
  updateFormData: (newData: TDossier_de_locataire) => void
}) {
  const { nextStep } = useStepper()

  const form = useForm<TDossier_de_locataire>({
    resolver: zodResolver(
      Dossier_de_locataireSchema.pick({
        nom_dossier: true,
        etat_locatif: true,
        language: true,
        clause: true
      })
    ),
    defaultValues: {
      etat_locatif: 'EN ATTENTE'
    }
  })

  function onSubmit(_values: TDossier_de_locataire) {
    console.log(_values)
    updateFormData(_values)
    nextStep()
  }

  return (
    <Card className='pt-8'>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
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

            <StepperFormActions />
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

function SecondStepForm({
  updateFormData
}: {
  updateFormData: (newData: TDossier_de_locataire) => void
}) {
  const { nextStep } = useStepper()

  const form = useForm<TDossier_de_locataire>({
    resolver: zodResolver(
      Dossier_de_locataireSchema.pick({
        type_de_contrat: true,
        locataireId: true,
        lotId: true
      })
    )
  })

  const [locataire, setLocataire] = useState<any[]>([])
  const [lot, setLot] = useState<any[]>([])

  useEffect(() => {
    const fetchLocataire = async () => {
      try {
        const response = await fetch('/api/tenant')
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des locataire')
        }

        const data: any[] = await response.json()
        setLocataire(data)
      } catch (error: any) {
        console.log(error.message)
      }
    }

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
    fetchLocataire()
  }, [])

  // console.log(locataire)
  // console.log(lot)

  function onSubmit(_values: TDossier_de_locataire) {
    console.log(_values)
    updateFormData(_values)
    nextStep()
  }

  return (
    <Card className='pt-8'>
      <CardContent>
        {locataire.length > 0 && lot.length > 0 && (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
              <FormField
                control={form.control}
                name='type_de_contrat'
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Le type de bail (contrat)</FormLabel>
                      <FormControl>
                        <RadioGroup
                          value={field.value}
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
                                            parkings, les bureaux et résidences
                                            secondaires
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
                      <FormLabel>Assignez un Locataire</FormLabel>

                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue
                              className='placeholder:text-stone-300'
                              placeholder='selectionnez un locataire'
                            />
                          </SelectTrigger>
                        </FormControl>

                        <SelectContent>
                          {locataire.map(e => {
                            return (
                              <SelectItem key={e.id} value={e.id}>
                                {e.nom} {''} {e.prenom}
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
                name='lotId'
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Assignez un Biens</FormLabel>

                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
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
              />
              <StepperFormActions />
            </form>
          </Form>
        )}
      </CardContent>
    </Card>
  )
}

function ThirdStepForm({
  updateFormData,
  formData
}: {
  updateFormData: (newData: TDossier_de_locataire) => void
  formData: TDossier_de_locataire | undefined
}) {
  const { nextStep } = useStepper()
  const { isPending, execute } = useServerAction(createDossierLocationAction)

  const form = useForm<TDossier_de_locataire>({
    resolver: zodResolver(
      Dossier_de_locataireSchema.pick({
        date_de_signature: true,
        prise_effet: true,
        date_de_fin: true,
        jour_de_paiement: true,
        frequence_de_paiement: true
      })
    )
  })

  async function onSubmit(_values: TDossier_de_locataire) {
    // console.log(`Final Form Data:`, { ...formData, ..._data })
    updateFormData(_values)
    console.log({ ...formData, ..._values })
    await execute({ ...formData, ..._values })
  }

  return (
    <Card className='pt-8'>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
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
                          variant={'outline'}
                          className={cn(
                            'w-full pl-3 text-left font-normal',
                            !field.value && 'text-muted-foreground'
                          )}
                        >
                          {field.value ? (
                            format(field.value, 'dd/MM/yyyy')
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
                            format(field.value, 'dd/MM/yyyy')
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
                            format(field.value, 'dd/MM/yyyy')
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

                    <Select value={field.value} onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue
                            className='placeholder:text-stone-300'
                            placeholder='selectionnez la périodicité du loyer'
                          />
                        </SelectTrigger>
                      </FormControl>

                      <SelectContent>
                        {['mensuel', 'bimestriel', 'trimestriel', 'annuel'].map(
                          e => {
                            return (
                              <SelectItem key={e} value={e}>
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

            <StepperFormActions />
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

function StepperFormActions() {
  const {
    prevStep,
    resetSteps,
    isDisabledStep,
    hasCompletedAllSteps,
    isLastStep
  } = useStepper()

  return (
    <div className='flex w-full justify-end gap-2'>
      {hasCompletedAllSteps ? (
        <Button size='sm' onClick={resetSteps}>
          Reset
        </Button>
      ) : (
        <div className='flex w-full justify-end gap-2'>
          <Button
            disabled={isDisabledStep}
            onClick={prevStep}
            size='sm'
            variant='secondary'
            type='button'
          >
            précédent
          </Button>
          <Button size='sm' type='submit'>
            {isLastStep ? 'terminer' : 'continuer'}
          </Button>
        </div>
      )}
    </div>
  )
}

function MyStepperFooter() {
  const { activeStep, resetSteps, steps } = useStepper()

  if (activeStep !== steps.length) {
    return null
  }

  return (
    <>
      <div className='my-2 flex h-40 items-center justify-center rounded-md border bg-secondary text-primary'>
        <h1 className='text-xl'>Yoohoo! Toutes étapes sont remplis ! 🎉</h1>
      </div>
      <div className='flex items-center justify-end gap-2'>
        <Button onClick={resetSteps}>Reset Stepper with Form</Button>
      </div>
    </>
  )
}
