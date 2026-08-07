import { withAuth } from '../utils/withAuth.js'
import { airtableFetch } from '../utils/airtable.js'

/**
 * Protected Admin Vercel Serverless Function /api/admin/projects
 */
export default withAuth(async function handler(request, response) {
  const { id } = request.query
  const method = request.method

  try {
    if (method === 'POST') {
      const data = await airtableFetch('', {
        method: 'POST',
        body: request.body,
      })
      return response.status(200).json(data)
    }

    if (method === 'PATCH') {
      if (!id) {
        return response.status(400).json({ error: 'Missing record id' })
      }
      const data = await airtableFetch(`/${id}`, {
        method: 'PATCH',
        body: request.body,
      })
      return response.status(200).json(data)
    }

    if (method === 'DELETE') {
      if (!id) {
        return response.status(400).json({ error: 'Missing record id' })
      }
      const data = await airtableFetch(`/${id}`, {
        method: 'DELETE',
      })
      return response.status(200).json(data)
    }

    return response.status(405).json({ error: 'Method not allowed' })

  } catch (error) {
    console.error('[api/admin/projects] error:', error.message)
    return response.status(error.status || 500).json({ error: error.message })
  }
})