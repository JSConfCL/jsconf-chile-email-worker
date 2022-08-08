import { json } from 'itty-router-extras'

export function simpleResponse(statusCode: number, message: string) {
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
