import type { HttpContext } from '@adonisjs/core/http'
import Weapon from '#models/weapon'
import db from '@adonisjs/lucid/services/db'
import Bundle from '#models/bundle'

export default class IndicesController {
  async index({ view }: HttpContext) {
    const data = await Weapon.all()
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
      for (let i = 0; i < 5; ) {
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

    return view.render('pages/home', {
      promo_bundles: randPromoBundle(),
      promo_skins: randPromoItems(),
      data,
      currency,
    })
  }
}
