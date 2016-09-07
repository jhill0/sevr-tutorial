module.exports = {
	connection: {
		database: 'ichabod-tutorial'
	},
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
