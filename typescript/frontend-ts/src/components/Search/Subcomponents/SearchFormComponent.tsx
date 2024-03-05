import { Dispatch, SetStateAction, useState } from 'react'
import { SearchParamsObject } from '../../types/games/search'
import SearchButtons from './SearchButtons'
import SearchForms from './SearchForms'
import { UseFormReturn } from 'react-hook-form'

type SearchFormComponentProps = {
  setSearchParams: Dispatch<SetStateAction<SearchParamsObject | null>>
  isSearchResultSuccess: boolean
  searchLink: string
  methods: UseFormReturn<SearchParamsObject>
}

const SearchFormComponent = ({
  setSearchParams,
  isSearchResultSuccess,
  searchLink,
  methods,
}: SearchFormComponentProps) => {
  const [showResultForm, setShowResultForm] = useState<boolean>(false)
  const [showOrderForm, setShowOrderForm] = useState<boolean>(false)
  const [showSeasonForm, setShowSeasonForm] = useState<boolean>(false)
  const [showPreferenceForm, setShowPreferenceForm] = useState<boolean>(false)

  const onSubmit = (data: SearchParamsObject) => setSearchParams(data)
  const submitAndCollapse = () => {
    methods.handleSubmit(onSubmit)
    setShowOrderForm(false)
    setShowPreferenceForm(false)
    setShowResultForm(false)
    setShowSeasonForm(false)
  }
  return (
    <>
      <SearchButtons
        collapse={submitAndCollapse}
        isSearchResultSuccess={isSearchResultSuccess}
        searchLink={searchLink}
        methods={methods}
      />
      <SearchForms
        setSearchParams={setSearchParams}
        showResultForm={showResultForm}
        setShowResultForm={setShowResultForm}
        showOrderForm={showOrderForm}
        setShowOrderForm={setShowOrderForm}
        showSeasonForm={showSeasonForm}
        setShowSeasonForm={setShowSeasonForm}
        showPreferenceForm={showPreferenceForm}
        setShowPreferenceForm={setShowPreferenceForm}
        methods={methods}
      />
    </>
  )
}

export default SearchFormComponent
