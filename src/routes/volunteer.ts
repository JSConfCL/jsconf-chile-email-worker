import { createAirtableRecord } from '../helpers/airtable'
import { simpleResponse } from '../helpers/responses'
import { Env } from '../sharedTypes'

type VolunteerApplicationRequestBody = {
  email: string
  name: string
  lastName: string
  description: string
}
export async function handleVolunteerApplication(
  request: Request,
  env: Env,
): Promise<Response> {
  try {
    const { email, name, lastName, description } =
      (await request.json()) as VolunteerApplicationRequestBody
    if (!email) {
      throw new Error('Missing email')
    }
    if (!name) {
      throw new Error('Missing name')
    }
    if (!lastName) {
      throw new Error('Missing lastName')
    }
    if (!description) {
      throw new Error('Missing description')
    }
    await createAirtableRecord(
      env.AIRTABLE_VOLUNTEERS_TABLE_NAME,
      {
        records: [
          {
            fields: {
              email,
              name,
              lastName,
              description,
            },
          },
        ],
      },
      env,
    )
    return simpleResponse(200, 'ok')
  } catch (e) {
    console.error(e)
    return simpleResponse(400, 'error')
  }
}
