
"use client"
import React from 'react'
import Image from "next/image";
import PresentLogo from './components/PresentLogo';
import { Box, Button, Container, styled, Typography } from '@mui/material';
import SwiperCarousel from './components/Swiper';

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

const ButtonCustom = styled(Button)(({ theme }) => ({

  backgroundColor: theme.palette.cyan.main,
  color: "white",
  textTransform: "capitalize",
  width: "100%"
}))
export default function Home() {
  const [steps, setSteps] = React.useState(presentSteps)
  const [counter, setCounter] = React.useState(1);
  const [endPresent, setEndPresent] = React.useState(false);

  return (
    <Container className="h-full">
      <Box className="h-full">
        {
          !endPresent ?
            <PresentLogo setEndPresent={setEndPresent} />
            :
            <SwiperCarousel />
        }
      </Box>
    </Container>
  );
}
