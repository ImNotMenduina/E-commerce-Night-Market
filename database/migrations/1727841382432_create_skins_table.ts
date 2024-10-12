import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'skins'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.string('uuid').primary()
      table.string('display_name')
      table.string('display_icon')
      table.string('theme_uuid')
      table.string('content_tier_uuid')
      table.string('wallpaper')
      table.string('uuid_weapon')
      table.string('uuid_bundle')

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
