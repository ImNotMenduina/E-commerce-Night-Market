import { BaseSeeder } from '@adonisjs/lucid/seeders'
import app from '@adonisjs/core/services/app'

export default class IndexSeeder extends BaseSeeder {
  private async seed(Seeder: { default: typeof BaseSeeder }) {
    /**
     * Do not run when not in a environment specified in Seeder
     */
    // if (
    //   !Seeder.default.environment ||
    //   (!Seeder.default.environment.includes('development') && app.inDev) ||
    //   (!Seeder.default.environment.includes('testing') && app.inTest) ||
    //   (!Seeder.default.environment.includes('production') && app.inProduction)
    // ) {
    //   return
    // }
    await new Seeder.default(this.client).run()
  }

  async run() {
    await this.seed(await import('#database/seeders/weapon_seeder'))
    await this.seed(await import('#database/seeders/tier_seeder'))
    await this.seed(await import('#database/seeders/bundle_seeder'))
    await this.seed(await import('#database/seeders/theme_seeder'))
    await this.seed(await import('#database/seeders/skin_seeder'))
    await this.seed(await import('#database/seeders/chroma_seeder'))
    await this.seed(await import('#database/seeders/level_seeder'))
    await this.seed(await import('#database/seeders/currency_seeder'))
    await this.seed(await import('#database/seeders/card_seeder'))
  }
}
