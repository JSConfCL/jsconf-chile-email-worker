import { handleSubscribe } from '../src/routes/subscribe'
import makeServiceWorkerEnv from 'service-worker-mock'

declare const global: Record<string, unknown>

describe('handle', () => {
  beforeEach(() => {
    Object.assign(global, makeServiceWorkerEnv())
    jest.resetModules()
  })

  test('handle GET', async () => {
    const result = await handleSubscribe(new Request('/', { method: 'GET' }), {
      AIRTABLE_API_KEY: '',
      AIRTABLE_BASE_ID: '',
      AIRTABLE_TABLE_NAME: '',
      AIRTABLE_VOLUNTEERS_TABLE_NAME: '',
    })
    expect(result.status).toEqual(200)
    const text = await result.text()
    expect(text).toEqual('request method: GET')
  })
})
