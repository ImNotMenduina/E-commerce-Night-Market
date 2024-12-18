import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class UserPromotion extends BaseModel {
  @column({ isPrimary: true })
  declare userEmail: string

  @column({ isPrimary: true })
  declare skinId: number

  @column()
  declare flipped: number

  @column()
  declare discount: number

  @column()
  declare price: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
