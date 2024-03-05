import { useCopyToClipboard } from 'usehooks-ts'
import { initValues } from '../../../hooks/searchHooks/useSearchForm'
import { ButtonComponent } from '../../utilitycomponents/Components/ButtonComponents'
import { UseFormReturn } from 'react-hook-form'
import { SearchParamsObject } from '../../types/games/search'

type SearchButtonsProps = {
  collapse: () => void
  isSearchResultSuccess: boolean
  searchLink: string
  methods: UseFormReturn<SearchParamsObject>
}

const SearchButtons = ({
  collapse,
  isSearchResultSuccess,
  searchLink,
  methods,
}: SearchButtonsProps) => {
  const [copiedText, copy] = useCopyToClipboard()

  return (
    <div className="flex max-h-[160px] flex-col gap-4">
      <div>
        <input
          type="submit"
          value="Sök"
          form="search-form"
          className="w-[72px] cursor-pointer truncate rounded-md bg-[#011d29] px-1 py-0.5 text-center text-[10px] text-white transition-all duration-150 ease-in-out first:last:px-1 hover:bg-slate-600 xs:w-[84px] xs:text-sm lg:w-[128px] lg:px-2 lg:py-1 lg:text-base"
          onClick={() => collapse()}
        />
      </div>
      <ButtonComponent clickFunctions={() => methods.reset(initValues)}>
        Nollställ
      </ButtonComponent>
      {isSearchResultSuccess && (
        <ButtonComponent clickFunctions={() => copy(searchLink)}>
          {copiedText ? 'Kopierad!' : `Länk: ${searchLink}`}
        </ButtonComponent>
      )}
    </div>
  )
}

export default SearchButtons
