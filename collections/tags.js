module.exports = Types => ({
	singular: 'Tag',
	fields: {
		title: {
			label: 'Title',
			schemaType: Types.String({
				required: true,
				trim: true
			})
		}
	},
	defaultField: 'title',
	meta: {}
})
