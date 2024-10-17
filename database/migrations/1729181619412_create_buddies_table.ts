import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'buddies'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.string('uuid').primary()
      table.string('buddy_name')
      table.string('is_hidden_if_not_owned')
      table.string('buddy_icon')

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
