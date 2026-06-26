import verifyAuth from '../verifyAuth.js'

export default async function handler(request, response) {
    const user = await verifyAuth(request)
    if (!user) {
        return response.status(401).json({ error: 'Unauthorized' })
    }

    const token = process.env.AIRTABLE_TOKEN
    const baseId = process.env.AIRTABLE_BASE_ID
    const tableName = process.env.AIRTABLE_TABLE_NAME

    const { id } = request.query

    if (!token || !baseId || !tableName) {
        return response.status(500).json({
            error: 'Missing Airtable environment variables on the server.'
        })
    }

    if (request.method === 'POST') {
        try {
            const airtableResponse = await fetch(
                `https://api.airtable.com/v0/${baseId}/${tableName}`,
                {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        fields: request.body,
                    })
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

    } else if (request.method === 'PATCH') {
        if (!id) {
            return response.status(400).json({ error: 'Missing record id' })
        }

        try {
            const airtableResponse = await fetch(
                `https://api.airtable.com/v0/${baseId}/${tableName}/${id}`,
                {
                    method: 'PATCH',
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        fields: request.body,
                    })
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
    } else if (request.method === 'DELETE') {
        if (!id) {
            return response.status(400).json({ error: 'Missing record id' })
        }

        try {
            const airtableResponse = await fetch(
                `https://api.airtable.com/v0/${baseId}/${tableName}/${id}`,
                {
                    method: 'DELETE',
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
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


}