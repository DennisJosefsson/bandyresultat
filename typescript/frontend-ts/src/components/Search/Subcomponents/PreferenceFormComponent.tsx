import { Dispatch, SetStateAction } from 'react'
import { useFormContext } from 'react-hook-form'
import { ChevronUp } from '../../utilitycomponents/Components/icons'

type PreferenceFormComponentProps = {
  showPreferenceForm: boolean
  setShowPreferenceForm: Dispatch<SetStateAction<boolean>>
}

const PreferenceFormComponent = ({
  showPreferenceForm,
  setShowPreferenceForm,
}: PreferenceFormComponentProps) => {
  const { register, getValues } = useFormContext()
  return (
    <div className="mb-2 flex w-[18rem] flex-col rounded bg-white p-2 text-sm shadow-md md:text-base lg:w-full">
      <div className="grid grid-cols-1 lg:grid-cols-3">
        <div className="text-left">
          <fieldset className="mb-2 grid grid-cols-2">
            <legend className="mb-2 font-bold underline underline-offset-2">
              Matchkategorier
            </legend>
            <div className="mb-1 mr-2 flex items-center">
              <input
                className="content-center border-[#011d29] text-[#011d29] focus:border-[#011d29] focus:ring-0"
                type="checkbox"
                value="final"
                id="final"
                {...register('categoryArray', {
                  validate: {
                    validateArray: () =>
                      getValues('categoryArray').length > 0 ||
                      'Måste välja minst en matchkategori.',
                  },
                })}
              />
              <label htmlFor="final" className="pl-2">
                Final
              </label>
            </div>
            <div className="mb-1 mr-2 flex items-center">
              <input
                className="border-[#011d29] text-[#011d29] focus:border-[#011d29] focus:ring-0"
                type="checkbox"
                value="semi"
                id="semi"
                {...register('categoryArray', {
                  validate: {
                    validateArray: () =>
                      getValues('categoryArray').length > 0 ||
                      'Måste välja minst en matchkategori.',
                  },
                })}
              />
              <label htmlFor="semi" className="pl-2">
                Semifinal
              </label>
            </div>
            <div className="mb-1 mr-2 flex items-center">
              <input
                className="border-[#011d29] text-[#011d29] focus:border-[#011d29] focus:ring-0"
                type="checkbox"
                value="quarter"
                id="quarter"
                {...register('categoryArray', {
                  validate: {
                    validateArray: () =>
                      getValues('categoryArray').length > 0 ||
                      'Måste välja minst en matchkategori.',
                  },
                })}
              />
              <label htmlFor="quarter" className="pl-2">
                Kvartsfinal
              </label>
            </div>
            <div className="mb-1 mr-2 flex items-center">
              <input
                className="border-[#011d29] text-[#011d29] focus:border-[#011d29] focus:ring-0"
                type="checkbox"
                value="eight"
                id="eight"
                {...register('categoryArray', {
                  validate: {
                    validateArray: () =>
                      getValues('categoryArray').length > 0 ||
                      'Måste välja minst en matchkategori.',
                  },
                })}
              />
              <label htmlFor="eight" className="pl-2">
                Åttondelsfinal
              </label>
            </div>
            <div className="mb-1 mr-2 flex items-center">
              <input
                className="border-[#011d29] text-[#011d29] focus:border-[#011d29] focus:ring-0"
                type="checkbox"
                value="regular"
                id="regular"
                {...register('categoryArray', {
                  validate: {
                    validateArray: () =>
                      getValues('categoryArray').length > 0 ||
                      'Måste välja minst en matchkategori.',
                  },
                })}
              />
              <label htmlFor="regular" className="pl-2">
                Grundserie
              </label>
            </div>
            <div className="mb-1 mr-2 flex items-center">
              <input
                className="border-[#011d29] text-[#011d29] focus:border-[#011d29] focus:ring-0"
                type="checkbox"
                value="qualification"
                id="qualification"
                {...register('categoryArray', {
                  validate: {
                    validateArray: () =>
                      getValues('categoryArray').length > 0 ||
                      'Måste välja minst en matchkategori.',
                  },
                })}
              />
              <label htmlFor="qualification" className="pl-2">
                Kval
              </label>
            </div>
          </fieldset>
          <fieldset className="mb-2 grid grid-cols-2 self-start">
            <legend className="mb-2 font-bold underline underline-offset-2">
              Matchresultat
            </legend>
            <div className="mb-1 mr-2 flex items-center">
              <input
                className="content-center border-[#011d29] text-[#011d29] focus:border-[#011d29] focus:ring-0"
                type="radio"
                value="win"
                id="win"
                {...register('gameResult')}
              />
              <label htmlFor="win" className="pl-2">
                Vinst
              </label>
            </div>
            <div className="mb-1 mr-2 flex items-center">
              <input
                className="border-[#011d29] text-[#011d29] focus:border-[#011d29] focus:ring-0"
                type="radio"
                value="draw"
                id="draw"
                {...register('gameResult')}
              />
              <label htmlFor="draw" className="pl-2">
                Oavgjort
              </label>
            </div>
            <div className="mb-1 mr-2 flex items-center">
              <input
                className="border-[#011d29] text-[#011d29] focus:border-[#011d29] focus:ring-0"
                type="radio"
                value="lost"
                id="lost"
                {...register('gameResult')}
              />
              <label htmlFor="lost" className="pl-2">
                Förlust
              </label>
            </div>
            <div className="mb-1 mr-2 flex items-center">
              <input
                className="border-[#011d29] text-[#011d29] focus:border-[#011d29] focus:ring-0"
                type="radio"
                value="all"
                id="all"
                {...register('gameResult')}
              />
              <label htmlFor="all" className="pl-2">
                Alla
              </label>
            </div>
          </fieldset>
          <fieldset className="mb-2 flex flex-row self-start">
            <legend className="mb-2 font-bold underline underline-offset-2">
              Hemma/borta
            </legend>
            <div className="mb-1 mr-2 flex items-center">
              <input
                className="content-center border-[#011d29] text-[#011d29] focus:border-[#011d29] focus:ring-0"
                type="radio"
                value="home"
                id="home"
                {...register('homeGame')}
              />
              <label htmlFor="home" className="pl-2">
                Hemma
              </label>
            </div>
            <div className="mb-1 mr-2 flex items-center">
              <input
                className="border-[#011d29] text-[#011d29] focus:border-[#011d29] focus:ring-0"
                type="radio"
                value="away"
                id="away"
                {...register('homeGame')}
              />
              <label htmlFor="away" className="pl-2">
                Borta
              </label>
            </div>
            <div className="mb-1 mr-2 flex items-center">
              <input
                className="border-[#011d29] text-[#011d29] focus:border-[#011d29] focus:ring-0"
                type="radio"
                value="both"
                id="both"
                {...register('homeGame')}
              />
              <label htmlFor="both" className="pl-2">
                Alla
              </label>
            </div>
          </fieldset>
          <fieldset className="mb-2 flex flex-row self-start">
            <legend className="mb-2 font-bold underline underline-offset-2">
              Sökpreferens
            </legend>

            <div className="mb-1 mr-2 flex items-center">
              <input
                className="border-[#011d29] text-[#011d29] focus:border-[#011d29] focus:ring-0"
                type="radio"
                value="men"
                id="men"
                {...register('selectedGender')}
              />
              <label htmlFor="men" className="pl-2">
                Herr
              </label>
            </div>
            <div className="mb-1 mr-2 flex items-center">
              <input
                className="border-[#011d29] text-[#011d29] focus:border-[#011d29] focus:ring-0"
                type="radio"
                value="women"
                id="women"
                {...register('selectedGender')}
              />
              <label htmlFor="women" className="pl-2">
                Dam
              </label>
            </div>
            <div className="mb-1 mr-2 flex items-center">
              <input
                className="border-[#011d29] text-[#011d29] focus:border-[#011d29] focus:ring-0"
                type="radio"
                value="all"
                id="all"
                {...register('selectedGender')}
              />
              <label htmlFor="all" className="pl-2">
                Alla
              </label>
            </div>
          </fieldset>
        </div>
      </div>
      <div
        className="flex w-full cursor-pointer flex-row justify-between py-2"
        onClick={() => setShowPreferenceForm(false)}
      >
        <div>{showPreferenceForm ? 'Göm matchinställningar' : null}</div>
        <div>{showPreferenceForm ? <ChevronUp /> : null}</div>
      </div>
    </div>
  )
}

export default PreferenceFormComponent
