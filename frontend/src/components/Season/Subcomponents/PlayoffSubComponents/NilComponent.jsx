import { groupConstant } from '../../../utilitycomponents/Functions/constants'

const NilComponent = ({ group, colStarts }) => {
  const styleClass = colStarts
    ? `${colStarts[group]} rounded bg-white p-2 shadow-md`
    : 'rounded bg-white p-2 shadow-md md:col-start-4 md:odd:col-start-2'

  return (
    <div className={styleClass}>
      <div className="flex flex-row justify-between">
        <h4 className="text-sm font-bold">{groupConstant[group]}</h4>
      </div>
      <div>
        <h4 className="text-sm">Inga matcher än</h4>
      </div>
    </div>
  )
}

export default NilComponent
