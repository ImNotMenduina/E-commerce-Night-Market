import { Edge } from 'edge.js'
import { edgeIconify, addCollection } from 'edge-iconify'
import { icons as heroIcons } from '@iconify-json/heroicons'
import env from '#start/env'
/**
 * Add heroIcons collection
 */
addCollection(heroIcons)
const edge = Edge.create()

/**
 * Register the plugin
 */
edge.use(edgeIconify)
edge.global('appUrl', env.get('APP_URL'))
