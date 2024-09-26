import type { HttpContext } from '@adonisjs/core/http'

export default class WeaponsController {

    async get_weapons( {view} : HttpContext) {
        const response = await fetch("https://valorant-api.com/v1/weapons")
        const data = await response.json()
        return view.render('pages/weapons/category', {value : data})
    }

    async get_available_skins( {params, view} : HttpContext ) {
        const response = await fetch("https://valorant-api.com/v1/weapons/skins")
        const {data} = await response.json()
        const skins = []

        for(const category_skin of data) {
            if (category_skin.displayName.includes(params.category)) {
                skins.push(category_skin)
            }
        }
        // return all weapon skins
        return view.render('pages/weapons/skins', {value : skins, name : params.category})
    }
}