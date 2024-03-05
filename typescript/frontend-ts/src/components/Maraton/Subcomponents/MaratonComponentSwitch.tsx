import MaratonHelp from './MaratonHelp'
import Record from './Record'
import Table from './Table'

const MaratonComponentSwitch = ({ tab }: { tab: string }) => {
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
      pageContent = <div>Något gick fel, ingen sida.</div>
      break
  }
  return <>{pageContent}</>
}

export default MaratonComponentSwitch
