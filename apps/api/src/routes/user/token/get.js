const LNMarketsAPI = require('@/classes/lnmarkets-api.js')

module.exports = async (req, res) => {
  try {
    const payload = {
      method: 'GET',
      endpoint: '/user',
    }

    await LNMarketsAPI.request(payload)

    res.json({ token: LNMarketsAPI.token })
  } catch (error) {
    res.json(error)
  }
}
