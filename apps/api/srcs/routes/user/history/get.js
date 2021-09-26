const { retrieveHistory } = require('@wrappers/history.js')

module.exports = async (req, res) => {
  try {
    const deposits = await retrieveHistory({
      endpoint: '/user/deposit',
      key: 'ts',
    })

    const withdrawals = await retrieveHistory({
      endpoint: '/user/withdraw',
      key: 'ts',
    })

    res.json({ deposits, withdrawals })
  } catch (error) {
    res.json(error)
  }
}
