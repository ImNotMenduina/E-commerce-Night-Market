import edge from 'edge.js'
import env from '#start/env'
import { edgeIconify, addCollection } from 'edge-iconify'
import { icons as heroIcons } from '@iconify-json/heroicons'
/**
 * Register a plugin
 */
edge.use(edgeIconify)
addCollection(heroIcons)
/**
 * Define a global property
 */
edge.global('appUrl', env.get('APP_URL'))
