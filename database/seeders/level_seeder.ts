import Level from '#models/level'
import Skin from '#models/skin'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    const response = await fetch('https://valorant-api.com/v1/weapons/skinlevels')
    const { data } = await response.json()

    const skins = await Skin.all()

    function findSkinId(name) {
      for (const s of skins) {
        if (name.includes(s.skinName)) {
          return s.id
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
        skinId: findSkinId(l.displayName),
      }
    })

    const level_filter = levels.filter((lv) => {
      lv.skinId === -1 &&
        !lv.levelName.includes('Melee') &&
        !lv.levelName.includes('Random') &&
        !lv.levelName.includes('Standard')
    })
    await Level.createMany(level_filter)
  }
}
