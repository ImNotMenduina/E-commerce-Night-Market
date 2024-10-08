/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'

const UsersController = () => import('#controllers/users_controller')
const WeaponsController = () => import('#controllers/weapons_controller')
//const BundlesController = () => import('#controllers/bundles_controller')

router.get('/', [WeaponsController, 'get_weapons']).as('home')

router
  .group(() => {
    router.get('/:category', [WeaponsController, 'get_available_skins']).as('category')
    router.get('/skin/:skinUuid', [WeaponsController, 'get_skin']).as('skin')
  })
  .prefix('/weapon')

//CRUD
router
  .group(() => {
    router.post('/signup', [UsersController, 'create']).as('user.create')
    router.get('/find/:email', [UsersController, 'read']).as('user.read')
    //router.patch('/edit', []).as('user.update')
    //router.delete('/remove', []).as('user.delete')
  })
  .prefix('/user')

//router.get('/bundles', [BundlesController, 'get_available_bundles']).as('bundles')
