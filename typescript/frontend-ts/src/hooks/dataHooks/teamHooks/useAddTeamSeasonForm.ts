import { zodResolver } from '@hookform/resolvers/zod'
import { UseFormProps, useFieldArray, useForm } from 'react-hook-form'
import { z } from 'zod'

const teamSeasonFormSchema = z.object({
  teamSeasons: z.array(
    z.object({
      teamseasonId: z.number().optional(),
      seasonId: z.number(),
      teamId: z.number(),
      tableId: z.number().nullable().optional(),
      women: z.boolean(),
      qualification: z.boolean(),
      negQualification: z.boolean().optional(),
      promoted: z.boolean().optional(),
      relegated: z.boolean().optional(),
      position: z.coerce.number().optional().nullable(),
      points: z.coerce.number().optional().nullable(),
      playoff: z.boolean().optional(),
      eight: z.boolean().optional(),
      quarter: z.boolean().optional(),
      semi: z.boolean().optional(),
      final: z.boolean().optional(),
      gold: z.boolean().optional(),
    }),
  ),
})

export type TeamSeason = z.infer<
  typeof teamSeasonFormSchema
>['teamSeasons'][number]

export const initialData = [
  {
    seasonId: 0,
    teamId: 0,
    women: false,
    qualification: false,
    negQualification: false,
    promoted: false,
    relegated: false,
    position: null,
    points: null,
    playoff: false,
    eight: false,
    quarter: false,
    semi: false,
    final: false,
    gold: false,
  },
]

const useTeamSeasonForm = <TSchema extends z.ZodType>(
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

export const useAddTeamSeasonForm = (teamSeasons: TeamSeason[]) => {
  const form = useTeamSeasonForm({
    schema: teamSeasonFormSchema,
    defaultValues: { teamSeasons },
    mode: 'onSubmit',
  })

  const { control, handleSubmit } = form

  const { fields, replace, remove, append } = useFieldArray({
    name: 'teamSeasons',
    control,
  })

  return { form, control, handleSubmit, fields, replace, remove, append }
}
