import Tier from '#models/tier'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    const response = await fetch('https://valorant-api.com/v1/contenttiers')
    const { data } = await response.json()

    const tiers = data.map((t) => {
      return {
        uuid: t.uuid,
        tierNameEdition: t.displayName,
        tierName: t.devName,
        rank: t.rank,
        juiceValue: t.juiceValue,
        juiceCost: t.juiceCost,
        color: t.highlightColor,
        tierIcon: t.displayIcon,
      }
    })

    await Tier.createMany(tiers)
  }
}
