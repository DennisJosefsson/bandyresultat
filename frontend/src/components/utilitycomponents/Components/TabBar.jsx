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
import { useContext } from 'react'
import { GenderContext } from '../../../contexts/contexts'

const tabIcons = {
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

export const TabBarInline = ({ tabBarObject, tab, setTab }) => {
  const { women } = useContext(GenderContext)
  return (
    <div>
      <div className="hidden items-center bg-slate-300 text-sm font-bold xs:mb-2 xs:flex xs:flex-row xs:justify-between xs:gap-1 md:gap-2 md:text-lg">
        {tabBarObject.tabBarArray.map((currTab) => {
          return (
            <div
              key={currTab.name}
              onClick={currTab.clickFunctions}
              className={`${
                tab === currTab.tabName
                  ? 'border-b-4 border-black'
                  : 'border-b-4 border-slate-300'
              } cursor-pointer bg-slate-300 p-2 duration-300 ease-in-out hover:border-b-4 hover:border-black hover:bg-slate-200 hover:transition-colors`}
            >
              {currTab.name}
            </div>
          )
        })}
        <div
          onClick={() => setTab('help')}
          className="cursor-pointer border-b-4 border-slate-300 bg-slate-300 p-2 duration-300 ease-in-out hover:border-black hover:bg-slate-200 hover:transition-colors"
        >
          Hjälp
        </div>
        <div
          className="cursor-pointer border-b-4 border-slate-300 bg-slate-300 p-2 duration-300 ease-in-out hover:border-black hover:bg-slate-200 hover:transition-colors"
          onClick={tabBarObject.genderClickFunction}
        >
          {women ? 'Herrar' : 'Damer'}
        </div>
      </div>
      <div className="flex flex-row justify-between gap-1 bg-slate-300 text-sm font-bold xs:mb-2 xs:hidden md:gap-2 md:text-lg">
        {tabBarObject.tabBarArray.map((currTab, index) => {
          return (
            <div
              key={`${currTab.name}-${index}`}
              onClick={currTab.clickFunctions}
              className={`${
                tab === currTab.tabName
                  ? 'border-b-4 border-black'
                  : 'border-b-4 border-slate-300'
              } cursor-pointer bg-slate-300 p-2 duration-300 ease-in-out hover:border-b-4 hover:border-black hover:bg-slate-200 hover:transition-colors`}
            >
              {tabIcons[currTab.tabName]}
            </div>
          )
        })}
        <div
          onClick={() => setTab('help')}
          className="cursor-pointer border-b-4 border-slate-300 bg-slate-300 p-2 duration-300 ease-in-out hover:border-black hover:bg-slate-200 hover:transition-colors"
        >
          <QuestionIcon />
        </div>
        <div
          className="cursor-pointer border-b-4 border-slate-300 bg-slate-300 p-2 hover:border-black hover:bg-slate-200"
          onClick={tabBarObject.genderClickFunction}
        >
          {women ? <ManIcon /> : <WomanIcon />}
        </div>
      </div>
    </div>
  )
}

export const TabBarDivided = ({ tabBarObject, tab, setTab }) => {
  const { women } = useContext(GenderContext)
  return (
    <div>
      <div className="hidden items-center bg-slate-300 text-sm font-bold xs:mb-2 xs:flex xs:flex-row xs:justify-between xs:gap-1 md:gap-2 md:text-lg">
        <div className="flex flex-row xs:gap-1 md:gap-2">
          {tabBarObject.tabBarArray.map((currTab) => {
            return (
              <div
                key={currTab.name}
                onClick={currTab.clickFunctions}
                className={`${
                  tab === currTab.tabName
                    ? 'border-b-4 border-black'
                    : 'border-b-4 border-slate-300'
                } cursor-pointer bg-slate-300 p-2 duration-300 ease-in-out hover:border-b-4 hover:border-black hover:bg-slate-200 hover:transition-colors`}
              >
                {currTab.name}
              </div>
            )
          })}
        </div>
        <div className="flex flex-row xs:gap-1 md:gap-2">
          <div
            onClick={() => setTab('help')}
            className="cursor-pointer border-b-4 border-slate-300 bg-slate-300 p-2 duration-300 ease-in-out hover:border-black hover:bg-slate-200 hover:transition-colors"
          >
            Hjälp
          </div>
          <div
            className="cursor-pointer border-b-4 border-slate-300 bg-slate-300 p-2 duration-300 ease-in-out hover:border-black hover:bg-slate-200 hover:transition-colors"
            onClick={tabBarObject.genderClickFunction}
          >
            {women ? 'Herrar' : 'Damer'}
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-between gap-1 bg-slate-300 text-sm font-bold xs:mb-2 xs:hidden md:gap-2 md:text-lg">
        <div className="flex flex-row xs:gap-1 md:gap-2">
          {tabBarObject.tabBarArray.map((currTab, index) => {
            return (
              <div
                key={`${currTab.name}-${index}`}
                onClick={currTab.clickFunctions}
                className={`${
                  tab === currTab.tabName
                    ? 'border-b-4 border-black'
                    : 'border-b-4 border-slate-300'
                } cursor-pointer bg-slate-300 p-2 duration-300 ease-in-out hover:border-b-4 hover:border-black hover:bg-slate-200 hover:transition-colors`}
              >
                {tabIcons[currTab.tabName]}
              </div>
            )
          })}
        </div>
        <div className="flex flex-row xs:gap-1 md:gap-2">
          <div
            onClick={() => setTab('help')}
            className="cursor-pointer border-b-4 border-slate-300 bg-slate-300 p-2 duration-300 ease-in-out hover:border-black hover:bg-slate-200 hover:transition-colors"
          >
            <QuestionIcon />
          </div>
          <div
            className="cursor-pointer border-b-4 border-slate-300 bg-slate-300 p-2 hover:border-black hover:bg-slate-200"
            onClick={tabBarObject.genderClickFunction}
          >
            {women ? <ManIcon /> : <WomanIcon />}
          </div>
        </div>
      </div>
    </div>
  )
}
