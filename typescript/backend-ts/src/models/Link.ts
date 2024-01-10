import { z } from 'zod'

import { Model, Table, PrimaryKey, Column } from 'sequelize-typescript'

export const linkAttributes = z.object({
  linkId: z.number().optional(),
  linkName: z.string(),
  searchString: z.string(),
  origin: z.string(),
})

const linkInput = linkAttributes.omit({ linkId: true })

export type LinkAttributes = z.infer<typeof linkAttributes>
export type LinkInput = z.infer<typeof linkInput>

export interface LinkOutput extends Required<LinkAttributes> {}

@Table({
  underscored: true,
  timestamps: false,
  modelName: 'link',
})
class Link extends Model<LinkAttributes, LinkInput> {
  @PrimaryKey
  @Column
  declare linkId: number

  @Column
  declare linkName: string

  @Column
  declare searchString: string

  @Column
  declare origin: string
}

export default Link
