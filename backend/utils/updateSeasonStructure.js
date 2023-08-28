const { Season } = require('../models')

const season = '2008/2009'
const unStringedMenStructure = {
  elitserien: [8, 10, 12],
  KvalA: [1],
  KvalB: [1],
}
const unStringedWomenStructure = {
  allsvenskan: [2, 6],
  KvalA: [1],
}
const menStructure = JSON.stringify(unStringedMenStructure)
const womenStructure = JSON.stringify(unStringedWomenStructure)

const setSeasonStructure = async () => {
  const seasonMen = await Season.update(
    { seasonStructure: menStructure },
    { where: { year: season, women: false } }
  )
  const seasonWomen = await Season.update(
    { seasonStructure: womenStructure },
    { where: { year: season, women: true } }
  )
  console.log(seasonMen)
  console.log(seasonWomen)
}

setSeasonStructure()
