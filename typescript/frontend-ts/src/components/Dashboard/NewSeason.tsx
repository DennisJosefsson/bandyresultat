import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form } from '@/src/@/components/ui/form'

import { Button } from '@/src/@/components/ui/button'
import { postSeason } from '@/src/requests/seasons'

import { useMutation } from '@tanstack/react-query'

import { AxiosError } from 'axios'

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/src/@/components/ui/card'
import { FormComponent } from '../utilitycomponents/Components/ReactHookFormComponents/FormComponent'

const formSchema = z.object({
  yearString: z
    .string()
    .regex(/^\d{4}\/\d{4}$/)
    .refine((arg) => {
      const yearArray = arg.split('/')
      const yearOne = yearArray[0]
      const yearTwo = yearArray[1]
      if (parseInt(yearTwo) - parseInt(yearOne) !== 1) return false
      return true
    }),
})

const NewSeason = () => {
  const { data, error, mutate } = useMutation({
    mutationFn: (data: z.infer<typeof formSchema>) => {
      return postSeason(data)
    },
  })
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      yearString: '',
    },
  })

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    mutate(values)
  }

  const womenSeason = data?.womenSeason
  const menSeason = data?.menSeason
  const newSeries = data?.newSeries

  const errorMessage =
    error && error instanceof AxiosError ? error.response?.data.errors : null

  return (
    <div className="flex flex-row gap-x-8">
      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormComponent name="yearString" methods={form}>
              <FormComponent.Label>Säsongsnamn</FormComponent.Label>
              <FormComponent.Input />
              <FormComponent.Description>
                Skriv in namnet på säsongen i format "2024/2025" och det skapas
                ny herr- och damsäsong, med tillhörande seriegrupper.
              </FormComponent.Description>
            </FormComponent>

            <Button type="submit">Skicka</Button>
          </form>
        </Form>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {errorMessage && <p>{errorMessage}</p>}
        {menSeason && newSeries && (
          <Card>
            <CardHeader>
              <CardTitle>Herrar</CardTitle>
            </CardHeader>
            <CardContent className="text-sm">
              <div className="flex flex-col gap-2">
                <div>SäsongsId: {menSeason.seasonId}</div>
              </div>
              <div>
                {newSeries
                  .filter((serie) => serie.seasonId === menSeason.seasonId)
                  .map((serie) => {
                    return <div key={serie.serieId}>{serie.serieName}</div>
                  })}
              </div>
            </CardContent>
          </Card>
        )}
        {womenSeason && newSeries && (
          <Card>
            <CardHeader>
              <CardTitle>Damer</CardTitle>
            </CardHeader>
            <CardContent className="text-sm">
              <div className="flex flex-col gap-2">
                <div>SäsongsId: {womenSeason.seasonId}</div>
              </div>
              <div>
                {newSeries
                  .filter((serie) => serie.seasonId === womenSeason.seasonId)
                  .map((serie) => {
                    return <div key={serie.serieId}>{serie.serieName}</div>
                  })}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

export default NewSeason
