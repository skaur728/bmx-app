import { Box, Stack, Typography } from '@mui/material'
import { getProviders, signIn } from 'next-auth/react'
import Image from 'next/image'
import { useRouter } from 'next/router'

import Head from '@/components/Head'
import { Button } from '@/styles/custom'
import Background from '@/views/Main/Background'

import Card from '../../../public/images/cards/card2.svg'
import GithubLogo from '../../../public/images/logos/Github.png'
import GoogleLogo from '../../../public/images/logos/Google.svg'
import OutlookLogo from '../../../public/images/logos/Outlook.png'

import type { Provider } from 'next-auth/providers'

// https://github.com/nextauthjs/next-auth/blob/main/packages/next-auth/src/core/pages/signin.tsx

/**
 * Custom sign in page.
 */

type Props = {
  providers: Provider
}

const DEFAULT_CALLBACK = '/dashboard'

const SignIn = ({ providers }: Props) => {
  const { query } = useRouter()

  return (
    <>
      <Head title="Sign In | BoilerMake X" />
      <Background />

      <Box
        sx={{
          position: 'absolute',
          width: '90vw',
          maxWidth: '500px',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        <Image src={Card} layout="responsive" alt="card" priority />
      </Box>

      <Box
        sx={{
          width: '90vw',
          maxWidth: '500px',
          position: 'absolute',
          left: '50%',
          top: { xs: '48%', sm: '45%' },
          transform: 'translate(-50%, -50%)',
        }}
      >
        <Stack alignItems="center" spacing={2}>
          <Typography
            sx={{
              fontSize: '50px',
              textAlign: 'center',
              color: '#000000de',
            }}
          >
            Sign In
          </Typography>

          {query?.error === 'OAuthAccountNotLinked' && (
            <Typography sx={{ color: '#d81b60' }}>
              Account with email already exists!
            </Typography>
          )}

          <Stack spacing={3} alignItems="center">
            {Object.values(providers).map((provider) => (
              <Box key={provider.name}>
                <Button
                  onClick={() =>
                    signIn(provider.id, {
                      callbackUrl:
                        (query?.redirect as string) || DEFAULT_CALLBACK,
                    })
                  }
                  type="button"
                >
                  {(() => {
                    if (provider.name === 'Azure Active Directory')
                      return (
                        <Stack direction="row" alignItems="center" spacing={1}>
                          <Image
                            src={OutlookLogo}
                            width="32"
                            height="32"
                            alt="Outlook"
                          />
                          <Typography
                            sx={{ fontSize: { xs: '1.5rem', sm: '2rem' } }}
                            component="span"
                          >
                            Outlook
                          </Typography>
                        </Stack>
                      )

                    if (provider.name === 'Google')
                      return (
                        <Stack direction="row" alignItems="center" spacing={1}>
                          <Image
                            src={GoogleLogo}
                            width="32"
                            height="32"
                            alt="Outlook"
                          />
                          <Typography
                            sx={{ fontSize: { xs: '1.5rem', sm: '2rem' } }}
                            component="span"
                          >
                            Google
                          </Typography>
                        </Stack>
                      )

                    if (provider.name === 'GitHub')
                      return (
                        <Stack direction="row" alignItems="center" spacing={1}>
                          <Image
                            src={GithubLogo}
                            width="32"
                            height="32"
                            alt="Github"
                          />
                          <Typography
                            sx={{ fontSize: { xs: '1.5rem', sm: '2rem' } }}
                            component="span"
                          >
                            GitHub
                          </Typography>
                        </Stack>
                      )
                    return provider.name
                  })()}
                </Button>
              </Box>
            ))}
          </Stack>
          <Button href="/">
            <Typography
              sx={{ fontSize: { xs: '1.5rem', sm: '2rem' } }}
              component="span"
            >
              Return Home
            </Typography>
          </Button>
        </Stack>
      </Box>
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
