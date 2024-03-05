import { Dispatch, SetStateAction } from 'react'
import useGenderContext from '../../../hooks/contextHooks/useGenderContext'
import { initValues } from '../../../hooks/searchHooks/useSearchForm'
import { TabBarDivided } from '../../utilitycomponents/Components/TabBar'
import { UseFormReturn } from 'react-hook-form'
import { SearchParamsObject } from '../../types/games/search'

type SearchTabBarProps = {
  tab: string
  setTab: Dispatch<SetStateAction<string>>
  methods: UseFormReturn<SearchParamsObject>
}

const SearchTabBar = ({ tab, setTab, methods }: SearchTabBarProps) => {
  const { dispatch } = useGenderContext()
  const searchTabBarObject = {
    genderClickFunction: () => {
      dispatch({ type: 'TOGGLE' })
      methods.reset(initValues)
    },
    tabBarArray: [
      {
        name: 'Sök',
        tabName: 'search',
        clickFunctions: () => setTab('search'),
      },
    ],
  }
  return (
    <>
      <TabBarDivided
        tabBarObject={searchTabBarObject}
        tab={tab}
        setTab={setTab}
      />
    </>
  )
}

export default SearchTabBar
