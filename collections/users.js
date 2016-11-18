module.exports = Types => ({
	singular: 'User',
	fields: {
		name: {
			label: 'Name',
			schemaType: {
				first: Types.String({
					required: true,
					label: 'First'
				}),
				last: Types.String({
					required: true,
					label: 'Last'
				})
			}
		},
		username: {
			label: 'Username',
			schemaType: Types.String({ required: true })
		},
		email: {
			label: 'Email',
			schemaType: Types.Email()
		},
		password: {
			label: 'Password',
			schemaType: Types.String({
				required: true,
				hidden: true,
				// select: false
			})
		}
	},
	defaultField: 'username',
	virtuals: {
		'name.full': {
			get: function() { return this.name.first + ' ' + this.name.last }
		}
	},
	meta: {}
})
