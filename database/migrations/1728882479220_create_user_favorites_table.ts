import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'user_favorites'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.integer('skin_id').primary()
      table.string('email_user').primary()

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
