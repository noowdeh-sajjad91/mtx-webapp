"use client"
import React from "react";
import { Box, Container, styled, Typography, Grid, Button } from "@mui/material";
import {useAnimation,motion} from 'framer-motion'
import MuiLink from "@mui/material/Link";
import Link from "next/link";
import Image from "next/image";
import { ButtonCustom } from "../(site)/components/Swiper";
import { useAppSelector } from "@/Store/reducers";
import { RootState } from "@/Store/store";
const Wallet = () => {

        const controls = useAnimation();
        const profileDetailData = useAppSelector((state:RootState)=>state.reducer.user.profileDetail)
    
        React.useEffect(() => {
            async function run() {
                await controls.start({ y: -51, opacity:0}); // move down 394
                await controls.start({ y: 0,opacity:1 }); // back up
                console.log('end animate');
                // setEndPresent(true)
            }
            run();
        }, [controls]);

    
    return (
        <>
            <Box sx={{
                position: "absolute",
                width: "100%",
                top: "-43px",
            }}>
                <motion.div animate={controls}>
                   <img src={"/img/banner.png"} alt="banner" style={{ width: "100%" }} />
                </motion.div>
                <Box sx={{
                    position: "absolute",
                    left: "50%",
                    transform: "translateX(-50%)",
                    top: "30%",
                    textAlign: "center",
                    display: "flex",
                    flexDirection: "column"
                }}  >
                    <Typography variant="xBold"
                        sx={(theme) => ({
                            color: theme.palette.mode === "dark" ? "#000" : "#fff", // fill color
                            WebkitTextStroke: `2px ${theme.palette.black.main}`,
                            // filter: "blur(2.5999999046325684px)"

                        })}
                    >
                        1,247
                    </Typography>
                    <Typography variant="largeBold">
                        MPX
                    </Typography>
                </Box>
            </Box >
            <Container className="h-full" >
                <Box sx={{
                    width: "100%",
                    height: "100%",
                    position: "relative"
                }}>
                    <Grid container spacing={3} sx={{
                        position: "absolute",
                        top: "45%",
                    }}>
                        <Grid size={6}>
                            <BoxClaim color={"lightgray"}>
                                <Typography color="blueLight" variant="mediumBold">{profileDetailData.wallet.rank}</Typography>
                                <Typography color="darkSecounry">Rank</Typography>
                            </BoxClaim>
                        </Grid>
                        <Grid size={6}>
                            <BoxClaim color={"lightgray"}>
                                <Typography color="blueLight" variant="mediumBold">{profileDetailData.wallet.day_streak}</Typography>
                                <Typography color="darkSecounry">Day Streak</Typography>
                            </BoxClaim>
                        </Grid>
                        <Grid size={6}>
                            <BoxClaim color={"lightgray"}>
                                <Typography color="red" variant="mediumBold">{profileDetailData.wallet.total_rewards_today}</Typography>
                                <Typography color="darkSecounry">total point</Typography>
                            </BoxClaim>
                        </Grid>
                        <Grid size={6}>
                            <BoxClaim color={"lightgray"}>
                                <Typography color="red" variant="mediumBold">{profileDetailData.wallet.balance}</Typography>
                                <Typography color="darkSecounry">balance</Typography>
                            </BoxClaim>
                        </Grid>
                        <ButtonBlue>Claim Reward</ButtonBlue>
                    </Grid>
                   {/* Menu */}
                </Box>
            </Container>
        </>
    )
}




const BoxClaim = styled(Box)(({ theme }) => ({
    backgroundColor: "#e6e6e678",
    textAlign: 'center',
    borderRadius: "16px",
    padding: "15px"
}));


export const ButtonBlue = styled(Button)(({ theme }) => ({
    backgroundColor: theme.palette.blue.main,
    padding: "9px",
    textAlign: 'center',
    textTransform: "capitalize",
    color: "white",
    borderRadius: "12px",
    width: "100%",
    // fontSize:theme.typography.medium.fontSize
}));
export default Wallet; 