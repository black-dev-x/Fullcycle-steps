import { getSession } from '@/utils/session'
import { NextRequest, NextResponse } from 'next/server'

export const middleware = async (req: NextRequest) => {
  const session = await getSession()
  if (!session.token) {
    return NextResponse.redirect(new URL('/login', req.url))
  }
  return NextResponse.next()
}

export const config = { matcher: ['/dashboard', '/projects/:path*'] }
export default middleware
