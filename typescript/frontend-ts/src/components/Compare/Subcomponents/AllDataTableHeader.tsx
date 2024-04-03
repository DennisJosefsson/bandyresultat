import { TableHeader, TableHead, TableRow } from '@/src/@/components/ui/table'

const AllDataTableHeader = () => {
  return (
    <TableHeader>
      <TableRow key={`tableheadAllgames`}>
        <TableHead scope="col" className="px-1 py-1 text-left md:w-56 md:py-2">
          Lag
        </TableHead>
        <TableHead scope="col" className="px-1 py-1 text-right md:w-8 md:py-2">
          M
        </TableHead>
        <TableHead scope="col" className="px-1 py-1 text-right md:w-8 md:py-2">
          V
        </TableHead>
        <TableHead scope="col" className="px-1 py-1 text-right md:w-8 md:py-2">
          O
        </TableHead>
        <TableHead scope="col" className="px-1 py-1 text-right md:w-8 md:py-2">
          F
        </TableHead>
        <TableHead
          scope="col"
          className="hidden px-1 py-1 text-right xs:table-cell md:w-12 md:py-2"
        >
          GM
        </TableHead>
        <TableHead
          scope="col"
          className="hidden px-1 py-1 text-right xs:table-cell md:w-12 md:py-2"
        >
          IM
        </TableHead>
        <TableHead
          scope="col"
          className="hidden px-1 py-1 text-right xs:table-cell md:w-12 md:py-2"
        >
          MS
        </TableHead>
        <TableHead scope="col" className="px-1 py-1 text-right md:w-8 md:py-2">
          P
        </TableHead>
      </TableRow>
    </TableHeader>
  )
}

export default AllDataTableHeader
