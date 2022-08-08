import { createAirtableRecord } from '../helpers/airtable'
import { simpleResponse } from '../helpers/responses'
import { Env } from '../sharedTypes'

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
