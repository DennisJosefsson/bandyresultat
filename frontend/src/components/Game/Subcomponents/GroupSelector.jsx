import { ButtonComponent } from '../../utilitycomponents/Components/ButtonComponents'
const GroupSelector = ({
  gamesArray,
  setRound,
  setGroup,
  groupName,
  groupId,
}) => {
  return (
    <>
      <div className="flex flex-row justify-center gap-1">
        {gamesArray.map((group) => {
          return (
            <ButtonComponent
              active={`${
                groupId === group.group
                  ? 'ring-2 ring-cyan-600 ring-inset'
                  : null
              }`}
              key={group.group}
              clickFunctions={() => {
                setGroup(group.group)
                setRound(0)
              }}
            >
              {group.serieName}
            </ButtonComponent>
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
