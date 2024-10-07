import User from '#models/user'
import { HttpContext } from '@adonisjs/core/http'

export default class UsersController {
  async create({ request, response }: HttpContext) {
    const { name, email, password } = request.only(['name', 'email', 'password'])
    await User.create({
      fullName: name,
      email: email,
      password: password,
    })
    return response.redirect().toRoute('login')
  }

  async signup({ view }: HttpContext) {
    return view.render('pages/users/signup')
  }

  async login({ view }: HttpContext) {
    return view.render('pages/users/signin')
  }

  async signin({ request, response, auth }: HttpContext) {
    const { email, password } = request.only(['email', 'password'])
    const user = await User.verifyCredentials(email, password)

    await auth.use('web').login(user)
    response.redirect().toRoute('dashboard')
  }

  async logout({ auth, response }: HttpContext) {
    await auth.use('web').logout()
    return response.redirect().toRoute('home')
  }

  async dashboard({ view, auth }: HttpContext) {
    await auth.authenticate()
    return view.render('pages/users/dashboard')
  }
}
