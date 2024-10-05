import Skin from '#models/skin'
import Weapon from '#models/weapon'
import type { HttpContext } from '@adonisjs/core/http'
import db from '@adonisjs/lucid/services/db'

export default class WeaponsController {
  async get_weapons({ view }: HttpContext) {
    const data = await Weapon.all()
    const skinsData = await Skin.all()

    // generate rondom keys for skin advisor
    async function generateRandomAdvisor(skins) {
      const randomKeys = Array.from({ length: 4 }, () => Math.floor(Math.random() * skins.length))
      const skinsAd = []

      for (const key of randomKeys) {
        const skin = await Skin.find(key)
        skinsAd.push(skin)
      }

      return skinsAd
    }

    const skinsAdvisor = await generateRandomAdvisor(skinsData)

    return view.render('pages/home', { data, skinsAdvisor })
  }

  async get_available_skins({ params, view }: HttpContext) {
    const data = await Skin.query().where('displayName', 'like', `%${params.category}%`)
    return view.render('pages/weapons/skins', { data, name: params.category })
  }

  async get_skin({ params, view }: HttpContext) {
    const data = await Skin.findBy({ skinUuid: params.skinUuid })

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

    const query_levels = await db
      .from('skins')
      .join('levels', (qr) => {
        qr.on('skins.display_name', '=', 'levels.display_name').andOnVal(
          'levels.display_name',
          '=',
          `${data?.displayName}`
        )
      })
      .select('levels.streamed_video')

    return view.render('pages/weapons/skin', { data: query_skins, levels: query_levels })
  }
}
