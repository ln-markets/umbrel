export const fetchLnurl = async (hostname) => {
  const url = new URL(`https://api.${hostname}/v2/lnurl/auth`)

  const response = await fetch(url, { method: 'post' })

  if (!response.ok) {
    const error = await response.text()
    throw new Error(error)
  }

  const { lnurl } = await response.json()

  return lnurl
}

export const fetchToken = async (hostname, k1, hmac, sig, key) => {
  const url = new URL(`https://api.${hostname}/v2/lnurl/auth`)
  url.searchParams.append('tag', 'login')
  url.searchParams.append('k1', k1)
  url.searchParams.append('hmac', hmac)
  url.searchParams.append('sig', sig)
  url.searchParams.append('key', key)
  url.searchParams.append('token', true)

  const response = await fetch(url)

  if (!response.ok) {
    const error = await response.text()
    throw new Error(error)
  }

  const { token } = await response.json()

  return token
}
