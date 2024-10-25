import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Chroma extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare uuid: string

  @column()
  declare chromaName: string

  @column()
  declare displayIcon: string

  @column()
  declare fullRender: string

  @column()
  declare swatch: string

  @column()
  declare chromaVideo: string

  @column()
  declare skinId: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
