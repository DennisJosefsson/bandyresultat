import dotenv from 'dotenv'
dotenv.config()
import { expect } from 'vitest'
import { z } from 'zod'
import { app } from '../../utils'
import supertest from 'supertest'
const stringCheck = z.string()
const api = supertest(app)

const userName = stringCheck.parse(process.env.BR_USERNAME)
const password = stringCheck.parse(process.env.BR_PASSWORD)

export const loginFunction = async () => {
  const login = await api.post('/api/login').send({ userName, password })
  expect(login.statusCode).toBe(200)
  expect(login.header['set-cookie']).toBeDefined()
  const cookie = login.header['set-cookie']
  return cookie
}
