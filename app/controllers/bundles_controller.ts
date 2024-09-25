import type { HttpContext } from '@adonisjs/core/http'

export default class BundlesController {

    async get_available_bundles( {view} : HttpContext ) {
        const response = await fetch('https://valorant-api.com/v1/bundles')
        const {data} = await response.json()
        return view.render('pages/bundles/bundles', {bundles : data})
    }

}