import Game from '../../models/Game.js'
import Season from '../../models/Season.js'
import TableSeason from '../../models/TableSeason.js'
import Team from '../../models/Team.js'
import TeamGame from '../../models/TeamGame.js'
import TeamSeason from '../../models/TeamSeason.js'
import TeamTable from '../../models/TeamTable.js'
import Serie from '../../models/Serie.js'
import { seasonData } from '../testData/seasonData.js'
import { seriesData } from '../testData/seriesData.js'
import { teamData } from '../testData/teamData.js'
import { teamSeasonData } from '../testData/teamSeasonData.js'
import { metadataData } from '../testData/metadataData.js'
import Metadata from '../../models/Metadata.js'
import { gameData } from '../testData/gameData.js'
import { teamGameData } from '../testData/teamGameData.js'
import BandyError from '../../models/BandyError.js'

export const resetDb = async () => {
  await TeamGame.truncate({ cascade: true })
  await Game.truncate({ cascade: true })
  await TeamSeason.truncate({ cascade: true })
  await TableSeason.truncate({ cascade: true })
  await TeamTable.truncate({ cascade: true })
  await Team.truncate({ cascade: true })
  await Season.truncate({ cascade: true })
  await Serie.truncate({ cascade: true })
  await BandyError.truncate({ cascade: true })
  await Season.bulkCreate(seasonData)
  await Serie.bulkCreate(seriesData)
  await Team.bulkCreate(teamData)
  await TeamSeason.bulkCreate(teamSeasonData)
  await Metadata.bulkCreate(metadataData)
  await Game.bulkCreate(gameData)
  await TeamGame.bulkCreate(teamGameData)
}
