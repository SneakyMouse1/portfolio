export async function authFetch(url, options = {}) {
    const token = localStorage.getItem('admin_token')

    const response = await fetch(url, {
        ...options,
        headers: {
            ...options.headers,
            Authorization: 'Bearer ' + token,
        }
    })

    if (response.status === 401) {
        localStorage.removeItem('admin_token')
        window.location.href = '/admin/login'
    }

    return response
}