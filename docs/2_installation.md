# 2. Installation & Setup

---

## Dependencies

The Ichabod CMS Framework is dependent on the Node.js runtime,
npm (included with Node.js) and MongoDB. Please download and install these if
you have not already.

- [Node.js](https://nodejs.org/en/download/)
- [MongoDB](https://www.mongodb.com/download-center#community)


## Installing the Ichabod CLI

For this tutorial, we will be creating our project using the Ichabod CLI, an
immersive command line tool for working with the Ichabod CMS Framework. The tool
can be easily installed with npm:

```
$ npm install -g ichabod-cli
```


## Project Setup

Once installed, we'll need to create our project directory and enter into it:

```
$ mkdir ich-tutorial
$ cd ich-tutorial
```

We can now have the command line tool scaffold out our project by installing
all necessary dependencies, creating the base directory structure, and providing
an `index.js`, the entry point of our CMS. Use the following command and answer
all prompts.

```
$ ich init ich-tutorial
$ npm install
```

You should now have a directory structure that looks something like this:

```
├── collections
├── config
├── index.js
├── node_modules
│   └── ...
├── package.json
└── types
```

You can now run your application for the first time:

```
$ npm start
```
---

[< Previous - Introduction](1_introduction.md) | [Next - Adding Collections >](3_adding_collections.md)
