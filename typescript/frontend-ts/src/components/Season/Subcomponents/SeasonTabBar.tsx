import useGenderContext from '../../../hooks/contextHooks/useGenderContext'
import { TabBarInline } from '../../utilitycomponents/Components/TabBar'
import { useMediaQuery } from 'usehooks-ts'
import { Button } from '@/src/@/components/ui/button'
import {
  CalendarIcon,
  DevIcon,
  ListIcon,
  ManIcon,
  MapIcon,
  StatsIcon,
  TrophyIcon,
  WomanIcon,
} from '../../utilitycomponents/Components/icons'
import { SetURLSearchParams } from 'react-router-dom'
type SeasonTabBarProps = {
  tab: string | null
  setSearchParams: SetURLSearchParams
}

const SeasonTabBar = ({ tab, setSearchParams }: SeasonTabBarProps) => {
  const matches = useMediaQuery('(min-width: 430px)')
  const { dispatch, women } = useGenderContext()
  const seasonTabBarObject = {
    gender: (
      <Button onClick={() => dispatch({ type: 'TOGGLE' })}>
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
            variant={tab === 'games' ? 'default' : 'outline'}
            onClick={() => {
              setSearchParams({ tab: 'games' })
            }}
          >
            {matches ? 'Matcher' : <CalendarIcon />}
          </Button>
        ),

        tabName: 'games',
      },
      {
        tab: (
          <Button
            variant={tab === 'tables' ? 'default' : 'outline'}
            onClick={() => {
              setSearchParams({ tab: 'tables' })
            }}
          >
            {matches ? 'Tabell' : <ListIcon />}
          </Button>
        ),

        tabName: 'tables',
      },
      {
        tab: (
          <Button
            variant={tab === 'playoff' ? 'default' : 'outline'}
            onClick={() => {
              setSearchParams({ tab: 'playoff' })
            }}
          >
            {matches ? 'Slutspel' : <TrophyIcon />}
          </Button>
        ),

        tabName: 'playoff',
      },
      {
        tab: (
          <Button
            variant={tab === 'roundForRound' ? 'default' : 'outline'}
            onClick={() => {
              setSearchParams({ tab: 'roundForRound' })
            }}
          >
            {matches ? 'Utveckling' : <DevIcon />}
          </Button>
        ),

        tabName: 'roundForRound',
      },
      {
        tab: (
          <Button
            variant={tab === 'stats' ? 'default' : 'outline'}
            onClick={() => {
              setSearchParams({ tab: 'stats' })
            }}
          >
            {matches ? 'Statistik' : <StatsIcon />}
          </Button>
        ),

        tabName: 'stats',
      },
      {
        tab: (
          <Button
            variant={tab === 'map' ? 'default' : 'outline'}
            onClick={() => {
              setSearchParams({ tab: 'map' })
            }}
          >
            {matches ? 'Karta' : <MapIcon />}
          </Button>
        ),
        tabName: 'map',
      },
    ],
  }
  return (
    <>
      <TabBarInline tabBarObject={seasonTabBarObject} />
    </>
  )
}

export default SeasonTabBar
