const FilterComponent = ({ teamFilter, setTeamFilter }) => {
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault()
    }
  }

  return (
    <div className="w-full ">
      <form>
        <input
          className="w-full border-[#011d29] focus:border-[#011d29]"
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
