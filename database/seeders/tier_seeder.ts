import Tier from '#models/tier'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    const response = await fetch('https://valorant-api.com/v1/contenttiers')
    const { data } = await response.json()

    function setColor(name) {
      if (name === 'Select Edition') return '#5a9fe2'
      if (name === 'Exclusive Edition') return '#f5955b'
      if (name === 'Deluxe Edition') return '#009587'
      if (name === 'Premium Edition') return '#d1548d'
      if (name === 'Ultra Edition') return '#fad663'
    }

    const tiers = data.map((t) => {
      return {
        uuid: t.uuid,
        tierNameEdition: t.displayName,
        tierName: t.devName,
        rank: t.rank,
        juiceValue: t.juiceValue,
        juiceCost: t.juiceCost,
        color: setColor(t.displayName),
        tierIcon: t.displayIcon,
      }
    })

    await Tier.createMany(tiers)
  }
}
