import { Skeleton } from '@/src/@/components/ui/skeleton'

const SearchSelectionSkeleton = () => {
  return (
    <div className="w-full">
      <Skeleton className="mb-2 h-10 w-full" />
      <div className="mb-2 grid grid-cols-1 gap-y-1 lg:grid-cols-3 lg:gap-x-16">
        {Array.from({ length: 6 }).map((_i, index) => {
          return <Skeleton key={index} className="h-9 w-24" />
        })}
      </div>
      <Skeleton className="h-[140px] w-full" />
    </div>
  )
}

export default SearchSelectionSkeleton
