const GroupSelector = ({ gamesArray, setRound, setGroup, groupName }) => {
  return (
    <>
      <div className="flex flex-row justify-center gap-1">
        {gamesArray.map((group) => {
          return (
            <div
              key={group.group}
              onClick={() => {
                setGroup(group.group)
                setRound(0)
              }}
              className="cursor-pointer truncate rounded bg-slate-400 p-1 text-xs text-white md:text-sm lg:text-base"
            >
              {group.serieName}
            </div>
          )
        })}
      </div>
      {groupName === '' && (
        <div className="mt-2 grid place-content-center font-bold">
          Välj serie.
        </div>
      )}
    </>
  )
}

export default GroupSelector
