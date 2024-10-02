import Weapon from '#models/weapon'
import type { HttpContext } from '@adonisjs/core/http'

export default class WeaponsController {
  async get_weapons({ view }: HttpContext) {
    const data = await Weapon.all()
    return view.render('pages/weapons/category', { data })
  }

  async get_available_skins({ params, view }: HttpContext) {
    const response = await fetch('https://valorant-api.com/v1/weapons/skins')
    const { data } = await response.json()

    // pre-processing skins //
    const skins = data.filter(
      (item) =>
        item.displayName.includes(params.category) &&
        item.displayIcon != null &&
        !item.displayName.includes('Standard')
    )
    // return all weapon skins //
    return view.render('pages/weapons/skins', { value: skins, name: params.category })
  }

  async get_skin({ params, view }: HttpContext) {
    const response = await fetch(`https://valorant-api.com/v1/weapons/skins/${params.skinUuid}`)
    const { data } = await response.json()
    return view.render('pages/weapons/skin', { name: params.category, skin: data })
  }
}
