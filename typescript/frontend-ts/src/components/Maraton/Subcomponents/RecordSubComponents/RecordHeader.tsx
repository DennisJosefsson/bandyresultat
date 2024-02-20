import { Dispatch, SetStateAction } from 'react'
import { ButtonComponent } from '../../../utilitycomponents/Components/ButtonComponents'

type RecordHeaderProps = {
  setParams: Dispatch<SetStateAction<{ record: string; women: boolean }>>
  women: boolean
  title: string
  setTitle: Dispatch<SetStateAction<string>>
}

const RecordHeader = ({
  setParams,
  women,
  title,
  setTitle,
}: RecordHeaderProps) => {
  return (
    <>
      <h2 className="mb-4 text-center text-base font-bold leading-4 sm:text-xl md:mb-6 lg:text-2xl">
        {title} {women ? 'Damer' : 'Herrar'}
      </h2>
      <div className="mb-2 flex flex-row justify-center gap-1 md:gap-4">
        <ButtonComponent
          clickFunctions={() => {
            setParams((params) => ({ ...params, record: 'generalStats' }))
            setTitle('Statistik')
          }}
        >
          Statistik
        </ButtonComponent>
        <ButtonComponent
          clickFunctions={() => {
            setParams((params) => ({ ...params, record: 'points' }))
            setTitle('Poäng Elitserien')
          }}
        >
          Poäng
        </ButtonComponent>
        <ButtonComponent
          clickFunctions={() => {
            setParams((params) => ({ ...params, record: 'scored' }))
            setTitle('Gjorda mål Elitserien')
          }}
        >
          Gjorda mål
        </ButtonComponent>
        <ButtonComponent
          clickFunctions={() => {
            setParams((params) => ({ ...params, record: 'conceded' }))
            setTitle('Insläppta mål Elitserien')
          }}
        >
          Insl. mål
        </ButtonComponent>
        <ButtonComponent
          clickFunctions={() => {
            setParams((params) => ({ ...params, record: 'streaks' }))
            setTitle('Rekordsviter')
          }}
        >
          Rekordsviter
        </ButtonComponent>
      </div>
    </>
  )
}

export default RecordHeader
