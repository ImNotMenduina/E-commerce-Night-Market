import Weapon from '#models/weapon'
import type { HttpContext } from '@adonisjs/core/http'
import db from '@adonisjs/lucid/services/db'

export default class WeaponsController {
  async get_weapons({ view }: HttpContext) {
    const data = await Weapon.all()
    return view.render('pages/home', { data })
  }

  async get_available_skins({ params, view }: HttpContext) {
    const data = await db
      .from('weapons')
      .where('weapons.weapon_name', params.category)
      .join('skins', 'skins.uuid_weapon', '=', 'weapons.uuid')
    return view.render('pages/weapons/skins_catalogue', { data, name: params.category })
  }

  async get_skin({ params, view }: HttpContext) {
    const skin = await db
      .from('skins')
      .where('skins.uuid', params.uuid)
      .join('themes', 'themes.uuid', '=', 'skins.theme_uuid')
      .join('weapons', 'weapons.uuid', '=', 'skins.uuid_weapon')
      .join('tiers', 'tiers.uuid', '=', 'skins.content_tier_uuid')

    const skin_chromas = await db
      .from('skins')
      .where('skins.uuid', params.uuid)
      .join('chromas', 'chromas.uuid_skin', '=', 'skins.uuid')

    const skin_levels = await db
      .from('skins')
      .where('skins.uuid', params.uuid)
      .join('levels', 'levels.uuid_skin', '=', 'skins.uuid')

    const skin_bundle = await db
      .from('skins')
      .where('skins.uuid', params.uuid)
      .join('bundles', 'bundles.uuid', '=', 'skins.uuid_bundle')

    return view.render('pages/weapons/skin', {
      skin,
      chromas: skin_chromas,
      levels: skin_levels,
      bundle: skin_bundle,
      bgImage: skin_bundle.length ? skin_bundle[0].display_icona : '',
    })
  }
}
