'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Step, Stepper, useStepper } from '@/components/ui/stepper'
import { Button, buttonVariants } from '@/components/ui/button'
import Image from 'next/image'
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
import { HousePlus, Paperclip } from 'lucide-react'
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
import { ListOption, ListOption2 } from '@/lib/constant/list-option'
import { z } from 'zod'
import { DropzoneOptions } from 'react-dropzone'
import {
  FileInput,
  FileUploader,
  FileUploaderContent,
  FileUploaderItem
} from '@/components/ui/file-upload'
import { useServerAction } from 'zsa-react'
import { createLotAction } from './_action'

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
          <h3 className='font-mono lg:text-3xl'>Nouveau Bien</h3>
          <p className='text-[9px] text-stone-600 lg:text-sm'>
            Afin de créer un nouveau Bien, veuillez complétez les information
            suivant. Les champs marqués d&apos;un * requis
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
  updateFormData: (newData: TLot) => void
}) {
  const { nextStep } = useStepper()
  const form = useForm<TLot>({
    resolver: zodResolver(
      LotSchema.pick({
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
      LotSchema.pick({
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
                    <FormDescription>
                      En cochant cette case vous confirmer que ce bien possède
                      des meuble
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
  const { nextStep } = useStepper()

  const [proprietaires, setProprietaires] = useState<any[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProprietaires = async () => {
      try {
        const response = await fetch('/api/owners')
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des propriétaires')
        }
        const data: TProprietaire[] = await response.json()
        setProprietaires(data)
      } catch (error: any) {
        setError(error.message)
      }
    }

    fetchProprietaires()
  }, [])

  const [base64, setBase64] = useState<string | null>('')
  const { isPending, execute } = useServerAction(createLotAction)

  const form = useForm<TLot>({
    resolver: zodResolver(
      LotSchema.pick({
        prix: true,
        image: true,
        nom_bien: true,
        proprietaireId: true
      })
    )
  })

  const dropzone = {
    multiple: false,
    maxFiles: 3,
    maxSize: 4 * 1024 * 1024
  } satisfies DropzoneOptions

  const customBase64Upload = async (file: File) => {
    const reader = new FileReader()

    reader.onloadend = function () {
      const base64data = reader.result as string
      setBase64(base64data)
    }

    reader.readAsDataURL(file)
  }

  async function onSubmit(_data: TLot) {
    // console.log(`Final Form Data:`, { ...formData, ..._data })
    // console.log(_data)
    const fileBase64 = _data.image?.map(async file => ({
      name: file.name,
      type: file.type,
      content: await customBase64Upload(file)
    }))

    await new Promise(resolve => setTimeout(resolve, 1000))

    const payload = {
      ..._data,
      image: base64
    }

    await new Promise(resolve => setTimeout(resolve, 2000))

    console.log()

    if (payload.image && payload.image?.length > 0) {
      updateFormData(_data)

      console.log(`alors final data is `, { ...formData, ...payload })
      const [data, err] = await execute({
        ...formData,
        ...payload
      })

      nextStep()
      if (err) {
        console.log('quelque chose ne va pas', err)
      }
    }
  }

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
  // console.log(base64)

  return (
    <Card className='pt-8'>
      <CardContent>
        {proprietaires.length > 0 && (
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className='relative w-full gap-2 space-y-3'
            >
              <FormField
                control={form.control}
                name='prix'
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Prix du Loyer</FormLabel>
                      <FormControl>
                        <Input
                          type='number'
                          placeholder='100 000 XOF'
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Veuillez s&apos;il vous plaît entrez le montant du loyer
                        hors charge
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )
                }}
              />

              <FormField
                control={form.control}
                name='nom_bien'
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Nom du biens</FormLabel>
                      <FormControl>
                        <Input
                          type='text'
                          placeholder='Ex: Appartement les louanges'
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Veuillez s&apos;il vous plaît entrez nom correct
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )
                }}
              />

              <FormField
                control={form.control}
                name='proprietaireId'
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Assignez un Propriétaire</FormLabel>

                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue
                              className='placeholder:text-stone-300'
                              placeholder='selectionnez un propriétaire'
                            />
                          </SelectTrigger>
                        </FormControl>

                        <SelectContent>
                          {proprietaires.map(e => {
                            return (
                              <SelectItem key={e.id} value={e.id}>
                                {e.nom_complet}
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
                name='image'
                render={({ field }) => (
                  <FormItem className='outline outline-1 outline-border'>
                    <FileUploader
                      value={field.value}
                      onValueChange={field.onChange}
                      dropzoneOptions={dropzone}
                      className='relative rounded-lg bg-background p-2'
                    >
                      <FileInput className='outline-dashed outline-1 outline-white'>
                        <div className='flex w-full flex-col items-center justify-center pb-4 pt-3'>
                          <svg
                            className='mb-3 h-8 w-8 text-gray-500 dark:text-gray-400'
                            aria-hidden='true'
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 20 16'
                          >
                            <path
                              stroke='currentColor'
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth='2'
                              d='M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2'
                            />
                          </svg>
                          <p className='mb-1 text-center text-sm text-gray-500 dark:text-gray-400 lg:text-start'>
                            <span className='font-semibold'>
                              Clicquez pour télécharger
                            </span>
                            &nbsp; or glissez le ici
                          </p>
                          <p className='text-xs text-gray-500 dark:text-gray-400'>
                            SVG, PNG, JPG or GIF
                          </p>
                        </div>
                      </FileInput>
                      <FileUploaderContent>
                        {field.value &&
                          field.value?.length > 0 &&
                          field.value?.map((file, i) => (
                            <FileUploaderItem key={i} index={i}>
                              <Paperclip className='h-4 w-4 stroke-current' />
                              <span>{file.name}</span>
                            </FileUploaderItem>
                          ))}
                      </FileUploaderContent>
                    </FileUploader>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <StepperFormActions />
            </form>
          </Form>
        )}
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
