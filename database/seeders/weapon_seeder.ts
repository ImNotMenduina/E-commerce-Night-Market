//import Skin from '#models/skin'
import Weapon from '#models/weapon'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    try {
      const response = await fetch('https://valorant-api.com/v1/weapons')
      const { data } = await response.json()

      const weapons = data.map((w) => {
        return {
          uuid: w.uuid,
          displayIcon: w.displayIcon,
          weaponName: w.displayName,
          shopImage: w.shopData != null ? w.shopData.newImage : null,
        }
      })
      await Weapon.createMany(weapons)
    } catch (error) {
      console.log('Weapon Seeder : ' + error)
    }
  }
}
