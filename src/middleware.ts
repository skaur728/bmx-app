// eslint-disable-next-line no-restricted-exports
export { default } from 'next-auth/middleware'

// https://next-auth.js.org/configuration/nextjs#advanced-usage

// protect ONLY api routes. No need to protect other pages since they already use useAuth() hook to get user data
export const config = {
  matcher: [
    // Don't protect api/slack or anything that *doesn't* start with api/
    '/((?!api/slack|(?!api/).*).*)',
  ],
}
