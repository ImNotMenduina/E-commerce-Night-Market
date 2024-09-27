/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'

const WeaponsController = () => import('#controllers/weapons_controller')
//const BundlesController = () => import('#controllers/bundles_controller')

router.on('/').render('pages/home')

router
  .group(() => {
    router.get('/', [WeaponsController, 'get_weapons']).as('home')
    router.get('/:category', [WeaponsController, 'get_available_skins']).as('category')
    router.get('/:category/skin/:skinUuid', [WeaponsController, 'get_skin']).as('skin')
  })
  .prefix('/weapon')

//router.get('/bundles', [BundlesController, 'get_available_bundles']).as('bundles')
