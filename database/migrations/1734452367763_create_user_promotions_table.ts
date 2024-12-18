import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'user_promotions'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.integer('skin_id')
      table.string('user_email')
      table.integer('flipped')
      table.integer('discount')
      table.integer('price')

      table.primary(['skin_id', 'user_email'])

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
