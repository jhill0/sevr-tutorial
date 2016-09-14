# 6. Consuming Data

---

We have now defined our data, described a way of storing the data, and have even
begun adding and managing the data via the CLI. Since we are building a blog,
we now need a way to present our data to an end user. We'll do this by creating
a simple site as a plugin for Sevr.


## Initial Setup
To start we'll first create a new directory structure for our blog front-end and
add express as a dependency.

```
$ mkdir web && mkdir web/templates && touch web/index.js
$ npm install --save express
```

Within the `index.js`, add the following code:

```javascript
'use strict'

const express = require('express')

module.exports = (sevr, _config) => {
	const app = express()

	app.get('/', (req, res) => { res.send('Welcome to the Sevr Blog!') })

	// Wait for the DB to be connected
	sevr.events.on('db-ready', () => {

		// Attach the web app to the sevr server
		sevr.server.use(app)
	})
}
```

We now need to register our plugin with Sevr. We can do this by calling
Sevr's `attach` method in our root `index.js`:

```javascript
const Sevr   = require('sevr')
const cli    = require('sevr-cli')
const config = require('./config')
const web    = require('./web')

const sevr = new Sevr(config)

sevr.attach(cli)

// Attach the frontend web plugin
sevr.attach(web)

sevr.connect()
	.then(() => {
		sevr.logger.verbose('Initialized database connection')
	})
	.catch(err => {
		sevr.logger.error(err)
	})

sevr.startServer()

module.exports = sevr
```

We can now run our application and test that the plugin initialized correctly
and attached to the Sevr server by running `npm start` and visiting
`http://localhost:3000/` in a browser. You should see message
'Welcome to the Sevr Blog!'

## Add Templates

Lets now create an HTML template to render our pages. Go ahead and create a new
file, `index.html.js`, and save it in the `templates` directory. Insert the
following code:

```html
module.exports = ({ site, posts }) => `
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title>${site.title}</title>
		<link rel="stylesheet" href="http://yui.yahooapis.com/pure/0.6.0/pure-min.css">
		<link rel="stylesheet" href="http://yui.yahooapis.com/pure/0.6.0/grids-responsive-min.css">
		<link rel="stylesheet" href="/css/layouts/blog.css">
	</head>
	<body>
		<div id="layout" class="pure-g">
			<div class="sidebar pure-u-1 pure-u-md-1-4">
				<div class="header">
					<h1 class="brand-title">${site.title}</h1>
					<h2 class="brand-tagline">A Tutorial</h2>
				</div>
			</div>

			<div class="content pure-u-1 pure-u-md-3-4">
				<div>
					<!-- A wrapper for all the blog posts -->
					<div class="posts">
						${posts.map(post => `
							<!-- A single blog post -->
							<section class="post">
								<header class="post-header">
									<h2 class="post-title">${post.title}</h2>
									<p class="post-meta">
										By <a href="/author/${post.author._id}" class="post-author">${post.author.name.full}</a> under
										${post.tags.map(tag => `
											<a class="post-category post-category-design" href="/tag/${tag._id}">${tag.title}</a>
										`).join('')}
									</p>
								</header>

								<div class="post-description">
									<p>${post.content}</p>
								</div>
							</section>
						`).join('')}
					</div>
				</div>
			</div>
		</div>
	</body>
</html>
`
```

Next we need to import the template file in our plugin file. Add the following
line:

```
const template = require('./templates/index.html')
```

## Add Routes

Lastly, we need to add a few routes to our plugin file in order render the pages:

```javascript
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
```

---

[< Previous - Use The CLI to Manage Data](5_cli.md) | [Next - Authentication & Roles](7_authentication_roles.md)
