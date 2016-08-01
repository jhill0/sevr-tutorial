module.exports = ({ site, posts }) => `
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title>${site.title}</title>
		<link rel="stylesheet" href="http://yui.yahooapis.com/pure/0.6.0/pure-min.css">
		<link rel="stylesheet" href="http://yui.yahooapis.com/pure/0.6.0/grids-responsive-min.css">
		<link rel="stylesheet" href="/css/layouts/blog.css">
	</head>
	<body>
		<div id="layout" class="pure-g">
			<div class="sidebar pure-u-1 pure-u-md-1-4">
				<div class="header">
					<h1 class="brand-title">${site.title}</h1>
					<h2 class="brand-tagline">A Tutorial</h2>
				</div>
			</div>

			<div class="content pure-u-1 pure-u-md-3-4">
				<div>
					<!-- A wrapper for all the blog posts -->
					<div class="posts">
						${posts.map(post => `
							<!-- A single blog post -->
							<section class="post">
								<header class="post-header">
									<h2 class="post-title">${post.title}</h2>
									<p class="post-meta">
										By <a href="/author/${post.author._id}" class="post-author">${post.author.name.full}</a> under
										${post.tags.map(tag => `
											<a class="post-category post-category-design" href="/tag/${tag._id}">${tag.title}</a>
										`).join('')}
									</p>
								</header>

								<div class="post-description">
									<p>${post.content}</p>
								</div>
							</section>
						`).join('')}
					</div>
				</div>
			</div>
		</div>
	</body>
</html>
`