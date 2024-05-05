import jwt, { Jwt, JwtPayload, SignOptions } from 'jsonwebtoken'

const KEY = process.env.PRIVATE_KEY

export const createToken = (claims: object) => {
  const options: SignOptions = {
    algorithm: 'HS256',
    expiresIn: '2h',
  }

  return jwt.sign(claims, KEY, options)
}

export const verifyToken = (token: string): JwtPayload => {
  let payload: JwtPayload
  try {
    payload = jwt.verify(token, KEY, { algorithms: ['HS256'] }) as JwtPayload
  } catch {
    return null
  }

  return payload as JwtPayload
}