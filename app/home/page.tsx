"use client"
import React from "react";
import { Box, Container, styled, Typography, Grid, Button } from "@mui/material";
import MuiLink from "@mui/material/Link";
import Link from "next/link";
import Image from "next/image";
import { ButtonCustom } from "../(site)/components/Swiper";
import { useAnimation, motion } from "framer-motion"
import type { Theme } from "@mui/material/styles";
import DoughnutChart from "../components/charts/Doughnut";
import { useDispatch } from "react-redux";
import { setProfileDetail } from "@/Store/reducers/user.reducer/user.reducer";
import { useGetProfileDetails } from "@/api/accounts";
import { useAppSelector } from "@/Store/reducers";
import { RootState } from "@/Store/store";

const Home = () => {

    const controls = useAnimation();
    const dispatch = useDispatch();
    const {data:profileDetails} = useGetProfileDetails()
    const profileDetailData = useAppSelector((state:RootState)=>state.reducer.user.profileDetail)
    React.useEffect(() => {
        async function run() {
            await controls.start({ y: -51, opacity: 0 }); // move down 394
            await controls.start({ y: 0, opacity: 1 }); // back up
            
            // setEndPresent(true)
        }
        run();
    }, [controls]);

    React.useEffect(() => {
        if (profileDetails && profileDetails !== undefined) {
          dispatch(setProfileDetail({...profileDetails}))
        }
    }, [profileDetails])


    return (
        <>
            <Box sx={{
                // position: "absolute",
                width: "100%",
                transform: "translateY(-178px)"
            }}>
                <Box sx={{ position: "relative" }}>
                    <motion.div animate={controls}>
                        <img src={"/img/banner.png"} alt="banner" style={{ width: "100%" }} />
                    </motion.div>
                    <Box sx={{
                        position: "absolute",
                        left: "50%",
                        transform: "translateX(-50%)",
                        top: "54%",
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
                    </Box >

                </Box>
                <Box sx={{
                    width: "100%",
                    height: "100%",
                    position: "relative",
                    backgroundColor: "red"
                }}>
                    <Container maxWidth={"xl"}>
                        <Grid container rowSpacing={3} columnSpacing={1} sx={{ marginTop: "20px", marginBottom: "5px" }}>
                            <Grid size={6} >
                                <Box
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "2px"
                                    }}
                                >
                                    <WorkBox sx={{ background: "#37A2D7" }}>
                                        <Image src={"/icons/home/dollar.svg"} width={25} height={30} alt="dollar" />
                                    </WorkBox>
                                    <Box
                                        sx={{ display: "flex", flexDirection: "column", marginLeft: "5px" }}
                                    >
                                        <Typography color="blueLight" variant="xmedium">8,431</Typography>
                                        <Typography color="blueLight" variant="xsmall">Total Health Coins</Typography>
                                    </Box>
                                </Box>
                            </Grid>
                            <Grid size={6} >
                                <Box
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "2px"
                                    }}
                                >
                                    <WorkBox sx={{ backgroundColor: "#37A2D7" }}>
                                        <Image src={"/icons/home/workout.svg"} width={25} height={30} alt="dollar" />
                                    </WorkBox>
                                    <Box
                                        sx={{ display: "flex", flexDirection: "column", marginLeft: "5px" }}
                                    >
                                        <Typography color="blueLight" variant="xmedium">70</Typography>
                                        <Typography color="blueLight" variant="xsmall">Total Workouts</Typography>
                                    </Box>
                                </Box>
                            </Grid>
                            <Grid size={6}>
                                <Box
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "2px"
                                    }}
                                >
                                    <WorkBox sx={{ backgroundColor: "#D23651" }}>

                                        <Image src={"/icons/home/streak.svg"} width={28} height={28} alt="dollar" />
                                    </WorkBox>
                                    <Box
                                        sx={{ display: "flex", flexDirection: "column", marginLeft: "5px" }}
                                    >
                                        <Typography color="red" variant="xmedium">15</Typography>
                                        <Typography color="red" variant="xsmall">Today's Streak</Typography>
                                    </Box>
                                </Box>
                            </Grid>
                            <Grid size={6}>
                                <Box
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "2px"
                                    }}
                                >
                                    <WorkBox sx={{ backgroundColor: "#D23651" }}>
                                        <Image src={"/icons/home/streak-only.svg"} width={22} height={22} alt="dollar" />
                                    </WorkBox>
                                    <Box sx={{ display: "flex", flexDirection: "column", marginLeft: "5px" }}>
                                        <Typography color="red" variant="xmedium">50</Typography>
                                        <Typography color="red" variant="xsmall">Total Day Streak</Typography>

                                    </Box>
                                </Box>
                            </Grid>
                        </Grid>
                        <div style={{
                            background: "#e6e6e678",
                            display: "flex",
                            borderRadius: "32px",
                            position: "relative",
                            padding: "30px",
                            paddingLeft: "21px",
                            margin: "1.5rem 0"
                        }}>
                            <Box sx={{ marginTop: "7px" }}>

                                <Typography variant="xtraSmall" color="black">Today’s workout</Typography>
                                <Box sx={{
                                    display: "flex",
                                    gap: "21px"
                                }}>
                                    <Typography variant="xsmall" color="black">Neck exercise</Typography>
                                    <Typography variant="xsmall" color="secoundryM">10reps  |  5min</Typography>
                                </Box>
                                <Typography variant="mediumBold" color="blueLight" sx={{ paddingTop: "5px" }}>
                                    Start now
                                </Typography>
                            </Box>
                            <Box
                                sx={{
                                    width: "184px",
                                    position: "absolute",
                                    right: 0,
                                    top: 0
                                }}
                            >
                                <img style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover"
                                }} src={"/img/home/p.png"} />
                            </Box>
                        </div>

                        <div style={{
                            background: "#e6e6e678",
                            // display: "flex",
                            borderRadius: "32px",
                            position: "relative",
                            padding: "30px 10px 30px 21px",
                            margin: "1.5rem 0",
                            marginBottom: "4px"
                        }}>

                            <Box sx={{ display: "flex", width: "100%", alignItems: 'center', justifyContent: "space-between" }}>
                                <Box sx={{ display: "flex", alignItems: 'center', gap: "5px" }}>
                                    <Box >
                                        <Image src={"/icons/home/cup.svg"} width={20} height={20} alt="cup" />
                                    </Box>
                                    <Typography color="black" variant="xxsmall">Complete month Activity</Typography>
                                </Box>
                                <Box>
                                    <Image src={"/icons/home/arrow-right.svg"} width={25} height={25} alt="arrow" />
                                </Box>
                            </Box>

                            <Box sx={{ display: "flex" }}>
                                <Box>
                                    <Box sx={{ display: "flex", flexDirection: "column", paddingTop: "5px", paddingBottom: "5px" }}>
                                        <Typography variant="small" color="secoundryM">Total walked distance :</Typography>
                                        <Typography variant="small" color="black">0 meters</Typography>
                                    </Box>
                                    <Box sx={{
                                        display: "flex",
                                        flexDirection: "column"
                                    }}>
                                        <Typography variant="small" color="secoundryM">monthly goal:</Typography>
                                        <Typography variant="xxsmall" color="black">increase exercise 10 km per week </Typography>
                                    </Box>
                                </Box>
                                <Box sx={{
                                    width: "104px"
                                }}>
                                    <DoughnutChart />
                                </Box>
                            </Box>
                        </div>

                    </Container>

                </Box>

            </Box >
        </>
    )
}

interface WorkBoxProps {
    bg?: keyof Theme["palette"];
    padding?: string;
}

const WorkBox = styled(Box)<WorkBoxProps>(({ bg, padding }) => ({
    backgroundColor: "red",
    padding: padding,
    width: "40px",
    height: "40px",
    borderRadius: "9px",
    display: "flex",
    justifyContent: 'center',
    itemsCenter: "center"
}));

export default Home; 