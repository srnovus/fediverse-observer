import type { Handler } from '@netlify/functions'
import axios from 'axios'

interface NetlifyEvent {
  httpMethod: string
  body: string | null
}

const handler: Handler = async (event: NetlifyEvent) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' }),
    }
  }

  try {
    const { url } = JSON.parse(event.body || '{}')
    
    if (!url) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'URL is required' }),
      }
    }

    // Normalizar la URL
    const normalizedUrl = url.startsWith('http') ? url : `https://${url}`

    // Realizar el escaneo
    const [securityResponse, activityResponse] = await Promise.all([
      checkSecurity(normalizedUrl),
      checkActivity(normalizedUrl),
    ])

    return {
      statusCode: 200,
      body: JSON.stringify({
        security: securityResponse,
        activity: activityResponse,
      }),
    }
  } catch (error) {
    console.error('Error scanning instance:', error)
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error' }),
    }
  }
}

async function checkSecurity(url: string) {
  try {
    const response = await axios.get(url)
    
    return {
      ssl: url.startsWith('https'),
      cors: response.headers['access-control-allow-origin'] !== undefined,
      headers: {
        'x-frame-options': response.headers['x-frame-options'] !== undefined,
        'x-content-type-options': response.headers['x-content-type-options'] !== undefined,
        'x-xss-protection': response.headers['x-xss-protection'] !== undefined,
      },
    }
  } catch (error) {
    console.error('Security check failed:', error)
    return {
      ssl: false,
      cors: false,
      headers: {
        'x-frame-options': false,
        'x-content-type-options': false,
        'x-xss-protection': false,
      },
    }
  }
}

async function checkActivity(url: string) {
  // Esta es una implementación básica. En una versión real,
  // necesitarías acceder a la API de la instancia
  return {
    posts: Math.floor(Math.random() * 1000),
    users: Math.floor(Math.random() * 100),
    comments: Math.floor(Math.random() * 5000),
  }
}

export { handler } 