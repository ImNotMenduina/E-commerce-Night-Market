import Currency from '#models/currency'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    const response = await fetch('https://valorant-api.com/v1/currencies')
    const { data } = await response.json()

    const currencies = data.map((c) => {
      return {
        uuid: c.uuid,
        currencyName: c.displayName,
        currencyIcon: c.displayIcon,
      }
    })

    await Currency.createMany(currencies)
  }
}
