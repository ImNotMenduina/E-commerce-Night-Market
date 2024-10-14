import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'user_favorites'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.string('uuid_skin').primary()
      table.string('email_user').primary()

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
