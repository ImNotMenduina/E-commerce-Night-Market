import Skin from '#models/skin'
import Weapon from '#models/weapon'
import type { HttpContext } from '@adonisjs/core/http'

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
    return view.render('pages/weapons/skin', { data })
  }
}
