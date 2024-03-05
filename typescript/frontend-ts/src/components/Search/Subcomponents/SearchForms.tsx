import { Dispatch, SetStateAction } from 'react'
import Select from 'react-select'
import { selectStyles } from '../../utilitycomponents/Components/selectStyles'
import { useGetSearchTeams } from '../../../hooks/searchHooks/useSearchForm'
import { Controller, FormProvider, UseFormReturn } from 'react-hook-form'
import { SearchParamsObject } from '../../types/games/search'
import { ChevronDown } from '../../utilitycomponents/Components/icons'

import OrderFormComponent from './OrderFormComponent'
import PreferenceFormComponent from './PreferenceFormComponent'
import ResultFormComponent from './ResultFormComponent'
import SeasonFormComponent from './SeasonFormComponent'

type SearchFormsProps = {
  setSearchParams: Dispatch<SetStateAction<SearchParamsObject | null>>
  showResultForm: boolean
  setShowResultForm: Dispatch<SetStateAction<boolean>>
  showOrderForm: boolean
  setShowOrderForm: Dispatch<SetStateAction<boolean>>
  showSeasonForm: boolean
  setShowSeasonForm: Dispatch<SetStateAction<boolean>>
  showPreferenceForm: boolean
  setShowPreferenceForm: Dispatch<SetStateAction<boolean>>
  methods: UseFormReturn<SearchParamsObject>
}

const SearchForms = ({
  setSearchParams,
  showResultForm,
  setShowResultForm,
  showOrderForm,
  setShowOrderForm,
  showSeasonForm,
  setShowSeasonForm,
  showPreferenceForm,
  setShowPreferenceForm,
  methods,
}: SearchFormsProps) => {
  const { teamSelection, opponentSelection } = useGetSearchTeams()

  const onSubmit = (data: SearchParamsObject) => setSearchParams(data)
  return (
    <div className="ml-2 w-[70%] max-w-[800px] lg:ml-0 lg:w-full">
      <div>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)} id="search-form">
            <div className="grid grid-cols-1 gap-2 lg:grid-cols-3 lg:justify-between">
              <div className="flex max-w-[18rem] flex-col text-sm md:text-base">
                <div>Välj lag</div>
                <div>
                  <Controller
                    name="team"
                    control={methods.control}
                    render={({ field }) => (
                      <Select
                        placeholder="Lag"
                        {...field}
                        options={teamSelection}
                        styles={selectStyles}
                        isClearable
                        noOptionsMessage={() => 'Inga val'}
                      />
                    )}
                  />
                </div>
              </div>

              <div className="flex max-w-[18rem] flex-col text-sm md:text-base">
                <div>Välj motståndare</div>
                <div>
                  <Controller
                    name="opponent"
                    control={methods.control}
                    render={({ field }) => (
                      <Select
                        placeholder="Lag"
                        {...field}
                        options={opponentSelection}
                        styles={selectStyles}
                        isClearable
                        noOptionsMessage={() => 'Inga val'}
                      />
                    )}
                  />
                </div>
              </div>
            </div>

            {!showResultForm && (
              <div
                className="mb-1 flex w-[18rem] cursor-pointer flex-row justify-between rounded bg-white p-2 shadow-md lg:w-full"
                onClick={() => setShowResultForm(true)}
              >
                <div className="text-sm md:text-base">
                  Visa resultatformulär
                </div>
                <div>
                  <ChevronDown />
                </div>
              </div>
            )}
            {showResultForm && (
              <ResultFormComponent
                showResultForm={showResultForm}
                setShowResultForm={setShowResultForm}
              />
            )}
            {!showOrderForm && (
              <div
                className="mb-1 flex w-[18rem] cursor-pointer flex-row justify-between rounded bg-white p-2 shadow-md lg:w-full"
                onClick={() => setShowOrderForm(true)}
              >
                <div className="text-sm md:text-base">Visa sorteringsval</div>
                <div>
                  <ChevronDown />
                </div>
              </div>
            )}
            {showOrderForm && (
              <OrderFormComponent
                showOrderForm={showOrderForm}
                setShowOrderForm={setShowOrderForm}
              />
            )}
            {!showSeasonForm && (
              <div
                className="mb-1 flex w-[18rem] cursor-pointer flex-row justify-between rounded bg-white p-2 shadow-md lg:w-full"
                onClick={() => setShowSeasonForm(true)}
              >
                <div className="text-sm md:text-base">
                  Visa säsongsinställningar
                </div>
                <div>
                  <ChevronDown />
                </div>
              </div>
            )}
            {showSeasonForm && (
              <SeasonFormComponent
                showSeasonForm={showSeasonForm}
                setShowSeasonForm={setShowSeasonForm}
              />
            )}
            {!showPreferenceForm && (
              <div
                className="mb-1 flex w-[18rem] cursor-pointer flex-row justify-between rounded bg-white p-2 shadow-md lg:w-full"
                onClick={() => setShowPreferenceForm(true)}
              >
                <div className="text-sm md:text-base">
                  Visa matchinställningar
                </div>
                <div>
                  <ChevronDown />
                </div>
              </div>
            )}
            {showPreferenceForm && (
              <PreferenceFormComponent
                setShowPreferenceForm={setShowPreferenceForm}
                showPreferenceForm={showPreferenceForm}
              />
            )}
          </form>
        </FormProvider>
      </div>
    </div>
  )
}

export default SearchForms
