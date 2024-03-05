import Spinner from '../utilitycomponents/Components/Spinner'
import ResultComponent from './Subcomponents/ResultComponent'
import SearchHelp from './Subcomponents/SearchFormModal'
import { SearchParamsObject } from '../types/games/search'
import useMenuContext from '../../hooks/contextHooks/useMenuContext'
import ScrollRefComponent from '../utilitycomponents/Components/ScrollRefComponent'
import ErrorComponent from '../utilitycomponents/Components/FormErrorComponent'
import {
  useGetSearchTeams,
  useSearchForm,
  useSearchLinks,
  useSearchResults,
} from '../../hooks/searchHooks/useSearchForm'
import SearchTabBar from './Subcomponents/SearchTabBar'
import { useState, useRef } from 'react'
import SearchFormComponent from './Subcomponents/SearchFormComponent'

type ErrorState =
  | {
      error: true
      message: string
    }
  | { error: false }

const Search = () => {
  const [searchParams, setSearchParams] = useState<SearchParamsObject | null>(
    null,
  )
  const [tab, setTab] = useState<string>('search')

  const [error, setError] = useState<ErrorState>({ error: false })

  const topRef = useRef(null)
  const bottomRef = useRef(null)
  const methods = useSearchForm()

  useSearchLinks(setError, setSearchParams, methods)
  const { open } = useMenuContext()

  const { isLoading: isTeamsLoading, error: teamError } = useGetSearchTeams()

  const { searchResult, gameArray, searchLink, isSearchResultSuccess } =
    useSearchResults(searchParams, setError)

  if (isTeamsLoading) {
    return (
      <div className="mx-auto grid h-screen place-items-center font-inter text-[#011d29]">
        <Spinner />
      </div>
    )
  }

  if (teamError) {
    return (
      <div className="mx-auto grid h-screen place-items-center font-inter text-[#011d29]">
        Något gick fel.
      </div>
    )
  }

  console.log(methods.getValues('team'))
  console.log(searchResult)

  return (
    <div
      className="mx-auto mt-2 flex min-h-screen max-w-7xl flex-col font-inter text-[#011d29]"
      ref={topRef}
    >
      <SearchTabBar tab={tab} setTab={setTab} methods={methods} />
      {!open && tab === 'search' && (
        <div className="mx-1 xl:mx-0">
          <div className="flex flex-row-reverse justify-between">
            <SearchFormComponent
              setSearchParams={setSearchParams}
              isSearchResultSuccess={isSearchResultSuccess}
              searchLink={searchLink}
              methods={methods}
            />
          </div>
          <div className="ml-2 w-[18rem] max-w-[800px] lg:ml-0 lg:w-full">
            <ErrorComponent errors={methods.formState.errors} />
            {error.error && (
              <div className="mb-2 rounded border-red-700 bg-white p-2 text-sm font-semibold text-red-700 md:text-base">
                {error.message}
              </div>
            )}
            {searchResult && searchResult.searchResult.length === 0 && (
              <div className="rounded bg-white p-2">
                <p className="">Din sökning gav inga träffar.</p>
              </div>
            )}
            {searchResult && <ResultComponent gameArray={gameArray} />}
          </div>
          <div ref={bottomRef}></div>
          {searchResult && (
            <ScrollRefComponent topRef={topRef} bottomRef={bottomRef} />
          )}
        </div>
      )}
      {tab === 'help' && <SearchHelp />}
    </div>
  )
}

export default Search
