module.exports = types => ({
	singular: 'Tag',
	fields: {
		title: {
			label: 'Title',
			schemaType: types.String({
				required: true,
				trim: true
			})
		}
	},
	defaultField: 'title',
	meta: {}
})
