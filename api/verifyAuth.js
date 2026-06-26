import jwt from 'jsonwebtoken'

export default async function handler (request) {
    const authorization = request.headers.authorization

    if(!authorization || !authorization.startsWith('Bearer ')) {
        return null
    }

    // Returns null instead of 401 — the caller is responsible for the response

    const token = authorization.replace('Bearer ', '')

    try {
        return jwt.verify(token, process.env.JWT_SECRET)
    } catch (e) {
        return null
    }

}