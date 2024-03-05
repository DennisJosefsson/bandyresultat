import { test, expect, describe, beforeAll } from 'vitest'
import { app } from '../utils'
import supertest from 'supertest'
import { resetDb } from './testFunctions/resetDb'
const api = supertest(app)

beforeAll(async () => {
  await resetDb()
})

describe('Testing miscellaneous functions', () => {
  describe('Stats', () => {
    test('Game stats', async () => {
      const response = await api.get('/api/games/stats/2023')

      expect(response.statusCode).toBe(200)
      expect(response.body.gamesCountTotal).toBeDefined()
      expect(response.body.gamesCountTotal).toContainEqual(
        expect.objectContaining({ count: 69 })
      )
      expect(response.body.gamesCountTotalCat).toContainEqual(
        expect.objectContaining({ category: 'semi', count: 6 })
      )
      expect(response.body.winCountHomeTeam).toContainEqual(
        expect.objectContaining({ count: 45 })
      )
      expect(response.body.winCountAwayTeam).toContainEqual(
        expect.objectContaining({ count: 13 })
      )
      expect(response.body.drawCount).toContainEqual(
        expect.objectContaining({ count: 22 })
      )
    })
  })
  describe('Streaks', () => {
    test('Streaks', async () => {
      const response = await api
        .post('/api/games/streaks')
        .send({ record: 'generalStats', women: false })
      expect(response.statusCode).toBe(200)
      expect(response.body.golds).toBeDefined()
      expect(response.body.finals).toBeDefined()
      expect(response.body.playoffs).toBeDefined()
      expect(response.body.seasons).toBeDefined()
    })
    test('Streaks, wrong record', async () => {
      const response = await api
        .post('/api/games/streaks')
        .send({ record: 'general', women: false })
      expect(response.statusCode).toBe(400)
    })
  })
  describe.only('Search', () => {
    test.only('Search result', async () => {
      const response = await api.post('/api/games/search').send({
        result: '7-1',
        order: { value: 'desc', label: 'Fallande' },
        limit: { value: 10, label: 10 },
        team: null,
        opponent: null,
        startSeason: 1907,
        endSeason: 2024,
        goalDiffOperator: { value: 'eq', label: 'lika' },
        goalsScoredOperator: { value: 'eq', label: 'lika' },
        goalsConcededOperator: { value: 'eq', label: 'lika' },
        orderVar: { value: 'date', label: 'Datum' },
        homeGame: 'both',
      })

      expect(response.statusCode).toBe(200)
      expect(response.body.hits).toBe(8)
    })
    // test('Search 404', async () => {
    //   const response = await api.post('/api/games/search').send({
    //     result: '19-1',
    //     order: 'desc',
    //     startSeason: '1907',
    //     endSeason: '2026',
    //   })

    //   expect(response.statusCode).toBe(404)
    //   expect(response.body.errors).toBeDefined()
    //   expect(response.body.errors).toContainEqual(
    //     expect.objectContaining({
    //       message: 'Hittade ingen match som matchade sökningen.',
    //     })
    //   )
    // })
    // test('Search result, goals scored', async () => {
    //   const response = await api.post('/api/games/search').send({
    //     goalsScored: 7,
    //     goalsScoredOperator: 'eq',
    //     order: 'desc',
    //     startSeason: '1907',
    //     endSeason: '2026',
    //   })

    //   expect(response.statusCode).toBe(200)
    //   expect(response.body.hits).toBe(7)
    // })
    // test('Search result, goal difference', async () => {
    //   const response = await api.post('/api/games/search').send({
    //     goalDiff: 5,
    //     goalDiffOperator: 'gte',
    //     order: 'desc',
    //     startSeason: '1907',
    //     endSeason: '2026',
    //   })

    //   expect(response.statusCode).toBe(200)
    //   expect(response.body.hits).toBe(11)
    // })
    // test('Search result, goals conceded', async () => {
    //   const response = await api.post('/api/games/search').send({
    //     goalsConceded: 5,
    //     goalsConcededOperator: 'lte',
    //     order: 'desc',
    //     startSeason: '1907',
    //     endSeason: '2026',
    //   })

    //   expect(response.statusCode).toBe(200)
    //   expect(response.body.hits).toBe(110)
    // })

    // test('Search result, goals scored and goal difference', async () => {
    //   const response = await api.post('/api/games/search').send({
    //     goalsScored: 5,
    //     goalsScoredOperator: 'gte',
    //     goalDiff: 2,
    //     goalDiffOperator: 'lte',
    //     order: 'desc',
    //     startSeason: '1907',
    //     endSeason: '2026',
    //   })

    //   expect(response.statusCode).toBe(200)
    //   expect(response.body.hits).toBe(31)
    //   expect(response.body.searchResult).toHaveLength(10)
    //   expect(response.body.searchResult).toContainEqual(
    //     expect.objectContaining({ date: '2023-02-07', seasonId: 1, gameId: 63 })
    //   )
    // })

    // test('Search input date', async () => {
    //   const response = await api.post('/api/games/search').send({
    //     inputDate: '26/12',
    //     order: 'desc',
    //     startSeason: '1907',
    //     endSeason: '2026',
    //   })

    //   expect(response.statusCode).toBe(200)
    // })
    // test('Search limit', async () => {
    //   const response = await api.post('/api/games/search').send({
    //     limit: 5,
    //     order: 'desc',
    //     startSeason: '1907',
    //     endSeason: '2026',
    //   })
    //   expect(response.body.searchResult).toHaveLength(5)
    // })
    // test('Search category', async () => {
    //   const responseRegular = await api.post('/api/games/search').send({
    //     categoryArray: ['regular'],
    //     order: 'desc',
    //     startSeason: '1907',
    //     endSeason: '2026',
    //   })
    //   expect(responseRegular.body.hits).toBe(112)
    //   const responseSemiQuarter = await api.post('/api/games/search').send({
    //     categoryArray: ['quarter', 'semi'],
    //     order: 'desc',
    //     startSeason: '1907',
    //     endSeason: '2026',
    //   })
    //   expect(responseSemiQuarter.body.hits).toBe(24)
    //   const responseQualification = await api.post('/api/games/search').send({
    //     categoryArray: ['qualification'],
    //     order: 'desc',
    //     startSeason: '1907',
    //     endSeason: '2026',
    //   })
    //   expect(responseQualification.statusCode).toBe(404)
    // })
    // test('Search ascending', async () => {
    //   const responseDesc = await api.post('/api/games/search').send({
    //     order: 'desc',
    //     startSeason: '1907',
    //     endSeason: '2026',
    //   })
    //   expect(responseDesc.body.searchResult).toContainEqual(
    //     expect.objectContaining({ category: 'final' })
    //   )
    //   expect(responseDesc.body.searchResult).not.toContainEqual(
    //     expect.objectContaining({ date: '2022-12-06' })
    //   )
    //   const responseAsc = await api.post('/api/games/search').send({
    //     order: 'asc',
    //     startSeason: '1907',
    //     endSeason: '2026',
    //   })
    //   expect(responseAsc.body.searchResult).not.toContainEqual(
    //     expect.objectContaining({ category: 'final' })
    //   )
    //   expect(responseAsc.body.searchResult).toContainEqual(
    //     expect.objectContaining({ date: '2022-12-06' })
    //   )
    // })
    // test('Search team', async () => {
    //   const response = await api.post('/api/games/search').send({
    //     team: 1,
    //     order: 'desc',
    //     startSeason: '1907',
    //     endSeason: '2026',
    //   })
    //   expect(response.body.hits).toBe(17)
    // })
    // test('Search team and opponent', async () => {
    //   const response = await api.post('/api/games/search').send({
    //     team: 1,
    //     opponent: 2,
    //     order: 'desc',
    //     startSeason: '1907',
    //     endSeason: '2026',
    //   })
    //   expect(response.body.hits).toBe(2)
    // })
    // test('Search order total goals', async () => {
    //   const responseDesc = await api.post('/api/games/search').send({
    //     orderVar: 'totalGoals',
    //     order: 'desc',
    //     limit: 1,
    //     startSeason: '1907',
    //     endSeason: '2026',
    //   })

    //   expect(responseDesc.body.searchResult).toContainEqual(
    //     expect.objectContaining({ totalGoals: 13 })
    //   )
    //   const responseAsc = await api.post('/api/games/search').send({
    //     orderVar: 'totalGoals',
    //     order: 'asc',
    //     limit: 1,
    //     startSeason: '1907',
    //     endSeason: '2026',
    //   })
    //   expect(responseAsc.body.searchResult).toHaveLength(2)
    //   expect(responseAsc.body.searchResult).toContainEqual(
    //     expect.objectContaining({ totalGoals: 4 })
    //   )
    // })
    // test('Search order goals scored', async () => {
    //   const responseDesc = await api.post('/api/games/search').send({
    //     orderVar: 'goalsScored',
    //     order: 'desc',
    //     limit: 1,
    //     startSeason: '1907',
    //     endSeason: '2026',
    //   })

    //   expect(responseDesc.body.searchResult).toContainEqual(
    //     expect.objectContaining({ goalsScored: 11 })
    //   )
    //   const responseAsc = await api.post('/api/games/search').send({
    //     orderVar: 'goalsScored',
    //     order: 'asc',
    //     limit: 1,
    //     startSeason: '1907',
    //     endSeason: '2026',
    //   })
    //   expect(responseAsc.body.searchResult).toContainEqual(
    //     expect.objectContaining({ goalsScored: 0 })
    //   )
    // })
    // test('Search order goals conceded', async () => {
    //   const responseDesc = await api.post('/api/games/search').send({
    //     orderVar: 'goalsConceded',
    //     order: 'desc',
    //     limit: 1,
    //     startSeason: '1907',
    //     endSeason: '2026',
    //   })

    //   expect(responseDesc.body.searchResult).toContainEqual(
    //     expect.objectContaining({ goalsConceded: 11 })
    //   )
    //   const responseAsc = await api.post('/api/games/search').send({
    //     orderVar: 'goalsConceded',
    //     order: 'asc',
    //     limit: 1,
    //     startSeason: '1907',
    //     endSeason: '2026',
    //   })
    //   expect(responseAsc.body.searchResult).toContainEqual(
    //     expect.objectContaining({ goalsConceded: 0 })
    //   )
    // })
    // test('Search order goal difference', async () => {
    //   const responseDesc = await api.post('/api/games/search').send({
    //     orderVar: 'goalDifference',
    //     order: 'desc',
    //     limit: 1,
    //     startSeason: '1907',
    //     endSeason: '2026',
    //   })

    //   expect(responseDesc.body.searchResult).toContainEqual(
    //     expect.objectContaining({ goalDifference: 9 })
    //   )
    //   const responseAsc = await api.post('/api/games/search').send({
    //     orderVar: 'goalDifference',
    //     order: 'asc',
    //     limit: 1,
    //     startSeason: '1907',
    //     endSeason: '2026',
    //   })
    //   expect(responseAsc.body.searchResult).toHaveLength(1)
    //   expect(responseAsc.body.searchResult).toContainEqual(
    //     expect.objectContaining({ goalDifference: -9 })
    //   )
    // })
    // test('Search order, scored goals specific team', async () => {
    //   const responseDesc = await api.post('/api/games/search').send({
    //     team: 1,
    //     orderVar: 'goalsScored',
    //     order: 'desc',
    //     startSeason: '1907',
    //     endSeason: '2026',
    //   })

    //   expect(responseDesc.body.searchResult[0]).toMatchObject({
    //     goalsScored: 8,
    //     gameId: 52,
    //   })
    //   expect(responseDesc.body.searchResult[1]).toMatchObject({
    //     goalsScored: 7,
    //     gameId: 13,
    //   })
    //   expect(responseDesc.body.searchResult[2]).toMatchObject({
    //     goalsScored: 6,
    //     gameId: 55,
    //   })

    //   const responseAsc = await api.post('/api/games/search').send({
    //     team: 1,
    //     orderVar: 'goalsScored',
    //     order: 'asc',
    //     startSeason: '1907',
    //     endSeason: '2026',
    //   })

    //   expect(responseAsc.body.searchResult[0]).toMatchObject({
    //     goalsScored: 0,
    //     gameId: 62,
    //   })
    //   expect(responseAsc.body.searchResult[1]).toMatchObject({
    //     goalsScored: 1,
    //     gameId: 4,
    //   })
    //   expect(responseAsc.body.searchResult[2]).toMatchObject({
    //     goalsScored: 1,
    //     gameId: 32,
    //   })
    // })
    // test('Search order, scored goals specific team and specific opponent', async () => {
    //   const responseDesc = await api.post('/api/games/search').send({
    //     team: 1,
    //     opponent: 2,
    //     orderVar: 'goalsScored',
    //     order: 'desc',
    //     startSeason: '1907',
    //     endSeason: '2026',
    //   })

    //   expect(responseDesc.body.searchResult[0]).toMatchObject({
    //     goalsScored: 7,
    //     gameId: 13,
    //   })

    //   const responseAsc = await api.post('/api/games/search').send({
    //     team: 1,
    //     opponent: 2,
    //     orderVar: 'goalsScored',
    //     order: 'asc',
    //     startSeason: '1907',
    //     endSeason: '2026',
    //   })

    //   expect(responseAsc.body.searchResult[0]).toMatchObject({
    //     goalsScored: 1,
    //     gameId: 32,
    //   })
    // })
  })
  describe('Link', () => {
    test('Get link', async () => {
      const response = await api.get('/api/links/link0000001')

      expect(response.statusCode).toBe(200)
      expect(response.body).toMatchObject({
        success: true,
        message: 'Länk finns.',
      })
      expect(response.body.searchString).toMatchObject({
        result: '7-1',
        order: 'desc',
        startSeason: '1907',
        endSeason: '2026',
      })
    })
    test('Get link 404', async () => {
      const response = await api.get('/api/links/link9999999')

      expect(response.statusCode).toBe(404)
    })
    test('Get link 400', async () => {
      const response = await api.get('/api/links/9999999')

      expect(response.statusCode).toBe(400)
    })
  })
  describe('Compare', () => {
    test('404', async () => {
      const response = await api.post('/api/tables/compare').send({
        categoryArray: [
          'qualification',
          'regular',
          'eight',
          'quarter',
          'semi',
          'final',
        ],
        startSeason: 1,
        endSeason: 6,
        teamArray: [1, 9],
      })
      expect(response.statusCode).toBe(404)
      expect(response.body.errors).toBeDefined()
      expect(response.body.errors).toContainEqual(
        expect.objectContaining({
          message: 'Lagen har inte spelat mot varandra.',
        })
      )
    })
    test('400 - ingen kategori', async () => {
      const response = await api.post('/api/tables/compare').send({
        categoryArray: [],
        startSeason: 1,
        endSeason: 6,
        teamArray: [1, 2],
      })
      expect(response.statusCode).toBe(400)
      expect(response.body.errors).toBeDefined()
      expect(response.body.errors).toContainEqual(
        expect.objectContaining({
          message: 'Måste ange minst en kategori.',
        })
      )
    })
    test('400 - för få lag', async () => {
      const response = await api.post('/api/tables/compare').send({
        categoryArray: ['regular'],
        startSeason: 1,
        endSeason: 6,
        teamArray: [1],
      })
      expect(response.statusCode).toBe(400)
      expect(response.body.errors).toBeDefined()
      expect(response.body.errors).toContainEqual(
        expect.objectContaining({
          message: 'Måste ange minst två lag.',
        })
      )
    })
    test('400 - för många lag', async () => {
      const response = await api.post('/api/tables/compare').send({
        categoryArray: ['regular'],
        startSeason: 1,
        endSeason: 6,
        teamArray: [1, 2, 3, 4, 5],
      })
      expect(response.statusCode).toBe(400)
      expect(response.body.errors).toBeDefined()
      expect(response.body.errors).toContainEqual(
        expect.objectContaining({
          message: 'Måste ange högst fyra lag.',
        })
      )
    })
    test('Compare two teams', async () => {
      const response = await api.post('/api/tables/compare').send({
        categoryArray: [
          'qualification',
          'regular',
          'eight',
          'quarter',
          'semi',
          'final',
        ],
        startSeason: 1,
        endSeason: 3,
        teamArray: [7, 8],
      })
      expect(response.statusCode).toBe(200)
      expect(response.body.seasonNames).toBeDefined()
      expect(response.body.seasonNames).toContainEqual(
        expect.objectContaining({ year: '2022/2023' })
      )
      expect(response.body.golds).toBeDefined()
      expect(response.body.golds).toContainEqual(
        expect.objectContaining({ team: 8, guld: '1' })
      )
      expect(response.body.link).toBeDefined()
      expect(response.body.compareAllGames).toBeDefined()
      expect(response.body.compareAllGames).toContainEqual(
        expect.objectContaining({ totalGames: 3 })
      )
      expect(response.body.link).toBeDefined()
      expect(response.body.tabeller).toBeDefined()
      expect(response.body.tabeller).toContainEqual(
        expect.objectContaining({ totalGames: 2, category: 'regular' })
      )
      expect(response.body.tabeller).toContainEqual(
        expect.objectContaining({ totalGames: 1, category: 'final' })
      )
      expect(response.body.firstAndLatestGames).toBeDefined()
      expect(response.body.firstAndLatestGames).toContainEqual(
        expect.objectContaining({
          date: '2022-12-06',
          home_name: 'Kalix',
          away_name: 'Sandviken',
        })
      )
    })
    test('Compare three teams', async () => {
      const response = await api.post('/api/tables/compare').send({
        categoryArray: [
          'qualification',
          'regular',
          'eight',
          'quarter',
          'semi',
          'final',
        ],
        startSeason: 1,
        endSeason: 3,
        teamArray: [1, 7, 8],
      })
      expect(response.statusCode).toBe(200)
      expect(response.body.seasonNames).toBeDefined()
      expect(response.body.seasonNames).toContainEqual(
        expect.objectContaining({ year: '2022/2023' })
      )
      expect(response.body.golds).toBeDefined()
      expect(response.body.golds).toContainEqual(
        expect.objectContaining({ team: 8, guld: '1' })
      )
      expect(response.body.link).toBeDefined()
      expect(response.body.compareAllGames).toBeDefined()
      expect(response.body.compareAllGames).toContainEqual(
        expect.objectContaining({ totalGames: 2, team: 1, opponent: 8 })
      )
      expect(response.body.compareAllGames).toContainEqual(
        expect.objectContaining({ totalGames: 3, team: 7, opponent: 8 })
      )
      expect(response.body.link).toBeDefined()
      expect(response.body.tabeller).toBeDefined()
      expect(response.body.tabeller).toContainEqual(
        expect.objectContaining({
          totalGames: 2,
          category: 'regular',
          team: 1,
          opponent: 7,
        })
      )
      expect(response.body.tabeller).toContainEqual(
        expect.objectContaining({ totalGames: 1, category: 'final' })
      )
      expect(response.body.firstAndLatestGames).toBeDefined()
      expect(response.body.firstAndLatestGames).toContainEqual(
        expect.objectContaining({
          date: '2023-02-16',
          home_name: 'Sandviken',
          away_name: 'Kalix',
        })
      )
      expect(response.body.firstAndLatestGames).toContainEqual(
        expect.objectContaining({
          date: '2022-12-06',
          home_name: 'Kalix',
          away_name: 'Sandviken',
        })
      )
      expect(response.body.firstAndLatestGames).toContainEqual(
        expect.objectContaining({
          date: '2022-12-22',
          home_name: 'Sandviken',
          away_name: 'Villa Lidköping',
        })
      )
    })
  })
})
