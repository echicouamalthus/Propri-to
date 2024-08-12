'use client'

import { useServerAction } from 'zsa-react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { format } from 'date-fns'
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
import { useState } from 'react'
import { TProprietaire, Proprietaire } from '@/entites/proprietaire'
import { PhoneInput } from '@/components/ui/phone-input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import { CalendarIcon } from 'lucide-react'
import { Calendar } from '@/components/ui/calendar'
import { cn } from '@/lib/utils'
import { Switch } from '@/components/ui/switch'
import { Card, CardContent } from '@/components/ui/card'
import { BriefcaseBusiness } from 'lucide-react'
import { createProprietaireAction } from './_action'

const steps = [{ label: 'informations Personnels ' }, { label: 'facturation' }]

export default function CreateOwnerForm() {
  const [formData, setFormData] = useState<TProprietaire>()

  const updateForm = (newData: TProprietaire) => {
    setFormData(prevData => ({ ...prevData, ...newData }))
  }

  return (
    <main className='mx-auto max-w-5xl space-y-8 px-4 py-6'>
      <div className='mx-auto flex max-w-3xl items-center bg-stone-50 p-4'>
        <Button variant={'ghost'}>
          <BriefcaseBusiness className='h-16 w-16' />
        </Button>
        <div>
          <h3 className='font-mono lg:text-3xl'>Nouveau Propriétaire</h3>
          <p className='text-[9px] text-stone-600 lg:text-sm'>
            Afin de créer un nouveau propriétaire, veuillez complétez les
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
                ) : (
                  <SecondStepForm
                    updateFormData={updateForm}
                    formData={formData}
                  />
                )}
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
  updateFormData: (newData: TProprietaire) => void
}) {
  const { nextStep } = useStepper()

  const form = useForm<TProprietaire>({
    resolver: zodResolver(
      Proprietaire.pick({
        nom_complet: true,
        adresse: true,
        telephone: true,
        email: true
      })
    )
  })

  function onSubmit(_data: TProprietaire) {
    updateFormData(_data)
    nextStep()
  }

  return (
    <Card className='pt-8'>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
            <FormField
              control={form.control}
              name='nom_complet'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nom</FormLabel>
                  <FormControl>
                    <Input placeholder='John Doe' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder='johnDo@gmail.com' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {/* <FormField
              control={form.control}
              name='date_de_naissance'
              render={({ field }) => (
                <FormItem className='flex flex-col'>
                  <FormLabel>Date de naissance</FormLabel>
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
                            format(field.value, 'MM/dd/yyyy')
                          ) : (
                            <span>Selectionnez une date</span>
                          )}
                          <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className='w-auto p-0' align='start'>
                      <Calendar
                        mode='single'
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={date =>
                          date > new Date() || date < new Date('1900-01-01')
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            /> */}

            <FormField
              control={form.control}
              name='adresse'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Une adresse</FormLabel>
                  <FormControl>
                    <Input placeholder='yopougon Banco 2' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='telephone'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Téléphone</FormLabel>
                  <FormControl>
                    <PhoneInput placeholder='+225 00 00 00 0000' {...field} />
                  </FormControl>
                  <FormMessage />
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

function SecondStepForm({
  updateFormData,
  formData
}: {
  updateFormData: (newData: TProprietaire) => void
  formData: TProprietaire | undefined
}) {
  const [enable, setEnable] = useState<boolean | undefined>(false)
  const { nextStep } = useStepper()
  const { isPending, execute } = useServerAction(createProprietaireAction)

  const form = useForm<TProprietaire>({
    resolver: zodResolver(
      Proprietaire.pick({
        option_pay: true,
        profession: true,
        contact: true,
        nom_contact: true
      })
    )
  })

  async function onSubmit(_data: TProprietaire) {
    updateFormData(_data)
    // const [data, err] = await execute({ ...formData, ..._data })
    // if (err) {
    //   console.log('quelque chose ne va pas', err)
    // }

    console.log(`Final Form Data:`, { ...formData, ..._data })
    nextStep()
  }

  return (
    <Card className='pt-8'>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
            <FormField
              control={form.control}
              name='option_pay'
              render={({ field }) => (
                <FormItem className='flex flex-row items-center justify-between rounded-lg border p-4'>
                  <div className='space-y-0.5'>
                    <FormLabel className='text-xs lg:text-base'>
                      Gérer les paiements par tiers
                    </FormLabel>
                    <FormDescription className='text-xs'>
                      En cochant cette case vous attribuez le droit de la
                      reception du loyer à un tiers(une agence...)
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value && enable}
                      onCheckedChange={field.onChange}
                      onClick={() => setEnable(!enable)}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='profession'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Profession</FormLabel>
                  <FormControl>
                    <Input placeholder='Profession' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='nom_contact'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nom</FormLabel>
                  <FormControl>
                    <Input placeholder='John Doe' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='contact'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Personne à contactez en cas d&apos;urgence
                  </FormLabel>
                  <FormControl>
                    <PhoneInput placeholder='+225 00 00 00 0000' {...field} />
                  </FormControl>
                  <FormMessage />
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
        <h1 className='text-xl'>Woohoo! All steps completed! 🎉</h1>
      </div>
      <div className='flex items-center justify-end gap-2'>
        <Button onClick={resetSteps}>Reset Stepper with Form</Button>
      </div>
    </>
  )
}
