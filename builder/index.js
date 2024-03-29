const { saveFile } = require('./githubAPI')
const getAge = require('./age')

const templates = {
	tabs: require('./tab-template'),
	page: require('./page-template'),
}

const crawlers = {
	github: require('./crawlers/github'),
	reddit: require('./crawlers/reddit'),
	stackoverflow: require('./crawlers/stackoverflow'),
}

async function build() {

	let data

	try {
		const [github, reddit, stackoverflow] = await Promise.all(Object.values(crawlers).map(crawler => crawler()))
		data = { github, reddit, stackoverflow }
	} catch(e) {
		throw(e)
	}

	const tabs = templates.tabs
							.replaceAll('{github-stars}', data.github.stars)
							.replaceAll('{github-followers}', data.github.followers)
							.replaceAll('{reddit-karma}', data.reddit.karma)
							.replaceAll('{reddit-followers}', data.reddit.followers)
							.replaceAll('{so-reputation}', data.stackoverflow.reputation)
							.replaceAll('{so-overall}', data.stackoverflow.overall)

	const page = templates.page
							.replaceAll('{tabs}', tabs)
							.replaceAll('{age}', getAge())

	// we push the changes to the github repository
	// to trigger automated deployment of the website

	const githubResp = await saveFile(page, 'Automation: Update Data for Tabs')

	if (!githubResp?.body?.content?.sha) {
		throw(Error('Failed to write new index.html to GitHub API'))
	}
}

build()
