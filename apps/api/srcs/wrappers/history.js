const LNMarketsAPI = require('@classes/lnmarkets-api.js')

const retrieveHistory = async ({ endpoint, params = {}, key }) => {
  const history = []
  const now = Date.now()

  Object.assign(params, { limit: 100, from: 0, to: now })

  while (1) {
    const page = await LNMarketsAPI.request({
      method: 'GET',
      endpoint,
      params,
    })

    history.push(...page)
    console.log({ endpoint, size: history.length })
    if (page.length === 0) {
      return history
    }

    params.to = page[page.length - 1][key] - 1
  }
}

module.exports = { retrieveHistory }
