import MaratonTableHeader from './MaratonTableSubComponents/MaratonTableHeader'
import MaratonTables from './MaratonTableSubComponents/MaratonTables'
import {
  Loading,
  DataError,
} from '../../utilitycomponents/Components/LoadingOrError'

import useScrollTo from '../../../hooks/domHooks/useScrollTo'
import useGenderContext from '../../../hooks/contextHooks/useGenderContext'
import { useGetMaratonTables } from '../../../hooks/dataHooks/maratonHooks/useGetMaratonTables'

const Table = () => {
  const { women } = useGenderContext()

  const { tabell, isLoading, error, homeAwayTitle } = useGetMaratonTables()

  useScrollTo()

  if (error) return <DataError error={error} />

  if (isLoading) return <Loading />

  return (
    <>
      {tabell && (
        <div>
          <h2 className="mt-4 text-center text-base font-bold leading-4 sm:text-xl lg:text-2xl">
            Maratontabell {women ? 'Damer' : 'Herrar'} {homeAwayTitle}
          </h2>

          <div className="mx-auto mt-4 flex min-h-screen max-w-7xl flex-col font-inter text-foreground">
            <MaratonTableHeader />
            <MaratonTables tabell={tabell} />
          </div>
        </div>
      )}
    </>
  )
}

export default Table
