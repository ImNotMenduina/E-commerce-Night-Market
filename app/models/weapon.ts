import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import Skin from './skin.js'
import type { HasMany } from '@adonisjs/lucid/types/relations'

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

  @hasMany(() => Skin)
  declare skins: HasMany<typeof Skin>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
