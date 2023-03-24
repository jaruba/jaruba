const needle = require('needle')

const soId = '2769366'

async function getReputation() {
	const resp = await needle('get', `https://api.stackexchange.com/2.3/users/${soId}?order=desc&sort=reputation&site=stackoverflow`, { json: true })
	if (resp.statusCode !== 200 || !resp.body?.items?.length)
		throw Error('Could not retrieve stackoverflow reputation', `http status code ${resp.statusCode}`)
	return resp.body.items[0].reputation
}

module.exports = async function() {
	const soRep = await getReputation()
	return {
		reputation: soRep.toLocaleString(),

		// we hardcode overall percent as we are
		// avoiding web scraping with gh actions
		overall: '33',
	}
}
