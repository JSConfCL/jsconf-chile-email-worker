const createAirtableRecord = (body: Record<string, any>) => {
  return fetch(
    `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${encodeURIComponent(
      AIRTABLE_TABLE_NAME,
    )}`,
    {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        Authorization: `Bearer ${AIRTABLE_API_KEY}`,
        'Content-type': `application/json`,
      },
    },
  )
}

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET,HEAD,POST,OPTIONS',
  'Access-Control-Max-Age': '86400',
}
function handleOptions(request: Request) {
  // Make sure the necessary headers are present
  // for this to be a valid pre-flight request
  const headers = request.headers
  if (
    headers.get('Origin') !== null &&
    headers.get('Access-Control-Request-Method') !== null &&
    headers.get('Access-Control-Request-Headers') !== null
  ) {
    // Handle CORS pre-flight request.
    // If you want to check or reject the requested method + headers
    // you can do that here.
    const respHeaders = {
      ...corsHeaders,
      // Allow all future content Request headers to go back to browser
      // such as Authorization (Bearer) or X-Client-Name-Version
      'Access-Control-Allow-Headers': request.headers.get(
        'Access-Control-Request-Headers',
      ) as string,
    }
    return new Response(null, {
      headers: respHeaders,
    })
  } else {
    // Handle standard OPTIONS request.
    // If you want to allow other HTTP Methods, you can do that here.
    return new Response(null, {
      headers: {
        Allow: 'GET, HEAD, POST, OPTIONS',
      },
    })
  }
}

function simpleResponse(statusCode: number, message: string) {
  const responseHeaders = new Headers()
  responseHeaders.set('Access-Control-Allow-Origin', '*')
  responseHeaders.set('Content-Type', 'application/json')
  return new Response(
    JSON.stringify({
      message: message,
      status: statusCode,
    }),
    {
      headers: responseHeaders,
      status: statusCode,
    },
  )
}

export async function handleRequest(request: Request): Promise<Response> {
  if (request.method === 'OPTIONS') {
    return handleOptions(request)
  } else {
    try {
      const { email } = (await request.json()) as {
        email: string
      }
      if (!email) {
        throw new Error('Missing email')
      }
      await createAirtableRecord({ records: [{ fields: { emails: email } }] })
      return simpleResponse(200, 'ok')
    } catch (e) {
      console.error(e)
      return simpleResponse(400, 'error')
    }
  }
}
