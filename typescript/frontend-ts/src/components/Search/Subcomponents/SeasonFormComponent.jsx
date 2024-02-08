import { useFormContext } from 'react-hook-form'
import { ChevronUp } from '../../utilitycomponents/Components/icons'

const SeasonFormComponent = ({ showSeasonForm, setShowSeasonForm }) => {
  const { register, getValues } = useFormContext()

  return (
    <div className="mb-2 flex w-[18rem] flex-col rounded bg-white p-2 text-sm shadow-md md:text-base lg:w-full">
      <div className="grid grid-cols-1 lg:grid-cols-3">
        <div className="flex max-w-[16rem] flex-col">
          <div>Första år</div>
          <div>
            <input
              className="w-[16rem] border-[#011d29] text-[#011d29]"
              type="text"
              {...register('startSeason', {
                required: 'Måste ha slutår.',
                minLength: { value: 4, message: 'Måste vara fyra siffror.' },
                maxLength: { value: 4, message: 'Måste vara fyra siffror.' },
                min: {
                  value: 1907,
                  message: 'Startåret kan inte vara lägre än 1907.',
                },
                max: {
                  value: 2024,
                  message: 'Startåret kan inte vara senare än 2024.',
                },
                pattern: {
                  value: '/[0-9]{4}',
                  message: 'Måste vara fyra siffror i startåret.',
                },
                validate: {
                  validateSeasons: () =>
                    Number(getValues('startSeason')) <=
                      Number(getValues('endSeason')) ||
                    'Startåret måste vara samma som eller lägre än slutåret.',
                },
              })}
              placeholder="T.ex. 1964 för 1963/1964"
            />
          </div>
        </div>
        <div className="flex max-w-[16rem] flex-col">
          <div>Sista år</div>
          <div>
            <input
              className="w-[16rem] border-[#011d29] text-[#011d29]"
              type="text"
              {...register('endSeason', {
                required: 'Måste ha slutår.',
                minLength: { value: 4, message: 'Måste vara fyra siffror.' },
                maxLength: { value: 4, message: 'Måste vara fyra siffror.' },
                min: {
                  value: 1907,
                  message: 'Slutåret kan inte vara lägre än 1907.',
                },
                max: {
                  value: 2024,
                  message: 'Slutåret kan inte vara senare än 2024.',
                },
                pattern: {
                  value: '/[0-9]{4}',
                  message: 'Måste vara fyra siffror i slutåret.',
                },
              })}
              placeholder="T.ex. 2021 för 2020/2021"
            />
          </div>
        </div>
        <div className="flex max-w-[16rem] flex-col">
          <div>Matchdatum</div>
          <div>
            <input
              className="w-[16rem] border-[#011d29] text-[#011d29]"
              type="text"
              {...register('inputDate', {
                minLength: { value: 3, message: 'Felaktigt datum.' },
                maxLength: { value: 5, message: 'Felaktigt datum.' },
                pattern: {
                  value: '/[0-9]{1,2}/[0-9]{1,2}',
                  message: 'Datumet har felaktigt format.',
                },
              })}
              placeholder="T.ex. 26/12 för annandagen"
            />
          </div>
        </div>
      </div>
      <div
        className="flex w-full cursor-pointer flex-row justify-between py-2"
        onClick={() => setShowSeasonForm(false)}
      >
        <div>{showSeasonForm ? 'Göm säsongsinställningar' : null}</div>
        <div>{showSeasonForm ? <ChevronUp /> : null}</div>
      </div>
    </div>
  )
}

export default SeasonFormComponent
