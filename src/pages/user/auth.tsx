import { useSession, signIn, signOut } from 'next-auth/react'
import { useEffect } from 'react'

const AuthExample = () => {
  const { data: session } = useSession()

  useEffect(() => {
    console.log(session)
  }, [session])

  if (session) {
    return (
      <>
        Signed in as {session?.user?.email} <br />
        <button type="button" onClick={() => signOut()}>
          Sign out
        </button>
      </>
    )
  }
  return (
    <>
      Not signed in <br />
      <button type="button" onClick={() => signIn()}>
        Sign in
      </button>
    </>
  )
}

export default AuthExample
