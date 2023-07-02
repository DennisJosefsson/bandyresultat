const gameData202223 = require('../json/games/202223')

const sortGroups = gameData202223.reduce((groups, game) => {
  if (!groups[game.group]) {
    groups[game.group] = []
  }
  groups[game.group].push(game)
  return groups
}, {})

const sortedGames = Object.keys(sortGroups).map((group) => {
  return {
    group,
    games: sortGroups[group],
  }
})

const newArray = sortedGames.map((groupObject) => {
  const sortDates = groupObject.games.reduce((dates, game) => {
    if (!dates[game.date]) {
      dates[game.date] = []
    }
    dates[game.date].push(game)
    return dates
  }, {})

  const sortedGames = Object.keys(sortDates).map((date) => {
    return {
      date,
      games: sortDates[date],
    }
  })
  return {
    group: groupObject['group'],
    games: sortedGames,
  }
})

console.log(newArray[0].games[0])
