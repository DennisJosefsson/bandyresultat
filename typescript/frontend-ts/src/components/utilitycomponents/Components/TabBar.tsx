import {
  SelectionIcon,
  ListIcon,
  DevIcon,
  StatsIcon,
  TrophyIcon,
  CalendarIcon,
  MapIcon,
  ManIcon,
  WomanIcon,
  QuestionIcon,
  SearchIcon,
} from './icons'
import { Dispatch, SetStateAction, SyntheticEvent } from 'react'

import useGenderContext from '../../../hooks/contextHooks/useGenderContext'
import { Button } from '@/src/@/components/ui/button'

export type TabBarObject = {
  tabBarArray: {
    name: string
    tabName: string
    clickFunctions: (() => void) | ((event: SyntheticEvent) => void)
    conditional?: string | boolean
  }[]
  genderClickFunction: () => void
}

type TabIcons = {
  [key: string]: JSX.Element
}

const tabIcons: TabIcons = {
  games: <CalendarIcon />,
  tables: <ListIcon />,
  maraton: <ListIcon />,
  playoff: <TrophyIcon />,
  roundForRound: <DevIcon />,
  stats: <StatsIcon />,
  records: <StatsIcon />,
  map: <MapIcon />,
  teams: <ListIcon />,
  search: <SearchIcon />,
  compare: <SearchIcon />,
  selection: <SelectionIcon />,
}

export const TabBarInline = ({
  tabBarObject,
  setTab,
  tab,
}: {
  tabBarObject: TabBarObject
  tab: string
  setTab: Dispatch<SetStateAction<string>>
}) => {
  const { women } = useGenderContext()
  return (
    <div>
      <div className="hidden items-center text-sm font-bold xs:mb-2 xs:flex xs:flex-row xs:justify-between xs:gap-1 md:gap-2 md:text-lg">
        {tabBarObject.tabBarArray.map((currTab) => {
          return (
            <Button
              key={currTab.name}
              onClick={currTab.clickFunctions}
              variant={tab === currTab.tabName ? 'default' : 'outline'}
            >
              {currTab.name}
            </Button>
          )
        })}
        <Button
          onClick={() => setTab('help')}
          variant={tab === 'help' ? 'default' : 'outline'}
        >
          Hjälp
        </Button>
        <Button onClick={tabBarObject.genderClickFunction}>
          {women ? 'Herrar' : 'Damer'}
        </Button>
      </div>
      <div className="flex flex-row justify-between gap-1 text-sm font-bold xs:mb-2 xs:hidden md:gap-2 md:text-lg">
        {tabBarObject.tabBarArray.map((currTab, index) => {
          return (
            <Button
              key={`${currTab.name}-${index}`}
              onClick={currTab.clickFunctions}
              variant={tab === currTab.tabName ? 'default' : 'outline'}
            >
              {tabIcons[currTab.tabName]}
            </Button>
          )
        })}
        <Button
          onClick={() => setTab('help')}
          variant={tab === 'help' ? 'default' : 'outline'}
        >
          <QuestionIcon />
        </Button>
        <Button onClick={tabBarObject.genderClickFunction}>
          {women ? <ManIcon /> : <WomanIcon />}
        </Button>
      </div>
    </div>
  )
}

export const TabBarDivided = ({
  tabBarObject,
  tab,
  setTab,
  onlyDesktop,
}: {
  tabBarObject: TabBarObject
  tab: string
  setTab: Dispatch<SetStateAction<string>>
  onlyDesktop?: boolean
}) => {
  const { women } = useGenderContext()
  return (
    <div>
      <div className="hidden items-center text-sm font-bold xs:mb-2 xs:flex xs:flex-row xs:justify-between xs:gap-1 md:gap-2 md:text-lg">
        <div className="flex flex-row xs:gap-1 md:gap-2">
          {tabBarObject.tabBarArray.map((currTab) => {
            return (
              <Button
                key={currTab.name}
                onClick={currTab.clickFunctions}
                variant={tab === currTab.tabName ? 'default' : 'outline'}
              >
                {currTab.name}
              </Button>
            )
          })}
        </div>
        <div className="flex flex-row xs:gap-1 md:gap-2">
          <Button
            onClick={() => setTab('help')}
            variant={tab === 'help' ? 'default' : 'outline'}
          >
            Hjälp
          </Button>
          <Button onClick={tabBarObject.genderClickFunction}>
            {women ? 'Herrar' : 'Damer'}
          </Button>
        </div>
      </div>
      {!onlyDesktop && (
        <div className="flex flex-row justify-between gap-1  text-sm font-bold xs:mb-2 xs:hidden md:gap-2 md:text-lg">
          <div className="flex flex-row xs:gap-1 md:gap-2">
            {tabBarObject.tabBarArray.map((currTab, index) => {
              return (
                <Button
                  key={`${currTab.name}-${index}`}
                  onClick={currTab.clickFunctions}
                  variant={tab === currTab.tabName ? 'default' : 'outline'}
                >
                  {tabIcons[currTab.tabName]}
                </Button>
              )
            })}
          </div>
          <div className="flex flex-row xs:gap-1 md:gap-2">
            <Button
              onClick={() => setTab('help')}
              variant={tab === 'help' ? 'default' : 'outline'}
            >
              <QuestionIcon />
            </Button>
            <Button onClick={tabBarObject.genderClickFunction}>
              {women ? <ManIcon /> : <WomanIcon />}
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
