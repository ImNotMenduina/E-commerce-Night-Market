import Currency from '#models/currency'
import Skin from '#models/skin'
import type { HttpContext } from '@adonisjs/core/http'
import db from '@adonisjs/lucid/services/db'

export default class WeaponsController {
  async show_skins_by_category({ params, view, request }: HttpContext) {
    const category = params.category
    const page = request.input('page', 1)
    const limit = 10
    let skins

    if (category) {
      skins = await db
        .from('weapons')
        .where('weapons.weapon_name', category)
        .join('skins', 'skins.weapon_id', '=', 'weapons.id')
        .join('tiers', 'tiers.id', '=', 'skins.tier_id')
        .select(
          'skins.uuid',
          'skins.display_icon',
          'skins.skin_name',
          'tiers.tier_name_edition',
          'tiers.tier_name',
          'tiers.color',
          'tiers.tier_icon',
          'weapons.weapon_name'
        )
        .paginate(page, limit)

      skins.baseUrl(`search/product/skin/${category}`)
    } else {
      skins = await db
        .from('skins')
        .join('tiers', 'tiers.id', '=', 'skins.tier_id')
        .join('weapons', 'weapons.id', '=', 'skins.weapon_id')
        .select(
          'skins.uuid',
          'skins.display_icon',
          'skins.skin_name',
          'tiers.tier_name_edition',
          'tiers.tier_name',
          'tiers.color',
          'tiers.tier_icon'
        )
        .paginate(page, limit)
    }

    const currency = await db.from('currencies').where('currency_name', 'VALORANT POINTS').first()

    return view.render('pages/weapons/skin_showcase', { skins, currency })
  }

  async show_skins_by_name({ view, request }: HttpContext) {
    const { search } = request.only(['search'])
    const page = request.input('page', 1)
    const limit = 10
    let skins = []

    if (search && search.length > 2) {
      skins = await db
        .from('skins')
        .whereLike('skins.skin_name', `%${search}%`)
        .join('weapons', 'weapons.id', '=', 'skins.weapon_id')
        .join('tiers', 'tiers.id', '=', 'skins.tier_id')
        .select(
          'skins.uuid',
          'skins.display_icon',
          'skins.skin_name',
          'tiers.tier_name_edition',
          'tiers.tier_name',
          'tiers.color',
          'tiers.tier_icon',
          'weapons.weapon_name'
        )
        .paginate(page, limit)
    } else {
      skins = await db
        .from('skins')
        .join('weapons', 'weapons.id', '=', 'skins.weapon_id')
        .join('tiers', 'tiers.id', '=', 'skins.tier_id')
        .select(
          'skins.uuid',
          'skins.display_icon',
          'skins.skin_name',
          'tiers.tier_name_edition',
          'tiers.tier_name',
          'tiers.color',
          'tiers.tier_icon',
          'weapons.weapon_name'
        )
        .paginate(page, limit)
    }

    const currency = await db.from('currencies').where('currency_name', 'VALORANT POINTS').first()

    skins.baseUrl('search/product/skin')

    return view.render('pages/weapons/skin_showcase', { skins, currency })
  }

  async get_skin({ params, view, auth }: HttpContext) {
    //authenticate user
    await auth.check()
    let isFavorite = false
    //
    if (auth.isAuthenticated) {
      const userEmail = await auth.user!.$getAttribute('email')
      const favorite = await db
        .from('skins')
        .where('skins.uuid', params.skinUuid)
        .join('user_favorites', (query) => {
          query
            .on('user_favorites.skin_id', '=', 'skins.id')
            .andOnVal('user_favorites.email_user', '=', userEmail)
        })
      if (favorite.length) isFavorite = true
    }

    const skin = await Skin.findBy('uuid', params.skinUuid)

    if (skin) {
      await skin.load('weapon')
      await skin.load('chromas')
      await skin.load('levels')
      await skin.load('theme')
      await skin.load('tier')
      await skin.load('bundle')
    }

    const currency = await Currency.findBy('currencyName', 'VALORANT POINTS')

    return view.render('pages/weapons/skin', {
      skin,
      currency,
      isFavorite,
      bgImage: skin?.bundleId ? skin?.bundle.displayIcona : '',
    })
  }
}
