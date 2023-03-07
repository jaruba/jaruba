const needle = require('needle')

const htmlPath = 'https://api.github.com/repos/jaruba/jaruba/contents/index.html'

const btoa = str => Buffer.from(str.toString(), 'binary').toString('base64')

function getMeta() {
	const options = {
		json: true,
	    headers: {
	    	'Authorization': `Bearer ${process.env.PUBLISH_TOKEN}`,
	    	'Content-Type': 'application/json',
	    	'User-Agent': 'Personal-Website-App',
	    }
	};
	return needle('get', htmlPath, options)
}

async function saveFile(data, message) {

	const content = btoa(data)

	const meta = await getMeta()

	if (!meta?.body?.sha) {
		throw Error('Failed to get SHA of index.html file from GH API')
		return
	}

	const options = {
		json: true,
	    headers: {
	    	'Authorization': `Bearer ${process.env.PUBLISH_TOKEN}`,
	    	'Content-Type': 'application/json',
	    	'User-Agent': 'Personal-Website-App',
	    },
	}

	const body = { message, content, sha: meta.body.sha }

	return needle('put', htmlPath, body, options)
}

module.exports = { saveFile }