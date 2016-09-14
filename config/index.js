module.exports = {
	connection: {
		database: 'sevr-tutorial'
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
