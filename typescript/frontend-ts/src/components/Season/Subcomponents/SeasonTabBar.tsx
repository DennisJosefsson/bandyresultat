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
import { useNavigate, useSearch } from '@tanstack/react-router'

const SeasonTabBar = () => {
  const { tab } = useSearch({ from: '/season/$seasonId' })
  const navigate = useNavigate({ from: '/season/$seasonId' })
  const matches = useMediaQuery('(min-width: 640px)')
  const { dispatch, women } = useGenderContext()
  const seasonTabBarObject = {
    gender: (
      <Button
        onClick={() => dispatch({ type: 'TOGGLE' })}
        size={matches ? 'default' : 'icon'}
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
            variant={tab === 'games' ? 'default' : 'outline'}
            onClick={() => {
              navigate({ search: { tab: 'games' } })
            }}
            size={matches ? 'default' : 'icon'}
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
              navigate({ search: { tab: 'tables' } })
            }}
            size={matches ? 'default' : 'icon'}
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
              navigate({ search: { tab: 'playoff' } })
            }}
            size={matches ? 'default' : 'icon'}
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
              navigate({ search: { tab: 'roundForRound' } })
            }}
            size={matches ? 'default' : 'icon'}
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
              navigate({ search: { tab: 'stats' } })
            }}
            size={matches ? 'default' : 'icon'}
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
              navigate({ search: { tab: 'map' } })
            }}
            size={matches ? 'default' : 'icon'}
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
