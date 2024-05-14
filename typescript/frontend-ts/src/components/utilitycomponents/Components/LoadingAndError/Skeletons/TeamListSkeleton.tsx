import { Skeleton } from '@/src/@/components/ui/skeleton'

const TeamListSkeleton = () => {
  return (
    <div className="w-full">
      <div className="grid w-2/3 grid-cols-1 justify-start gap-x-8 gap-y-2 pt-2 lg:grid-cols-3">
        {Array.from({ length: 42 }).map((_i, index) => {
          return <Skeleton key={index} className="h-9 w-full" />
        })}
      </div>
    </div>
  )
}

export default TeamListSkeleton
