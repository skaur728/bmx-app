import { Box, Stack, Typography, styled } from '@mui/material'
import { getProviders, signIn } from 'next-auth/react'
import { useRouter } from 'next/router'

import { Button } from '@/styles/custom'
import Background from '@/views/Main/Background'

import type { Provider } from 'next-auth/providers'

// https://github.com/nextauthjs/next-auth/blob/main/packages/next-auth/src/core/pages/signin.tsx

/**
 * Custom sign in page.
 * TODO: needs to style it :)
 */

type Props = {
  providers: Provider
}

const DEFAULT_CALLBACK = '/dashboard'

const SignIn = ({ providers }: Props) => {
  const { query } = useRouter()

  return (
    <Box sx={{ position: 'relative', width: '100vw', height: '100vh' }}>
      <Background />
      <Stack
        alignItems="center"
        sx={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          maxWidth: '900px',
          width: '80vw',
        }}
      >
        <Stack
          alignItems="center"
          sx={{
            backgroundColor: '#ffffff',
            py: 5,
            width: '100%',
            zIndex: 2,
          }}
        >
          <Typography
            sx={{ fontSize: '50px', textAlign: 'center', color: '#ffe8c9' }}
          >
            Sign In
          </Typography>
          <Stack>
            {Object.values(providers).map((provider) => (
              <Button
                onClick={() =>
                  signIn(provider.id, {
                    callbackUrl:
                      (query?.redirect as string) || DEFAULT_CALLBACK,
                  })
                }
                key={provider.name}
                type="button"
                sx={{ fontSize: '2rem' }}
              >
                Sign in with{' '}
                {provider.name === 'Azure Active Directory'
                  ? 'Outlook'
                  : provider.name}
              </Button>
            ))}
          </Stack>
        </Stack>
      </Stack>
    </Box>
  )
}

export default SignIn

export async function getServerSideProps() {
  const providers = await getProviders()

  return {
    props: { providers },
  }
}
