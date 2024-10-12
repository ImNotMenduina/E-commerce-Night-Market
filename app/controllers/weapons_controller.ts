import Skin from '#models/skin'
import Weapon from '#models/weapon'
import type { HttpContext } from '@adonisjs/core/http'
import db from '@adonisjs/lucid/services/db'
import Bundle from '#models/bundle'

export default class WeaponsController {
  async get_weapons({ view }: HttpContext) {
    const data = await Weapon.all()
    return view.render('pages/home', { data })
  }

  async get_available_skins({ params, view }: HttpContext) {
    const data = await db
      .from('weapons')
      .where('weapons.display_name', params.category)
      .join('skins', 'skins.uuid_weapon', '=', 'weapons.uuid')
    return view.render('pages/weapons/skins_catalogue', { data, name: params.category })
  }

  async get_skin({ params, view }: HttpContext) {
    const skin_chromas = await db
      .from('skins')
      .where('skins.uuid', params.uuid)
      .join('chromas', 'chromas.uuid_skin', '=', 'skins.uuid')

    const skin_name = skin_chromas[0].display_name.split(' ')
    const query_bundle = await Bundle.query().where('displayName', 'like', `%${skin_name}%`)

    let bgImage = ''
    if (query_bundle.length) {
      const objRand = Math.floor(Math.random() * query_bundle.length)
      bgImage = query_bundle[objRand].displayIcona
    }

    return view.render('pages/weapons/skin', { data: skin_chromas, bgImage })
  }
}
