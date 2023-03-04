const needle = require('needle')

const soId = '2769366'

async function getReputation() {
	const resp = await needle('get', `https://api.stackexchange.com/2.3/users/${soId}?order=desc&sort=reputation&site=stackoverflow`, { json: true })
	if (resp.statusCode !== 200 || !resp.body?.items?.length)
		throw Error('Could not retrieve stackoverflow reputation', `http status code ${resp.statusCode}`)
	return resp.body.items[0].reputation
}

async function getOverall() {
	// we can only scrape in order to get this data
	// cheerio could be used for more solid logic here

	const resp = await needle('get', `https://stackoverflow.com/users/${soId}/`, { follow_max: 5 })

	if (resp.statusCode !== 200 || !resp.body)
		throw Error(`Could not retrieve stackoverflow user page, http status code ${resp.statusCode}`)

	const overallLine = resp.body.split(/\r?\n/).find(line => {
		return line.includes('<div class="s-anchors s-anchors__inherit js-rank-badge">')
	})

	if (!overallLine)
		throw(Error('Could not retrieve stackoverflow overall html line from user page'))

	const matches = /<b>(.*?)<\/b>/g.exec(overallLine)

	if (!matches || !matches[1])
		throw(Error('Code: 250 - Could not retrieve stackoverflow overall data from html'))

	// some sanity checks are required

	let osOverall = matches[1].trim()

	if (!osOverall.endsWith('%'))
		throw(Error('Code: 251 - Could not retrieve stackoverflow overall data from html'))

	osOverall = osOverall.replace('%', '')

	if (osOverall.length > 2)
		throw(Error('Code: 252 - Could not retrieve stackoverflow overall data from html'))

	if (!/^\d+$/.test(osOverall)) // is number?
		throw(Error('Code: 253 - Could not retrieve stackoverflow overall data from html'))

	return osOverall
}

module.exports = async function() {
	const soRep = await getReputation()
	const soOverall = await getOverall()
	return {
		reputation: soRep.toLocaleString(),
		overall: soOverall,
	}
}
