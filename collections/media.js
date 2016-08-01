module.exports = types => ({
	singular: 'Media',
	fields: {
		path: {
			label: 'Path',
			schemaType: types.String({ required: true})
		},
		caption: {
			label: 'Caption',
			schemaType: types.String()
		}
	},
	defaultField: 'path',
	meta: {}
})
