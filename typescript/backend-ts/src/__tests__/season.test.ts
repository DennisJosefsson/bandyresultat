import { test, expect, describe, beforeAll } from 'vitest'
import { app } from '../utils'
import supertest from 'supertest'
import { resetDb } from './testFunctions/resetDb'
import {
  newSeason,
  seasonData,
  wrongSeasonDataYearNotNumber,
  wrongSeasonDataMissingWomenBoolean,
  wrongSeasonDataWrongYearFormat,
  wrongSeasonDataYearTooHigh,
} from './testData/seasonData'
import { newSerie, updateSerie } from './testData/seriesData'
import { loginFunction } from './testFunctions/loginFunction'
import { editMetaData, newMetaData } from './testData/metadataData'

const api = supertest(app)

let cookie: string

beforeAll(async () => {
  await resetDb()
  cookie = await loginFunction()
})

describe('Testing Season router', () => {
  describe('GET', () => {
    test('Testing Get All Season', async () => {
      const response = await api.get('/api/seasons')
      expect(response.statusCode).toBe(200)
      expect(response.body).toHaveLength(seasonData.length)
      expect(response.body[0]).toMatchObject({
        seasonId: 1,
        year: '2022/2023',
        women: false,
      })
    })
    test('Get specific season containing series data and teams', async () => {
      const response = await api.get('/api/seasons/2023')

      expect(response.statusCode).toBe(200)
      expect(response.body).toHaveLength(2)
      expect(response.body[1]).toMatchObject({
        seasonId: 4,
        year: '2022/2023',
        women: true,
      })
      expect(response.body[1].series).toContainEqual(
        expect.objectContaining({
          serieId: 4,
          serieGroupCode: 'final',
          serieCategory: 'final',
          serieName: 'Final',
        })
      )
      expect(response.body[1].teams).toHaveLength(7)
      expect(response.body[0].metadata).toMatchObject({ hostCity: 'Uppsala' })
    })
    test('Throw 404 for specific season', async () => {
      const response = await api.get('/api/seasons/2027')

      expect(response.statusCode).toBe(404)
    })
  })
  describe('POST', () => {
    test('Post New Season', async () => {
      const response = await api
        .post('/api/seasons')
        .set('Cookie', cookie)
        .send(newSeason)

      expect(response.statusCode).toBe(201)
      const allResponse = await api.get('/api/seasons')
      expect(allResponse.body).toHaveLength(seasonData.length + 1)
      expect(allResponse.body[seasonData.length]).toMatchObject({
        seasonId: 6,
        year: '2024/2025',
        women: true,
      })
    })
    test('Post New Season, unauthorized', async () => {
      const response = await api.post('/api/seasons').send(newSeason)
      expect(response.statusCode).toBe(401)
    })
    test('Post New Season with wrong Women Boolean', async () => {
      const response = await api
        .post('/api/seasons')
        .set('Cookie', cookie)
        .send(wrongSeasonDataMissingWomenBoolean)
      expect(response.statusCode).toBe(400)
    })
    test('Post New Season with wrong Year Format', async () => {
      const response = await api
        .post('/api/seasons')
        .set('Cookie', cookie)
        .send(wrongSeasonDataWrongYearFormat)
      expect(response.statusCode).toBe(400)
    })
    test('Post New Season with wrong Year Format, second year too high', async () => {
      const response = await api
        .post('/api/seasons')
        .set('Cookie', cookie)
        .send(wrongSeasonDataYearTooHigh)

      expect(response.statusCode).toBe(400)
    })
    test('Post New Season with wrong Year Format, year not number', async () => {
      const response = await api
        .post('/api/seasons')
        .set('Cookie', cookie)
        .send(wrongSeasonDataYearNotNumber)
      expect(response.statusCode).toBe(400)
    })
    test('Post new Serie', async () => {
      const season = await api.get('/api/seasons/2023')
      expect(season.body[1].series).not.toContainEqual(
        expect.objectContaining({
          serieId: 24,
        })
      )
      const response = await api
        .post('/api/series')
        .set('Cookie', cookie)
        .send(newSerie)
      expect(response.statusCode).toBe(201)
      const updatedSeason = await api.get('/api/seasons/2023')
      expect(updatedSeason.body[1].series).toContainEqual(
        expect.objectContaining({
          serieId: 24,
        })
      )
    })
    test('Post new Metadata', async () => {
      const season = await api.get('/api/seasons/2024')
      expect(season.body[1].metadata).toBeNull()
      const response = await api
        .post('/api/metadata')
        .set('Cookie', cookie)
        .send(newMetaData)
      expect(response.statusCode).toBe(201)
      const updatedSeason = await api.get('/api/seasons/2024')
      expect(updatedSeason.body[1].metadata).toMatchObject({
        hostCity: 'Västerås',
        finalDate: '2024-03-16',
      })
    })
  })
  describe('DELETE', () => {
    test('Delete wrong id', async () => {
      const response = await api.delete('/api/seasons/7').set('Cookie', cookie)
      expect(response.statusCode).toBe(404)
      const allResponse = await api.get('/api/seasons')
      expect(allResponse.body).toHaveLength(seasonData.length + 1)
    })
    test('Delete correct id', async () => {
      const response = await api.delete('/api/seasons/6').set('Cookie', cookie)
      expect(response.statusCode).toBe(200)
      expect(response.body.message).toBe('Season deleted')
      const allResponse = await api.get('/api/seasons')
      expect(allResponse.body).toHaveLength(seasonData.length)
      expect(allResponse.body).not.toContainEqual(
        expect.objectContaining({ seasonId: 6 })
      )
    })
  })
  describe('PUT', () => {
    test('Edit series', async () => {
      const response = await api
        .put('/api/series')
        .send(updateSerie)
        .set('Cookie', cookie)
      expect(response.statusCode).toBe(200)
      const season = await api.get('/api/seasons/2023')
      expect(season.body[0].series).toContainEqual(
        expect.objectContaining({
          comment: 'Testcomment',
        })
      )
    })
    test('Edit Metadata', async () => {
      const response = await api
        .put('/api/metadata')
        .send(editMetaData)
        .set('Cookie', cookie)
      expect(response.statusCode).toBe(200)
      const season = await api.get('/api/seasons/2023')
      expect(season.body[0].metadata).toMatchObject({
        comment: 'Testcomment',
      })
    })
  })
})
