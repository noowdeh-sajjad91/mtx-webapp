"use client"
import { Box, Container, Typography, styled } from "@mui/material";
import Image from "next/image";
import SwipeableEdgeDrawer from "../components/SwipeableDrawer"
import { ButtonCustom } from "../(site)/components/Swiper";
import Link from "next/link";

const Exerciseing = () => {
    return (
        <>
            <NavTop>
                <Container
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "10px"
                    }}
                >
                    <Link href={"/movement"}>
                        <Box sx={{
                            padding: "10px",
                            backgroundColor: "rgb(227 227 227 / 30%)",
                            width: "44px",
                            borderRadius: "50%",
                            height: "44px",
                            display: "flex",
                            justifyContent: "center",
                        }}
                        // onClick={handleClosSwipeable}
                        >
                            <Image src={"/icons/back.svg"} width={20} height={20} alt='back' />
                        </Box>
                    </Link>
                    <Box>
                        <Typography color="black" variant="xmedium">time left : 120 s</Typography>
                        <Typography color="secoundryM">exercise : Arm rise</Typography>
                    </Box>
                    <Box sx={{ position: "relative" }}>
                        <Image src={"/icons/sound.svg"} width={30} height={30} alt="sound" />
                    </Box>
                </Container>
            </NavTop>
            <Box>
                <Box sx={{ position: "relative" }}>
                    <img src={"/img/person-e.png"} />

                    <Box sx={{
                        position: "absolute", top: '63%',
                        display: "flex",
                        width: "90%",
                        left: "6%",
                        gap: "8px"
                    }}>
                        <Box sx={{
                            backgroundColor: "rgba(0, 0, 0, 0.6)",
                            display: 'flex',
                            justifyContent: "space-around",
                            borderRadius: "14px",
                            width: "90%",
                            left: "6%",
                            padding: "8px"
                        }}>
                            <Box>
                                <Typography color="opacityGray">0</Typography>
                                <Typography color="opacityGray">score</Typography>
                            </Box>
                            <Box>
                                <Typography color="opacityGray">RIGHT hand</Typography>
                                <Typography color="opacityGray">MOVMENT</Typography>
                            </Box>
                        </Box>
                        <Box
                            sx={{
                                backgroundColor: "rgba(0, 0, 0, 0.6)",
                                borderRadius: "14px",
                                padding: "8px",
                                display: "flex",
                                alignItems: 'center'
                            }}
                        >
                            <Image src={"/icons/camera-switch.svg"} width={25} height={25} alt="camera" />
                        </Box>
                    </Box>
                </Box>
                <SwipeableEdgeDrawer>
                    <Typography color='black' variant='xmedium' component={"h3"} sx={{ textAlign: "center", marginBottom: "20px" }}>Start to Exerciseing</Typography>
                    <Box sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "15px"
                    }}>
                        <ButtonCustom>
                            Start
                        </ButtonCustom>
                    </Box>
                </SwipeableEdgeDrawer>
            </Box>
        </>

    )
}

const NavTop = styled(Box)({
    backgroundColor: "white",
    display: 'flex',
    justifyContent: "space-between",
    borderRadius: "16px"
})
export default Exerciseing;