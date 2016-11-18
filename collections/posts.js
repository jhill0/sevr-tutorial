module.exports = Types => ({
	singular: 'Post',
	fields: {
		title: {
			label: 'Title',
			schemaType: Types.String({ required: true })
		},
		slug: {
			label: 'Slug',
			schemaType: Types.String({ required: true })
		},
		content: {
			label: 'Post Content',
			schemaType: Types.String()
		},
		author: {
			label: 'Author',
			schemaType: Types.ObjectId({
				required: true,
				ref: 'User',
				display: 'username'
			})
		},
		tags: {
			label: 'Tags',
			schemaType: [
				Types.ObjectId({
					ref: 'Tag',
					display: 'title'
				})
			]
		}
	},
	defaultField: 'title',
	meta: {}
})
