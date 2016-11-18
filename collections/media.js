module.exports = Types => ({
	singular: 'Media',
	fields: {
		path: {
			label: 'Path',
			schemaType: Types.String({ required: true})
		},
		caption: {
			label: 'Caption',
			schemaType: Types.String()
		}
	},
	defaultField: 'path',
	meta: {}
})
