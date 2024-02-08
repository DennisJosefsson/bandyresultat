import { z } from 'zod'

import { Model, Column, Table } from 'sequelize-typescript'

export const errorAttributes = z.object({
  errorId: z.number().optional(),
  date: z.string(),
  name: z.string(),
  message: z.string(),
  origin: z.string(),
  body: z.string(),
  production: z.boolean(),
  backend: z.boolean(),
})

const errorInput = errorAttributes.omit({ errorId: true })

export type ErrorAttributes = z.infer<typeof errorAttributes>
export type ErrorInput = z.infer<typeof errorInput>

export interface ErrorOutput extends Required<ErrorAttributes> {}

@Table({
  underscored: true,
  timestamps: false,
  modelName: 'error',
})
class BandyError extends Model<ErrorAttributes, ErrorInput> {
  @Column({ primaryKey: true })
  declare errorId: number

  @Column
  declare date: string

  @Column
  declare name: string

  @Column
  declare message: string

  @Column
  declare origin: string

  @Column
  declare body: string

  @Column
  declare production: boolean

  @Column
  declare backend: boolean
}

export default BandyError
