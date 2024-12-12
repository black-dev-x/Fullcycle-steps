import 'server-only'
import { getIronSession } from 'iron-session'
import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'

export type User = {
  tenantId: string;
  username: string;
}
export type Token = {
  token: string;
}

const secret = 'mybigpasswordthathas32charactersithinkprobablyithasit'
const ttl = 60 * 60 * 24 * 7

export const getSession = async () => {
  const cookieStore = await cookies();
  return getIronSession<Token>(cookieStore, {
    password: secret,
    cookieName: 'test',
    ttl,
    cookieOptions: {
      secure: false,
      httpOnly: true,
      sameSite: 'lax',
      path: '/'
    }
  })
}

export const saveSession = async (token: string) => {
  const session = await getSession()
  session.token = token;
  await session.save()
}

export const destroySession = async () => {
  const session = await getSession()
  session.destroy();
}

export const getUser = async (): Promise<User | undefined> => {
  const session = await getSession()
  if(!session.token) return
  return await jwt.decode(session.token) as User
}
