module.exports = Types => ({
	name: 'email',
	type: Types.String,
	validate: {
		validator: val => /.+@.+\..+/.test(val),
		message: '{PATH} must be a valid email address'
	}
})
