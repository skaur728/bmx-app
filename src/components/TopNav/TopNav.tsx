import {
  Avatar,
  Box,
  Button,
  Menu,
  MenuItem,
  Typography,
  styled,
} from '@mui/material'
import { signOut } from 'next-auth/react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useState } from 'react'

import useAuth from '@/hooks/useAuth'

import Logo from '../../../public/images/bmx-logo.png'

const StyledMenuItem = styled(MenuItem)({
  // backgroundColor: '#ffe8c9',
})

const TopNav = () => {
  const { user } = useAuth()
  const router = useRouter()

  const finishedProfile = user?.hasFilledProfile
  const finishedApplication = (user?.applications || ({} as IUser))['2023']

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <>
      <Box
        sx={{
          position: 'fixed',
          right: 20,
          top: 20,
          zIndex: 3,
        }}
      >
        <Button
          sx={{
            borderRadius: 4,
            padding: '4px 10px',
            maxWidth: '120px',
            backgroundColor: '#ffe8c9',
            cursor: 'pointer',
            transition: 'transform 0.25s ease',
            color: '#000000de',
            border: '2px solid #ebca9f',
            boxShadow:
              'rgb(0 0 0 / 20%) 0px 3px 3px -2px, rgb(0 0 0 / 14%) 0px 3px 4px 0px, rgb(0 0 0 / 12%) 0px 1px 8px 0px',
            '&:hover': {
              backgroundColor: '#ffe8c9',
              transform: 'scale(1.04)',
            },
            '&:active': {
              transform: 'scale(1)',
            },
          }}
          onClick={handleClick}
        >
          <Avatar
            alt={user?.name || ''}
            src={user?.image || ''}
            sx={{ width: 24, height: 24, fontSize: '0.8rem' }}
          >
            {user?.image || !user?.name
              ? ''
              : `${user.name.trim().split(' ')[0][0]} ${
                  user.name.trim().split(' ')[
                    user.name.trim().split(' ').length - 1
                  ][0]
                }`}
          </Avatar>
          <Typography
            variant="body2"
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              marginLeft: 1,
            }}
          >
            {user?.preferredName ?? user?.name}
          </Typography>
        </Button>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          transformOrigin={{ horizontal: 'center', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
        >
          <StyledMenuItem
            onClick={() => router.push('/profile')}
            selected={router.asPath === '/profile'}
          >
            Profile
          </StyledMenuItem>
          {finishedProfile && (
            <StyledMenuItem
              onClick={() => router.push('/application')}
              selected={router.asPath === '/application'}
            >
              Application
            </StyledMenuItem>
          )}
          {finishedApplication && (
            <StyledMenuItem
              onClick={() => router.push('/dashboard')}
              selected={router.asPath === '/dashboard'}
            >
              Dashboard
            </StyledMenuItem>
          )}
          <StyledMenuItem onClick={() => signOut()}>Sign Out</StyledMenuItem>
        </Menu>
      </Box>

      <Box
        sx={{
          position: 'fixed',
          left: 20,
          top: 20,
          zIndex: 3,
          borderRadius: '50%',
          width: 32,
          height: 32,
          cursor: 'pointer',
          transition: 'transform 0.25s ease',
          boxShadow:
            'rgb(0 0 0 / 20%) 0px 3px 3px -2px, rgb(0 0 0 / 14%) 0px 3px 4px 0px, rgb(0 0 0 / 12%) 0px 1px 8px 0px',
          '&:hover': {
            transform: 'scale(1.1)',
          },
          '&:active': {
            transform: 'scale(1)',
          },
        }}
        onClick={() => router.push('/')}
      >
        <Image src={Logo} alt="logo" width="32" height="32" />
      </Box>
    </>
  )
}

export default TopNav
