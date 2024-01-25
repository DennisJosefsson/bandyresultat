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
} from './testData/gameData'
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
      expect(response.body).toHaveLength(12)
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
      expect(teamGameResponse.body).toHaveLength(24)
      expect(teamGameResponse.body).toContainEqual(
        expect.objectContaining({
          gameId: 12,
          seasonId: 1,
          serieId: 21,
          homeGame: true,
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
      const allResponse = await api.get('/api/games/season/2023')
      expect(allResponse.statusCode).toBe(200)
      expect(allResponse.body).toHaveLength(13)
      expect(allResponse.body).toContainEqual(
        expect.objectContaining({
          gameId: 13,
          seasonId: 1,
          serieId: 21,
          homeTeamId: 1,
          awayTeamId: 2,
        })
      )
      const teamGameResponse = await api.get('/api/teamgames/season/2023')
      expect(teamGameResponse.statusCode).toBe(200)
      expect(teamGameResponse.body).toHaveLength(26)
      expect(teamGameResponse.body).toContainEqual(
        expect.objectContaining({
          gameId: 13,
          seasonId: 1,
          serieId: 21,
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
      expect(allResponse.body).toHaveLength(13)
      expect(allResponse.body).toContainEqual(
        expect.objectContaining({
          result: '2-8',
          halftimeResult: '1-4',
          date: '2022-12-07',
        })
      )
      const teamGameResponse = await api.get('/api/teamgames/season/2023')
      expect(teamGameResponse.statusCode).toBe(200)
      expect(teamGameResponse.body).toHaveLength(26)
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
  })
})
