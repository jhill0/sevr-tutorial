module.exports = ({ site, posts }) => `
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title>${site.title}</title>
	</head>
	<body>
		<h1>${post.title}</h1>
		<p>${post.content}</p>
	</body>
</html>
`