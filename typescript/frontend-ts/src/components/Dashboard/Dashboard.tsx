import { useState } from 'react'
import TeamForm from '../Team/Subcomponents/TeamForm'
import Errors from './Errors'
import Seasons from './Seasons'
import { TabBarDivided } from '../utilitycomponents/Components/TabBar'
import useGenderContext from '../../hooks/contextHooks/useGenderContext'
import { Button } from '@/src/@/components/ui/button'
import {
  Card,
  CardTitle,
  CardContent,
  CardHeader,
} from '@/src/@/components/ui/card'
import NewSeason from './NewSeason'

const Dashboard = () => {
  const [tab, setTab] = useState<string>('error')

  const { women, dispatch } = useGenderContext()

  const dashboardTabBarObject = {
    gender: (
      <Button
        onClick={() => {
          dispatch({ type: 'TOGGLE' })
        }}
      >
        {women ? 'Herrar' : 'Damer'}
      </Button>
    ),
    tabBarArray: [
      {
        tab: (
          <Button
            variant={tab === 'error' ? 'default' : 'outline'}
            onClick={() => {
              setTab('error')
            }}
          >
            Error
          </Button>
        ),

        tabName: 'error',
      },
      {
        tab: (
          <Button
            variant={tab === 'addteams' ? 'default' : 'outline'}
            onClick={() => {
              setTab('addteams')
            }}
          >
            Nytt lag
          </Button>
        ),
        tabName: 'addteams',
        conditional: true,
      },
      {
        tab: (
          <Button
            variant={tab === 'seasons' ? 'default' : 'outline'}
            onClick={() => {
              setTab('seasons')
            }}
          >
            Säsonger
          </Button>
        ),
        tabName: 'seasons',
      },
      {
        tab: (
          <Button
            variant={tab === 'newSeason' ? 'default' : 'outline'}
            onClick={() => {
              setTab('newSeason')
            }}
          >
            Ny säsong
          </Button>
        ),
        tabName: 'newSeason',
      },
    ],
  }

  return (
    <div className="mx-auto min-h-screen max-w-7xl font-inter text-foreground">
      <Card className="mb-2">
        <CardHeader>
          <CardTitle>Dashboard {women ? 'Damer' : 'Herrar'}</CardTitle>
        </CardHeader>
        <CardContent>
          <TabBarDivided tabBarObject={dashboardTabBarObject} />
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <div className="justify-self-center">
            {tab === 'error' && <Errors />}

            {tab === 'seasons' && <Seasons />}

            {tab === 'addteams' && (
              <>
                <TeamForm />
              </>
            )}
            {tab === 'newSeason' && <NewSeason />}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Dashboard
