import { Button, styled } from '@mui/material'

import type { ButtonProps } from '@mui/material'

const StyledButton = styled(Button)({})

const CustomButton = ({ children, ...props }: ButtonProps) => (
  <StyledButton {...props}>{children}</StyledButton>
)

export default CustomButton
