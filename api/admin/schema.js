import { withAuth } from '../utils/withAuth.js'
import { airtableFetch } from '../utils/airtable.js'

/**
 * Protected Admin Vercel Serverless Function /api/admin/schema
 */
export default withAuth(async function handler(request, response) {
  const baseId = process.env.AIRTABLE_BASE_ID
  const tableName = process.env.AIRTABLE_TABLE_NAME

  try {
    const data = await airtableFetch(`/meta/bases/${baseId}/tables`)
    const table = data.tables.find((t) => t.name === tableName)

    if (!table) {
      return response.status(404).json({ error: `Table '${tableName}' not found` })
    }

    const extractChoices = (fieldName) => {
      const field = table.fields.find((f) => f.name === fieldName)
      return field?.options?.choices?.map((c) => c.name) || []
    }

    return response.status(200).json({
      stack: extractChoices('Stack'),
      type: extractChoices('Type'),
      infrastructure: extractChoices('Infrastructure'),
    })

  } catch (error) {
    console.error('[api/admin/schema] error:', error.message)
    return response.status(error.status || 500).json({ error: error.message })
  }
})