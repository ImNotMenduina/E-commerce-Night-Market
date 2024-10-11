import Skin from '#models/skin'
import Weapon from '#models/weapon'
import type { HttpContext } from '@adonisjs/core/http'
import db from '@adonisjs/lucid/services/db'
import Bundle from '#models/bundle'

export default class WeaponsController {
  async get_weapons({ view }: HttpContext) {
    const data = await Weapon.all()
    const skinsData = await Skin.all()

    return view.render('pages/home', { data })
  }

  async get_available_skins({ params, view }: HttpContext) {
    const data = await Skin.query().where('displayName', 'like', `%${params.category}%`)
    return view.render('pages/weapons/skins_catalogue', { data, name: params.category })
  }

  async get_skin({ params, view }: HttpContext) {
    const data = await Skin.findBy({ skinUuid: params.skinUuid })

    const skin_name = data.displayName.split(' ')

    const query_bundle = await Bundle.query().where('displayName', 'like', `%${skin_name[0]}%`)

    const query_skins = await db
      .from('skins')
      .join('chromas', (qr) => {
        qr.on('skins.display_name', '=', 'chromas.display_name').andOnVal(
          'chromas.display_name',
          '=',
          `${data?.displayName}`
        )
      })
      .select('skins.display_name')
      .select('skins.display_icon')
      .select('chromas.full_render')
      .select('chromas.swatch')
      .select('chromas.id')
      .select('chromas.chroma_video')

    let bgImage = ''
    if (query_bundle.length) {
      const objRand = Math.floor(Math.random() * query_bundle.length)
      bgImage = query_bundle[objRand].displayIcona
    }

    return view.render('pages/weapons/skin', { data: query_skins, bgImage })
  }
}
