import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Bundle from '#models/bundle'

export default class extends BaseSeeder {
  async run() {
    const response = await fetch('https://valorant-api.com/v1/bundles')
    const { data } = await response.json()

    const bundles = data.map((b) => {
      return {
        uuid: b.uuid,
        displayName: b.displayName,
        displayIcona: b.displayIcon,
        displayIconb: b.displayIcon2,
        verticalPromoImage: b.verticalPromoImage,
      }
    })

    await Bundle.createMany(bundles)
  }
}
