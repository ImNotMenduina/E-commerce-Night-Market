//import Skin from '#models/skin'
import Chroma from '#models/chroma'
import Skin from '#models/skin'
import Level from '#models/level'
import Weapon from '#models/weapon'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    // seed ??
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

        const s = skins.map((s) => {
          return {
            skinUuid: s.uuid,
            displayName: s.displayName,
            themeUuid: s.themeUuid,
            displayIcon: s.displayIcon,
          }
        })

        const sk = s.filter(
          (i) =>
            !i.displayName.includes('Random') &&
            !i.displayName.includes('Standard') &&
            i.displayIcon != null
        )

        await neweapon.related('skins').createMany(sk)

        for (const s of skins) {
          for (const c of s.chromas) {
            await Chroma.create({
              displayName: s.displayName,
              displayIcon: c.displayIcon,
              fullRender: c.fullRender,
              swatch: c.swatch,
            })
          }
          for (const l of s.levels) {
            await Level.create({
              displayName: l.displayName,
              streamedVideo: l.streamedVideo,
            })
          }
        }
      }
    } catch (error) {
      console.log('Weapon Seeder : ' + error)
    }
  }
}
