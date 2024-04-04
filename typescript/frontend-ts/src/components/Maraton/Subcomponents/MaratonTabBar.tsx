import useGenderContext from '../../../hooks/contextHooks/useGenderContext'
import { TabBarDivided } from '../../utilitycomponents/Components/TabBar'
import { Button } from '@/src/@/components/ui/button'
import { useMediaQuery } from 'usehooks-ts'
import {
  ListIcon,
  ManIcon,
  StatsIcon,
  WomanIcon,
  QuestionIcon,
} from '../../utilitycomponents/Components/icons'
import { SetURLSearchParams } from 'react-router-dom'
type MaratonTabBarProps = {
  tab: string | null
  setSearchParams: SetURLSearchParams
}

const MaratonTabBar = ({ tab, setSearchParams }: MaratonTabBarProps) => {
  const { women, dispatch } = useGenderContext()
  const matches = useMediaQuery('(min-width: 430px)')
  const maratonTabBarObject = {
    gender: (
      <Button
        onClick={() => {
          dispatch({ type: 'TOGGLE' })
        }}
        variant="default"
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
        onClick={() => setSearchParams({ tab: 'help' })}
        variant={tab === 'help' ? 'default' : 'outline'}
      >
        {matches ? 'Hjälp' : <QuestionIcon />}
      </Button>
    ),
    tabBarArray: [
      {
        tab: (
          <Button
            variant={tab === 'maraton' ? 'default' : 'outline'}
            onClick={() => {
              setSearchParams({ tab: 'maraton', table: 'all' })
            }}
          >
            {matches ? 'Maratontabeller' : <ListIcon />}
          </Button>
        ),
        tabName: 'maraton',
      },
      {
        tab: (
          <Button
            variant={tab === 'records' ? 'default' : 'outline'}
            onClick={() => {
              setSearchParams({ tab: 'records', record: 'generalStats' })
            }}
          >
            {matches ? 'Rekord' : <StatsIcon />}
          </Button>
        ),
        tabName: 'records',
      },
    ],
  }
  return (
    <>
      <TabBarDivided tabBarObject={maratonTabBarObject} />
    </>
  )
}

export default MaratonTabBar
