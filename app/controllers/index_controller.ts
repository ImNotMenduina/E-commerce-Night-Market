import type { HttpContext } from '@adonisjs/core/http'
import Weapon from '#models/weapon'
import db from '@adonisjs/lucid/services/db'
import Bundle from '#models/bundle'

export default class IndicesController {
  async index({ view }: HttpContext) {
    const weapons = await Weapon.all()
    const bundles = await Bundle.all()

    const skins = await db
      .from('skins')
      .join('tiers', 'tiers.uuid', '=', 'skins.content_tier_uuid')
      .join('weapons', 'weapons.uuid', '=', 'skins.uuid_weapon')
      .select('skins.uuid as uuid')
      .select('skins.skin_name')
      .select('tiers.tier_icon')
      .select('tiers.color')
      .select('tiers.tier_name')
      .select('skins.display_icon')
      .select('weapons.weapon_name')

    const pistol = await Weapon.findBy({ weaponName: 'Classic' })
    const rifle = await Weapon.findBy({ category: 'Rifles' })
    const shotgun = await Weapon.findBy({ category: 'Shotguns' })
    const sniper = await Weapon.findBy({ category: 'Sniper Rifles' })
    const smg = await Weapon.findBy({ category: 'SMGs' })
    const heavy = await Weapon.findBy({ category: 'Heavy Weapons' })

    //promo skins
    function randPromoItems() {
      let promo = []
      for (let i = 0; i < 5; ) {
        const skin = skins[Math.floor(Math.random() * skins.length)]
        if (promo.includes(skin)) {
          continue
        } else {
          promo.push(skin)
          i++
        }
      }
      return promo
    }

    function randPromoBundle() {
      let promo = []
      for (let i = 0; i < 20; ) {
        const bundle = bundles[Math.floor(Math.random() * bundles.length)]
        if (promo.includes(bundle)) {
          continue
        } else {
          promo.push(bundle)
          i++
        }
      }
      return promo
    }

    const currency = await db.from('currencies').where('currency_name', 'VALORANT POINTS').first()

    const lastPosted = await db
      .from('skins')
      .join('tiers', 'tiers.uuid', '=', 'skins.content_tier_uuid')
      .orderBy('skins.created_at', 'desc') // Order by creation date in descending order
      .limit(20)
    // Limit to the last 6 products

    return view.render('pages/home', {
      lastPosted,
      promo_bundles: randPromoBundle(),
      promo_skins: randPromoItems(),
      weapons,
      currency,
      pistol,
      rifle,
      shotgun,
      sniper,
      smg,
      heavy,
    })
  }
}
