'use strict'

const express  = require('express')
const template = require('./templates/index.html')

module.exports = (sevr, _config) => {
	const app = express()

	app.use(express.static(__dirname + '/static'))

	// Home route
	app.get('/', (req, res) => {
		sevr.collections.posts.read(null, null, true)
			.then(posts => {
				res.send(template({
					site: { title: 'Sevr Blog' },
					posts
				}))
			})
	})

	// Tag route
	app.get('/tag/:id', (req, res) => {
		sevr.collections.posts.read({ tags: req.params.id }, null, true)
			.then(posts => {
				res.send(template({
					site: { title: 'Sevr Blog' },
					posts
				}))
			})
			.catch(res.send)
	})

	// Author route
	app.get('/author/:id', (req, res) => {
		sevr.collections.posts.read({ author: req.params.id }, null, true)
			.then(posts => {
				res.send(template({
					site: { title: 'Sevr Blog' },
					posts
				}))
			})
			.catch(res.send)
	})

	// Wait for the DB to be connected
	sevr.events.on('db-ready', () => {

		// Attach the web app to the sevr server
		sevr.server.use(app)
	})
}
