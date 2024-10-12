/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'

const SessionsController = () => import('#controllers/session_controller')
const UsersController = () => import('#controllers/users_controller')
const WeaponsController = () => import('#controllers/weapons_controller')
//const BundlesController = () => import('#controllers/bundles_controller')

router.get('/', [WeaponsController, 'get_weapons']).as('home')

router
  .group(() => {
    router.get('/:category', [WeaponsController, 'get_available_skins']).as('category')
    router.get('/skin/:uuid', [WeaponsController, 'get_skin']).as('skin')
  })
  .prefix('/weapon')

//CRUD
router
  .group(() => {
    router.post('/signup', [UsersController, 'create']).as('user.create')
    router.get('/find/:email', [UsersController, 'read']).as('user.read')
    router.patch('/edit', [UsersController, 'update']).as('user.update')
    router.delete('/remove', [UsersController, 'destroy']).as('user.destroy')

    router.get('/signup', [UsersController, 'signup']).as('user.signup')
    router.get('/signin', [UsersController, 'signin']).as('user.signin')
  })
  .prefix('/user')

router
  .group(() => {
    router.post('/login', [SessionsController, 'store']).as('session.login')
    router.post('/logout', [SessionsController, 'logout']).as('session.logout')
  })
  .prefix('session')

//router.get('/bundles', [BundlesController, 'get_available_bundles']).as('bundles')
