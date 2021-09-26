const LNMarketsAPI = require('@classes/lnmarkets-api.js')

const retrieveHistory = async ({ endpoint, params = {}, key }) => {
  const history = []

  Object.assign(params, { limit: 100 })

  if (!params.to) {
    Object.assign(params, { to: Date.now() })
  }

  let lastTimestamp = 0

  while (lastTimestamp < params.to) {
    Object.assign(params, { from: lastTimestamp })

    const page = await LNMarketsAPI.request({
      method: 'GET',
      endpoint,
      params,
    })

    history.push(...page)

    lastTimestamp = page[page.length - 1][key]

    if (page.length !== 100) {
      break
    }
  }

  return history
}

module.exports = { retrieveHistory }
