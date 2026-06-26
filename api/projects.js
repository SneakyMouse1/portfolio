/**
 * Vercel Serverless Function — /api/projects
 *
 * Proxies requests to Airtable so the API token
 * stays server-side and never reaches the browser.
 *
 *   AIRTABLE_TOKEN
 *   AIRTABLE_BASE_ID
 *   AIRTABLE_TABLE_NAME
 */

export default async function handler(request, response) {
  const token = process.env.AIRTABLE_TOKEN
  const baseId = process.env.AIRTABLE_BASE_ID
  const tableName = process.env.AIRTABLE_TABLE_NAME

  if (!token || !baseId || !tableName) {
    return response.status(500).json({
      error: 'Missing Airtable environment variables on the server.'
    })
  }

  try {
    const airtableResponse = await fetch(
      `https://api.airtable.com/v0/${baseId}/${tableName}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )

    if (!airtableResponse.ok) {
      return response.status(airtableResponse.status).json({
        error: `Airtable returned ${airtableResponse.status}`
      })
    }

    const data = await airtableResponse.json()
    return response.status(200).json(data)

  } catch (error) {
    console.error('[api/projects] fetch error:', error)
    return response.status(500).json({ error: 'Failed to fetch data from Airtable' })
  }
}