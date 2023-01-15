import { Box, Button, Link, Stack, Typography, styled, CssBaseline, Card, CardActionArea, CardContent } from '@mui/material'
import { useUserAgent } from 'next-useragent'
import Image from 'next/image'
import Countdown from 'react-countdown'
import dynamic from 'next/dynamic'


import useRedirect from '@/hooks/useRedirect'
import { createTheme, responsiveFontSizes } from '@mui/material/styles'


import Arrow from '../../../public/images/dayOf/time_left.svg'
import MLHImg from '../../../public/images/main/mlh-trust-badge-2023-white.svg'
import TentImg from '../../../public/images/about/info-tent.svg'
import TicketBoothImg from '../../../public/images/testimonials/ticket-booth.png'
import SlackImg from '../../../public/images/dayOf/slack_asset.svg'

import type { NextPageContext } from 'next'
import { ThemeProvider } from '@emotion/react'

const carnivalTheme = createTheme({
    typography: {
        fontFamily: '"Carnival", sans-serif',
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                '@font-face': {
                    fontFamily: 'Carnival',
                    fontStyle: 'normal',
                    fontDisplay: 'swap',
                    fontWeight: 500,
                    src: 'url("/assets/fonts/CarnivalRimmed.ttf")',
                },
            },
        },
    },
});

const InfoTent = dynamic(() => import('@/components/About/InfoTent'))

const dayOfLanding = ({ uaString }: { uaString?: string }) => {
    const ua = useUserAgent(uaString || window.navigator.userAgent)

    const { redirect } = useRedirect()

    return (
        <Box
            sx={{
                height: '100vh',
                width: '100vw',
                position: 'relative',
                marginRight: { xs: '80vw', sm: 0 },
            }}
        >
            <Stack
                alignItems="center"
                sx={{
                    position: 'absolute',
                    left: 20,
                    top: 26,
                }}
            >
                <Box
                    sx={{
                        width: { xs: 35, sm: 45 },
                        transition: 'transform 250ms ease',
                        '&:hover': {
                            transform: 'scale(1.04)',
                        },
                        cursor: 'pointer',
                        zIndex: 10,
                    }}
                    onClick={() => window.open('https://mlh.io/', '_blank')}
                >
                    <Image src={MLHImg} layout="responsive" alt="mlh" />
                </Box>
                <Link
                    href="https://static.mlh.io/docs/mlh-code-of-conduct.pdf"
                    target="_blank"
                    sx={{
                        textDecoration: 'none',
                        color: '#ffffff',
                        zIndex: 10,
                        fontSize: { xs: '0.7rem', sm: '0.8rem' },
                        fontFamily: 'Smythe'
                    }}
                >
                    Code of Conduct
                </Link>
            </Stack>

            <Box
                sx={{
                    position: 'absolute',
                    width: { xs: 160, sm: 200, md: 700 },
                    mt: 5,
                    ml: 5,
                }}
            >
                <Image
                    src={Arrow}
                    layout="responsive"
                    priority
                    alt="Countdown"
                    style={{ pointerEvents: 'none' }}
                />
                
            </Box>
            <Box
                sx={{
                    position: 'absolute',
                    mt: 26,
                    ml: 32,
                }}
            >
                <Countdown
                    date='2023-01-22T11:00:00.000Z'
                    daysInHours
                    renderer={(props) => (
                        <Typography
                            sx={{ color: '#551600', textAlign: 'center', fontSize: 65 }}
                        >
                            {props.formatted.hours}&nbsp; :&nbsp;{' '}
                            {props.formatted.minutes} &nbsp;: &nbsp;{props.formatted.seconds}
                        </Typography>
                    )}
                />
            </Box>
            <Box
                sx={{
                    position: 'absolute',
                    width: { xs: 75, sm: 100, md: 250 },
                    mt: 60,
                    ml: 30,
                }}
            >
                <Image
                    src={TicketBoothImg}
                    layout="responsive"
                    priority
                    alt="Submit Booth"
                    style={{ pointerEvents: 'none' }}
                />

            </Box>
            <ThemeProvider theme={carnivalTheme}>
                <CssBaseline />
                <Box
                    sx={{
                        position: 'absolute',
                        width: { xs: 75, sm: 100, md: 250 },
                        mt: 77,
                        ml: 37,
                        transition: 'transform 250ms ease',
                        '&:hover': {
                            transform: 'scale(1.04)',
                        },
                    }}
                    onClick={() => window.open('https://boilermake-x.devpost.com/?preview_token=TITPUBb%2BENHb4S6TUt2SdYVI9P5Jz7zv7%2FqlPn7G0Rs%3D', '_blank')}
                >
                    <Typography
                        variant="h3"
                        sx={{
                            fontFamily: 'Carnival, sans-serif',
                            fontSize: { sm: '1rem', md: '2rem', lg: '2rem' },
                            color: '#551600'
                        }}
                    >
                        SUBMIT PROJECT
                    </Typography>

                </Box>
            </ThemeProvider>
            <Box
                sx={{
                    position: 'absolute',
                    width: { xs: 75, sm: 100, md: 475 },
                    mt: 25,
                    ml: 105,
                    zIndex:11,
                }}
            >
                <InfoTent />
            </Box>

            <ThemeProvider theme={carnivalTheme}>
                <CssBaseline />
                <Box
                    sx={{
                        position: 'absolute',
                        width: { xs: 75, sm: 100, md: 475 },
                        mt: 47,
                        ml: 110,
                        zIndex:12
                    }}
                >
                    <Typography
                        variant="h3"
                        sx={{
                            fontFamily: 'Carnival, sans-serif',
                            fontSize: { sm: 18, md: 20, lg: 25 },
                            color: '#FFE7CA'
                        }}
                    >
                        LIVE ANNOUNCEMENTS:
                    </Typography>

                </Box>
            </ThemeProvider>
            <Box
                sx={{
                    position: 'absolute',
                    width: { xs: 150, sm: 170, md: 200 },
                    mt: 5,
                    ml: 145,
                    zIndex:10,
                    cursor: 'pointer',
                    transition: 'transform 250ms ease',
                    '&:hover': {
                        transform: 'scale(1.04)',
                    },
                }}
            >
                
                <Image
                    src={SlackImg}
                    layout="responsive"
                    alt="Slack"
                    onClick={() => window.open('https://boilermakex.slack.com')}
                />

            </Box>
            <Box
                sx={{
                    textAlign: 'center',
                    color: '#ffe8c9',
                    pt: { xs: 20, sm: 12, md: 10 },
                    position: 'absolute',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '100%',
                    zIndex: 1,
                }}
            >
                {!ua.isMobile ? (
                    <>
                        <Typography
                            variant="h1"
                            sx={{
                                fontFamily: 'SpringFair, sans-serif',
                                fontSize: { sm: '3rem', md: '4rem', lg: '5rem' },
                            }}
                        >
                            BoilerMake
                        </Typography>
                        <br />
                        <Typography
                            variant="h1"
                            sx={{
                                fontFamily: 'SpringFair, sans-serif',
                                fontSize: { sm: '5rem', md: '6rem', lg: '7rem' },
                            }}
                        >
                            X
                        </Typography>
                        
                    </>
                ) : (
                    <Box sx={{ maxWidth: '375px', mx: 'auto' }}>
                        
                        <Typography
                            variant="h1"
                            sx={{ fontFamily: 'SpringFair, sans-serif', fontSize: '2.4rem' }}
                        >
                            BoilerMake X
                        </Typography>

                    </Box>
                )}
            </Box>
        </Box>
    )
}

export default dayOfLanding

export function getServerSideProps(context: NextPageContext) {
    return {
        props: {
            uaString: context?.req?.headers['user-agent'],
        },
    }
}
