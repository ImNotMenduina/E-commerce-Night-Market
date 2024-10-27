import Card from '#models/card'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    const response = await fetch('https://valorant-api.com/v1/playercards')
    const { data } = await response.json()

    const cards = data.map((c) => {
      return {
        uuid: c.uuid,
        displayName: c.displayName,
        themeUuid: c.themeUuid,
        displayIcon: c.displayIcon,
        smallArt: c.smallArt,
        wideArt: c.wideArt,
        largeArt: c.lageArt,
      }
    })

    await Card.createMany(cards)
  }
}
