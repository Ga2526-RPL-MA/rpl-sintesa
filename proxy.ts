import { updateSession } from '@/lib/supabase/middleware';
import { type NextRequest } from 'next/server';

<<<<<<< HEAD:middleware.ts
export async function middleware(request: NextRequest) {
    return await updateSession(request);
=======
export async function proxy(request: NextRequest) {
  return await updateSession(request);
>>>>>>> 57651bd15bd2537312b16edabb21cc52d1809d36:proxy.ts
}

export const config = {
    matcher: [
        /*
         * Match all request paths except:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - images - .svg, .png, .jpg, .jpeg, .gif, .webp
         * Feel free to modify this pattern to include more paths.
         */
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
};
