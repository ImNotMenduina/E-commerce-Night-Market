import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Card extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare uuid: string

  @column()
  declare displayName: string

  @column()
  declare themeUuid: string

  @column()
  declare displayIcon: string

  @column()
  declare smallArt: string

  @column()
  declare wideArt: string

  @column()
  declare largeArt: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
