import { describe, test, beforeAll, expect } from 'vitest'
import { app } from '../utils'
import supertest from 'supertest'
import { resetDb } from './testFunctions/resetDb'
import {
  teamData,
  newTeam,
  newTeamWithMissingName,
  updateTeamData,
} from './testData/teamData'
import { newTeamSeason } from './testData/teamSeasonData'

const api = supertest(app)

beforeAll(async () => {
  await resetDb()
})

describe('Testing Teams router', () => {
  describe('GET', () => {
    test('Testing Get All Teams', async () => {
      const response = await api.get('/api/teams')
      expect(response.statusCode).toBe(200)
      expect(response.body).toHaveLength(teamData.length)
      expect(response.body[0]).toMatchObject(teamData[0])
    })
    test('Get specific team', async () => {
      const response = await api.get('/api/teams/2')

      expect(response.statusCode).toBe(200)
      expect(response.body).toMatchObject(teamData[1])
    })
    test('Throw 404 for specific team', async () => {
      const response = await api.get('/api/teams/999')
      expect(response.statusCode).toBe(404)
    })
  })
  describe('POST', () => {
    test('Post new team', async () => {
      const response = await api.post('/api/teams').send(newTeam)
      expect(response.statusCode).toBe(201)
      const allResponse = await api.get('/api/teams')
      expect(allResponse.body).toHaveLength(teamData.length + 1)
      expect(allResponse.body[teamData.length]).toMatchObject(newTeam)
    })
    test('Post new teamSeasons', async () => {
      const response1 = await api
        .post('/api/teamSeasons')
        .send(newTeamSeason[0])
      expect(response1.statusCode).toBe(201)
      const response2 = await api
        .post('/api/teamSeasons')
        .send(newTeamSeason[1])
      expect(response2.statusCode).toBe(201)
      const response = await api.get('/api/seasons/2023')

      expect(response.statusCode).toBe(200)
      expect(response.body[1].teams).toHaveLength(8)
    })
    test('Post New Team with Missing Name', async () => {
      const response = await api.post('/api/teams').send(newTeamWithMissingName)
      expect(response.statusCode).toBe(400)
    })
  })
  describe('PUT', () => {
    test('Update Team data', async () => {
      const response = await api.put('/api/teams').send(updateTeamData)
      expect(response.statusCode).toBe(201)
      expect(response.body).toMatchObject({ lat: 62, long: 15 })
      const teamResponse = await api.get('/api/teams/1')
      expect(teamResponse.body).not.toMatchObject({
        teamId: 1,
        lat: 15,
        long: 62,
      })
      expect(teamResponse.body).toMatchObject({
        teamId: 1,
        name: 'Villa Lidköpings BK',
        city: 'Lidköping',
        casualName: 'Villa Lidköping',
        shortName: 'VLBK',
        women: false,
        lat: 62,
        long: 15,
      })
    })
    test('Update Team data Wrong Id', async () => {
      const response = await api
        .put('/api/teams')
        .send({ teamId: 999, lat: 62, long: 15 })
      expect(response.statusCode).toBe(404)
    })
  })
})
