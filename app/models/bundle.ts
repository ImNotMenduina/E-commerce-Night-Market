import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import Skin from './skin.js'
import type { HasMany } from '@adonisjs/lucid/types/relations'

export default class Bundle extends BaseModel {
  @column({ isPrimary: true })
  declare uuid: string

  @column()
  declare bundleName: string

  @column()
  declare displayIcona: string

  @column()
  declare displayIconb: string

  @column()
  declare verticalPromoImage: string

  @hasMany(() => Skin, {
    foreignKey: 'uuidBundle',
  })
  declare skins: HasMany<typeof Skin>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
