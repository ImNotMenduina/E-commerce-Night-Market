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
  declare uuid: string

  @column()
  declare skinName: string

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

  @column()
  declare uuidBundle: string

  @belongsTo(() => Bundle, {
    foreignKey: 'uuidBundle',
  })
  declare bundle: BelongsTo<typeof Bundle>

  @belongsTo(() => Tier, {
    foreignKey: 'contentTierUuid',
  })
  declare tier: BelongsTo<typeof Tier>

  @belongsTo(() => Theme, {
    foreignKey: 'themeUuid',
  })
  declare theme: BelongsTo<typeof Theme>

  @belongsTo(() => Weapon, {
    foreignKey: 'uuidWeapon',
  })
  declare weapon: BelongsTo<typeof Weapon>

  @hasMany(() => Chroma, {
    foreignKey: 'uuidSkin',
  })
  declare chromas: HasMany<typeof Chroma>

  @hasMany(() => Level, {
    foreignKey: 'uuidSkin',
  })
  declare levels: HasMany<typeof Level>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
