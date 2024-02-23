import { Dispatch, SetStateAction, KeyboardEvent } from 'react'

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
        <input
          className="w-full border-[#011d29] focus:border-[#011d29]"
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
