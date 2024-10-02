import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Weapon extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  // weapon icon
  @column()
  declare displayIcon: string

  // weapon name
  @column()
  declare displayName: string

  @column()
  declare shopImage: string

  @column()
  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
