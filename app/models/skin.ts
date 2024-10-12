import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Skin extends BaseModel {
  @column({ isPrimary: true })
  declare uuid: string

  @column()
  declare displayName: string

  @column()
  declare displayIcon: string

  @column()
  declare themeUuid: string

  @column()
  declare contentTierUuid: string

  @column()
  declare wallpaper: string

  @column()
  declare uuidWeapon: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
