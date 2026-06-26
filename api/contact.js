import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export default async function handler(request, response) {
    if (request.method !== 'POST') {
        return response.status(405).json({ error: 'Method not allowed' })
    }

    const { name, email, serviceType, message, turnstileToken } = request.body

    if (!name || !email || !message) {
        return response.status(400).json({ error: 'Missing required fields' })
    }

    if (!turnstileToken) {
        return response.status(400).json({ error: 'Missing Turnstile token' })
    }

    try {
        // Verify the Turnstile token with Cloudflare before sending the email
        const turnstileResponse = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                secret: process.env.TURNSTILE_SECRET_KEY,
                response: turnstileToken,
            }),
        })

        const turnstileData = await turnstileResponse.json()

        if (!turnstileData.success) {
            console.error('[api/contact] Turnstile verification failed:', turnstileData)
            return response.status(403).json({ error: 'Bot verification failed' })
        }

        const { data, error } = await resend.emails.send({
            from: 'webDEV <info@smyslov.dev>',
            to: ['smyslovich@gmail.com'],
            replyTo: email,
            subject: `New contact form message from ${name}`,
            html: `
                <h2>New message from your portfolio</h2>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Service type:</strong> ${serviceType || 'Not specified'}</p>
                <p><strong>Message:</strong></p>
                <p>${message}</p>
            `,
        })

        if (error) {
            console.error('[api/contact] Resend error:', error)
            return response.status(500).json({ error: 'Failed to send email' })
        }

        return response.status(200).json({ success: true, data })

    } catch (e) {
        console.error('[api/contact] fetch error:', e)
        return response.status(500).json({ error: 'Failed to send email' })
    }
}