import { useSession, signIn, signOut } from 'next-auth/react'
import { useEffect } from 'react'
import Link from 'next/link';


const AuthExample = () => {
  const { data: session, status } = useSession()

  useEffect(() => {
    console.log(session)
  }, [session])

    if (session || status == "authenticated") {
        return (
            <>
                Signed in as {session?.user?.email} <br />
                <button type="button" onClick={() => signOut()}>
                    Sign out
                </button>
            </>
        )
    } else if (status == "unauthenticated") {
        return (
            <>
                Not signed in <br />
                <button type="button" onClick={() => signIn()}>
                    Sign in
                </button>
                <br />
                <Link href="/user/auth-form">
                    <a>Sign Up</a>
                </Link>
            </>
        )
    }
}

export default AuthExample
