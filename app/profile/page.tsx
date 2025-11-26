"use client"
import { Container, Typography, Box, styled } from "@mui/material"
import Image from "next/image"
import TabCustomize from "../components/TabCustomize"
import RenderContent from "../components/RenderContent"
import SwipeableEdgeDrawer from "../components/SwipeableDrawer"
import React from "react"
import { useDispatch, UseDispatch } from "react-redux"
import { logout } from "@/Store/reducers/user.reducer/user.reducer"
import { useRouter } from "next/navigation"
import { useCountries } from "@/api/accounts"


type ICountries = {
    country_code: string
    country_name: string
    created_at: string
    id: string
    numeric_code: string
    updated_at: string
}
const Profile = () => {

    const [showMenu, setShowMenu] = React.useState(false);
    const dispatch = useDispatch();
    const [showSwipeble, setShowSwipeble] = React.useState(false);
    const [countriesItems, setCountriesItems] = React.useState<ICountries[]>()
    const router = useRouter()

    const handleShowmenu = () => {
        setShowMenu(true)
        setShowSwipeble(true)
    }
    const handleClosemenu = () => {
        setShowMenu(false)
        setShowSwipeble(false)
    }

    const handleLogout = () => {
        dispatch(logout());
        router.push("/account/login");
    }
    return (
        <>
            <Container>
                <Box sx={{ display: 'flex', justifyContent: "space-between", paddingTop: "10px" }}>
                    <Typography variant="xtraSmall" color="black">profile</Typography>
                    <Box onClick={handleShowmenu}>
                        <Image src={"/icons/menu.svg"} width={30} height={30} alt="menu" />
                    </Box>
                </Box>

                <TabCustomize
                    style={{ width: '50%' }}
                    itemsTabs={[
                        {
                            label: "Basic Information",
                            content: (
                                <>
                                    <RenderContent type="basic" />
                                </>
                            )
                        },
                        {
                            label: "NFT",
                            content: (<div></div>)
                        }
                    ]}
                />
            </Container>

            {
                showMenu ?
                    <SwipeableEdgeDrawer>
                        <Box sx={{
                            padding: "10px",
                            backgroundColor: "rgb(227 227 227 / 30%)",
                            width: "44px",
                            borderRadius: "50%",
                            height: "44px",
                            display: "flex",
                            justifyContent: "center",
                        }}
                            onClick={handleClosemenu}
                        >
                            <Image src={"/icons/back.svg"} width={20} height={20} alt='back' />
                        </Box>
                        {/* <Typography color='black' variant='xtraSmall' component={"h3"} sx={{ marginBottom: "5px" }}>basic information</Typography> */}
                        <Box sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "15px",

                        }}>
                            <Box sx={{
                                display: "flex",
                                flexDirection: "column",
                                gap: "17px",
                            }}>
                                <Box sx={{ display: 'flex', gap: "5px", alignItems: 'center', borderBottom: "1px solid black" }}>
                                    <Image style={{ paddingBottom: "11px" }} src={"/icons/menu/home-m.svg"} width={20} height={20} alt="home" />
                                    <Typography style={{ paddingBottom: "11px" }} color="black">Home</Typography>
                                </Box>
                                <Box sx={{ display: 'flex', gap: "5px", alignItems: 'center', borderBottom: "1px solid black" }}>
                                    <Image style={{ paddingBottom: "11px" }} src={"/icons/menu/website.svg"} width={20} height={20} alt="home" />
                                    <Typography style={{ paddingBottom: "11px" }} color="black">Website</Typography>
                                </Box>

                                <Box sx={{ display: 'flex', gap: "5px", alignItems: 'center', borderBottom: "1px solid black" }}>
                                    <Image style={{ paddingBottom: "11px" }} src={"/icons/menu/crypto.svg"} width={20} height={20} alt="home" />
                                    <Typography style={{ paddingBottom: "11px" }} color="black">Crypto Tips</Typography>
                                </Box>
                                <Box sx={{ display: 'flex', gap: "5px", alignItems: 'center', borderBottom: "1px solid black" }}>
                                    <Image style={{ paddingBottom: "11px" }} src={"/icons/menu/contact.svg"} width={20} height={20} alt="home" />
                                    <Typography style={{ paddingBottom: "11px" }} color="black">Contact Us</Typography>
                                </Box>

                                <Box sx={{ display: 'flex', gap: "5px", alignItems: 'center', borderBottom: "1px solid black" }}>
                                    <Image style={{ paddingBottom: "11px" }} src={"/icons/menu/about.svg"} width={20} height={20} alt="home" />
                                    <Typography style={{ paddingBottom: "11px" }} color="black">About Us</Typography>
                                </Box>
                                <Box sx={{ display: 'flex', gap: "5px", alignItems: 'center', borderBottom: "1px solid black" }}>
                                    <Image style={{ paddingBottom: "11px" }} src={"/icons/menu/security.svg"} width={20} height={20} alt="home" />
                                    <Typography style={{ paddingBottom: "11px" }} color="black">Privacy & Terms</Typography>
                                </Box>

                                <Box sx={{ display: 'flex', gap: "5px", alignItems: 'center', borderBottom: "1px solid black" }} onClick={handleLogout}>
                                    <Image style={{ paddingBottom: "11px" }} src={"/icons/menu/logout.svg"} width={20} height={20} alt="home" />
                                    <Typography style={{ paddingBottom: "11px" }} color="black">Logout</Typography>
                                </Box>
                            </Box>
                        </Box>
                    </SwipeableEdgeDrawer >

                    : null
            }
            {
                showSwipeble && <BackgroundGray></BackgroundGray>

            }

        </>
    )
}


const BackgroundGray = styled(Box)({
    width: "100%",
    height: "100vh",
    /* background: red, */
    zIndex: 99,
    position: "absolute",
    top: 0,
    backgroundColor: "rgba(0, 0, 0, 0.46)",
})

export default Profile 