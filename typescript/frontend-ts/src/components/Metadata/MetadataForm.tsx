import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Dispatch, SetStateAction } from 'react'
import { TeamAndSeasonAttributes } from '../types/teams/teams'
import { postMetadata } from '../../requests/metadata'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/src/@/components/ui/card'
import { useToast } from '@/src/@/components/ui/use-toast'
import useMetadataForm from '@/src/hooks/dataHooks/seasonHooks/metadataHooks/useMetadataForm'
import { Form } from '@/src/@/components/ui/form'
import { Button } from '@/src/@/components/ui/button'
import { SubmitHandler } from 'react-hook-form'
import { MetadataType } from '../types/metadata/metadata'
import { FormComponent } from '../utilitycomponents/Components/ReactHookFormComponents/FormComponent'
import { AxiosError } from 'axios'
import { FormContent } from '../Dashboard/Subcomponents/SeasonsList'

type TeamSelection = {
  value: number
  label: string
}[]

type MetadataFormProps = {
  seasonId: number
  year: string
  teams: TeamAndSeasonAttributes[] | null
  setFormContent: Dispatch<SetStateAction<FormContent>>
  setTab: Dispatch<SetStateAction<string>>
}

const MetadataForm = ({
  seasonId,
  teams,
  year,
  setTab,
  setFormContent,
}: MetadataFormProps) => {
  const form = useMetadataForm({ seasonId: seasonId, year: year })
  const mutation = useMutation({
    mutationFn: postMetadata,
    onSuccess: () => onSuccessMutation(),
    onError: (error) => onErrorMutation(error),
  })
  const client = useQueryClient()
  const { toast } = useToast()
  if (!teams) {
    throw new Error('Missing team data')
  }
  const teamSelection: TeamSelection = teams.map((team) => {
    return { value: team.teamId, label: team.name }
  })

  const handleSubmit: SubmitHandler<MetadataType> = (formData) => {
    mutation.mutate(formData)
  }

  const onSuccessMutation = () => {
    client.invalidateQueries({ queryKey: ['seasonMetadata'] })
    toast({
      duration: 5000,
      title: 'Uppdaterad metadata',
      description: <pre className="bg-primary p-2 text-white">{year}</pre>,
    })

    setTab('sections')
    setFormContent(null)
  }

  const onErrorMutation = (error: unknown) => {
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

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Metadata</CardTitle>
            </div>
            <div>
              <Button type="submit" size="sm" form="metadataForm">
                Skicka
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} id="metadataForm">
              <div className="flex flex-auto flex-col p-5 px-16">
                <div className="p-1">
                  <FormComponent name="year" methods={form}>
                    <FormComponent.Label>År</FormComponent.Label>
                    <FormComponent.Input />
                  </FormComponent>
                </div>
                <div className="p-1">
                  <FormComponent name="name" methods={form}>
                    <FormComponent.Label>Serienamn</FormComponent.Label>
                    <FormComponent.Input />
                  </FormComponent>
                </div>
                <div className="p-1">
                  <FormComponent name="winnerName" methods={form}>
                    <FormComponent.Label>SM-Guld</FormComponent.Label>
                    <FormComponent.Input />
                  </FormComponent>
                </div>
                <div className="p-1">
                  <FormComponent name="winnerId" methods={form}>
                    <FormComponent.Label>Vinnar-id</FormComponent.Label>
                    <FormComponent.Select
                      selectionArray={teamSelection}
                      placeholder="Välj lag"
                    />
                  </FormComponent>
                </div>
                <div className="flex-row">
                  <div className="p-1">
                    <FormComponent name="hostCity" methods={form}>
                      <FormComponent.Label>Finalstad</FormComponent.Label>
                      <FormComponent.Input />
                    </FormComponent>
                  </div>
                  <div className="p-1">
                    <FormComponent name="finalDate" methods={form}>
                      <FormComponent.Label>Finaldatum</FormComponent.Label>
                      <FormComponent.Input />
                    </FormComponent>
                  </div>
                </div>
                <div className="flex flex-row space-x-2">
                  <div className="p-1">
                    <FormComponent name="final" methods={form}>
                      <div className="flex flex-row items-center gap-2">
                        <FormComponent.Label>Final</FormComponent.Label>
                        <FormComponent.SingleCheckbox />
                      </div>
                    </FormComponent>
                  </div>

                  <div className="p-1">
                    <FormComponent name="semi" methods={form}>
                      <div className="flex flex-row items-center gap-2">
                        <FormComponent.Label>Semi</FormComponent.Label>
                        <FormComponent.SingleCheckbox />
                      </div>
                    </FormComponent>
                  </div>
                  <div className="p-1">
                    <FormComponent name="quarter" methods={form}>
                      <div className="flex flex-row items-center gap-2">
                        <FormComponent.Label>Kvart</FormComponent.Label>
                        <FormComponent.SingleCheckbox />
                      </div>
                    </FormComponent>
                  </div>

                  <div className="p-1">
                    <FormComponent name="eight" methods={form}>
                      <div className="flex flex-row items-center gap-2">
                        <FormComponent.Label>Åttondel</FormComponent.Label>
                        <FormComponent.SingleCheckbox />
                      </div>
                    </FormComponent>
                  </div>

                  <div className="p-1">
                    <FormComponent name="northSouth" methods={form}>
                      <div className="flex flex-row items-center gap-2">
                        <FormComponent.Label>Norr/Söder</FormComponent.Label>
                        <FormComponent.SingleCheckbox />
                      </div>
                    </FormComponent>
                  </div>
                  <div className="p-1">
                    <FormComponent name="multipleGroupStages" methods={form}>
                      <div className="flex flex-row items-center gap-2">
                        <FormComponent.Label>
                          Dubbla gruppspel
                        </FormComponent.Label>
                        <FormComponent.SingleCheckbox />
                      </div>
                    </FormComponent>
                  </div>
                </div>

                <div className="p-1">
                  <FormComponent name="comment" methods={form}>
                    <FormComponent.Label>Kommentar</FormComponent.Label>
                    <FormComponent.Textarea />
                  </FormComponent>
                </div>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </>
  )
}

export default MetadataForm
