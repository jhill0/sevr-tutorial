const Ichabod = require('ichabod-core')
const cli     = require('ichabod-cli')
const perm    = require('ichabod-perm')

const config  = require('./config')
const web     = require('./web')

const ichabod = new Ichabod(config)

ichabod.attach(cli)

// Attach the frontend web plugin
ichabod.attach(web)

// Attach the permissions plugin
ichabod.attach(perm, config.permissions)

ichabod.connect()
	.then(() => {
		ichabod.logger.verbose('Initialized database connection')
		ichabod.logger.verbose('Enabling authentication...')

		// Enable authentication with the `users` collection
		ichabod.authentication.enable(ichabod.collections.users)
	})
	.catch(err => {
		ichabod.logger.error(err.stack)
	})

ichabod.startServer()

module.exports = ichabod
