import { Box, styled } from '@mui/system'
import React from 'react'

const StyledHeader = styled(Box)(() =>({
    padding:"0 15px",
    height: "64px",
    display: "flex",
    alignItems: "center",
}))

export const SideBarHeader = () => {
  return (
    <StyledHeader>LOGO</StyledHeader>
  )
}
