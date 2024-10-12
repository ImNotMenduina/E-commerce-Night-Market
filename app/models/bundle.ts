import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Bundle extends BaseModel {
  @column({ isPrimary: true })
  declare uuid: string

  @column()
  declare displayName: string

  @column()
  declare displayIcona: string

  @column()
  declare displayIconb: string

  @column()
  declare verticalPromoImage: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
