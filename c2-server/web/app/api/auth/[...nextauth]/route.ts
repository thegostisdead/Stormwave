import NextAuth, {NextAuthOptions} from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
export const authOptions: NextAuthOptions  = {
    pages: {
        signOut: '/logout',
        error: '/auth/error', // Error code passed in query string as ?error=
    },
    secret: process.env.JWT_SECRET,
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: { label: "Username", type: "text", placeholder: "jsmith" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {

                if (!credentials?.username || !credentials.password) {
                    return null;
                }

                const res = await fetch("http://localhost:5000/", {
                    method: 'POST',
                    body: JSON.stringify(credentials),
                    headers: { "Content-Type": "application/json" }
                })
                const user = await res.json()

                // If no error and we have user data, return it
                if (res.ok && user) {
                    return user
                }
                // Return null if user data could not be retrieved
                return null
            }
        })
    ],
    debug: process.env.NODE_ENV === 'development',
    callbacks: {

    },
}

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
