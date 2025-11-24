"use client"
import React from "react";
import { Box, Container, styled, Typography, Grid, Button } from "@mui/material";
import { useAnimation, motion } from 'framer-motion'
import MuiLink from "@mui/material/Link";
import Link from "next/link";
import Image from "next/image";
import { ButtonCustom } from "../(site)/components/Swiper";


const Menu = () => {
    return (

            <MenuBox>
                <MuiLink component={Link} href={"#"} color="cyan" underline="none">
                    <Image src={"/icons/menu/search.svg"} alt="search" width={24} height={24} />
                </MuiLink>
                <MuiLink component={Link} href={"/wallet"} color="cyan" underline="none">
                    <Image src={"/icons/menu/wallet.svg"} alt="wallet" width={24} height={24} />
                </MuiLink>
                <MuiLink component={Link} href={"/home"} color="cyan" underline="none">
                    <Image src={"/icons/menu/home.svg"} alt="home" width={24} height={24} />
                </MuiLink>
                <MuiLink component={Link} href={"/movement"} color="cyan" underline="none">
                    <Image src={"/icons/menu/hand.svg"} alt="hand" width={24} height={24} />
                </MuiLink>
                <MuiLink component={Link} href={"/profile"} color="cyan" underline="none">
                    <Image src={"/icons/menu/User.svg"} alt="User" width={24} height={24} />
                </MuiLink>
            </MenuBox>

    )
}


const MenuBox = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.blue.main,
    borderRadius: "16px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px",
    // position: "absolute",
    width: "100%",
    left: 0,
    bottom: 0,
    marginBottom:"11px"
}));

export default Menu;