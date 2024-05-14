import SearchSelectionSkeleton from './Skeletons/SearchSelectionSkeleton'
import SeasonListSkeleton from './Skeletons/SeasonListSkeleton'
import SeasonMapSkeleton from './Skeletons/SeasonMapSkeleton'
import TeamListSkeleton from './Skeletons/TeamListSkeleton'
import Spinner from './Spinner'

type SkeletonType = 'seasonList' | 'teamsList' | 'seasonMap' | 'searchSelection'

type LoadingProps = {
  page?: SkeletonType
}

const Loading = ({ page }: LoadingProps) => {
  let content
  switch (page) {
    case 'seasonList':
      content = <SeasonListSkeleton />
      break
    case 'teamsList':
      content = <TeamListSkeleton />
      break
    case 'seasonMap':
      content = <SeasonMapSkeleton />
      break
    case 'searchSelection':
      content = <SearchSelectionSkeleton />
      break
    default:
      content = <Spinner />
  }
  return (
    <div className="mx-auto grid place-items-center font-inter text-foreground">
      {content}
    </div>
  )
}

export default Loading
