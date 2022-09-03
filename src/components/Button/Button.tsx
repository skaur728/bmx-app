import { Button, styled } from '@mui/material'

import type { ButtonProps } from '@mui/material'
import type { FC } from 'react'

const StyledButton = styled(Button)({})

const CustomButton: FC<ButtonProps> = ({ children, ...props }) => (
  <StyledButton {...props}>{children}</StyledButton>
)

export default CustomButton
