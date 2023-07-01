const teamArray = require('../../json/teams/teams.json')
const { Team } = require('../models')

const updateTeams = async () => {
  try {
    await Team.bulkCreate(teamArray, {
      updateOnDuplicate: ['city', 'casualName', 'shortName'],
    })
  } catch (error) {
    console.log('There was an error: ', error)
  }
}

updateTeams()
