import MaratonHelp from './MaratonHelp'
import Record from './Record'
import Table from './Table'

const MaratonComponentSwitch = ({ tab }: { tab: string | null }) => {
  let pageContent
  switch (tab) {
    case 'maraton':
      pageContent = <Table />
      break
    case 'records':
      pageContent = <Record />
      break

    case 'help':
      pageContent = <MaratonHelp />
      break
    default:
      pageContent = <Table />
      break
  }
  return <>{pageContent}</>
}

export default MaratonComponentSwitch
