module.exports = types => ({
	singular: 'Post',
	fields: {
		title: {
			label: 'Title',
			schemaType: types.String({ required: true })
		},
		slug: {
			label: 'Slug',
			schemaType: types.String({ required: true })
		},
		content: {
			label: 'Post Content',
			schemaType: types.String()
		},
		author: {
			label: 'Author',
			schemaType: types.ObjectId({
				required: true,
				ref: 'User',
				display: 'username'
			})
		},
		tags: {
			label: 'Tags',
			schemaType: [
				types.ObjectId({
					ref: 'Tag',
					display: 'title'
				})
			]
		}
	},
	defaultField: 'title',
	meta: {}
})
