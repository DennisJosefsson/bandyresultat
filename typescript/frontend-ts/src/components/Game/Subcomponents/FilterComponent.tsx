import { Dispatch, SetStateAction, KeyboardEvent } from 'react'
import { Input } from '@/src/@/components/ui/input'
const FilterComponent = ({
  teamFilter,
  setTeamFilter,
}: {
  teamFilter: string
  setTeamFilter: Dispatch<SetStateAction<string>>
}) => {
  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault()
    }
  }

  return (
    <div className="w-full ">
      <form>
        <Input
          className="w-full border-foreground bg-muted focus:border-foreground dark:bg-muted/50"
          type="text"
          placeholder="Filter"
          value={teamFilter}
          name="teamFilter"
          onChange={(event) =>
            setTeamFilter(
              event.target.value.replace(/[^a-z0-9\u00C0-\u017F]/gi, ''),
            )
          }
          onKeyDown={handleKeyDown}
        />
      </form>
    </div>
  )
}

export default FilterComponent
