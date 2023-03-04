const needle = require('needle')

const ghUser = 'jaruba'
const perPage = 100

let ghStars = 0
let ghFollowers = 0

async function getStars(page = 1) {
	const resp = await needle('get', `https://api.github.com/users/${ghUser}/repos?per_page=${perPage}&page=${page}`, { json: true })
	if (resp.statusCode !== 200)
		throw Error(`Could not retrieve github stargazers count, failed at page ${page}, http status code ${resp.statusCode}`)
	const repos = resp.body
	repos.forEach(repo => {
		ghStars += repo.stargazers_count
	})
	if (repos.length === perPage) {
		page++
		await getStars(page)
	}
	return
}

async function getFollowers(page = 1) {
	const resp = await needle('get', `https://api.github.com/users/${ghUser}`, { json: true })
	if (resp.statusCode !== 200 || !resp.body?.followers)
		throw Error(`Could not retrieve github followers count, http status code ${resp.statusCode}`)
	ghFollowers = resp.body.followers
	return
}

module.exports = async function() {
	await getStars()
	await getFollowers()
	return {
		stars: ghStars.toLocaleString(),
		followers: ghFollowers.toLocaleString(),
	}
}
