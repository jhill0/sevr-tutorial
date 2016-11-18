# 4. Adding Custom Field Types

---

A time will come when the standard field types are not able to meet the needs of
a field type for one or more of your collections. For simple cases, where only a
single collection is affected and the changes are relatively minor, simply
extending the field type directly in the collection definition will suffice.
However, if the changes are extensive, such as adding validation, and/or it
affects more than one collection, creating a custom field type is beneficial.

For this tutorial we will be adding a custom field type for email address. While
an email address is simply a string, it would be beneficial to add a custom
validator to ensure the input is a qualified email address.

As with collections, we can use the CLI to scaffold out our custom field type:

```
$ sevr type email
```

This should generate a new file, `email.js`, in the `types` directory. Its
contents should match:

```javascript
module.exports = Types => ({
	name: 'email',
	type: Types.String
})
```

Next, we should modify this file to include a custom validator:

```javascript
module.exports = Types => ({
	name: 'email',
	type: Types.String,
	validate: {
		validator: val => /.+@.+\..+/.test(val),
		message: '{PATH} must be a valid email address'
	}
})
```

Lets go ahead and update the `email` field in the `users` collection to use the
new `email` field type:

```javascript
module.exports = Types => ({
	singular: 'Users',
	fields: {
		...
		email: {
			label: 'Email',
			schemaType: Types.Email()
		},
		...
	},
	defaultField: 'username',
	meta: {}
})
```

**Note**: Field types are renamed using the filename of the module and
camel-cased, such that "email" becomes "Email."

---

[< Previous - Adding Collections](3_adding_collections.md) | [Next - Use The CLI to Manage Data >](5_cli.md)
