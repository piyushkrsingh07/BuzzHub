import { NextResponse } from "next/server";


const protectedRoute=['/home']



export function middleware(request){

    const token = request.cookies.get('token')?.value
    console.log('see token in middlkeware',token)
        const isProtected=protectedRoute.some((route)=>request.nextUrl.pathname.startsWith(route))
  if( !token && isProtected){
return NextResponse.redirect(new URL('/auth/signIn', request.url))
  }

  return NextResponse.next();
};

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};