import { useForm } from 'react-hook-form'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { postSerie } from '../../requests/series'
import { Dispatch, SetStateAction } from 'react'
import { SerieAttributes, serieAttributes } from '../types/series/series'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form } from '@/src/@/components/ui/form'

import { Button } from '@/src/@/components/ui/button'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/src/@/components/ui/card'
import { useToast } from '@/src/@/components/ui/use-toast'
import { AxiosError } from 'axios'
import { FormComponent } from '../utilitycomponents/Components/ReactHookFormComponents/FormComponent'
import { FormContent } from './Subcomponents/SeasonsList'

type SeriesModalProps = {
  women: boolean
  seasonId: number
  serieData: SerieAttributes | null
  setSerieData: Dispatch<SetStateAction<SerieAttributes | null>>
  setFormContent: Dispatch<SetStateAction<FormContent>>
  setTab: Dispatch<SetStateAction<string>>
}

const SeriesModal = ({
  women,
  seasonId,
  serieData,
  setSerieData,
  setFormContent,
  setTab,
}: SeriesModalProps) => {
  const { toast } = useToast()

  const mutation = useMutation({
    mutationFn: (formData: SerieAttributes) => postSerie(formData),
    onSuccess: (data) => onSuccessSubmit(data),
    onError: (error) => onSubmitError(error),
  })
  const client = useQueryClient()
  const form = useForm<SerieAttributes>({
    defaultValues: {
      serieCategory: serieData ? serieData.serieCategory : '',
      serieGroupCode: serieData ? serieData.serieGroupCode : '',
      serieStructure: serieData ? serieData.serieStructure : [],
      serieName: serieData ? serieData.serieName : '',
      comment: serieData ? serieData.comment : '',
      seasonId: seasonId,
      women: women,
      serieId: serieData ? serieData.serieId : null,
    },
    criteriaMode: 'all',
    mode: 'onBlur',
    resolver: zodResolver(serieAttributes),
  })

  const onSubmit = (serieFormData: SerieAttributes) => {
    mutation.mutate(serieFormData)
  }

  const onSubmitError = (error: unknown) => {
    if (error instanceof AxiosError) {
      toast({
        duration: 5000,
        title: 'Fel',
        description: error.response?.data.errors,
        variant: 'destructive',
      })
    } else {
      toast({
        duration: 5000,
        title: 'Något gick fel',
        variant: 'destructive',
      })
    }
  }

  const onSuccessSubmit = (data: SerieAttributes) => {
    client.invalidateQueries({ queryKey: ['singleSeason'] })
    toast({
      duration: 5000,
      title: serieData ? 'Uppdaterad serie' : 'Ny serie',
      description: data.serieName,
    })

    setSerieData(null)
    setTab('sections')
    setFormContent(null)
  }

  const serieStructureArray = Array.from(
    { length: 14 },
    (_, index) => index + 1,
  ).map((_, index) => {
    return { value: index + 1, label: `${index + 1}` }
  })

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-row justify-between">
          <CardTitle>Serie</CardTitle>
          <Button type="submit" form="seriedataForm">
            Skicka
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} id="seriedataForm">
            <div className="flex flex-auto flex-col p-5 px-16">
              <div className="grid grid-cols-3 gap-x-20 gap-y-4">
                <FormComponent name="serieName" methods={form}>
                  <FormComponent.Label>Serienamn</FormComponent.Label>
                  <FormComponent.Input />
                </FormComponent>

                <FormComponent name="serieGroupCode" methods={form}>
                  <FormComponent.Label>Grupp</FormComponent.Label>
                  <FormComponent.Input />
                </FormComponent>

                <FormComponent name="serieCategory" methods={form}>
                  <FormComponent.Label>Kategori</FormComponent.Label>
                  <FormComponent.Input />
                </FormComponent>

                <FormComponent name="serieStructure" methods={form}>
                  <FormComponent.Label>Seriestruktur</FormComponent.Label>
                  <FormComponent.MultiCheckbox
                    className="grid grid-cols-1 gap-y-1 lg:grid-cols-3 lg:gap-x-16"
                    checkboxArray={serieStructureArray}
                  />
                </FormComponent>

                <FormComponent name="comment" methods={form}>
                  <FormComponent.Label>Kommentar</FormComponent.Label>
                  <FormComponent.Textarea className="min-w-[320px]" />
                </FormComponent>
              </div>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

export default SeriesModal
