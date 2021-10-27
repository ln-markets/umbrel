const config = require('@/config.js')

module.exports = async (req, res) => {
  try {
    const { url: hostnameAPI, version } = config.lnmarkets

    res.json({ hostnameAPI, version })
  } catch (error) {
    res.json(error)
    console.log(error)
  }
}
