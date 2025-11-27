"use client"
import React from "react";
import { Box, Container, styled, Typography, Grid, Button } from "@mui/material";
import { useAnimation, motion } from 'framer-motion'
import MuiLink from "@mui/material/Link";
import Link from "next/link";
import Image from "next/image";
import { ButtonCustom } from "../(site)/components/Swiper";
import { usePathname, useRouter } from "next/navigation";
import { useAppSelector } from "@/Store/reducers";
import { RootState } from "@/Store/store";

const Menu = () => {
    const pathname = usePathname();
    const router = useRouter();
    const profileDetailData = useAppSelector((state: RootState) => state.reducer.user.profileDetail)
    const token = useAppSelector((state: RootState) => state.reducer.user.currentUser.token);

    // چک کردن توکن
    React.useEffect(() => {
        const publicPaths = ['/account/login', '/account/createAccount','/account','/account/registeraccount','/account/verfiy'];

        if (!token && !publicPaths.includes(pathname)) {
            router.push('/account/login');
        }
    }, [token, pathname, router]);

    // اگر توکن نداریم و در صفحه عمومی نیستیم، منو را نشان نده
    if (!token && !['/account/login', '/account/createAccount','/account','/account/registeraccount','/account/verfiy'].includes(pathname)) {
        return null;
    }
    const handleLinkClick = (href: string, e: React.MouseEvent) => {
        if (!profileDetailData.has_complete_profile) {
            e.preventDefault();
            // optional: show toast or message
            alert("Please complete your profile first");
            return;
        }
        router.push(href);
    }
    return (

        <MenuBox>
            <MuiLink component={Link} href={"#"} color="cyan" underline="none">
                <Image src={"/icons/menu/search.svg"} onClick={(e) => handleLinkClick("#", e)} alt="search" width={24} height={24} />
            </MuiLink>
            <MuiLink component={Link} href={"/wallet"} color="cyan" underline="none">
                <Image src={"/icons/menu/wallet.svg"} alt="wallet" onClick={(e) => handleLinkClick("/wallet", e)} width={24} height={24} />
            </MuiLink>
            <MuiLink component={Link} href={"/home"} color="cyan" underline="none">
                <Image src={"/icons/menu/home.svg"} alt="home" onClick={(e) => handleLinkClick("/home", e)} width={24} height={24} />
            </MuiLink>
            <MuiLink component={Link} href={"/movement"} color="cyan" underline="none">
                <Image src={"/icons/menu/hand.svg"} alt="hand" onClick={(e) => handleLinkClick("/movement", e)} width={24} height={24} />
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
    marginBottom: "11px"
}));

export default Menu;