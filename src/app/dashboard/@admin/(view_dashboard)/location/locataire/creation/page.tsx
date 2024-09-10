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
import {
  CalendarIcon,
  FolderPlus,
  Info,
  Paperclip,
  UserPlus
} from 'lucide-react'
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
import { LocataireSchema, TLocataire } from '@/entites/locataire'
import { DatetimePicker } from '@/components/ui/extension/datetime-picker'
import { PhoneInput } from '@/components/ui/phone-input'
import { createLocataireAction } from './_action'
import { useServerAction } from 'zsa-react'

const steps = [
  { label: 'identité' },
  { label: 'coordonnée' },
  { label: 'situation social' },
  { label: 'situation professionnel' }
]

export default function CreateOwnerForm() {
  const [formData, setFormData] = useState<TLocataire>()

  const updateForm = (newData: TLocataire) => {
    setFormData(prevData => ({ ...prevData, ...newData }))
  }

  return (
    <main className='mx-auto max-w-5xl space-y-8 px-4 py-6'>
      <div className='mx-auto flex max-w-3xl items-center bg-stone-50 p-4'>
        <Button variant={'ghost'}>
          <UserPlus className='h-16 w-16' />
        </Button>
        <div>
          <h3 className='font-mono lg:text-3xl'>Nouveau locataire</h3>
          <p className='text-[9px] text-stone-600 lg:text-sm'>
            Afin de créer un nouveau locataire, veuillez complétez les
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
                  <ThirdStepForm updateFormData={updateForm} />
                ) : index === 3 ? (
                  <FourthStepForm
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
  updateFormData: (newData: TLocataire) => void
}) {
  const { nextStep } = useStepper()

  const form = useForm<TLocataire>({
    resolver: zodResolver(
      LocataireSchema.pick({
        nom: true,
        prenom: true,
        date_de_naissance: true,
        lieu_de_naissance: true
      })
    )
  })

  function onSubmit(_values: TLocataire) {
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
              name='nom'
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Nom</FormLabel>
                    <FormControl>
                      <Input placeholder='Veuillez entrez un nom.' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )
              }}
            />
            <FormField
              control={form.control}
              name='prenom'
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Prenom</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Veuillez entrez un prenom.'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )
              }}
            />

            <div className='grid gap-3 lg:grid-cols-2'>
              <FormField
                control={form.control}
                name='date_de_naissance'
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Date de naissance</FormLabel>
                      <FormControl>
                        <DatetimePicker
                          {...field}
                          format={[['months', 'days', 'years'], []]}
                        />
                      </FormControl>
                    </FormItem>
                  )
                }}
              />

              <FormField
                control={form.control}
                name='lieu_de_naissance'
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Lieu de naissance</FormLabel>
                      <FormControl>
                        <Input
                          className='col-span-2 w-full'
                          placeholder='Veuillez entrez le lieu de naissance'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )
                }}
              />
            </div>

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
  updateFormData: (newData: TLocataire) => void
}) {
  const { nextStep } = useStepper()

  const form = useForm<TLocataire>({
    resolver: zodResolver(
      LocataireSchema.pick({
        adresse_actuel: true,
        telephone: true,
        email: true
      })
    )
  })

  // console.log(locataire)
  // console.log(lot)

  function onSubmit(_values: TLocataire) {
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
              name='adresse_actuel'
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Votre adresse actuelle</FormLabel>
                    <FormControl>
                      <Input placeholder='Veuillez entrez un nom.' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )
              }}
            />

            <FormField
              control={form.control}
              name='telephone'
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Votre numéro de téléphone</FormLabel>
                    <FormControl>
                      <PhoneInput
                        {...field}
                        defaultCountry='CI'
                        placeholder='Vueillez entrez votre numéro de téléphone'
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
                    <FormLabel>Votre email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Veuillez entrez un email correct'
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

function ThirdStepForm({
  updateFormData
}: {
  updateFormData: (newData: TLocataire) => void
}) {
  const { nextStep } = useStepper()
  //   const { isPending, execute } = useServerAction(createDossierLocationAction)

  const form = useForm<TLocataire>({
    resolver: zodResolver(
      LocataireSchema.pick({
        statu_marital: true,
        total_people: true,
        type_lot: true,
        pet: true
      })
    )
  })

  async function onSubmit(_values: TLocataire) {
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
              name='total_people'
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Le nombre de personne à charge</FormLabel>
                    <FormControl>
                      <Input
                        type='number'
                        placeholder='veuillez sélectionné un nombre'
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
              name='statu_marital'
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Votre Situation conjuguale</FormLabel>

                    <Select value={field.value} onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue
                            className='placeholder:text-stone-300'
                            placeholder='sélectionné votre status conjuguale'
                          />
                        </SelectTrigger>
                      </FormControl>

                      <SelectContent>
                        {[
                          'célibataire',
                          'marié(e)',
                          'divorcé(e)',
                          'veuf/veuve',
                          'en couple'
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
              name='type_lot'
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Le type de logement actuelle</FormLabel>

                    <Select value={field.value} onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue
                            className='placeholder:text-stone-300'
                            placeholder='sélectionné votre status conjuguale'
                          />
                        </SelectTrigger>
                      </FormControl>

                      <SelectContent>
                        {[
                          'proprietaire',
                          'locataire',
                          'hébergé à titre gratuit',
                          'co-location',
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
              name='pet'
              render={({ field }) => (
                <FormItem className='flex flex-row items-center justify-between rounded-lg border p-4'>
                  <div className='space-y-0.5'>
                    <FormLabel className='text-base'>
                      Animal de companie
                    </FormLabel>
                    <FormDescription>
                      En cochant cette case vous confirmer que vous êtes
                      propriétaire d&apos;un animale de companie
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      aria-readonly
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <StepperFormActions />
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
function FourthStepForm({
  updateFormData,
  formData
}: {
  updateFormData: (newData: TLocataire) => void
  formData: TLocataire | undefined
}) {
  const { nextStep } = useStepper()
  const { isPending, execute } = useServerAction(createLocataireAction)

  const form = useForm<TLocataire>({
    resolver: zodResolver(
      LocataireSchema.pick({
        statu_pro: true,
        employeur: true
      })
    )
  })

  async function onSubmit(_values: TLocataire) {
    // console.log(`Final Form Data:`, { ...formData, ..._data })
    updateFormData(_values)
    console.log({ ...formData, ..._values })
    const [data, error] = await execute({ ...formData, ..._values })
    if (data) {
      console.log('final data', data)
      nextStep()
    } else {
      console.log('something was wrong', error)
    }
  }

  return (
    <Card className='pt-8'>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
            <FormField
              control={form.control}
              name='statu_pro'
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Votre Situation Professionnel</FormLabel>

                    <Select value={field.value} onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue
                            className='placeholder:text-stone-300'
                            placeholder='selectionnez votre status professionnel'
                          />
                        </SelectTrigger>
                      </FormControl>

                      <SelectContent>
                        {[
                          'CDD(contrat à Durée Déterminé)',
                          'CDI(contrat à Durée Indéterminé)',
                          'Indépendant',
                          'étudiant'
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
              name='employeur'
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Votre employeur</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='veuillez entrez votre employeur.Ex:Apple, Microsoft'
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
