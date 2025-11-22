"user server"
import { NextResponse } from "next/server"
import type {NextRequest} from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "./utils/auth-options"

const protectedRoutes = ["/"]
async function proxy(request : NextRequest) {
    const session = await getServerSession(authOptions)
    const { pathname } = request.nextUrl;
    const isProtected = protectedRoutes.some((route) => 
        pathname.startsWith(route)
    );
    if (isProtected && !session) {
        return NextResponse.redirect(new URL("/api/auth/signin", request.url));
    }

    return NextResponse.next();
}
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|api/auth).*)'],
};

export default proxy