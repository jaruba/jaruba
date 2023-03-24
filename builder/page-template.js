module.exports = `
<html>
	<head>
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<title>Alexandru Branza (jaruba)</title>
		<link rel="icon" type="image/x-icon" href="favicon.ico">
		<meta name="description" content="I build streaming platforms and work with video technologies!">
		<meta name="keywords" content="jaruba, alexandru branza, developer, full-stack developer, dev lead, engineering lead">
		<link href="styles.css" rel="stylesheet" type="text/css"/>
	</head>
	<body>
		<div id="content">
			<div id="header">
				<div class="left">
					<img id="face" src="images/jaruba.jpg">
				</div>
				{tabs}
			</div>
			<br/>
			<div id="head-title">
				<h1>Alexandru Branza</h1> <span class="text-block left-space">Age {age}</span> <span class="text-block left-space">Romania</span>
			</div>
			I build streaming platforms and work with video technologies
			<br/><br/>
			Dev Lead at <a href="https://stremio.com/" class="green-links" target="_blank">Stremio</a>, where I've been working since 2015
			<br/><br/>
			Some things I built in my free time: <a href="https://powder.media/" target="_blank">Powder Tech</a>, <a href="https://ratingposterdb.com" target="_blank">Rating Poster Database</a>, <a href="https://torrent-track.app/" target="_blank">Torrent Track</a>
			<br/><br/>
			<span class="spacing">
				Some tech I enjoy using:
				<br/>
				Node.js, React, QML, JS, CSS, HTML, FFmpeg, Docker, NGINX, Edge / Serverless Functions (Cloudflare Workers, KV, Durable Objects, Vercel), Photoshop, PHP, Python, SQL (SQLite, PostgreSQL, MySQL)
			</span>
			<br/><br/>
			How I would describe myself: full-stack developer, crisis handler, jack of all trades
			<br/><br/>
			Learn more about me: <a href="https://github.com/jaruba" target="_blank">GitHub</a> (open source projects), <a href="https://www.reddit.com/user/jaruba_dev" target="_blank">Reddit</a> (tech support), <a href="https://stackoverflow.com/users/2769366/jaruba" target="_blank">StackOverflow</a> (knowledge sharing)
			<br/><br/>
			Reach me at: <a href="mailto:hi@jaruba.dev">hi@jaruba.dev</a>
			<br/><br/>
			I'm excited to hear about your projects!
			<div id="footer">
				{tabs}
			</div>
		</div>
	</body>
</html>
`