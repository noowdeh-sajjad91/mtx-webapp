import React from 'react';
import { Box, styled, Typography } from '@mui/material'
import Image from 'next/image';

interface IMoveMentBox {
    title?: string,
    discription?: string,
    handdleShowSwipeable: any
    icon: any
}
const MoveMentBox: React.FC<IMoveMentBox> = ({ handdleShowSwipeable, title, discription, icon }) => {
    console.log('icon', icon)
    return (
        <Box sx={{
            display: "flex",
            background: "white",
            borderRadius: "8px",
            padding: "14px",
            justifyContent: 'space-between',
            marginBottom: "8px",
            marginTop: "8px"
        }}
            onClick={handdleShowSwipeable}
        >
            <Box sx={{
                display: "flex",
                alignItems: "center",
                gap: "4px"
            }}>
                <Box sx={{
                    // background:"#b5b0b0",
                    filter:"contrast(0.5)"
                }}>
                    {
                        <Image src={icon !== undefined && icon} width={30} height={30} alt='mevement' />
                    }

                </Box>
                <Box sx={{
                    display: "flex",
                    flexDirection: "column"
                }}>
                    <Typography variant='small' fontWeight={700} color='black'>{title}</Typography>
                    <Typography variant='xsmall' color='secoundryM'>{discription}t</Typography>
                </Box>
            </Box>
            <Box sx={{
                display: "flex",
                alignItems: "center"
            }}>
                <Image src={"/icons/movement/zoom.svg"} width={20} height={20} alt='zoom' />
            </Box>
        </Box>
    )
}

const BoxMovement = styled(Box)({
    background: "white",
})

export default MoveMentBox