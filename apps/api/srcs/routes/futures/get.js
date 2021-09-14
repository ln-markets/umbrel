const LNMarketsAPI = require('@classes/lnmarkets-api.js')

module.exports = async (req, res) => {
  try {
    const opened = await LNMarketsAPI.request({
      method: 'GET',
      endpoint: '/futures',
      params: {
        type: 'open',
        limit: 100,
      },
    })

    const running = await LNMarketsAPI.request({
      method: 'GET',
      endpoint: '/futures',
      params: {
        type: 'running',
        limit: 100,
      },
    })

    const closed = await LNMarketsAPI.request({
      method: 'GET',
      endpoint: '/futures',
      params: {
        type: 'closed',
        limit: 100,
      },
    })

    res.json({ opened, running, closed })
  } catch (error) {
    res.json(error)
    console.log(error)
  }
}
