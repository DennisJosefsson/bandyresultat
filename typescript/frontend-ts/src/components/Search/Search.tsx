import Spinner from '../utilitycomponents/Components/Spinner'
import SearchHelp from './Subcomponents/SearchFormModal'
import { SearchParamsObject } from '../types/games/search'
//import useMenuContext from '../../hooks/contextHooks/useMenuContext'
import useGenderContext from '@/src/hooks/contextHooks/useGenderContext'
import {
  useGetSearchTeams,
  useSearchForm,
  useSearchLinks,
} from '../../hooks/searchHooks/useSearchForm'
import { useState } from 'react'
import { initValues } from '../../hooks/searchHooks/useSearchForm'
import SearchContent from './Subcomponents/SearchContent'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/src/@/components/ui/tabs'
import { Button } from '@/src/@/components/ui/button'

export type ErrorState =
  | {
      error: true
      message: string
    }
  | { error: false }

const Search = () => {
  const { women, dispatch } = useGenderContext()
  const [searchParams, setSearchParams] = useState<SearchParamsObject | null>(
    null,
  )
  const [tab, setTab] = useState<string>('search')

  const [error, setError] = useState<ErrorState>({ error: false })

  const methods = useSearchForm()
  useSearchLinks(setError, setSearchParams, methods)
  //const { open } = useMenuContext()

  const { isLoading: isTeamsLoading, error: teamError } = useGetSearchTeams()

  if (isTeamsLoading) {
    return (
      <div className="mx-auto grid h-screen place-items-center font-inter text-foreground">
        <Spinner />
      </div>
    )
  }

  if (teamError) {
    return (
      <div className="mx-auto grid h-screen place-items-center font-inter text-foreground">
        Något gick fel.
      </div>
    )
  }

  // console.log('Målskillnadoperator', methods.getValues('goalDiffOperator'))
  // console.log('Målskillnad', methods.getValues('goalDiff'))
  //console.log('Team', methods.getValues('team') === '')

  // console.log(searchResult)

  return (
    <div className="mx-auto mt-2 flex min-h-screen max-w-7xl flex-col font-inter text-foreground">
      <Tabs value={tab} onValueChange={setTab}>
        <div className="hidden items-center xs:mb-2 xs:flex xs:flex-row xs:justify-between xs:gap-1 md:gap-2">
          <div>
            <TabsList>
              <TabsTrigger value="search">Sök</TabsTrigger>
              <TabsTrigger value="help">Hjälp</TabsTrigger>
            </TabsList>
          </div>
          <div>
            <Button
              variant="outline"
              onClick={() => {
                dispatch({ type: 'TOGGLE' })
                methods.reset(initValues)
              }}
            >
              {women ? 'Herr' : 'Dam'}
            </Button>
          </div>
        </div>
        <TabsContent value="search">
          <SearchContent
            methods={methods}
            error={error}
            setError={setError}
            searchParams={searchParams}
            setSearchParams={setSearchParams}
          />
        </TabsContent>
        <TabsContent value="help">
          <SearchHelp />
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default Search
