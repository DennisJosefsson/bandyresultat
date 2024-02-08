import { describe, test, beforeAll, expect } from 'vitest'
import { app } from '../utils'
import supertest from 'supertest'
import { resetDb } from './testFunctions/resetDb'
import { loginFunction } from './testFunctions/loginFunction'
import {
  teamData,
  newTeam,
  newTeamWithMissingName,
  updateTeamData,
  updateTeamDataWrongId,
} from './testData/teamData'
import { newTeamSeason } from './testData/teamSeasonData'

const api = supertest(app)

let cookie: string

beforeAll(async () => {
  await resetDb()
  cookie = await loginFunction()
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
      expect(response.body.team).toMatchObject(teamData[1])
      expect(response.body.tabeller).toBeDefined()
    })
    test('Throw 404 for specific team', async () => {
      const response = await api.get('/api/teams/999')
      expect(response.statusCode).toBe(404)
    })
    test('Throw 400 for wrong id 1', async () => {
      const response = await api.get('/api/teams/1999')
      expect(response.statusCode).toBe(400)
    })
    test('Throw 400 for wrong id 2', async () => {
      const response = await api.get('/api/teams/aaa')
      expect(response.statusCode).toBe(400)
    })
  })
  describe('POST', () => {
    test('Post new team', async () => {
      const response = await api
        .post('/api/teams')
        .send(newTeam)
        .set('Cookie', cookie)
      expect(response.statusCode).toBe(201)
      const allResponse = await api.get('/api/teams')
      expect(allResponse.body).toHaveLength(teamData.length + 1)
      expect(allResponse.body[teamData.length]).toMatchObject(newTeam)
    })
    test('Post new teamSeasons', async () => {
      const response1 = await api
        .post('/api/teamSeasons')
        .send(newTeamSeason[0])
        .set('Cookie', cookie)
      expect(response1.statusCode).toBe(201)
      const response2 = await api
        .post('/api/teamSeasons')
        .send(newTeamSeason[1])
        .set('Cookie', cookie)
      expect(response2.statusCode).toBe(201)
      const response = await api.get('/api/seasons/2023')

      expect(response.statusCode).toBe(200)
      expect(response.body[1].teams).toHaveLength(8)
    })
    test('Post New Team with Missing Name', async () => {
      const response = await api
        .post('/api/teams')
        .send(newTeamWithMissingName)
        .set('Cookie', cookie)
      expect(response.statusCode).toBe(400)
    })
  })
  describe('PUT', () => {
    test('Update Team data', async () => {
      const response = await api
        .put('/api/teams')
        .send(updateTeamData)
        .set('Cookie', cookie)
      expect(response.statusCode).toBe(201)
      expect(response.body).toMatchObject({ lat: 62, long: 15 })
      const teamResponse = await api.get('/api/teams/1')
      expect(teamResponse.body.team).not.toMatchObject({
        teamId: 1,
        lat: 15,
        long: 62,
      })
      expect(teamResponse.body.team).toMatchObject({
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
        .send(updateTeamDataWrongId)
        .set('Cookie', cookie)
      expect(response.statusCode).toBe(404)
    })
  })
})
