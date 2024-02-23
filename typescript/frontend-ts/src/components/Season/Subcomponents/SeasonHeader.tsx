import { Link } from 'react-router-dom'
import { LeftArrow, RightArrow } from '../../utilitycomponents/Components/icons'

type SeasonHeaderProps = {
  seasonId: number
  women: boolean
}

const SeasonHeader = ({ seasonId, women }: SeasonHeaderProps) => {
  return (
    <div className="flex flex-row justify-center">
      <div className="mx-auto mb-4 flex w-full flex-1 flex-row items-center justify-center">
        <div className={seasonId - 1 === 1906 ? 'invisible' : undefined}>
          <Link to={`/season/${seasonId - 1}`} state={{ resetRound: true }}>
            <div className="flex flex-row items-center gap-1">
              <LeftArrow />
            </div>
          </Link>
        </div>
        <div className="mx-16">
          <h2 className="text-center text-[12px] font-bold sm:text-xl lg:text-2xl">
            Säsong{' '}
            {seasonId < 1964 ? `${seasonId}` : `${seasonId - 1}/${seasonId}`}{' '}
            {women ? 'Damer' : 'Herrar'}
          </h2>
        </div>
        <div className={seasonId + 1 === 2025 ? 'invisible' : undefined}>
          <Link to={`/season/${seasonId + 1}`} state={{ resetRound: true }}>
            <div className="flex flex-row items-center gap-1">
              <RightArrow />
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default SeasonHeader
