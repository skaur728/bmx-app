import { getProviders, signIn } from 'next-auth/react'
import { useRouter } from 'next/router'

import type { Provider } from 'next-auth/providers'

// https://github.com/nextauthjs/next-auth/blob/main/packages/next-auth/src/core/pages/signin.tsx

/**
 * Custom sign in page.
 * TODO: needs to style it :)
 */

type Props = {
  providers: Provider
}

const SignIn = ({ providers }: Props) => {
  const { query } = useRouter()

  return (
    <>
      {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <button
            onClick={() =>
              signIn(provider.id, {
                callbackUrl: query?.redirect as string,
              })
            }
            type="button"
          >
            Sign in with {provider.name}
          </button>
        </div>
      ))}
    </>
  )
}

export default SignIn

export async function getServerSideProps() {
  const providers = await getProviders()

  return {
    props: { providers },
  }
}
