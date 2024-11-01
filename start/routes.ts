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

const SessionsController = () => import('#controllers/session_controller')
const UsersController = () => import('#controllers/users_controller')
const WeaponsController = () => import('#controllers/weapons_controller')
const IndexController = () => import('#controllers/index_controller')
//const BundlesController = () => import('#controllers/bundles_controller')

router.get('/', [IndexController, 'index']).as('home')

router
  .group(() => {
    router.get('/product/skin', [WeaponsController, 'show_skins_by_name']).as('search.skin')
    router
      .get('/product/skin/:category?', [WeaponsController, 'show_skins_by_category'])
      .as('search.category')
  })
  .prefix('search')

router
  .group(() => {
    router.get('/skin/:skinUuid', [WeaponsController, 'get_skin']).as('skin')
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

    router.post('/favorite/like/:skinId/:email', [UsersController, 'like']).as('user.like')
    router.post('/favorite/dislike/:skinId/:email', [UsersController, 'dislike']).as('user.dislike')
    router
      .get('/favorite/:email', [UsersController, 'favorite'])
      .as('user.favorite')
      .use(middleware.auth())
  })
  .prefix('/user')

router
  .group(() => {
    router.post('/login', [SessionsController, 'store']).as('session.login')
    router.post('/logout', [SessionsController, 'logout']).as('session.logout')
  })
  .prefix('session')
//router.get('/bundles', [BundlesController, 'get_available_bundles']).as('bundles')
