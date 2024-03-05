import { Dispatch, SetStateAction } from 'react'
import useGenderContext from '../../../hooks/contextHooks/useGenderContext'
import { TabBarDivided } from '../../utilitycomponents/Components/TabBar'

type MaratonTabBarProps = {
  tab: string
  setTab: Dispatch<SetStateAction<string>>
}

const MaratonTabBar = ({ tab, setTab }: MaratonTabBarProps) => {
  const { dispatch } = useGenderContext()

  const maratonTabBarObject = {
    genderClickFunction: () => dispatch({ type: 'TOGGLE' }),
    tabBarArray: [
      {
        name: 'Maratontabeller',
        tabName: 'maraton',
        clickFunctions: () => setTab('maraton'),
      },
      {
        name: 'Rekord',
        tabName: 'records',
        clickFunctions: () => setTab('records'),
      },
    ],
  }
  return (
    <>
      <TabBarDivided
        tabBarObject={maratonTabBarObject}
        tab={tab}
        setTab={setTab}
      />
    </>
  )
}

export default MaratonTabBar
