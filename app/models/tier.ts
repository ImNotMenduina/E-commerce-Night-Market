import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import Skin from './skin.js'
import type { HasMany } from '@adonisjs/lucid/types/relations'

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

  @hasMany(() => Skin, {
    foreignKey: 'contentTierUuid',
  })
  declare skins: HasMany<typeof Skin>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
