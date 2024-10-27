import Card from '#models/card'
import User from '#models/user'
import UserFavorite from '#models/user_favorite'
import type { HttpContext } from '@adonisjs/core/http'
import db from '@adonisjs/lucid/services/db'
import { request } from 'http'

export default class UsersController {
  async create({ request, response }: HttpContext) {
    const { name, email, password } = request.only(['name', 'email', 'password'])
    const cards = await Card.query().where('displayName', 'like', '%Schema Card%')
    const ucard = cards[Math.floor(Math.random() * cards.length)]
    await User.create({
      fullName: name,
      email,
      password,
      smallArt: ucard.smallArt,
      wideArt: ucard.wideArt,
    })
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
}
