const Sevr      = require('sevr')
const SevrCli   = require('sevr-cli')
const SevrPerm  = require('sevr-perm') 
const WebServer = require('./web')   
const config    = require('./config')

/**
 * Application plugin class
 * 
 * All custom application intialization and logic
 * should happen within this class
 * 
 * @class App
 */
class App {
	constructor(sevr) {
		this.sevr = sevr
	}

	willRun() {
		this.sevr.logger.info('Enabling authentication...')
		return this.sevr.authentication.enable(this.sevr.collections.users)
	}

	run() {
		this.sevr.startServer()
		this.sevr.logger.verbose('Application running...')
	}
}

// Create a new Sevr instance
const sevr = new Sevr(config)

// Attach the remote CLI plugin
sevr.attach(SevrCli)

// Attach the web server
sevr.attach(WebServer)

// Attach the permissions plugin
sevr.attach(SevrPerm, config.permissions)

// Attach the application plugin
sevr.attach(App)

sevr.start()

module.exports = sevr
