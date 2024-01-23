import dotenv from 'dotenv'
dotenv.config()
import { describe, test, expect } from 'vitest'
import { app } from '../utils'
import supertest from 'supertest'
import { z } from 'zod'

const stringCheck = z.string()
const api = supertest(app)

const userName = stringCheck.parse(process.env.BR_USERNAME)
const password = stringCheck.parse(process.env.BR_PASSWORD)

describe('Testing login function', () => {
  test('Login', async () => {
    const response = await api.post('/api/login').send({ userName, password })
    expect(response.statusCode).toBe(200)
    expect(response.header['set-cookie']).toBeDefined()
  })
  test('Login, user does not exist', async () => {
    const response = await api
      .post('/api/login')
      .send({ userName: 'wrongUserName', password })

    expect(response.statusCode).toBe(404)
    expect(response.header['set-cookie']).not.toBeDefined()
  })
  test('Login, wrong username', async () => {
    const response = await api
      .post('/api/login')
      .send({ userName, password: 'wrongPassword' })
    expect(response.statusCode).toBe(401)
    expect(response.header['set-cookie']).not.toBeDefined()
  })
  test('Login - logout', async () => {
    const response = await api.post('/api/login').send({ userName, password })
    expect(response.statusCode).toBe(200)
    expect(response.header['set-cookie']).toBeDefined()
    const cookie = response.header['set-cookie']
    const logoutResponse = await api
      .get('/api/login/logout')
      .set('Cookie', cookie)
    expect(logoutResponse.statusCode).toBe(200)
    expect(logoutResponse.body).toMatchObject({
      success: true,
      message: 'Tillbakakaka',
    })
  })
})
