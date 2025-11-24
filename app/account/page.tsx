
"use client"
import React from "react"
import SwipeableEdgeDrawer from "../components/SwipeableDrawer"
import { Box, styled, Typography } from "@mui/material"
import Image from "next/image"
import { motion, useAnimation } from 'framer-motion'
import Link from "next/link"
import MuiLink from "@mui/material/Link";
import { withAuthRedirect } from "../components/withAuthRedirect"

const Account = () => {
  return (
    <>
      <Box sx={{ position: "relative", height: "90vh" }}>
        <Box sx={{ width: "100%", height: "56%" }}>
          <img style={{
            width: "100%",
            height: "100%",
            objectFit: "cover"
          }} src="/img/account/sporthomem.png" alt="sporthomen" width={40} height={50} />
        </Box>

      </Box>


      <SwipeableEdgeDrawer>
        <Typography color='black' variant='large' component={"h3"} sx={{ textAlign: "center", marginBottom: "20px" }}>Wellcom To MTX</Typography>
        <Box sx={{
          display: "flex",
          flexDirection: "column",
          gap: "15px"
        }}>
          <SocialBox href={"#"}>
            <Image src="/icons/account/google.svg" alt="" width={20} height={20} />
            <Typography>Sign up with Google</Typography>
          </SocialBox>
          <SocialBox href={""}>
            <Image src="/icons/account/Apple.svg" alt="" width={19} height={19} />
            <Typography>Continue with Apple</Typography>
          </SocialBox>
          <SocialBox href={"/account/createAccount"}>
            <Image src="/icons/account/Subtract.svg" alt="" width={19} height={19} />
            <Typography>Sign up with Email</Typography>
          </SocialBox>

          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "3px", marginBottom: "76px" }}>
            <Typography color='lightGray' variant='small'>Already have an Account?</Typography>
            <MuiLink component={Link} href={"/account/login"} color="cyan" underline="none">
              Sign In
            </MuiLink>
          </Box>
        </Box>
      </SwipeableEdgeDrawer>
    </>
  )
}

const SwipeModal = styled(motion.div)(({ theme }) => ({
  position: "absolute",
  bottom: 0,
  width: "100%",
  height: "56%",
  backgroundColor: "rgba(255, 255, 255, 1)",
  borderTopRightRadius: "30px",
  borderTopLeftRadius: "30px",
  padding: "30px"
}));

const SocialBox = styled(Link)(({ theme }) => ({
  backgroundColor: theme.palette.gray.main,
  display: "flex",
  justifyContent: "center",
  color: theme.palette.black.main,
  width: "100%",
  gap: "10px",
  alignItems: "center",
  borderRadius: "60px",
  padding: "12px"
}))
export default  withAuthRedirect(Account)