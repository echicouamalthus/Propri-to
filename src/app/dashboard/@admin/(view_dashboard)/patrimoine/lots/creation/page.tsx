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
import { useState } from 'react'
import { TProprietaire, Proprietaire } from '@/entites/proprietaire'
import { PhoneInput } from '@/components/ui/phone-input'
import { HousePlus } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Switch } from '@/components/ui/switch'
import { Card, CardContent } from '@/components/ui/card'
import { Lot, TLot } from '@/entites/lot'
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
import { ListOption, ListOption2 } from '@/lib/constant/list-option'

const steps = [
  { label: 'données sur le biens ' },
  { label: 'détails Aménagements' },
  { label: 'informations complémentaire' }
]

export default function CreateOwnerForm() {
  const [formData, setFormData] = useState<TLot>()

  const updateForm = (newData: TLot) => {
    setFormData(prevData => ({ ...prevData, ...newData }))
  }

  return (
    <main className='mx-auto max-w-5xl space-y-8 px-4 py-6'>
      <div className='mx-auto flex max-w-3xl items-center bg-stone-50 p-4'>
        <Button variant={'ghost'}>
          <HousePlus className='h-16 w-16' />
        </Button>
        <div>
          <h3 className='font-mono lg:text-3xl'>Nouveau d&apos;un Bien</h3>
          <p className='text-[9px] text-stone-600 lg:text-sm'>
            Afin de créer un nouveau Bien, veuillez complétez les information
            suivant. Les champs marqués d&apos;un * requis
          </p>
        </div>
      </div>
      <div className='flex w-full flex-col gap-4'>
        <Stepper
          variant='circle-alt'
          initialStep={2}
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
  updateFormData: (newData: TLot) => void
}) {
  const { nextStep } = useStepper()
  const form = useForm<TLot>({
    resolver: zodResolver(
      Lot.pick({
        type: true,
        superficie: true,
        adresse: true,
        regime_juridique: true
      })
    )
  })

  function onSubmit(_data: TLot) {
    updateFormData(_data)
    nextStep()
  }
  //   const [base64, setBase64] = useState<string | null>('')

  //   const customBase64Uploader = async (
  //     event: React.ChangeEvent<HTMLInputElement>
  //   ) => {
  //     const file = event.target.files?.[0]
  //     if (!file) return

  //     const reader = new FileReader()

  //     reader.onloadend = function () {
  //       const base64data = reader.result as string
  //       setBase64(base64data) // Stockez le résultat base64 dans l'état
  //     }

  //     reader.readAsDataURL(file)
  //   }

  //   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  //     e.preventDefault()
  //     console.log('Base64 Encoded File: ', base64)
  //   }

  return (
    <Card className='pt-8'>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
            <FormField
              control={form.control}
              name='type'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type de biens</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          className='placeholder:text-stone-300'
                          placeholder='Exemple: Appartement, maison
                    individuelle, studio, etc'
                        />
                      </SelectTrigger>
                    </FormControl>

                    <SelectContent>
                      {[
                        'appartement',
                        'maison individuelle',
                        'studio',
                        'autre'
                      ].map((e: string, index: number) => {
                        return (
                          <SelectItem key={index} value={e}>
                            {e}
                          </SelectItem>
                        )
                      })}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    sélectionnez un type de biens.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='superficie'
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Superficie</FormLabel>
                    <FormControl>
                      <Input
                        type='number'
                        placeholder='la superficie en m2'
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
              name='adresse'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Adresse du bien</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Yopougon Ananeraie route de Dabou 10 BP 3491 Abidjan'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='regime_juridique'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Régime juridique</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          className='placeholder:text-stone-300'
                          placeholder='Exemple:
                    Monopropriété, copropriété, indivision, multipropriété, etc.'
                        />
                      </SelectTrigger>
                    </FormControl>

                    <SelectContent>
                      {['monopropriété', 'copropriété', 'autre'].map(
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
                  <FormDescription>
                    Sélectionnez le régime sous lequel le biens existe.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <StepperFormActions />
          </form>
        </Form>
        {/* <form onSubmit={handleSubmit} className='space-y-4 p-4'>
          <div>
            <Input
              type='file'
              onChange={customBase64Uploader}
              className='file-input'
            />
          </div>
          <Button type='submit'>Soumettre</Button>
        </form> */}
      </CardContent>
    </Card>
  )
}

function SecondStepForm({
  updateFormData
}: {
  updateFormData: (newData: TLot) => void
}) {
  const { nextStep } = useStepper()

  const form = useForm<TLot>({
    resolver: zodResolver(
      Lot.pick({
        meuble: true,
        equipement_privatif: true,
        equipement_commun: true,
        total_number: true
      })
    ),
    defaultValues: {
      equipement_privatif: [ListOption[0]],
      equipement_commun: [ListOption2[0]]
    }
  })

  function onSubmit(_data: TLot) {
    updateFormData(_data)
    nextStep()
    // console.log(_data)
  }
  //   const [base64, setBase64] = useState<string | null>('')

  //   const customBase64Uploader = async (
  //     event: React.ChangeEvent<HTMLInputElement>
  //   ) => {
  //     const file = event.target.files?.[0]
  //     if (!file) return

  //     const reader = new FileReader()

  //     reader.onloadend = function () {
  //       const base64data = reader.result as string
  //       setBase64(base64data) // Stockez le résultat base64 dans l'état
  //     }

  //     reader.readAsDataURL(file)
  //   }

  //   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  //     e.preventDefault()
  //     console.log('Base64 Encoded File: ', base64)
  //   }

  return (
    <Card className='pt-8'>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
            <FormField
              control={form.control}
              name='meuble'
              render={({ field }) => (
                <FormItem className='flex flex-row items-center justify-between rounded-lg border p-4'>
                  <div className='space-y-0.5'>
                    <FormLabel className='text-base'>
                      le local est-il meublé
                    </FormLabel>
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

            <FormField
              control={form.control}
              name='equipement_privatif'
              render={({ field }) => {
                return (
                  <FormItem>
                    <MultiSelector
                      values={field.value}
                      onValuesChange={field.onChange}
                    >
                      <FormControl>
                        <MultiSelectorTrigger>
                          <MultiSelectorInput
                            placeholder='Sélectionnez les biens à usage privatif'
                            className='placeholder:text-sm'
                          />
                        </MultiSelectorTrigger>
                      </FormControl>
                      <MultiSelectorContent>
                        <MultiSelectorList>
                          {ListOption.map((e: string, index: number) => {
                            return (
                              <MultiSelectorItem key={index} value={e}>
                                {e}
                              </MultiSelectorItem>
                            )
                          })}
                        </MultiSelectorList>
                      </MultiSelectorContent>
                    </MultiSelector>

                    <FormMessage />
                  </FormItem>
                )
              }}
            />
            <FormField
              control={form.control}
              name='equipement_commun'
              render={({ field }) => {
                return (
                  <FormItem>
                    <MultiSelector
                      values={field.value}
                      onValuesChange={field.onChange}
                    >
                      <FormControl>
                        <MultiSelectorTrigger>
                          <MultiSelectorInput
                            placeholder='Les équipements et autres prestations collectifs.'
                            className='placeholder:text-sm'
                          />
                        </MultiSelectorTrigger>
                      </FormControl>
                      <MultiSelectorContent>
                        <MultiSelectorList>
                          {ListOption2.map((e: string, index: number) => {
                            return (
                              <MultiSelectorItem key={index} value={e}>
                                {e}
                              </MultiSelectorItem>
                            )
                          })}
                        </MultiSelectorList>
                      </MultiSelectorContent>
                    </MultiSelector>

                    <FormMessage />
                  </FormItem>
                )
              }}
            />

            <FormField
              control={form.control}
              name='total_number'
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>le nombre de pièce principale</FormLabel>
                    <FormControl>
                      <Input
                        type='number'
                        placeholder='Le nombre total de pièces dans le bien (chambres, salon, salle de bain, etc.)'
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
  updateFormData,
  formData
}: {
  updateFormData: (newData: TLot) => void
  formData: TLot | undefined
}) {
  const [enable, setEnable] = useState<boolean | undefined>(false)
  const { nextStep } = useStepper()
  //   const { isPending, execute } = useServerAction(createProprietaireAction)

  const form = useForm<TLot>({
    resolver: zodResolver(
      Proprietaire.pick({
        option_pay: true,
        profession: true,
        contact: true,
        nom_contact: true
      })
    )
  })

  async function onSubmit(_data: TLot) {
    updateFormData(_data)

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
