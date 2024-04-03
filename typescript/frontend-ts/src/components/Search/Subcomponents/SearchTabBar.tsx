import { Dispatch, SetStateAction } from 'react'
import useGenderContext from '../../../hooks/contextHooks/useGenderContext'
import { initValues } from '../../../hooks/searchHooks/useSearchForm'
import { TabBarDivided } from '../../utilitycomponents/Components/TabBar'
import { UseFormReturn } from 'react-hook-form'
import { SearchParamsObject } from '../../types/games/search'
import { Button } from '@/src/@/components/ui/button'
import { useMediaQuery } from 'usehooks-ts'
import {
  ManIcon,
  SearchIcon,
  WomanIcon,
} from '../../utilitycomponents/Components/icons'

type SearchTabBarProps = {
  tab: string
  setTab: Dispatch<SetStateAction<string>>
  methods: UseFormReturn<SearchParamsObject>
}

const SearchTabBar = ({ tab, setTab, methods }: SearchTabBarProps) => {
  const { women, dispatch } = useGenderContext()
  const matches = useMediaQuery('(min-width: 430px)')
  const searchTabBarObject = {
    gender: (
      <Button
        onClick={() => {
          dispatch({ type: 'TOGGLE' })
          methods.reset(initValues)
        }}
      >
        {women ? (
          matches ? (
            'Herrar'
          ) : (
            <ManIcon />
          )
        ) : matches ? (
          'Damer'
        ) : (
          <WomanIcon />
        )}
      </Button>
    ),

    tabBarArray: [
      {
        tab: (
          <Button
            variant={tab === 'search' ? 'default' : 'outline'}
            onClick={() => {
              setTab('search')
            }}
          >
            {matches ? 'Sök' : <SearchIcon />}
          </Button>
        ),
        tabName: 'search',
      },
    ],
  }
  return (
    <>
      <TabBarDivided tabBarObject={searchTabBarObject} />
    </>
  )
}

export default SearchTabBar
