import Chroma from '#models/chroma'
import Skin from '#models/skin'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    const response = await fetch('https://valorant-api.com/v1/weapons/skinchromas')
    const { data } = await response.json()

    const skins = await Skin.all()

    function findSkinUuid(name) {
      for (const s of skins) {
        if (name.includes(s.skinName)) {
          return s.uuid
        }
      }
      return null
    }

    const chromas = data.map((c) => {
      return {
        uuid: c.uuid,
        chromaName: c.displayName,
        displayIcon: c.displayIcon,
        fullRender: c.fullRender,
        swatch: c.swatch,
        chromaVideo: c.streamedVideo,
        uuidSkin: findSkinUuid(c.displayName),
      }
    })

    await Chroma.createMany(chromas)
  }
}
