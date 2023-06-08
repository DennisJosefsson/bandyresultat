import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

const schema = yup.object({
  seasonId: yup
    .number('Måste vara nummer')
    .positive('Måste vara över noll')
    .integer()
    .required(),
  year: yup
    .string()
    .required()
    .matches(/([0-9]{4})\/([0-9]{4})/),
  name: yup.string().required(),
  winnerId: yup
    .number('Måste vara nummer')
    .positive('Måste vara över noll')
    .integer(),
  winnerName: yup.string(),
  hostCity: yup.string(),
  finalDate: yup.string(),
  northSouth: yup.boolean().required(),
  multipleGroupStages: yup.boolean().required(),
  eight: yup.boolean().required(),
  quarter: yup.boolean().required(),
  semi: yup.boolean().required(),
  final: yup.boolean().required(),
  comment: yup.string(),
})

const MetadataForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      checkbox: true,
    },
    resolver: yupResolver(schema),
  })
  const onSubmit = (data) => console.log(data)
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-2">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Formulär för säsongsinformation
            </h2>
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label
                  htmlFor="seasonId"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Säsongs-id:
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      type="number"
                      {...register('seasonId', {})}
                    />
                  </div>
                  {/* <p className="mt-1 text-sm leading-6 text-gray-600">
                    {errors.seasonId?.message}
                  </p> */}
                </div>
                <label
                  htmlFor="year"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Säsong:
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      type="text"
                      {...register('year', {})}
                    />
                  </div>
                  {/* <p className="mt-1 text-sm leading-6 text-gray-600">
                    {errors.year?.message}
                  </p> */}
                </div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Serienamn:
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      type="text"
                      {...register('name', {})}
                    />
                  </div>
                  {/* <p className="mt-1 text-sm leading-6 text-gray-600">
                    {errors.name?.message}
                  </p> */}
                </div>
                <label
                  htmlFor="winnerId"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Vinnar-id:
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      type="number"
                      {...register('winnerId', {})}
                    />
                  </div>
                  {/* <p className="mt-1 text-sm leading-6 text-gray-600">
                    {errors.winnerId?.message}
                  </p> */}
                </div>

                <label
                  htmlFor="winnerName"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  SM-guld:
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      type="text"
                      {...register('winnerName', {})}
                    />
                  </div>
                  {/* <p className="mt-1 text-sm leading-6 text-gray-600">
                    {errors.winnerName?.message}
                  </p> */}
                </div>
                <label
                  htmlFor="hostCity"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Finalstad:
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      type="text"
                      {...register('hostCity', {})}
                    />
                  </div>
                  {/* <p className="mt-1 text-sm leading-6 text-gray-600">
                    {errors.hostCity?.message}
                  </p> */}
                </div>
                <label
                  htmlFor="finalDate"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Finaldatum:
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      type="text"
                      {...register('finalDate', {})}
                    />
                  </div>
                  {/* <p className="mt-1 text-sm leading-6 text-gray-600">
                    {errors.finalDate?.message}
                  </p> */}
                </div>
                <label
                  className="block text-sm font-medium leading-6 text-gray-900"
                  htmlFor="northSouth"
                >
                  Nord- och sydgrupper?
                </label>
                <div className="mt-2">
                  <div className="flex h-6 items-center">
                    <input
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      type="checkbox"
                      {...register('northSouth', {})}
                    />
                  </div>
                  {/* <p className="mt-1 text-sm leading-6 text-gray-600">
                    {errors.northSouth?.message}
                  </p> */}
                </div>
                <label
                  htmlFor="multipleGroupStages"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Dubbla gruppomgångar?
                </label>
                <div className="mt-2">
                  <div className="flex h-6 items-center">
                    <input
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      type="checkbox"
                      {...register('multipleGroupStages', {})}
                    />
                  </div>
                  {/* <p className="mt-1 text-sm leading-6 text-gray-600">
                    {errors.multipleGroupStages?.message}
                  </p> */}
                </div>
                <label
                  htmlFor="eight"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Åttondelsfinal?
                </label>
                <div className="mt-2">
                  <div className="flex h-6 items-center">
                    <input
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      type="checkbox"
                      {...register('eight', {})}
                    />
                  </div>
                  {/* <p className="mt-1 text-sm leading-6 text-gray-600">
                    {errors.eight?.message}
                  </p> */}
                </div>
                <label
                  htmlFor="quarter"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Kvartsfinal:
                </label>
                <div className="mt-2">
                  <div className="flex h-6 items-center">
                    <input
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      type="checkbox"
                      {...register('quarter', {})}
                    />
                  </div>
                  {/* <p className="mt-1 text-sm leading-6 text-gray-600">
                    {errors.quarter?.message}
                  </p> */}
                </div>
                <label
                  className="block text-sm font-medium leading-6 text-gray-900"
                  htmlFor="semi"
                >
                  Semifinal?
                </label>
                <div className="mt-2">
                  <div className="flex h-6 items-center">
                    <input
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      type="checkbox"
                      {...register('semi', {})}
                    />
                  </div>
                  {/* <p className="mt-1 text-sm leading-6 text-gray-600">
                    {errors.semi?.message}
                  </p> */}
                </div>
                <label
                  htmlFor="final"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Final?
                </label>
                <div className="mt-2">
                  <div className="flex h-6 items-center">
                    <input
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      type="checkbox"
                      {...register('final', {})}
                    />
                  </div>
                  {/* <p className="mt-1 text-sm leading-6 text-gray-600">
                    {errors.final?.message}
                  </p> */}
                </div>
                <label
                  htmlFor="comment"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Kommentar:
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <textarea
                      rows={3}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      {...register('comment', {})}
                    />
                  </div>
                  {/* <p className="mt-1 text-sm leading-6 text-gray-600">
                    {errors.comment?.message}
                  </p> */}
                </div>
                <button
                  type="submit"
                  className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Spara
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default MetadataForm
