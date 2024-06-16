import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
	const currentUser = request.cookies.get('username')
	const isFinished = request.cookies.get('isFinishedTest')
	if (currentUser && !request.nextUrl.pathname.startsWith('/dashboard')) {
		return Response.redirect(new URL('/dashboard', request.url))
	}

	if (!currentUser && !request.nextUrl.pathname.startsWith('/login')) {
		return Response.redirect(new URL('/login', request.url))
	}
	if (isFinished && request.nextUrl.pathname.startsWith('/quizzes')) {
		return Response.redirect(new URL('/quizzes/[quizId]/end', request.url))
	}
}

export const config = {
	matcher: ['/', '/dashboard', '/quizzes'],
}
