import { getProviders, signIn } from 'next-auth/react'
import { useRouter } from 'next/router'
import Background from '@/views/Main/Background'
import { Box, Button, Typography, styled } from '@mui/material'

import type { Provider } from 'next-auth/providers'
import type { NextPage } from 'next'

// https://github.com/nextauthjs/next-auth/blob/main/packages/next-auth/src/core/pages/signin.tsx

/**
 * Custom sign in page.
 * TODO: needs to style it :)
 */

type Props = {
  providers: Provider
}

const DEFAULT_CALLBACK = '/dashboard'

const StyledButton = styled(Button)({
    padding: '10px 40px',
    borderRadius: '50px',
    backgroundColor: '#893422',
    color: '#ffe8c9',
    boxShadow:
        'rgb(0 0 0 / 20%) 0px 3px 3px -2px, rgb(0 0 0 / 14%) 0px 3px 4px 0px, rgb(0 0 0 / 12%) 0px 1px 8px 0px',
    transition: 'transform 0.25s ease',
    '&:hover': {
        backgroundColor: '#792d1e',
        transform: 'scale(1.04)',
    },
    '&:active': {
        transform: 'scale(1)',
    },
})
const SignIn = ({ providers }: Props) => {
  const { query } = useRouter()

  return (
      <>
          <div style={{ height: '100%', width: '100%', position: 'fixed', background: 'linear-gradient(#1c2634 60%,  #694028)' }}>
              <div style={{
                  backgroundImage: 'url(/images/main/stars.svg)',
                  backgroundRepeat: 'repeat',
                  backgroundSize: 'contain',
                  backgroundPosition: 'center',
                  height: '60vh',
                  width: '100%',
                  position: 'absolute',
                  top: 0,
                  left: '50%',
                  transform: 'translate(-50%)'
              }}>
                  <div style={{
                      marginLeft: '555px', marginTop: '200px', background:'white', height:'40vh', width:'50vh', borderRadius:'20px'
                  }}>
                      <Typography
                          sx={{ fontSize: '50px', textAlign:'center' }}
                      >
                          Sign In
                      </Typography>
                      {Object.values(providers).map((provider) => (
                          <div key={provider.name} style={{ textAlign: 'center' }}>
                              <br />
                              <StyledButton
                            onClick={() =>
                              signIn(provider.id, {
                                callbackUrl: (query?.redirect as string) || DEFAULT_CALLBACK,
                              })
                            }
                            type="button"
                          >
                                  Sign in with {provider.name}
                              </StyledButton
                              >
                        </div>
                      ))}
                      </div>
                  </div>
              </div>
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
