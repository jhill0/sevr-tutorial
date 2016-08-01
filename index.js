const Ichabod = require('ichabod-core')
const cli     = require('ichabod-cli')
const config  = require('./config')
const web     = require('./web')

const ichabod = new Ichabod(config)

ichabod.attach(cli)

// Attach the frontend web plugin
ichabod.attach(web)

ichabod.connect()
	.then(() => {
		ichabod.logger.verbose('Initialized database connection')
	})
	.catch(err => {
		ichabod.logger.error(err)
	})

ichabod.startServer()

module.exports = ichabod
