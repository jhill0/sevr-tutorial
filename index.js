const Sevr = require('sevr')
const cli  = require('sevr-cli')
const perm = require('sevr-perm')

const config  = require('./config')
const web     = require('./web')

const sevr = new Sevr(config)

sevr.attach(cli)

// Attach the frontend web plugin
sevr.attach(web)

// Attach the permissions plugin
sevr.attach(perm, config.permissions)

sevr.connect()
	.then(() => {
		sevr.logger.verbose('Initialized database connection')
		sevr.logger.verbose('Enabling authentication...')

		// Enable authentication with the `users` collection
		sevr.authentication.enable(sevr.collections.users)
	})
	.catch(err => {
		sevr.logger.error(err.stack)
	})

sevr.startServer()

module.exports = sevr
