import Skin from '#models/skin'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    try {
      const response = await fetch('https://valorant-api.com/v1/weapons/skins')
      const { data } = await response.json()

      const sk = data.map((s) => {
        return {
          skinUuid: s.uuid,
          displayName: s.displayName,
          themeUuid: s.themeUuid,
          displayIcon: s.displayIcon,
        }
      })
      await Skin.createMany(sk)
    } catch (error) {
      console.log('Skin seeder' + error)
    }
  }
}
