/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

const WeaponsController = () => import('#controllers/weapons_controller')
const UsersController = () => import('#controllers/users_controller')
//const BundlesController = () => import('#controllers/bundles_controller')

router.get('/', [WeaponsController, 'get_weapons']).as('home')

router
  .group(() => {
    router.get('/:category', [WeaponsController, 'get_available_skins']).as('category')
    router.get('/skin/:skinUuid', [WeaponsController, 'get_skin']).as('skin')
  })
  .prefix('/weapon')

router

  .group(() => {
    router.post('/', [UsersController, 'create']).as('create')
    router.post('/signin', [UsersController, 'signin']).as('signin')
    router.post('/logout', [UsersController, 'logout']).as('logout').use(middleware.auth())
    router.get('/login', [UsersController, 'login']).as('login')
    router.get('/signup', [UsersController, 'signup']).as('signup')
    router.get('/dashboard', [UsersController, 'dashboard']).as('dashboard').use(middleware.auth())
  })
  .prefix('users')
//router.get('/bundles', [BundlesController, 'get_available_bundles']).as('bundles')
