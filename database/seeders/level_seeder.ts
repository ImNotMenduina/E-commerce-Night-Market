import Level from '#models/level'
import Skin from '#models/skin'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    const response = await fetch('https://valorant-api.com/v1/weapons/skinlevels')
    const { data } = await response.json()

    const skins = await Skin.all()

    function findSkinUuid(name) {
      for (const s of skins) {
        if (name.includes(s.displayName)) {
          return s.uuid
        }
      }
      return -1
    }

    const levels = data.map((l) => {
      return {
        uuid: l.uuid,
        levelName: l.displayName,
        levelVideo: l.streamedVideo,
        levelItem: l.levelItem,
        uuidSkin: findSkinUuid(l.displayName),
      }
    })

    await Level.createMany(levels)
  }
}
