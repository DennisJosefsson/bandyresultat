import { useQuery } from '@tanstack/react-query'
import { getErrors } from '../../requests/errors'

const Errors = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['getErrors'],
    queryFn: () => getErrors(),
  })

  if (isLoading) {
    return <div className="mx-auto max-w-7xl">Loading...</div>
  }

  if (error) {
    return <div className="mx-auto max-w-7xl">There was an error</div>
  }

  return (
    <>
      {data && (
        <div className="mt-2 grid grid-cols-1 gap-2 lg:grid-cols-2">
          <div>
            <h2 className="text-lg font-bold">Backenderror Production</h2>
            {data.backendErrors
              .filter((error) => error.production === true)
              .map((error) => {
                return (
                  <div
                    key={error.errorId}
                    className="mb-1 flex flex-col rounded bg-background p-2 text-sm"
                  >
                    <div className="font-semibold">{error.date}</div>
                    <div>
                      {error.name} - {error.origin}
                    </div>
                    <div>{error.message}</div>
                  </div>
                )
              })}
            <h2 className="mt-2 text-lg font-bold">Backenderror Development</h2>
            {data.backendErrors
              .filter((error) => error.production === false)
              .map((error) => {
                return (
                  <div
                    key={error.errorId}
                    className="mb-1 flex flex-col rounded bg-background p-2 text-sm"
                  >
                    <div className="font-semibold">{error.date}</div>
                    <div>
                      {error.name} - {error.origin}
                    </div>
                    <div>{error.message}</div>
                  </div>
                )
              })}
          </div>
          <div>
            <h2 className="text-lg font-bold">Frontenderror Production</h2>
            {data.frontendErrors
              .filter((error) => error.production === true)
              .map((error) => {
                return (
                  <div
                    key={error.errorId}
                    className="mb-1 flex flex-col rounded bg-background p-2 text-sm"
                  >
                    <div className="font-semibold">{error.date}</div>
                    <div className="truncate">
                      {error.name} - {error.origin}
                    </div>
                    <div className="truncate">{error.message}</div>
                  </div>
                )
              })}
            <h2 className="mt-2 text-lg font-bold">
              Frontenderror Development
            </h2>
            {data.frontendErrors
              .filter((error) => error.production === false)
              .map((error) => {
                return (
                  <div
                    key={error.errorId}
                    className="mb-1 flex flex-col rounded bg-background p-2 text-sm"
                  >
                    <div className="font-semibold">{error.date}</div>
                    <div className="truncate">
                      {error.name} - {error.origin}
                    </div>
                    <div className="truncate">{error.message}</div>
                  </div>
                )
              })}
          </div>
        </div>
      )}
    </>
  )
}

export default Errors
