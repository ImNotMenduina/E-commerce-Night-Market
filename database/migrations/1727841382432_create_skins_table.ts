import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'skins'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('uuid')
      table.string('skin_name')
      table.string('display_icon')
      table.string('wallpaper')
      table.integer('theme_id').references('themes.id').onDelete('CASCADE')
      table.integer('tier_id').references('tiers.id').onDelete('CASCADE')
      table.integer('weapon_id').references('weapons.id').onDelete('CASCADE')
      table.integer('bundle_id').references('bundles.id').onDelete('CASCADE')

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
