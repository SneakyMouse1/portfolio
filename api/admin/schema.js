import verifyAuth from '../verifyAuth.js'

export default async function handler(request, response) {
    const user = await verifyAuth(request)
    if (!user) {
        return response.status(401).json({ error: 'Unauthorized' })
    }

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
            `https://api.airtable.com/v0/meta/bases/${baseId}/tables`, {
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

        // Selection
        const table = data.tables.find((t) => t.name === tableName)
        
        const stackField = table.fields.find((f) => f.name === "Stack")
        const typeField = table.fields.find((f) => f.name === "Type")
        const infrastructureField = table.fields.find((f) => f.name === "Infrastructure")

        // Mapping
        const stackOptions = stackField.options.choices.map((c) => c.name)
        const typeOptions = typeField.options.choices.map((c) => c.name)
        const infrastructureOptions = infrastructureField.options.choices.map((c) => c.name)

        return response.status(200).json({
            stack: stackOptions,
            type: typeOptions,
            infrastructure: infrastructureOptions,
        })

    } catch (error) {
        console.error('[api/projects] fetch error:', error)
        return response.status(500).json({ error: 'Failed to fetch data from Airtable' })
    }
}