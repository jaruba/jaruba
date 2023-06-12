const needle = require('needle')

const redditUser = 'jaruba_dev'

async function getKarma() {
	const resp = await needle('get', `https://www.reddit.com/user/${redditUser}/about.json`, { json: true })
	if (resp.statusCode !== 200 || !resp.body?.data?.total_karma)
		throw Error(`Could not retrieve reddit karma, http status code ${resp.statusCode}`)
	return resp.body.data.total_karma
}

module.exports = async function() {
	const redditKarma = await getKarma()
	return {
		karma: redditKarma.toLocaleString(),

		// reddit followers cannot be seen publicly
		// and the followers count cannot be retrieved
		// from the API either, hardcoding it for now
		followers: '99',
	}
}
