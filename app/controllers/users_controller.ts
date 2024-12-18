import Card from '#models/card'
import User from '#models/user'
import UserFavorite from '#models/user_favorite'
import UserPromotion from '#models/user_promotion'
import type { HttpContext } from '@adonisjs/core/http'
import db from '@adonisjs/lucid/services/db'
import { userInfo } from 'os'

export default class UsersController {
  async create({ request, response }: HttpContext) {
    const { name, email, password } = request.only(['name', 'email', 'password'])
    //CAR E BANNER
    const cards = await Card.query().where('displayName', 'like', '%Schema Card%')
    const ucard = cards[Math.floor(Math.random() * cards.length)]

    //SKINS PROMOTIONS
    const skins = await db
      .from('skins')
      .join('tiers', 'tiers.id', '=', 'skins.tier_id')
      .join('weapons', 'weapons.id', '=', 'skins.weapon_id')
      .select('skins.uuid as uuid')
      .select('skins.id as id')
      .select('skins.skin_name')
      .select('skins.price')
      .select('tiers.tier_icon')
      .select('tiers.color')
      .select('tiers.tier_name')
      .select('skins.display_icon')
      .select('weapons.weapon_name')

    //promo skins
    function randPromoItems() {
      let promo = []
      for (let i = 0; i < 5; ) {
        const skin = skins[Math.floor(Math.random() * skins.length)]
        if (promo.includes(skin)) {
          continue
        } else {
          promo.push(skin)
          i++
        }
      }
      return promo
    }

    await User.create({
      fullName: name,
      email,
      password,
      smallArt: ucard.smallArt,
      wideArt: ucard.wideArt,
    })

    const promo = randPromoItems()

    const discount = [10, 20, 25, 37, 50]

    function randDiscount() {
      return discount[Math.floor(Math.random() * discount.length)]
    }

    for (let i = 0; i < 5; i++) {
      let discount = randDiscount()
      let finalPrice = Math.floor((1 - discount / 100) * promo[i].price)
      await UserPromotion.create({
        userEmail: email,
        skinId: promo[i].id,
        flipped: 0,
        discount: randDiscount(),
        price: finalPrice,
      })
    }

    return response.redirect().toRoute('home')
  }

  async read({ params, response }: HttpContext) {
    const email = params.email
    const user = await User.findBy('email', email)
    if (!user) {
      return response.status(404).send({ message: 'User not found' })
    }
    return response.status(200).send(user)
  }

  async update({ response, request }: HttpContext) {
    const { name, email } = request.only(['name', 'email'])
    const user = await User.findByOrFail(email)
    if (!user) {
      return response.status(404).send({ message: 'User not found' })
    }
    // att name
    user.fullName = name
    await user.save()
    return response.status(200).send({ message: 'User updated successfully' })
  }

  async destroy({ response, request }: HttpContext) {
    const { email } = request.only(['email'])
    const user = await User.findOrFail(email)
    if (!user) {
      return response.status(404).send({ message: 'User not found' })
    }
    await user.delete()
    return response.redirect().toRoute('home')
  }

  async signup({ view }: HttpContext) {
    return view.render('pages/signup')
  }

  async signin({ view }: HttpContext) {
    return view.render('pages/signin')
  }

  async like({ params }: HttpContext) {
    await UserFavorite.create({
      emailUser: params.email,
      skinId: params.skinId,
    })
  }

  async dislike({ params }: HttpContext) {
    await db
      .from('user_favorites')
      .where('skin_id', params.skinId)
      .where('email_user', params.email)
      .delete()
  }

  async favorite({ view, request }: HttpContext) {
    const { email } = request.only(['email'])
    const favorites = await db
      .from('user_favorites')
      .where('email_user', email)
      .join('skins', 'skins.id', '=', 'user_favorites.skin_id')
      .join('tiers', 'tiers.id', '=', 'skins.tier_id')
      .select(
        'skins.id',
        'skins.uuid',
        'skins.display_icon',
        'skins.skin_name',
        'tiers.tier_name_edition',
        'tiers.tier_name',
        'tiers.color',
        'tiers.tier_icon'
      )
    return view.render('pages/users/favorite', { favorites })
  }

  async flip_discount({ request }: HttpContext) {
    const { email, skin_id } = request.only(['email', 'skin_id'])

    // Buscando o registro específico
    await db
      .from('user_promotions')
      .where('user_email', email)
      .where('skin_id', skin_id)
      .update({ flipped: 1 })
  }
}
