import edge from 'edge.js'
import env from '#start/env'
import { edgeIconify, addCollection } from 'edge-iconify'
import { icons as heroIcons } from '@iconify-json/heroicons'
import { icons as heroIconSolid } from '@iconify-json/heroicons-solid'
/**
 * Register a plugin
 */
edge.use(edgeIconify)
addCollection(heroIcons)
addCollection(heroIconSolid)
/**
 * Define a global property
 */
edge.global('appUrl', env.get('APP_URL'))
