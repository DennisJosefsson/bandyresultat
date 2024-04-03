import PlayoffCard from './PlayoffCard'
const NilFinalComponent = () => {
  return (
    <PlayoffCard group="final">
      <PlayoffCard.Title>
        <PlayoffCard.Group>Final</PlayoffCard.Group>
      </PlayoffCard.Title>
      <PlayoffCard.Content>Ingen match än</PlayoffCard.Content>
    </PlayoffCard>
  )
}

export default NilFinalComponent
