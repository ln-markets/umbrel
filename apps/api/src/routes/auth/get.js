const LNMarketsAPI = require('@/classes/lnmarkets-api.js')

module.exports = async (req, res) => {
  try {
    const response = await LNMarketsAPI.generateToken()

    res.json(response)
  } catch (error) {
    res.json(error)
    console.log(error)
  }
}
