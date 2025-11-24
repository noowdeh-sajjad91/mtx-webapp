"use client"
import React from "react";
import { Box, styled } from "@mui/material";
import { motion, useAnimation } from 'framer-motion'
import Image from "next/image";
// import useAnimationHook from "@/hooks/useAnimationHook";


const BoxCenter = styled(motion.div)({
    display: "flex",
    justifyContent: 'center',
    alignItems: "center",
    flexDirection: "column",
    height: '100vh'
})

interface IpresentLogo {
    setEndPresent: Function
}
const PresentLogo: React.FC<IpresentLogo> = ({ setEndPresent }) => {

//     const { controls } = useAnimationHook<any>({
//     setEndPresent,
//         startAnimate: { y: -19, duration: 0.3 },
//         endAnimate: { y: 0, duration: 0.2 }
// });

    const controls = useAnimation();

    React.useEffect(() => {
        async function run() {
            await controls.start({ y: -19, transition: { duration: 0.3 } }); // move down
            await controls.start({ y: 0, transition: { duration: 0.2 } }); // back up


            console.log('end animate');
            setEndPresent(true)
        }
        run();
    }, [controls]);

    return (
        <BoxCenter
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
        >
            <motion.div
                animate={controls}
            >
                <Image src="/icons/logo.png" alt="logo" width={77} height={67} className="mb-2" />
            </motion.div>
            <Image src="/icons/mtx.png" alt="logo" width={57} height={43} />
        </BoxCenter>

    )
}


export default PresentLogo;