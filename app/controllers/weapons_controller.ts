import UserFavorite from '#models/user_favorite'
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

  async get_skin({ params, view, auth }: HttpContext) {
    //authenticate user
    await auth.authenticate()
    let isFavorite = false
    //
    if (auth.isAuthenticated) {
      const userEmail = await auth.user!.$getAttribute('email')
      const favorite = await db
        .from('user_favorites')
        .where('user_favorites.uuid_skin', params.uuid)
        .andWhere('user_favorites.email_user', userEmail)
      if (favorite.length) isFavorite = true
    }

    const skin = await db
      .from('skins')
      .where('skins.uuid', params.uuid)
      .join('themes', 'themes.uuid', '=', 'skins.theme_uuid')
      .join('weapons', 'weapons.uuid', '=', 'skins.uuid_weapon')
      .join('tiers', 'tiers.uuid', '=', 'skins.content_tier_uuid')
      .select('skins.uuid as uuid')
      .select('tiers.tier_icon')
      .select('theme_name')
      .select('weapon_name')
      .select('skins.display_icon')
      .select('wallpaper')
      .first()

    const skin_chromas = await db
      .from('skins')
      .where('skins.uuid', params.uuid)
      .join('chromas', 'chromas.uuid_skin', '=', 'skins.uuid')
      .select('full_render')
      .select('swatch')
      .select('chroma_video')

    const skin_levels = await db
      .from('skins')
      .where('skins.uuid', params.uuid)
      .join('levels', 'levels.uuid_skin', '=', 'skins.uuid')

    const skin_bundle = await db
      .from('skins')
      .where('skins.uuid', params.uuid)
      .join('bundles', 'bundles.uuid', '=', 'skins.uuid_bundle')

    const currency = await db.from('currencies').where('currency_name', 'VALORANT POINTS')

    return view.render('pages/weapons/skin', {
      skin,
      currency,
      isFavorite,
      chromas: skin_chromas,
      levels: skin_levels,
      bundle: skin_bundle,
      bgImage: skin_bundle.length ? skin_bundle[0].display_icona : '',
    })
  }
}
