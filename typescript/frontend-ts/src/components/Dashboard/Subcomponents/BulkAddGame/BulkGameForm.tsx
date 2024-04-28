import { useForm, useFieldArray, UseFormProps } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
  Form,
  FormLabel,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from '@/src/@/components/ui/form'
import { Input } from '@/src/@/components/ui/input'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { Button } from '@/src/@/components/ui/button'
import { useMutation } from '@tanstack/react-query'
import { postBulkGames } from '@/src/requests/games'
import { FormContent } from '../SeasonsList'
import { useToast } from '@/src/@/components/ui/use-toast'
import { AxiosError } from 'axios'

const initialData = [
  {
    date: '',
    homeTeam: '',
    homeTeamId: '',
    awayTeam: '',
    awayTeamId: '',
    seasonId: 0,
    category: '',
    group: '',
    women: false,
    serieId: 0,
  },
]

const bulkGameSchema = z.object({
  games: z.array(
    z.object({
      date: z.string(),
      homeTeam: z.string(),
      homeTeamId: z.string().refine((val) => {
        if (val === 'Fel namn') return false
        return true
      }),
      awayTeam: z.string(),
      awayTeamId: z.string().refine((val) => {
        if (val === 'Fel namn') return false
        return true
      }),
      seasonId: z.number(),
      category: z.string(),
      group: z.string(),
      women: z.boolean(),
      serieId: z.number().optional().nullable(),
    }),
  ),
})

export type Game = z.infer<typeof bulkGameSchema>['games'][number]

const useBulkGameForm = <TSchema extends z.ZodType>(
  props: Omit<UseFormProps<TSchema['_input']>, 'resolver'> & {
    schema: TSchema
  },
) => {
  const form = useForm<TSchema['_input']>({
    ...props,
    resolver: zodResolver(props.schema, undefined, {
      raw: true,
    }),
  })

  return form
}

type BulkGameFormProps = {
  gameArray: Game[]
  setTab: Dispatch<SetStateAction<string>>
  setFormContent: Dispatch<SetStateAction<FormContent>>
}

const BulkGameForm = ({
  gameArray,
  setTab,
  setFormContent,
}: BulkGameFormProps) => {
  const [games, setGames] = useState<Game[]>(() => initialData)
  const { toast } = useToast()

  const mutation = useMutation({
    mutationFn: postBulkGames,
    onSuccess: () => onMutationSuccess(),
    onError: (error) => onMutationError(error),
  })

  const onMutationSuccess = () => {
    setTab('sections')
    setFormContent(null)
    toast({
      duration: 2500,
      title: 'Matcher inlagda',
    })
  }

  const onMutationError = (error: unknown) => {
    if (error instanceof AxiosError) {
      toast({
        duration: 2500,
        title: 'Något gick fel',
        description: <p>{error.response?.data.errors}</p>,
        variant: 'destructive',
      })
    } else {
      toast({
        duration: 2500,
        title: 'Något gick fel',
        variant: 'destructive',
      })
    }
  }

  const form = useBulkGameForm({
    schema: bulkGameSchema,
    defaultValues: { games },
    mode: 'onSubmit',
  })

  const { control, handleSubmit } = form

  const { fields, replace } = useFieldArray({
    name: 'games',
    control,
  })

  useEffect(() => {
    setGames(gameArray)
    replace(gameArray)
  }, [gameArray])

  const onSubmit = ({ games }: { games: Game[] }) => {
    mutation.mutate(games)
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-2">
            {fields.map((field, index) => {
              return (
                <div className="flex flex-row gap-2" key={field.id}>
                  <FormField
                    control={form.control}
                    name={`games.${index}.date`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Datum</FormLabel>

                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`games.${index}.homeTeam`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Hemmalag</FormLabel>

                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`games.${index}.homeTeamId`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Hemma-ID</FormLabel>

                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`games.${index}.awayTeam`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Bortalag</FormLabel>

                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`games.${index}.awayTeamId`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Borta-ID</FormLabel>

                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )
            })}
          </div>
          <Button type="submit">Skicka</Button>
        </form>
      </Form>
    </div>
  )
}

export default BulkGameForm
