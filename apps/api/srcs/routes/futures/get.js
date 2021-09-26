const LNMarketsAPI = require('@classes/lnmarkets-api.js')
const { retrieveHistory } = require('@wrappers/history.js')

module.exports = async (req, res) => {
  try {
    const opened = await LNMarketsAPI.request({
      method: 'GET',
      endpoint: '/futures',
      params: {
        type: 'open',
        limit: 50,
      },
    })

    const running = await LNMarketsAPI.request({
      method: 'GET',
      endpoint: '/futures',
      params: {
        type: 'running',
        limit: 50,
      },
    })

    const closed = await retrieveHistory({
      endpoint: '/futures',
      params: {
        type: 'closed',
      },
      key: 'closed_ts',
    })

    res.json({ opened, running, closed })
  } catch (error) {
    res.json(error)
    console.log(error)
  }
}
