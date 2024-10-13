import Theme from '#models/theme'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    const response = await fetch('https://valorant-api.com/v1/themes')
    const { data } = await response.json()

    const themes = data.map((t) => {
      return {
        uuid: t.uuid,
        themeName: t.displayName,
        displayIcon: t.displayIcon != null ? t.displayIcon : null,
      }
    })

    await Theme.createMany(themes)
  }
}
