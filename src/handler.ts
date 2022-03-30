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
  const body = await request.formData()
  const email = Object.fromEntries(body)

  try {
    await createAirtableRecord({ records: [{ fields: { emails: email } }] })
    return simpleResponse(200, 'ok')
  } catch (e) {
    console.error(e)
    return simpleResponse(400, 'error')
  }
}
