import { z } from 'zod'

import {
  Table,
  Column,
  PrimaryKey,
  Model,
  AllowNull,
} from 'sequelize-typescript'
import { compare } from 'bcrypt-ts'

export const userAttributes = z.object({
  userId: z.number(),
  userName: z.string(),
  email: z.string().email(),
  admin: z.boolean(),
  password: z.string(),
})

export const userInput = userAttributes.omit({ userId: true })
export const userForAdmin = userAttributes.omit({
  userId: true,
  email: true,
  password: true,
})

export const userFromLoginForm = userAttributes.omit({
  userId: true,
  email: true,
  admin: true,
})
export type UserAttributes = z.infer<typeof userAttributes>
export type UserInput = z.infer<typeof userInput>
export type UserForAdmin = z.infer<typeof userForAdmin>
export interface UserOutput extends Required<UserAttributes> {}

@Table({
  underscored: true,
  timestamps: false,
  modelName: 'user',
})
class User extends Model<UserAttributes, UserInput> {
  @PrimaryKey
  @Column
  declare userId?: number

  @AllowNull(false)
  @Column
  declare userName: string

  @AllowNull(false)
  @Column
  declare email: string

  @AllowNull(false)
  @Column
  declare admin: boolean

  @AllowNull(false)
  @Column
  declare password: string

  declare authenticate: (
    instance: User,
    passwordInput: string
  ) => Promise<boolean>
}

User.prototype.authenticate = async (
  instance: User,
  passwordInput: string
): Promise<boolean> => {
  const password = String(instance.password)
  const result = await compare(passwordInput, password)

  return result
}

export default User
