# 7. Authentication & Roles

---

For our blog, we are going to need to restrict access to the data. For instance,
we do not want the end user access to modify the data, only view it. This is
commonly achieved by installing an authentication mechanism. Sevr, provides
username/password and JWT authentication strategies out of the box, but also
provides the basic building blocks for implementing your own authentication
strategies.


## Enabling Authentication

Authentication is disabled by default to enable quick development, but enabling
it is really easy. To do so, simply pass the collection that will be used for
validating credentials to the `sevr.authentication.enable` method. For our
purposes, we'll use the `users` collection.

**Note**: The authentication collection, must have `username` and `password`
fields.

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
		sevr.logger.verbose('Enabling authentication...')

		// Enable authentication with the `users` collection
		sevr.authentication.enable(sevr.collections.users)
	})
	.catch(err => {
		sevr.logger.error(err)
	})

sevr.startServer()

module.exports = sevr
```

## Adding Roles & Permissions

In addition to authentication, we'll add specific user roles and permissions to
further restrict access. To do so, we need to add a new plugin, `sevr-perm`,
which adds operation-level permission support to individual collections.

```
npm install --save sevr-perm
```

Let's start by defining our user roles. To do so, we'll modify our config.

```javascript
module.exports = {
	permissions: {
		roles: {
			admin: {
				'_': '*'
			},
			author: {
				users: 'r',
				posts: '*',
				tags: '*'
			},
			'_': {
				'_': 'r'
			}
		}
	}
}
```

With this configuration, 'admin' users have all permissions to all collections.
`'_'` means "default," and is used to assign permissions to any collections that
are not explicitly defined. 'authors' have all permissions to `posts` and
`tags`, but only read access to the `users` collection. Finally, for any user
with a role that is not defined here—or no role whatsoever—they are given read
permissions on all collections.

Now that we have our roles defined, we can enable them and attach them to the
authentication collection.

```javascript
const Sevr   = require('sevr')
const cli    = require('sevr-cli')
const perm   = require('sevr-perm')
const config = require('./config')
const web    = require('./web')

const sevr = new Sevr(config)

sevr.attach(cli)

// Attach the frontend web plugin
sevr.attach(web)

// Attach the permissions plugin
sevr.attach(perm, config.permissions)
...
```

That's it! We are now able to tightly control access to the blog's data through
authentication and roles.

---

[< Previous - Consuming Data](6_consuming_data.md) | [Next - Adding a RESTful Interface](8_sevr_rest.md)
