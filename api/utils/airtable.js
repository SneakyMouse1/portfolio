/**
 * Centralized Airtable API Client for serverless functions
 */
export async function airtableFetch(path = '', options = {}) {
  const token = process.env.AIRTABLE_TOKEN
  const baseId = process.env.AIRTABLE_BASE_ID
  const tableName = process.env.AIRTABLE_TABLE_NAME

  if (!token || !baseId || !tableName) {
    const error = new Error('Missing Airtable environment variables on the server.')
    error.status = 500
    throw error
  }

  const isMeta = path.startsWith('/meta/')
  const url = isMeta
    ? `https://api.airtable.com/v0${path}`
    : `https://api.airtable.com/v0/${baseId}/${tableName}${path}`

  const headers = {
    Authorization: `Bearer ${token}`,
    ...(options.body ? { 'Content-Type': 'application/json' } : {}),
    ...options.headers,
  }

  const config = {
    method: options.method || 'GET',
    headers,
  }

  if (options.body) {
    config.body = JSON.stringify(
      options.rawBody ? options.body : { fields: options.body }
    )
  }

  const res = await fetch(url, config)

  if (!res.ok) {
    const error = new Error(`Airtable returned ${res.status}`)
    error.status = res.status
    throw error
  }

  return await res.json()
}
