import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import Level from './level.js'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import Chroma from './chroma.js'

export default class Skin extends BaseModel {
  @column({ isPrimary: true })
  declare displayName: string

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare weaponId: number

  @column()
  declare skinUuid: string

  @column()
  declare displayIcon: string

  @column()
  declare themeUuid: string

  @hasMany(() => Level)
  declare levels: HasMany<typeof Level>

  @hasMany(() => Chroma)
  declare chromas: HasMany<typeof Chroma>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
