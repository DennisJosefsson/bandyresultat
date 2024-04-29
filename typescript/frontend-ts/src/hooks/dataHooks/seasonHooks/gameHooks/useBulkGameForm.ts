import { zodResolver } from '@hookform/resolvers/zod'
import { UseFormProps, useFieldArray, useForm } from 'react-hook-form'
import { z } from 'zod'

export const initialData = [
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

export const useBulkGameForm = <TSchema extends z.ZodType>(
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

export const useAddGamesForm = (games: Game[]) => {
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

  return { form, control, handleSubmit, fields, replace }
}
