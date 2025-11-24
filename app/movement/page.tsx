"use client"
import { Container, Box, styled, Button, Typography, Grid, Theme } from '@mui/material';
import Image from 'next/image';
import React from 'react';
import TimerPlayer from '../components/Stepper';
import TabCustomize from '../components/TabCustomize';
import { AnimatePresence, motion, useAnimation } from 'framer-motion'
import Link from "next/link"
import MuiLink from "@mui/material/Link";
import SwipeableDrawer from '../components/SwipeableDrawer';
import { ButtonCustom } from '../(site)/components/Swiper';
import MoveMentBox from '../components/MovementBox';
import { useAppSelector } from '@/Store/reducers';
import { RootState } from '@/Store/store';
import { useGetMovementsCategories } from '@/api/movements';

type Imovements = {
    created_at: string
    description: string
    expire_after: number
    gif: string
    icon: string
    id: string
    is_active: boolean
    is_selected: boolean
    reward: number
    title: string
    updated_at: string
}
interface IMovementsCategories {
    created_at: string
    description: string
    id: string
    is_active: boolean
    movements: Imovements[] | []
    title: string
    total_available_exercises: number
    total_done_exercises: number
    updated_at: string
}
const Movement = () => {
    const [showSwipeble, setShowSwipeble] = React.useState(false);
    const [running, setRunning] = React.useState<boolean>(false);
    const [movmentsCategoreisItems, setMovementsCategoiesItems] = React.useState<Imovements[]>([])
    const profileDetailData = useAppSelector((state: RootState) => state.reducer.user.profileDetail)
    const [movementSelect, setMovementSelect] = React.useState<{ id:string,title: string, discription: string, gif: string }>({id:"", title: "", discription: "", gif: "" })
    const { data: movementsCategories } = useGetMovementsCategories()
    const handleShowSWipe = (movement: Imovements) => {
        console.log("movment---------------", movement.gif)
        setShowSwipeble(true)
        setMovementSelect({id:movement.id, title: movement.title, discription: movement.description, gif: movement.gif })
    }
    const handleShowSWipeClose = () => {
        setShowSwipeble(false)
    }

    React.useEffect(() => {
        if (movementsCategories?.results) {
            setMovementsCategoiesItems(movementsCategories?.results);
        }
    }, [movementsCategories])

    console.log('movement', movmentsCategoreisItems)
    return (
        <>
            <Container>
                <Box
                >
                    <MovementBanner>
                        {/* <ButtonDayily>STOP</ButtonDayily> */}
                        <AnimatePresence>
                            {!running && (
                                <motion.div
                                    style={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                    }}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    transition={{ duration: 0.4, ease: "easeOut" }}
                                >
                                    <img src="/img/movement/daily-homenn.png" />
                                </motion.div>
                            )}
                        </AnimatePresence>
                        <motion.div
                            style={{
                                position: "absolute",
                                width: "254px",
                                left: "9px"
                            }}
                            animate={{
                                x: running ? "78%" : 0,      // 👈 slide to center
                                translateX: running ? "-50%" : "0%", // 👈 truly center element
                            }}
                            transition={{
                                duration: 0.6,
                                ease: "easeInOut",
                            }}
                        >

                            {
                                !running &&
                                <Typography
                                    variant="medium"
                                    style={{
                                        position: "relative",
                                        left: "15px",
                                        top: "12px",
                                    }}
                                >
                                    Daily Steps
                                </Typography>
                            }

                            <TimerPlayer
                                durationSec={30}
                                steps={4}
                                autoStart={false}
                                running={running}
                                setRunning={setRunning}
                            />
                        </motion.div>

                    </MovementBanner>
                    <Grid container rowSpacing={3} columnSpacing={1} sx={{ marginTop: "20px", marginBottom: "5px" }}>
                        <Grid size={6} sx={{ display: "flex", justifyContent: "center" }}>
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    gap: "2px"
                                }}
                            >
                                <WorkBox sx={{ background: "#37A2D7" }}>
                                    <Image src={"/icons/movement/steps.svg"} width={20} height={20} alt="dollar" />
                                </WorkBox>
                                <Box
                                    sx={{ display: "flex", flexDirection: "column", marginLeft: "5px" }}
                                >
                                    <Typography color="blueLight" variant="xmedium">{profileDetailData.today_steps}</Typography>
                                    <Typography color="blueLight" variant="xsmall">Step</Typography>
                                </Box>
                            </Box>
                        </Grid>
                        <Grid size={6} sx={{ display: "flex", justifyContent: 'center' }}>
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: 'center',
                                    gap: "2px"
                                }}
                            >
                                <WorkBox sx={{ backgroundColor: "#D23651" }}>
                                    <Image src={"/icons/movement/fire.svg"} width={20} height={20} alt="dollar" />
                                </WorkBox>
                                <Box
                                    sx={{ display: "flex", flexDirection: "column", marginLeft: "5px" }}
                                >
                                    <Typography color="blueLight" variant="xmedium">{profileDetailData.today_calories}</Typography>
                                    <Typography color="blueLight" variant="xsmall">Calaries</Typography>
                                </Box>
                            </Box>
                        </Grid>

                    </Grid>
                </Box>
                {/* Tabs component movement */}
                <TabCustomize
                    itemsTabs={
                        [
                            {
                                label: "All",
                                content: (
                                    <>
                                        {
                                            movmentsCategoreisItems?.map((movement: any) => {
                                                return movement?.movements?.map((item: Imovements, i: number) => (
                                                    <MoveMentBox
                                                        key={i}
                                                        icon={item?.icon ? item?.icon : ""}
                                                        title={item.title}
                                                        discription={item.description}
                                                        handdleShowSwipeable={() => handleShowSWipe(item)}
                                                    />

                                                ))
                                            })
                                        }

                                    </>
                                )
                            },

                            ...movmentsCategoreisItems?.map((movement: any) => ({
                                label: movement.description,
                                content: (
                                    <>
                                        {movement?.movements?.map((item: Imovements, i: number) => (
                                            <MoveMentBox
                                               icon={item?.icon ? item?.icon : ""}
                                                title={item.title}
                                                discription={item.description}
                                                key={i}
                                                handdleShowSwipeable={handleShowSWipe}
                                            />
                                        ))}
                                    </>
                                )
                            }))

                        ]
                    }
                />
            </Container >
            <Box>
                {
                    showSwipeble ?
                        <ShowSwipeableEdgeDrawer
                           id={movementSelect.id}
                            title={movementSelect?.title}
                            discription={movementSelect?.discription}
                            gif={movementSelect?.gif}
                            handleClosSwipeable={handleShowSWipeClose}


                        />
                        :
                        null
                }

            </Box>

            {
                showSwipeble && <BackgroundGray></BackgroundGray>

            }

        </>
    )
}



const ShowSwipeableEdgeDrawer = ({ handleClosSwipeable, title,id, discription, gif }: { handleClosSwipeable: () => void,id:string, title: string, discription: string, gif: string }) => {
    console.log('gif', gif)
    return (
        <SwipeableDrawer>

            <Box sx={{
                display: "flex",
                flexDirection: "column",
                gap: "15px"
            }}>
                <Box sx={{
                    padding: "10px",
                    backgroundColor: "rgb(227 227 227 / 30%)",
                    width: "44px",
                    borderRadius: "50%",
                    height: "44px",
                    display: "flex",
                    justifyContent: "center",
                }}
                    onClick={handleClosSwipeable}
                >
                    <Image src={"/icons/back.svg"} width={20} height={20} alt='back' />
                </Box>

                <Box>
                    <Box sx={{ display: "flex", justifyContent: 'center' }}>
                        <Image src={gif} width={130} height={130} alt='t-up' />
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: "column" }}>
                        <Typography variant='xtraSmall' color='black'>{title}</Typography>
                        <Typography variant='xsmall' color='grayPlaceholder'>{discription}</Typography>
                    </Box>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "3px", marginBottom: "25px" }}>
                    <Link href={"/Exerciseing"} style={{ width: "100%" }}>
                        <ButtonCustom>
                            <Box sx={{ marginRight: "5px" }}>
                                <Image src={"/icons/movement/camera.svg"} width={20} height={20} alt='camera' />
                            </Box>
                            Get Camera
                        </ButtonCustom>
                    </Link>
                </Box>
            </Box>
        </SwipeableDrawer>

    )
}
const MovementBanner = styled(Box)(({ theme }) => ({
    height: "160px",
    width: "100%",
    borderRadius: "32px",
    backgroundImage: "url('/img/movement/daily.png')",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    marginTop: "10px",
    marginBottom: "10px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    backgroundPositionY: "initial",
    backgroundPositionX: "initial",
    alignItems: "center",
    position: 'relative'
}))


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


const ButtonDayily = styled(Button)(({ theme }) => ({
    backgroundColor: "white",
    color: theme.palette.red.main,
    width: "136px",
    height: "36px",
    borderRadius: "8px"
}))




const BackgroundGray = styled(Box)({
    width: "100%",
    height: "100vh",
    /* background: red, */
    zIndex: 99,
    position: "absolute",
    top: 0,
    backgroundColor: "rgba(0, 0, 0, 0.46)",
})
export default Movement