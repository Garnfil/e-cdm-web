import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { cookies } from "next/headers";

export function middleware(req) {
    // Parse cookies from the request
    // const cookies = jsCookie.get('session');
    const sessionCookie = cookies().get("session")?.value;
    ; // Access the 'session' cookie
    let userRole = null;

    // Check if session cookie exists and parse the session data
    if (sessionCookie) {
        const session = JSON.parse(sessionCookie);
        userRole = session.user.role; // The role of the user (instructor, student, or parent)
    }

    // Get the pathname of the request (e.g., "/instructor/dashboard")
    const { pathname } = req.nextUrl;

    // Protect instructor routes
    if (pathname.startsWith('/instructor')) {
        if (userRole !== 'instructor') {
            return NextResponse.redirect(new URL('/instructor-login', req.url)); // Redirect to unauthorized page
        }
    }

    // Protect student routes
    if (pathname.startsWith('/student')) {
        if (userRole !== 'student') {
            return NextResponse.redirect(new URL('/student-login', req.url));
        }
    }

    // Protect parent routes
    if (pathname.startsWith('/parent')) {
        if (userRole !== 'parent') {
            return NextResponse.redirect(new URL('/parent-login', req.url));
        }
    }

    // If everything is fine, continue with the request
    return NextResponse.next();
}

export const config = {
    matcher: ['/instructor/:path*', '/student/:path*', '/parent/:path*'], // Apply middleware only to these routes
};
