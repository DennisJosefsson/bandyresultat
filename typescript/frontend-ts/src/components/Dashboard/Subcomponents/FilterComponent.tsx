import { Dispatch, SetStateAction, KeyboardEvent } from 'react'
import { Input } from '@/src/@/components/ui/input'
type FilterComponentProps = {
  seasonFilter: string
  setSeasonFilter: Dispatch<SetStateAction<string>>
  handleKeyDown: (event: KeyboardEvent<HTMLInputElement>) => void
}

const FilterComponent = ({
  seasonFilter,
  setSeasonFilter,
  handleKeyDown,
}: FilterComponentProps) => {
  return (
    <div className="w-full ">
      <form>
        <Input
          className="w-full border-foreground focus:border-foreground"
          type="text"
          placeholder="Filter"
          value={seasonFilter}
          name="seasonFilter"
          onChange={(event) =>
            setSeasonFilter(event.target.value.replace(/[^0-9]/gi, ''))
          }
          onKeyDown={handleKeyDown}
        />
      </form>
    </div>
  )
}

export default FilterComponent
