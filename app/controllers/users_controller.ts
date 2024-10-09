import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'
import { messages } from '@vinejs/vine/defaults'

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
    return response.status(200).send({ message: 'User deleted successfully' })
  }
}
