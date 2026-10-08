import { airtableFetch } from './utils/airtable.js'

/**
 * Public Vercel Serverless Function /api/projects
 */
export default async function handler(request, response) {
  if (request.method !== 'GET') {
    return response.status(405).json({ error: 'Method not allowed' })
  }

  try {
    let data
    try {
      data = await airtableFetch('?view=Portfolio%20data')
    } catch {
      data = await airtableFetch()
    }
    return response.status(200).json(data)
  } catch (error) {
    console.error('[api/projects] error:', error.message)
    return response.status(error.status || 500).json({ error: error.message })
  }
}