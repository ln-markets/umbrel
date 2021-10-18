const LNMarketsAPI = require('@classes/lnmarkets-api.js')

module.exports = async (req, res) => {
  try {
    const positions = await LNMarketsAPI.request({
      method: 'GET',
      endpoint: '/futures',
      params: {
        type: 'running',
        limit: 50,
      },
    })

    res.json(positions)
  } catch (error) {
    res.json(error)
    console.log(error)
  }
}
