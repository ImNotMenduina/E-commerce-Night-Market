import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'chromas'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('uuid')
      table.string('chroma_name')
      table.string('display_icon')
      table.string('full_render')
      table.string('swatch')
      table.string('chroma_video')
      table.integer('skin_id').references('skins.id').onDelete('CASCADE')
      
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
