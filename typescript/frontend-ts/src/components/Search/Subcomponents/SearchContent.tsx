import { Form } from '../../../@/components/ui/form'
import { SearchSelectComponent } from '../../utilitycomponents/Components/SelectComponent'
import SearchForms from './SearchForms'
import { useCopyToClipboard } from 'usehooks-ts'
import { UseFormReturn } from 'react-hook-form'
import { SearchParamsObject } from '../../types/games/search'
import { initValues } from '@/src/hooks/searchHooks/useSearchForm'
import {
  useSearchResults,
  useGetSearchTeams,
} from '@/src/hooks/searchHooks/useSearchForm'
import { Dispatch, SetStateAction, useState } from 'react'
import { ErrorState } from '../Search'
import ResultComponent from './ResultComponent'
import { Button } from '@/src/@/components/ui/button'
type SearchContentProps = {
  methods: UseFormReturn<SearchParamsObject>
  searchParams: SearchParamsObject | null
  setSearchParams: Dispatch<SetStateAction<SearchParamsObject | null>>
  setError: Dispatch<SetStateAction<ErrorState>>
  error: ErrorState
}

const SearchContent = ({
  methods,
  error,
  setError,
  searchParams,
  setSearchParams,
}: SearchContentProps) => {
  const [openAccordion, setOpenAccordion] = useState<string>('')
  const [copiedText, copy] = useCopyToClipboard()
  const { teamSelection, opponentSelection } = useGetSearchTeams()
  const { searchResult, gameArray, searchLink, isSearchResultSuccess } =
    useSearchResults(searchParams, setError)

  const onSubmit = (data: SearchParamsObject) => setSearchParams(data)
  const submitAndCollapse = () => {
    methods.handleSubmit(onSubmit)
    setOpenAccordion('')
  }

  return (
    <div className="mx-1 mt-2 xl:mx-0">
      <div className="flex flex-row-reverse justify-between">
        <div className="flex max-h-[160px] flex-col gap-4">
          <div>
            <Button
              type="submit"
              form="search-form"
              onClick={() => submitAndCollapse()}
            >
              Skicka
            </Button>
          </div>
          <Button onClick={() => methods.reset(initValues)}>Nollställ</Button>
          {isSearchResultSuccess && (
            <Button onClick={() => copy(searchLink)}>
              {copiedText ? 'Kopierad!' : `Söklänk`}
            </Button>
          )}
        </div>
        <div className="ml-2 w-[70%] max-w-[800px] lg:ml-0 lg:w-full">
          <div>
            <Form {...methods}>
              <form onSubmit={methods.handleSubmit(onSubmit)} id="search-form">
                <div className="mb-2 grid grid-cols-1 gap-2 lg:grid-cols-2 lg:justify-between">
                  <div className="flex max-w-[24rem] flex-col lg:w-full">
                    <div>
                      <SearchSelectComponent
                        methods={methods}
                        selectionArray={teamSelection}
                        name="team"
                        label="Välj lag"
                      />
                    </div>
                  </div>

                  <div className="flex max-w-[18rem] flex-col">
                    <div>
                      <SearchSelectComponent
                        methods={methods}
                        selectionArray={opponentSelection}
                        name="opponent"
                        label="Välj motståndare"
                      />
                    </div>
                  </div>
                </div>
                <SearchForms
                  openAccordion={openAccordion}
                  setOpenAccordion={setOpenAccordion}
                />
              </form>
            </Form>
          </div>
        </div>
      </div>
      <div className="ml-2 w-[18rem] max-w-[800px] lg:ml-0 lg:w-full">
        {error.error && (
          <div className="mb-2 rounded border-red-700 bg-background p-2 text-sm font-semibold text-red-700 md:text-base">
            {error.message}
          </div>
        )}
        {searchResult && searchResult.searchResult.length === 0 && (
          <div className="rounded bg-background p-2">
            <p className="">Din sökning gav inga träffar.</p>
          </div>
        )}
        {searchResult && <ResultComponent gameArray={gameArray} />}
      </div>
    </div>
  )
}

export default SearchContent
