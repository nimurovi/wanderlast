import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 // path to your Better Auth server instance
import { headers } from "next/headers";
import { auth } from './lib/auth';
 
export async function proxy(request: NextRequest) {


const session = await auth.api.getSession({
    headers: await headers() // you need to pass the headers object.
})
const user = session?.user;
if(!user) {
  return NextResponse.redirect(new URL('/login', request.url))
}
   
}
 

export const config = {
  matcher: ['/add-destination', '/destinations/:path', '/my-bookings' ] 
}