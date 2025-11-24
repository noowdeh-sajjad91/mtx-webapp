import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Box, Button, Container, styled, Typography } from '@mui/material';
import { easeIn, motion } from 'framer-motion'
import Image from "next/image";
import Link from "next/link";


const presentSteps = [
    {
        id: 1,
        img: "/img/Present/present1.png",
        title: "Exercise, Get Rewarded.",
        discription: "the platform that turns your physical activity into digital assets (tokens).",
        isActive: true
    },
    {
        id: 2,
        img: "/img/Present/present2.png",
        title: "Smart Motion Detection.",
        discription: "We use your phone's camera to detect the type and accuracy of your exercises to earn rewards.",
        isActive: false
    },
    {
        id: 3,
        img: "/img/Present/present3.png",
        title: " Secure Data, Real Rewards.",
        discription: "Your health records are stored securely on the blockchain, and you can use your earned tokens in our marketplace.",
        isActive: false
    },
]
 
export const ButtonCustom = styled(Button)(({ theme }) => ({

    backgroundColor: theme.palette.cyan.main,
    color: "white",
    textTransform: "capitalize",
    width: "100%",
    borderRadius: '60px',
    marginBottom:'1.5rem'
}))

export default function SwiperCarousel() {
    const swiperRef = useRef<any>(null);
    const [activeIndex, setActiveIndex] = React.useState(0)
    const slideAnimation: any = {
        hidden: { opacity: 0, y: 0, x: -335 },
        visible: {
            opacity: 1,
            y: 0,
            x: 0,
            transition: { duration: 0.2, easeIn }
        }
    };

    const isLastSlide = activeIndex == presentSteps.length - 1;
    return (
        <motion.div
            variants={slideAnimation}
            initial="hidden"
            animate="visible"
        >
            {/* Swiper */}
            <Swiper
                onSwiper={(swiper) => {
                    swiperRef.current = swiper; // store Swiper instance
                }}
                onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
                className="mySwiper"
            >
                {
                    presentSteps.map((item) => (
                        <SwiperSlide
                        >
                            <motion.div
                                // variants={slideAnimation}
                                // initial="hidden"
                                // animate="visible"
                                key={item.id}
                                style={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }}
                            >
                                <Image src={item.img} alt='Exirese' width={280} height={335} className="mt-5" />
                                <Box sx={{ marginTop: "88px", textAlign: 'center', }}>
                                    <Typography component={"h2"} variant='large' color='black' className="mb-1">
                                        {item.title}
                                    </Typography>
                                    <Typography component={"p"} variant='small' color='secoundryM' sx={{ maxWidth: "268px", marginBottom: "15px" }}>
                                        {item.discription}
                                    </Typography>
                                </Box>
                                {/* Navigation Buttons */}

                                {/* <ButtonCustom onClick={() => handleNextStep(item.id)}>Next</ButtonCustom> */}

                            </motion.div>
                        </SwiperSlide>
                    ))
                }

                <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
                    {
                        isLastSlide ?
                            <Link href="/account" passHref style={{ width: "100%" }}>
                                <ButtonCustom>Start</ButtonCustom>
                            </Link>
                            :
                            <ButtonCustom onClick={() => swiperRef.current.slideNext()}>Next</ButtonCustom>
                    }
                </div>
                {
                    isLastSlide ? null :
                        <div className="text-center">
                            <Link href={"/account"}>
                                <Typography component={"p"} color='secoundryM'>SKIP</Typography>
                            </Link>
                        </div>
                }
            </Swiper>
        </motion.div>
    );
}
