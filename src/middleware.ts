import type { NextRequest } from 'next/server'
 
export function middleware(request: NextRequest) {

console.log(request.headers);    
console.log(request.nextUrl.pathname);
return Response.redirect(new URL('/', request.url))
      
 
//   if (currentUser && !request.nextUrl.pathname.startsWith('/dashboard')) {
//     return Response.redirect(new URL('/dashboard', request.url))
//   }
 
//   if (!currentUser && !request.nextUrl.pathname.startsWith('/login')) {
//     return Response.redirect(new URL('/login', request.url))
//   }
}

export const config = {
    matcher: ['/notifications/:path*', '/dashboard/:path*'],
  }