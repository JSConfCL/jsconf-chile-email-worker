import { Env } from '../sharedTypes'

export const createAirtableRecord = (
  tableName: string,
  body: Record<string, any>,
  env: Env,
) => {
  return fetch(
    `https://api.airtable.com/v0/${env.AIRTABLE_BASE_ID}/${encodeURIComponent(
      tableName,
    )}`,
    {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        Authorization: `Bearer ${env.AIRTABLE_API_KEY}`,
        'Content-type': `application/json`,
      },
    },
  )
}
