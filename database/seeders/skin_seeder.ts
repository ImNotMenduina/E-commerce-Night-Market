import Bundle from '#models/bundle'
import Skin from '#models/skin'
import Weapon from '#models/weapon'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    const response = await fetch('https://valorant-api.com/v1/weapons/skins')
    const { data } = await response.json()

    const weapons = await Weapon.all()
    const bundles = await Bundle.all()

    const skins = data.map((s) => {
      const words = s.displayName.split(' ')
      const category = words.pop()

      function findWeaponUuid(name) {
        for (const w of weapons) {
          if (name === w.displayName) return w.uuid
        }
        return null
      }

      function findBundleUuid(name) {
        for (const b of bundles) {
          if (name.includes(b.displayName)) {
            return b.uuid
          }
        }
        return null
      }

      return {
        uuid: s.uuid,
        displayName: s.displayName,
        displayIcon: s.displayIcon,
        themeUuid: s.themeUuid,
        contentTierUuid: s.contentTierUuid,
        wallpaper: s.wallpaper,
        uuidWeapon: findWeaponUuid(category),
        uuidBundle: findBundleUuid(s.displayName),
      }
    })
    //preprossing:
    //removing "random && standard names" -
    //problem with constraints (UNIQUE)
    const skins_pp = skins.filter(
      (sk) =>
        !sk.displayName.includes('Random') &&
        !sk.displayName.includes('Standard') &&
        sk.displayIcon != null
    )
    await Skin.createMany(skins_pp)
  }
}
