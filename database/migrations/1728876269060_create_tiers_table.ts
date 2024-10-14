import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'tiers'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.string('uuid').primary()
      table.string('tier_name_edition')
      table.string('tier_name')
      table.integer('rank')
      table.integer('juice_value')
      table.integer('juice_cost')
      table.string('color')
      table.string('tier_icon')

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
