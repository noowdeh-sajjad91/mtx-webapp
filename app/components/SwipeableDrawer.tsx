"use client"
import React, { Children } from 'react'
import { Box, styled, Typography } from '@mui/material'
import { motion, useAnimation } from 'framer-motion'
import Image from 'next/image'

interface ISwipeableDrawer {
    children: React.ReactNode,
    height?:string
}
const SwipeableDrawer:React.FC<ISwipeableDrawer> = ({children}) => {
    const controls = useAnimation();

    React.useEffect(() => {
        async function run() {
            await controls.start({ y: 200, opacity:0}); // move down 394
            await controls.start({ y: 0,opacity:1 }); // back up
            console.log('end animate');
            // setEndPresent(true)
        }
        run();
    }, [controls]);
    return (
        <SwipeModal animate={controls}>
            {children}

            
        </SwipeModal>
    )
}



const SwipeModal = styled(motion.div)(({ theme }) => ({
    position: "absolute",
    bottom: 0,
    width: "100%",
    // height: "56%",
    backgroundColor: "rgba(255, 255, 255, 1)",
    borderTopRightRadius: "30px",
    borderTopLeftRadius: "30px",
    padding: "30px",
    paddingTop:"30px",
    paddingBottom:"30px",
    paddingLeft:"20px",
    paddingRight:"20px",
    zIndex:100
}));

const SocialBox = styled(Box)(({ theme }) => ({
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



export default SwipeableDrawer