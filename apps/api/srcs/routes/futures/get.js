const LNMarketsAPI = require('@classes/lnmarkets-api.js')

module.exports = async (req, res) => {
  try {
    const payload = {
      method: 'GET',
      endpoint: '/futures',
    }

    const response = await LNMarketsAPI.request(payload)

    res.json(response)
  } catch (error) {
    res.json(error)
    console.log(error)
  }
}
