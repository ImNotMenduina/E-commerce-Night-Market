import Bundle from '#models/bundle'
import Skin from '#models/skin'
import Theme from '#models/theme'
import Tier from '#models/tier'
import Weapon from '#models/weapon'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    const weapons = await Weapon.all()
    const bundles = await Bundle.all()

    for (const w of weapons) {
      const response = await fetch(`https://valorant-api.com/v1/weapons/${w.uuid}`)
      const { data } = await response.json()

      const skins = await Promise.all(
        data.skins.map(async (s) => {
          function findBundleId(name) {
            for (const b of bundles) {
              if (name.includes(b.bundleName)) return b.id
            }
            return null
          }

          async function findThemeId(uuid) {
            const theme = await Theme.findBy('uuid', uuid)
            if (theme) return theme.id
            return 1000
          }

          async function findTierId(uuid) {
            const tier = await Tier.findBy('uuid', uuid)
            if (tier) return tier.id
            return 1000
          }

          return {
            uuid: s.uuid,
            skinName: s.displayName,
            displayIcon: s.displayIcon,
            wallpaper: s.wallpaper,
            weaponId: w.id,
            themeId: await findThemeId(s.themeUuid),
            tierId: await findTierId(s.contentTierUuid),
            bundleId: findBundleId(s.displayName),
          }
        })
      )
      //preprossing:
      //removing "random && standard names" -
      //problem with constraints (UNIQUE)
      const skins_filter = skins.filter(
        (sk) =>
          !sk.skinName.includes('Melee') &&
          !sk.skinName.includes('Random') &&
          !sk.skinName.includes('Standard')
      )
      await Skin.createMany(skins_filter)
    }
  }
}
