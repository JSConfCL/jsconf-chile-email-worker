import { json } from 'itty-router-extras'
import { attachCorsHeader } from '../middlewares'

export const simpleResponse = (statusCode: number, message: string) => {
  return attachCorsHeader(
    json(
      {
        message: message,
        status: statusCode,
      },
      {
        status: statusCode,
      },
    ),
  )
}
