import User from '#models/user'
import UserFavorite from '#models/user_favorite'
import type { HttpContext } from '@adonisjs/core/http'
import db from '@adonisjs/lucid/services/db'

export default class UsersController {
  async create({ request, response }: HttpContext) {
    const { name, email, password } = request.only(['name', 'email', 'password'])
    await User.create({ fullName: name, email, password })
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

  async favorite({ view, params }: HttpContext) {
    const favorites = await db
      .from('user_favorites')
      .where('email_user', params.email)
      .join('skins', 'skins.uuid', '=', 'user_favorites.uuid_skin')
    return view.render('pages/users/favorite', { favorites })
  }
}
