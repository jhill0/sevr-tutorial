# 3. Adding Collections

---

Collections are an integral part of the Icahbod CMS Framework. They define the
storage and behavior of the data used by the CMS. In data persistence terms, a
collection is how groups of related documents are stored in the MongoDB database.
In the framework, collections are defined using what is called a collection
definition, which is an extension of Mongoose's model schema.

For our blog, we will need to define four collections: users, posts, tags, and
media. We'll use the Sevr CLI tool to create our collection definitions.

```
$ ich coll users
```

The first line above, enters the immersive CLI interface. Secondly, the
`add collection` command tells Sevr to create a new collection named `users`.
The tool will create a new file, `users.js`, in your `collections` directory; It
should look something like this:

```javascript
module.exports = types => ({
	singular: 'User',
	fields: {},
	meta: {}
})
```

This is the basic structure of a collection definition, where `singular` is name
of the document model, `fields` is an object containing each of the fields, and
`meta` is an object which holds additional data which may be needed for other
functions of the framework of one of its plugins.

Next, we will need to modify this file to include each of the fields needed for
this collection: name, username, email, and password. Each of these fields will
need to define a `label` and a `schemaType`.

```javascript
module.exports = types => ({
	singular: 'Users',
	fields: {
		name: {
			label: 'Name',
			schemaType: {
				first: types.String({
					required: true,
					label: 'First'
				}),
				last: types.String({
					required: true,
					label: 'Last'
				})
			}
		},
		username: {
			label: 'Username',
			schemaType: types.String({ required: true })
		},
		email: {
			label: 'Email',
			schemaType: types.String()
		},
		password: {
			label: 'Password',
			schemaType: types.String({
				required: true,
				hidden: true
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
```

We'll follow the same procedure to create the remaining collection definitions:

```javascript
// tags.js
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
```

```javascript
// posts.js
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
				ref: 'Author',
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
```

```javascript
// media.js
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
```
---

[< Previous - Installation & Setup](2_installation.md) | [Next - Adding Custom Field Types >](4_custom_field_types.md)
