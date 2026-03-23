import { clerkMiddleware, createRouteMatcher, clerkClient } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

const isAdminRoute = createRouteMatcher(['/admin(.*)'])

export default clerkMiddleware(async (auth, req) => {
  if (isAdminRoute(req)) {
    await auth.protect()

    const { userId, orgRole } = await auth()

    // If org is already active and user is admin, allow
    if (orgRole === 'org:admin') return

    // Fallback: check org memberships for users without an active org
    const client = await clerkClient()
    const memberships = await client.users.getOrganizationMembershipList({ userId })

    const isAdmin = memberships.data.some(m => m.role === 'org:admin')

    if (!isAdmin) {
      return NextResponse.redirect(new URL('/unauthorized', req.url))
    }
  }
})

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
}
