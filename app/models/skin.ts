import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import Bundle from './bundle.js'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import Tier from './tier.js'
import Chroma from './chroma.js'
import Theme from './theme.js'
import Weapon from './weapon.js'
import Level from './level.js'

export default class Skin extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare uuid: string

  @column()
  declare skinName: string

  @column()
  declare displayIcon: string

  @column()
  declare wallpaper: string

  @column()
  declare themeId: number

  @column()
  declare tierId: number

  @column()
  declare weaponId: number

  @column()
  declare bundleId: number

  @belongsTo(() => Bundle, {
    foreignKey: 'bundleId',
  })
  declare bundle: BelongsTo<typeof Bundle>

  @belongsTo(() => Tier, {
    foreignKey: 'tierId',
  })
  declare tier: BelongsTo<typeof Tier>

  @belongsTo(() => Theme, {
    foreignKey: 'themeId',
  })
  declare theme: BelongsTo<typeof Theme>

  @belongsTo(() => Weapon, {
    foreignKey: 'weaponId',
  })
  declare weapon: BelongsTo<typeof Weapon>

  @hasMany(() => Chroma, {
    foreignKey: 'skinId',
  })
  declare chromas: HasMany<typeof Chroma>

  @hasMany(() => Level, {
    foreignKey: 'skinId',
  })
  declare levels: HasMany<typeof Level>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
