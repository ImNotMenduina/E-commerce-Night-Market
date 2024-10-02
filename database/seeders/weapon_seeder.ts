import Weapon from '#models/weapon'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    try {
      const response = await fetch('https://valorant-api.com/v1/weapons')
      const { data } = await response.json()
      // removes 'Melee' weapon
      data.pop()

      const sk = data.map((s) => {
        return {
          displayName: s.displayName,
          displayIcon: s.displayIcon,
          shopImage: s.shopData.newImage,
        }
      })
      await Weapon.createMany(sk)
    } catch (error) {
      console.log('Weapon Seeder : ' + error)
    }
  }
}
