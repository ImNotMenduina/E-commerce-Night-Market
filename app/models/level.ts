import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Level extends BaseModel {
  @column({ isPrimary: true })
  declare uuid: string

  @column()
  declare levelName: string

  @column()
  declare levelVideo: string

  @column()
  declare levelItem: string

  @column()
  declare uuidSkin: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
