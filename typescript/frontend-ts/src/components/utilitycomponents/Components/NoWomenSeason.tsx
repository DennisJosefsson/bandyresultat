import { Link } from 'react-router-dom'

export const NoWomenSeason = () => {
  return (
    <div className="mx-auto mt-4 grid place-items-center py-5 font-inter text-sm font-bold text-[#011d29] md:text-base">
      <p className="mx-10 text-center">
        Första säsongen för damernas högsta serie var{' '}
        <Link to="/season/1973" className="font-bold">
          1972/73
        </Link>
        .
      </p>
    </div>
  )
}
