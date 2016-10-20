# 5. Use The CLI to Manage Data

---

We now have a way to describe our data, and a way to store our data. Next, we
need some actual data! The quickest way to start adding and managing data for
our blog is to use the Sevr CLI.

By default, when building a project using the `sevr init` command, the remote
CLI plugin is added. This will allow you access to basic CRUD operations for
managing the application's collections. The service starts with the application,
and begins listening to incoming connections.

```
$ npm start
```

Next, if we open a new terminal, we can run the `manage` command within the CLI.
We will need to specify which port we want to connect to. The service listens
on port 4000 by default.

```
$ sevr manage -p 4000
```

This will connect to the running Sevr instance and start an interactive shell.
From here, there are a number of different commands that can be run to
manipulate the data; We will walk through each of them.

## Collections
The first command, `collections`, simply lists all available collections.

```
sevr-remote$ collections

```

We should see the following output

```
media
posts
tags
users
```

## Create
Before we look at any of the other commands, we will need to add some data using
the `create` command.

```
sevr-remote$ create users
```

... will bring up a prompt to enter data for each of the fields defined by the
collection definition. The type of prompt that is displayed depends on the
field type.

Go ahead and create a user with the following data:

```
First: Nick
Last: Cave
Username: ncave
Email: nick@nickcave.com
Password: lazarus
```

Let's create two more users using the following data:

```
First: Tom
Last: Waits
Username: twaits
Email: mrwaits@tomwaits.com
Password: raindogs

First: PJ
Last: Harvey
Username: pjharvey
Email: pj@pjharvey.com
Password: whothef*ck
```

... and two tags:


```
Title: tutorial

Title: sevr
```

Next, go ahead and create a post and note the prompt types for tags and author.

## Find
The `find` command allows us to search for documents within a collection.

```
sevr-remote$ find users
```

will return all users in the collection. From there, you can select which
document from the list you would like to view. To narrow the search results, you
can supply a query:

```
sevr-remote$ find users username=twaits
```

## Update
To alter the contents of a document, you can use the `update` command. Using
syntax similar to `find`, you will be provided a selection of documents to
choose from.

```
sevr-remote$ update users
```

Once you choose a document, you will be able to change the contents of the
fields. If you do not wish to change a field, simply hit enter. To limit the
fields available for edit, you can use utilize the selection option. For
instance, if you wanted only edit the username of a user:

```
sevr-remote$ update users -s=username
```

to exclude a field:

```
// TODO: If excluding the defaultField, the prompt displays a list of array
// indices
sevr-remote$ update users -s=-name
```

... or to include a field that would otherwise be excluded by default:

```
sevr-remote$ update users -s=+password
```

## Delete

To remove a document or documents, the `delete` command is used. Like `find` and
`update`, a query can also be used to limit the result set.

```
sevr-remote$ delete tags
```

The command will provide a prompt of documents to delete. You can select any
number of documents from the list. Once selected, you will need to confirm the
deletion.

---

[< Previous - Adding Custom Field Types](4_custom_field_types.md) | [Next - Consuming Data](6_consuming_data.md)
