import { test, expect, describe, beforeAll } from 'vitest'
import { app } from '../utils'
import supertest from 'supertest'
import { resetDb } from './testFunctions/resetDb'
import {
  editGame,
  newGame,
  newGameBadDate,
  newGameWrongDateFormat,
  newGameWrongHalftimeResult,
  newGameWrongResult,
  gameData,
  newEmptyGame,
  editEmptyGame,
  editEmptyGameWithResults,
} from './testData/gameData'
import { teamGameData } from './testData/teamGameData'
import { loginFunction } from './testFunctions/loginFunction'
const api = supertest(app)

let cookie: string

beforeAll(async () => {
  await resetDb()
  cookie = await loginFunction()
})

describe('Testing Games router', () => {
  describe('GET', () => {
    test('Get season games', async () => {
      const response = await api.get('/api/games/season/2023')
      expect(response.statusCode).toBe(200)
      expect(response.body).toHaveLength(gameData.length)
      expect(response.body).toContainEqual(
        expect.objectContaining({
          gameId: 5,
          seasonId: 1,
          serieId: 21,
          homeTeamId: 2,
          awayTeamId: 3,
          result: '4-5',
        })
      )
      const teamGameResponse = await api.get('/api/teamgames/season/2023')
      expect(teamGameResponse.statusCode).toBe(200)
      expect(teamGameResponse.body).toHaveLength(teamGameData.length)
      expect(teamGameResponse.body).toContainEqual(
        expect.objectContaining({
          gameId: 12,
          seasonId: 1,
          serieId: 21,
          homeGame: true,
        })
      )
    })
    test('League tables', async () => {
      const response = await api.get('/api/tables/season/2023')
      expect(response.statusCode).toBe(200)
      expect(response.body.tabell).toBeDefined()
      expect(response.body.hemmaTabell).toBeDefined()
      expect(response.body.bortaTabell).toBeDefined()
      expect(response.body.tabell).toContainEqual(
        expect.objectContaining({
          team: 1,
          totalGames: 14,
        })
      )
    })
    test('Maraton', async () => {
      const response = await api.get('/api/tables/maraton')
      expect(response.statusCode).toBe(200)
      expect(response.body.maratonTabell).toBeDefined()
      expect(response.body.maratonHemmaTabell).toBeDefined()
      expect(response.body.maratonBortaTabell).toBeDefined()
      expect(response.body.maratonTabell).toContainEqual(
        expect.objectContaining({
          team: 1,
          totalGames: 14,
          totalPoints: 13,
          totalGoalsScored: 52,
          totalGoalsConceded: 55,
          totalGoalDifference: -3,
        })
      )
    })
  })
  describe('POST', () => {
    test('New game', async () => {
      const response = await api
        .post('/api/games')
        .send(newGame)
        .set('Cookie', cookie)
      expect(response.statusCode).toBe(201)
      const allResponse = await api.get('/api/games/season/2024')
      expect(allResponse.statusCode).toBe(200)
      expect(allResponse.body).toHaveLength(1)
      expect(allResponse.body).toContainEqual(
        expect.objectContaining({
          gameId: 999,
          seasonId: 2,
          homeTeamId: 1,
          awayTeamId: 2,
          result: '7-1',
          halftimeResult: '4-0',
          date: '2023-12-06',
          category: 'regular',
          group: 'elitserien',
          women: false,
        })
      )
      const teamGameResponse = await api.get('/api/teamgames/season/2024')
      expect(teamGameResponse.statusCode).toBe(200)
      expect(teamGameResponse.body).toHaveLength(2)
      expect(teamGameResponse.body).toContainEqual(
        expect.objectContaining({
          gameId: 999,
          seasonId: 2,
          serieId: 22,
          team: 1,
          opponent: 2,
          homeGame: true,
          win: true,
          draw: false,
          lost: false,
          points: 2,
          goalDifference: 6,
          totalGoals: 8,
        })
      )
      const maratonResponse = await api.get('/api/tables/maraton')
      expect(maratonResponse.body.maratonTabell).toContainEqual(
        expect.objectContaining({
          team: 1,
          totalGames: 15,
          totalPoints: 15,
          totalGoalsScored: 59,
          totalGoalsConceded: 56,
          totalGoalDifference: 3,
        })
      )
    })
    test('New "empty" game', async () => {
      const response = await api
        .post('/api/games')
        .send(newEmptyGame)
        .set('Cookie', cookie)
      expect(response.statusCode).toBe(201)
      expect(response.body.homeTeamGame).toBeUndefined()
      expect(response.body.awayTeamGame).toBeUndefined()
      expect(response.body).toMatchObject({
        gameId: 138,
        seasonId: 4,
        serieId: 4,
        homeTeamId: null,
        awayTeamId: null,
      })
      const teamGameResponse = await api.get('/api/teamgames/season/2023')
      expect(teamGameResponse.statusCode).toBe(200)
      expect(teamGameResponse.body).not.toContainEqual(
        expect.objectContaining({
          gameId: 138,
        })
      )
    })
    test('Updated league table', async () => {
      const response = await api.get('/api/tables/season/2024')
      expect(response.statusCode).toBe(200)
      expect(response.body.tabell).toBeDefined()
      expect(response.body.hemmaTabell).toBeDefined()
      expect(response.body.bortaTabell).toBeDefined()
      expect(response.body.tabell).toContainEqual(
        expect.objectContaining({
          lag: {
            casualName: 'Villa Lidköping',
            name: 'Villa Lidköpings BK',
            shortName: 'VLBK',
            teamId: 1,
          },
          team: 1,
          totalGames: 1,
          totalPoints: 2,
          totalGoalsScored: 7,
          totalGoalsConceded: 1,
          totalGoalDifference: 6,
          totalWins: 1,
          totalDraws: 0,
          totalLost: 0,
        })
      )
    })
    test('New game, wrong result format', async () => {
      const response = await api
        .post('/api/games')
        .send(newGameWrongResult)
        .set('Cookie', cookie)
      expect(response.statusCode).toBe(400)
    })
    test('New game, wrong halftime result format', async () => {
      const response = await api
        .post('/api/games')
        .send(newGameWrongHalftimeResult)
        .set('Cookie', cookie)
      expect(response.statusCode).toBe(400)
    })
    test('New game, bad date', async () => {
      const response = await api
        .post('/api/games')
        .send(newGameBadDate)
        .set('Cookie', cookie)
      expect(response.statusCode).toBe(400)
    })
    test('New game, wrong date format', async () => {
      const response = await api
        .post('/api/games')
        .send(newGameWrongDateFormat)
        .set('Cookie', cookie)
      expect(response.statusCode).toBe(400)
    })
  })
  // describe('DELETE', () => {})
  describe('PUT', () => {
    test('Edit game', async () => {
      const response = await api
        .post('/api/games')
        .send(editGame)
        .set('Cookie', cookie)
      expect(response.statusCode).toBe(201)
      const allResponse = await api.get('/api/games/season/2023')
      expect(allResponse.statusCode).toBe(200)
      expect(allResponse.body).toHaveLength(gameData.length + 1)
      expect(allResponse.body).toContainEqual(
        expect.objectContaining({
          result: '2-8',
          halftimeResult: '1-4',
          date: '2022-12-07',
        })
      )
      const teamGameResponse = await api.get('/api/teamgames/season/2023')
      expect(teamGameResponse.statusCode).toBe(200)
      expect(teamGameResponse.body).toHaveLength(teamGameData.length)
      expect(teamGameResponse.body).toContainEqual(
        expect.objectContaining({
          gameId: 1,
          seasonId: 1,
          serieId: 21,
          team: 3,
          opponent: 4,
          homeGame: true,
          date: '2022-12-07',
          goalsScored: 2,
          goalsConceded: 8,
          win: false,
          draw: false,
          lost: true,
          points: 0,
          goalDifference: -6,
          totalGoals: 10,
        })
      )
    })
    test('Edit empty game', async () => {
      const response = await api
        .post('/api/games')
        .send(editEmptyGame)
        .set('Cookie', cookie)
      expect(response.statusCode).toBe(201)
      expect(response.body.homeTeamGame).toBeDefined()
      expect(response.body.awayTeamGame).toBeDefined()
      expect(response.body.game).toMatchObject({
        homeTeamId: 16,
        awayTeamId: 15,
        played: false,
      })
      const teamGameResponse = await api.get('/api/teamgames/season/2023')
      expect(teamGameResponse.statusCode).toBe(200)
      expect(teamGameResponse.body).toHaveLength(teamGameData.length + 2)
      expect(teamGameResponse.body).toContainEqual(
        expect.objectContaining({
          gameId: 138,
          group: 'final',
          category: 'final',
          played: false,
        })
      )
    })
    test('Edit empty game with results', async () => {
      const response = await api
        .post('/api/games')
        .send(editEmptyGameWithResults)
        .set('Cookie', cookie)
      expect(response.statusCode).toBe(201)
      expect(response.body.homeTeamGame).toBeDefined()
      expect(response.body.awayTeamGame).toBeDefined()
      expect(response.body.game).toMatchObject({
        homeTeamId: 16,
        awayTeamId: 15,
        result: '2-5',
        halftimeResult: '1-2',
        homeGoal: 2,
        awayGoal: 5,
        played: true,
      })
      const teamGameResponse = await api.get('/api/teamgames/season/2023')
      expect(teamGameResponse.statusCode).toBe(200)
      expect(teamGameResponse.body).toHaveLength(teamGameData.length + 2)
      expect(teamGameResponse.body).toContainEqual(
        expect.objectContaining({
          gameId: 138,
          group: 'final',
          category: 'final',
          played: true,
          goalsScored: 5,
          goalsConceded: 2,
          team: 15,
        })
      )
    })
  })
})
