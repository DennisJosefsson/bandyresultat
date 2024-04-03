import { Dispatch, SetStateAction } from 'react'
import useGenderContext from '../../../hooks/contextHooks/useGenderContext'
import { TabBarInline } from '../../utilitycomponents/Components/TabBar'

import { Button } from '@/src/@/components/ui/button'
import {
  QuestionIcon,
  ListIcon,
  SearchIcon,
  WomanIcon,
  ManIcon,
  MapIcon,
  SelectionIcon,
} from '../../utilitycomponents/Components/icons'
import { useMediaQuery } from 'usehooks-ts'

type TeamsTabBarProps = {
  tab: string
  setTab: Dispatch<SetStateAction<string>>
  removeTeamIdParam: () => void
}

const TeamsTabBar = ({ tab, setTab, removeTeamIdParam }: TeamsTabBarProps) => {
  const matches = useMediaQuery('(min-width: 430px)')
  const { dispatch, women } = useGenderContext()

  const teamsTabBarObject = {
    gender: (
      <Button
        onClick={() => {
          dispatch({ type: 'TOGGLE' })
          tab !== 'map' && setTab('teams')
          removeTeamIdParam()
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
    help: (
      <Button
        variant={tab === 'help' ? 'default' : 'outline'}
        onClick={() => {
          setTab('help')
          removeTeamIdParam()
        }}
      >
        {matches ? 'Hjälp' : <QuestionIcon />}
      </Button>
    ),
    tabBarArray: [
      {
        tab: (
          <Button
            variant={tab === 'teams' ? 'default' : 'outline'}
            onClick={() => {
              setTab('teams')
              removeTeamIdParam()
            }}
          >
            {matches ? 'Laglista' : <ListIcon />}
          </Button>
        ),
        tabName: 'teams',
      },
      {
        tab: (
          <Button
            variant={tab === 'map' ? 'default' : 'outline'}
            onClick={() => {
              setTab('map')
              removeTeamIdParam()
            }}
          >
            {matches ? 'Karta' : <MapIcon />}
          </Button>
        ),
        tabName: 'map',
      },
      {
        tab: (
          <Button
            variant={tab === 'selection' ? 'default' : 'outline'}
            onClick={() => {
              setTab('selection')
              removeTeamIdParam()
            }}
          >
            {matches ? 'Sökval' : <SelectionIcon />}
          </Button>
        ),

        tabName: 'selection',
      },
      {
        tab: (
          <Button
            variant={tab === 'compare' ? 'default' : 'outline'}
            type="submit"
            onClick={() => {
              setTab('compare')
              removeTeamIdParam()
            }}
          >
            {matches ? 'Jämför' : <SearchIcon />}
          </Button>
        ),
        tabName: 'compare',
      },
    ],
  }
  return (
    <>
      <TabBarInline tabBarObject={teamsTabBarObject} />
    </>
  )
}

export default TeamsTabBar
