import Skin from '#models/skin'
import Weapon from '#models/weapon'
import type { HttpContext } from '@adonisjs/core/http'

export default class WeaponsController {
  async get_weapons({ view }: HttpContext) {
    const data = await Weapon.all()
    return view.render('pages/weapons/category', { data })
  }

  async get_available_skins({ params, view }: HttpContext) {
    const data = await Skin.query().where('displayName', 'like', `%${params.category}%`)
    return view.render('pages/weapons/skins', { data, name: params.category })
  }

  async get_skin({ params, view }: HttpContext) {
    const data = await Skin.findBy({ skinUuid: params.skinUuid })
    return view.render('pages/weapons/skin', { data, name: params.category })
  }
}
