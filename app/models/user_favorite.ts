import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class UserFavorite extends BaseModel {
  @column({ isPrimary: true })
  declare skinId: number

  @column({ isPrimary: true })
  declare emailUser: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
