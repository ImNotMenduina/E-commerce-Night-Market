import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'

export default class UsersController {
  async create({ request, response }: HttpContext) {
    const { name, email, password } = request.only(['name', 'email', 'password'])
    await User.create({ fullName: name, email, password })
    return response.status(201).send({ message: 'User created successfully' })
  }

  async read({ params, response }: HttpContext) {
    const email = params.email
    const user = await User.findBy('email', email)
    if (!user) {
      return response.status(404).send({ message: 'User not found' })
    }
    return response.status(200).send(user)
  }
}
