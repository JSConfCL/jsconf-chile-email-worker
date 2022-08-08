import { json } from 'itty-router-extras'
import { createAirtableRecord } from '../helpers/airtable'
import { Env } from '../sharedTypes'

function simpleResponse(statusCode: number, message: string) {
  const responseHeaders = new Headers()
  responseHeaders.set('Access-Control-Allow-Origin', '*')
  responseHeaders.set('Content-Type', 'application/json')
  return json(
    {
      message: message,
      status: statusCode,
    },
    {
      status: statusCode,
      headers: responseHeaders,
    },
  )
}

export async function handleSubscribe(
  request: Request,
  env: Env,
): Promise<Response> {
  try {
    const { email } = (await request.json()) as {
      email: string
    }
    if (!email) {
      throw new Error('Missing email')
    }
    await createAirtableRecord(
      env.AIRTABLE_TABLE_NAME,
      { records: [{ fields: { emails: email } }] },
      env,
    )
    return simpleResponse(200, 'ok')
  } catch (e) {
    console.error(e)
    return simpleResponse(400, 'error')
  }
}
