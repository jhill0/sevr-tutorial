'use strict'

const express  = require('express')
const template = require('./templates/index.html')

class WebServer {
	constructor(sevr) {
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

		this.sevr = sevr
		this.app = app
	}

	willRun() {
		this.sevr.server.use(this.app)
	}
}

module.exports = WebServer