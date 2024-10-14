import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Tier extends BaseModel {
  @column({ isPrimary: true })
  declare uuid: string

  @column()
  declare tierNameEdition: string

  @column()
  declare tierName: string

  @column()
  declare rank: number

  @column()
  declare juiceValue: number

  @column()
  declare juiceCost: number

  @column()
  declare color: string

  @column()
  declare tierIcon: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
