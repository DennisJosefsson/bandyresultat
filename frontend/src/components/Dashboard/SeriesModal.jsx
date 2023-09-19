import { useForm } from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message'
import { useQuery } from 'react-query'
import { postSerie } from '../../requests/series'
import { useState, useEffect } from 'react'

const ErrorComponent = ({ errors }) => {
  if (Object.keys(errors).length === 0) {
    return null
  }
  return (
    <div className="mb-2 rounded border-red-700 bg-white p-2 text-sm font-semibold text-red-700 md:text-base">
      {Object.keys(errors).map((fieldName) => (
        <ErrorMessage
          errors={errors}
          name={fieldName}
          as="div"
          key={fieldName}
        />
      ))}
    </div>
  )
}

const SeriesModal = ({ setShowModal, women }) => {
  const [serieData, setSerieData] = useState(null)
  const { data } = useQuery({
    queryKey: ['search', serieData],
    queryFn: () => postSerie(serieData),
    enabled: !!serieData,
  })

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: {
      serieCategory: '',
      serieGroupCode: '',
      serieStructure: [],
      serieName: '',
      comment: '',
      season: '',
      women: women,
    },
    criteriaMode: 'all',
    mode: 'onBlur',
  })

  useEffect(() => {
    if (data && data.success === false) {
      setError('season', {
        type: 'manual',
        message: data.message,
      })
    }
  }, [data, setError])

  const onSubmit = (formData) => setSerieData(formData)

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none">
        <div className="relative mx-auto my-6 w-auto max-w-3xl">
          {/*content*/}
          <div className="relative flex w-full flex-col rounded-lg border-0 bg-white shadow-lg outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between rounded-t border-b border-solid border-slate-200 p-5">
              <h3 className="text-3xl font-semibold">Serie</h3>
              <button
                className="float-right ml-auto border-0 bg-transparent p-1 text-3xl font-semibold leading-none text-black opacity-5 outline-none focus:outline-none"
                onClick={() => setShowModal(false)}
              >
                <span className="block h-6 w-6 bg-transparent text-2xl text-black opacity-5 outline-none focus:outline-none">
                  ×
                </span>
              </button>
            </div>
            {/*body*/}
            <div>
              <form onSubmit={handleSubmit(onSubmit)} id="seriedataForm">
                <div className="flex w-[540px] flex-auto flex-col p-5 px-16">
                  <div className="p-1">
                    <label
                      htmlFor="serieName"
                      className="flex flex-row text-sm font-medium text-gray-900"
                    >
                      <div className="w-32">Serienamn:</div>
                      <div>
                        <input
                          className="w-72 rounded-lg border border-gray-300 bg-gray-50 text-sm text-gray-900"
                          type="text"
                          {...register('serieName')}
                        />
                      </div>
                    </label>
                  </div>
                  <div className="p-1">
                    <label
                      htmlFor="serieGroup"
                      className="flex flex-row text-sm font-medium text-gray-900"
                    >
                      <div className="w-32">Grupp:</div>
                      <div>
                        <input
                          className="w-72 rounded-lg border border-gray-300 bg-gray-50 text-sm text-gray-900"
                          type="text"
                          {...register('serieGroupCode')}
                        />
                      </div>
                    </label>
                  </div>
                  <div className="p-1">
                    <label
                      htmlFor="serieCategory"
                      className="flex flex-row text-sm font-medium text-gray-900"
                    >
                      <div className="w-32">Kategori:</div>
                      <div>
                        <input
                          className="w-72 rounded-lg border border-gray-300 bg-gray-50 text-sm text-gray-900"
                          type="text"
                          {...register('serieCategory')}
                        />
                      </div>
                    </label>
                  </div>
                  <div className="p-1">
                    <label
                      htmlFor="season"
                      className="flex flex-row text-sm font-medium text-gray-900"
                    >
                      <div className="w-32">Säsong:</div>
                      <div>
                        <input
                          className="w-72 rounded-lg border border-gray-300 bg-gray-50 text-sm text-gray-900"
                          type="text"
                          {...register('season')}
                        />
                      </div>
                    </label>
                  </div>
                  <div>
                    <fieldset className="mb-2 grid grid-cols-2">
                      <legend className="mb-2 font-bold underline underline-offset-2">
                        Seriestruktur
                      </legend>
                      <div className="mb-1 mr-2 flex items-center">
                        <input
                          className="content-center border-[#011d29] text-[#011d29] focus:border-[#011d29] focus:ring-0"
                          type="checkbox"
                          value="1"
                          {...register('serieStructure')}
                        />
                        <label htmlFor="1" className="pl-2">
                          1
                        </label>
                      </div>
                      <div className="mb-1 mr-2 flex items-center">
                        <input
                          className="border-[#011d29] text-[#011d29] focus:border-[#011d29] focus:ring-0"
                          type="checkbox"
                          value="2"
                          {...register('serieStructure')}
                        />
                        <label htmlFor="2" className="pl-2">
                          2
                        </label>
                      </div>
                      <div className="mb-1 mr-2 flex items-center">
                        <input
                          className="border-[#011d29] text-[#011d29] focus:border-[#011d29] focus:ring-0"
                          type="checkbox"
                          value="3"
                          {...register('serieStructure')}
                        />
                        <label htmlFor="3" className="pl-2">
                          3
                        </label>
                      </div>
                      <div className="mb-1 mr-2 flex items-center">
                        <input
                          className="border-[#011d29] text-[#011d29] focus:border-[#011d29] focus:ring-0"
                          type="checkbox"
                          value="4"
                          {...register('serieStructure')}
                        />
                        <label htmlFor="4" className="pl-2">
                          4
                        </label>
                      </div>
                      <div className="mb-1 mr-2 flex items-center">
                        <input
                          className="border-[#011d29] text-[#011d29] focus:border-[#011d29] focus:ring-0"
                          type="checkbox"
                          value="5"
                          {...register('serieStructure')}
                        />
                        <label htmlFor="5" className="pl-2">
                          5
                        </label>
                      </div>
                      <div className="mb-1 mr-2 flex items-center">
                        <input
                          className="border-[#011d29] text-[#011d29] focus:border-[#011d29] focus:ring-0"
                          type="checkbox"
                          value="6"
                          {...register('serieStructure')}
                        />
                        <label htmlFor="6" className="pl-2">
                          6
                        </label>
                      </div>
                      <div className="mb-1 mr-2 flex items-center">
                        <input
                          className="border-[#011d29] text-[#011d29] focus:border-[#011d29] focus:ring-0"
                          type="checkbox"
                          value="7"
                          {...register('serieStructure')}
                        />
                        <label htmlFor="7" className="pl-2">
                          7
                        </label>
                      </div>
                      <div className="mb-1 mr-2 flex items-center">
                        <input
                          className="content-center border-[#011d29] text-[#011d29] focus:border-[#011d29] focus:ring-0"
                          type="checkbox"
                          value="8"
                          {...register('serieStructure')}
                        />
                        <label htmlFor="8" className="pl-2">
                          8
                        </label>
                      </div>
                      <div className="mb-1 mr-2 flex items-center">
                        <input
                          className="border-[#011d29] text-[#011d29] focus:border-[#011d29] focus:ring-0"
                          type="checkbox"
                          value="9"
                          {...register('serieStructure')}
                        />
                        <label htmlFor="9" className="pl-2">
                          9
                        </label>
                      </div>
                      <div className="mb-1 mr-2 flex items-center">
                        <input
                          className="border-[#011d29] text-[#011d29] focus:border-[#011d29] focus:ring-0"
                          type="checkbox"
                          value="10"
                          {...register('serieStructure')}
                        />
                        <label htmlFor="10" className="pl-2">
                          10
                        </label>
                      </div>
                      <div className="mb-1 mr-2 flex items-center">
                        <input
                          className="border-[#011d29] text-[#011d29] focus:border-[#011d29] focus:ring-0"
                          type="checkbox"
                          value="11"
                          {...register('serieStructure')}
                        />
                        <label htmlFor="11" className="pl-2">
                          11
                        </label>
                      </div>
                      <div className="mb-1 mr-2 flex items-center">
                        <input
                          className="border-[#011d29] text-[#011d29] focus:border-[#011d29] focus:ring-0"
                          type="checkbox"
                          value="12"
                          {...register('serieStructure')}
                        />
                        <label htmlFor="12" className="pl-2">
                          12
                        </label>
                      </div>
                      <div className="mb-1 mr-2 flex items-center">
                        <input
                          className="border-[#011d29] text-[#011d29] focus:border-[#011d29] focus:ring-0"
                          type="checkbox"
                          value="13"
                          {...register('serieStructure')}
                        />
                        <label htmlFor="13" className="pl-2">
                          13
                        </label>
                      </div>
                      <div className="mb-1 mr-2 flex items-center">
                        <input
                          className="border-[#011d29] text-[#011d29] focus:border-[#011d29] focus:ring-0"
                          type="checkbox"
                          value="14"
                          {...register('serieStructure')}
                        />
                        <label htmlFor="14" className="pl-2">
                          14
                        </label>
                      </div>
                    </fieldset>
                  </div>
                  <div className="p-1">
                    <label
                      htmlFor="comment"
                      className="flex flex-row text-sm font-medium text-gray-900"
                    >
                      <div className="w-32">Kommentar:</div>
                      <div>
                        <textarea
                          className="w-72 rounded-lg border border-gray-300 bg-gray-50 text-sm text-gray-900"
                          {...register('comment')}
                        ></textarea>
                      </div>
                    </label>
                  </div>
                </div>
              </form>
              <div>
                <ErrorComponent errors={errors} />
                {data && data.success !== false && (
                  <div className="p-2">Ny seriedata: {data.serieName}</div>
                )}
              </div>
            </div>
            {/*footer*/}
            <div className="flex items-center justify-end rounded-b border-t border-solid border-slate-200 p-6">
              <button
                className="background-transparent mb-1 mr-1 px-6 py-2 text-sm font-bold uppercase text-red-500 outline-none transition-all duration-150 ease-linear focus:outline-none"
                type="button"
                onClick={() => setShowModal(false)}
              >
                Stäng
              </button>
              <input
                className="mb-1 mr-1 rounded bg-emerald-500 px-6 py-3 text-sm font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none active:bg-emerald-600"
                type="submit"
                form="seriedataForm"
                value="Spara"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="fixed inset-0 z-40 bg-black opacity-25"></div>
    </>
  )
}

export default SeriesModal
