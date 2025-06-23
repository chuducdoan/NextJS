import { withAuth } from "next-auth/middleware"

export default withAuth({
  // Matches the pages config in `[...nextauth]`
  pages: {
    signIn: "/auth/signin",
    error: "/error",
  },
})

// See "Matching Paths" below to learn more
export const config = { matcher: ["/playlist", "/track/upload"] }