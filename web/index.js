'use strict'

const express  = require('express')
const template = require('./templates/index.html')

module.exports = (ichabod, _config) => {
	const app = express()

	app.use(express.static(__dirname + '/static'))

	// Home route
	app.get('/', (req, res) => {
		ichabod.collections.posts.read(null, null, true)
			.then(posts => {
				res.send(template({
					site: { title: 'Ichabod Blog' },
					posts
				}))
			})
	})

	// Tag route
	app.get('/tag/:id', (req, res) => {
		ichabod.collections.posts.read({ tags: req.params.id }, null, true)
			.then(posts => {
				res.send(template({
					site: { title: 'Ichabod Blog' },
					posts
				}))
			})
			.catch(res.send)
	})

	// Author route
	app.get('/author/:id', (req, res) => {
		ichabod.collections.posts.read({ author: req.params.id }, null, true)
			.then(posts => {
				res.send(template({
					site: { title: 'Ichabod Blog' },
					posts
				}))
			})
			.catch(res.send)
	})

	// Wait for the DB to be connected
	ichabod.events.on('db-ready', () => {
		
		// Attach the web app to the ichabod server
		ichabod.server.use(app)
	})
}