import teamRouter from '../controllers/teams/team.js'
import seasonRouter from '../controllers/season.js'
import teamSeasonRouter from '../controllers/teamSeason.js'
import seriesRouter from '../controllers/series.js'
import gameRouter from '../controllers/games/games.js'
import tableRouter from '../controllers/tables/tables.js'
import metadataRouter from '../controllers/metadata.js'
import loginRouter from '../controllers/login.js'
import teamgameRouter from '../controllers/teamGames.js'
import streakRouter from '../controllers/games/streaks.js'
import searchRouter from '../controllers/games/search.js'
import statsRouter from '../controllers/games/stats.js'
import animationRouter from '../controllers/games/animation.js'
import leagueTableRouter from '../controllers/tables/leagueTable.js'
import maratonRouter from '../controllers/tables/maraton.js'
import linkRouter from '../controllers/link.js'
import errorRouter from '../controllers/error.js'
import singleTeamRouter from '../controllers/teams/singleTeam.js'
import compareRouter from '../controllers/tables/compare.js'

export const routeArray = [
  { path: '/api/teams', router: teamRouter },
  { path: '/api/teams', router: singleTeamRouter },
  { path: '/api/seasons', router: seasonRouter },
  { path: '/api/teamSeasons', router: teamSeasonRouter },
  { path: '/api/series', router: seriesRouter },
  { path: '/api/games', router: gameRouter },
  { path: '/api/games', router: streakRouter },
  { path: '/api/games', router: searchRouter },
  { path: '/api/games', router: statsRouter },
  { path: '/api/games', router: animationRouter },
  { path: '/api/tables', router: tableRouter },
  { path: '/api/tables', router: maratonRouter },
  { path: '/api/tables', router: compareRouter },
  { path: '/api/tables', router: leagueTableRouter },
  { path: '/api/metadata', router: metadataRouter },
  { path: '/api/login', router: loginRouter },
  { path: '/api/teamgames', router: teamgameRouter },
  { path: '/api/links', router: linkRouter },
  { path: '/api/errors', router: errorRouter },
]
