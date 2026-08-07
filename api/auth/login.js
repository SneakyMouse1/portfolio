import jwt from 'jsonwebtoken'

/**
 * Admin authentication endpoint /api/auth/login
 */
export default async function handler(request, response) {
  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Method not allowed' })
  }

  const { username: inputUsername, password: inputPassword } = request.body || {}
  const username = process.env.ADMIN_LOGIN
  const password = process.env.ADMIN_PASSWORD

  if (!inputUsername || !inputPassword || inputUsername !== username || inputPassword !== password) {
    return response.status(401).json({ error: 'Invalid username or password' })
  }

  const token = jwt.sign({ role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '3h' })
  return response.status(200).json({ token })
}