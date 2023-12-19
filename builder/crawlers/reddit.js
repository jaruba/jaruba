const needle = require('needle')
const qs = require('querystring')

async function getRedditDetails() {
    const clientId = process.env.REDDIT_CLIENT_ID
    const clientSecret = process.env.REDDIT_CLIENT_SECRET

    const redditUser = 'jaruba_dev'
    const redditPass = process.env.REDDIT_PASS

    const authString = Buffer.from(`${clientId}:${clientSecret}`).toString('base64')
    
    const resp = await needle('post', 'https://www.reddit.com/api/v1/access_token', qs.stringify({
        grant_type: 'password',
        username: redditUser,
        password: redditPass
    }), {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Basic ${authString}`
        }
    })

    if (resp.statusCode !== 200 || !resp?.body?.access_token)
        throw Error(`Could not retrieve Reddit access token, http status code ${resp.statusCode}`)

    const bearerToken = resp.body.access_token

    const me = await needle('get', 'https://oauth.reddit.com/api/v1/me', null, {
        headers: {
            'Authorization': `Bearer ${bearerToken}`
        }
    })

    if (me.statusCode !== 200 || !me?.body?.total_karma || !me?.body?.subreddit?.subscribers)
        throw Error(`Could not retrieve Reddit karma / followers, http status code ${resp.statusCode}`)

    return {
        karma: me.body.total_karma.toLocaleString(),
        followers: me.body.subreddit.subscribers.toLocaleString(),
    }
}

module.exports = getRedditDetails()
