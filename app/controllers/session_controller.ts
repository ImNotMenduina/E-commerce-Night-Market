import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'

export default class SessionController {
  async store({ request, auth, response }: HttpContext) {
    const { email, password } = request.only(['email', 'password'])
    const user = await User.verifyCredentials(email, password)
    await auth.use('web').login(user)
    response.status(200).send(user)
  }

  async logout({ auth, response }: HttpContext) {
    await auth.use('web').logout()
    return response.status(200).send({ message: 'deslogado' })
  }
}
