import type { FC } from 'react'
import type { ButtonProps } from '@mui/material'
import { Button, styled } from '@mui/material'

const StyledButton = styled(Button)({})

const CustomButton: FC<ButtonProps> = ({ children, ...props }) => (
  <StyledButton {...props}>{children}</StyledButton>
)

export default CustomButton
