/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { group } from 'console'

const WeaponsController = () =>  import('#controllers/weapons_controller')
const BundlesController = () => import('#controllers/bundles_controller')

router.on('/').render('pages/home')

router.get('/weapons', [WeaponsController,'get_weapons'])
router.get('/weapons/:category', [WeaponsController, 'get_available_skins']).as('category')

router.get('/bundles', [BundlesController, 'get_available_bundles']).as('bundles')