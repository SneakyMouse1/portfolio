import verifyAuth from '../verifyAuth.js'

/**
 * Higher-order function to protect API routes with JWT authentication.
 * If unauthenticated, returns 401 Unauthorized
 */
export function withAuth(handler) {
  return async function (request, response) {
    const user = await verifyAuth(request)
    if (!user) {
      return response.status(401).json({ error: 'Unauthorized' })
    }
    return handler(request, response, user)
  }
}
