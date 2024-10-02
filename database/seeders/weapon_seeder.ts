import Skin from '#models/skin'
import Weapon from '#models/weapon'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    try {
      const response = await fetch('https://valorant-api.com/v1/weapons')
      const { data } = await response.json()
      // removes 'Melee' weapon
      data.pop()

      for (const w of data) {
        const neweapon = await Weapon.create({
          displayIcon: w.displayIcon,
          displayName: w.displayName,
          shopImage: w.shopData.newImage,
        })

        const { skins } = w
        const sk = skins.map((s) => {
          return {
            skinUuid: s.uuid,
            displayName: s.displayName,
            themeUuid: s.themeUuid,
            displayIcon: s.displayIcon,
          }
        })

        await neweapon.related('skins').createMany(sk)
        
    } catch (error) {
      console.log('Weapon Seeder : ' + error)
    }
  }
}
