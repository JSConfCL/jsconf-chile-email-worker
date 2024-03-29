export const handleCors =
  (options: Record<string, any> = {}) =>
  (request: Request) => {
    const {
      origin = '*',
      methods = 'GET, POST, PATCH, DELETE',
      headers = 'referer, origin, content-type',
      maxAge = null,
      allowCredentials = false,
    } = options

    if (
      request.headers.get('Origin') !== null &&
      request.headers.get('Access-Control-Request-Method') !== null
    ) {
      const corsHeaders: Record<string, any> = {
        'Access-Control-Allow-Origin': origin,
        'Access-Control-Allow-Methods': methods,
        'Access-Control-Allow-Headers': headers,
      }

      if (allowCredentials) {
        corsHeaders['Access-Control-Allow-Credentials'] = 'true'
      }

      if (maxAge) {
        corsHeaders['Access-Control-Max-Age'] = maxAge
      }

      return new Response(null, {
        status: 204,
        headers: corsHeaders,
      })
    }

    return new Response(null, {
      headers: {
        Allow: `${methods}, HEAD, OPTIONS`,
      },
    })
  }

export const attachCorsHeader = (
  response: Response,
  options: Record<string, string> = {},
) => {
  response.headers.set('Access-Control-Allow-Origin', options.origin || '*')
  return response
}
