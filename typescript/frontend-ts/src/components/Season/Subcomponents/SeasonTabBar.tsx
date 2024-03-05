import { Dispatch, SetStateAction } from 'react'
import useGenderContext from '../../../hooks/contextHooks/useGenderContext'
import { TabBarInline } from '../../utilitycomponents/Components/TabBar'

type SeasonTabBarProps = {
  tab: string
  setTab: Dispatch<SetStateAction<string>>
}

const SeasonTabBar = ({ tab, setTab }: SeasonTabBarProps) => {
  const { dispatch } = useGenderContext()
  const seasonTabBarObject = {
    genderClickFunction: () => dispatch({ type: 'TOGGLE' }),
    tabBarArray: [
      {
        name: 'Matcher',
        tabName: 'games',
        clickFunctions: () => setTab('games'),
      },
      {
        name: 'Tabell',
        tabName: 'tables',
        clickFunctions: () => setTab('tables'),
      },
      {
        name: 'Slutspel',
        tabName: 'playoff',
        clickFunctions: () => setTab('playoff'),
      },
      {
        name: 'Utveckling',
        tabName: 'roundForRound',
        clickFunctions: () => setTab('roundForRound'),
      },
      {
        name: 'Statistik',
        tabName: 'stats',
        clickFunctions: () => setTab('stats'),
      },
      {
        name: 'Karta',
        tabName: 'map',
        clickFunctions: () => setTab('map'),
      },
    ],
  }
  return (
    <>
      <TabBarInline
        tabBarObject={seasonTabBarObject}
        tab={tab}
        setTab={setTab}
      />
    </>
  )
}

export default SeasonTabBar
