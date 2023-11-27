import { Optional } from 'sequelize'
import {
  Table,
  Column,
  PrimaryKey,
  Model,
  AllowNull,
} from 'sequelize-typescript'
import { compare } from 'bcrypt-ts'

interface UserAttributes {
  userId?: number
  userName: string
  email: string
  admin: boolean
  password: string
}

export interface UserInput extends Optional<UserAttributes, 'userId'> {}
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
