
"use client"
import React from "react"
import { useRouter } from 'next/navigation'
import SwipeableEdgeDrawer from "../../components/SwipeableDrawer"
import { Box, Button, styled, Typography } from "@mui/material"
import Image from "next/image"
import { motion, useAnimation } from 'framer-motion'
import { ButtonCustom } from "@/app/(site)/components/Swiper"
import OtpInput from "@/app/components/OtpField"
import { useVerifyCode } from "@/api/accounts"
import { useSelector } from "react-redux"
import { useAppSelector } from "@/Store/reducers"
import { RootState } from "@/Store/store"
import { useSendOtp } from "@/api/token"
import Link from "next/link"
import MuiLink from "@mui/material/Link";
import { withAuthRedirect } from "@/app/components/withAuthRedirect"



const Verify = () => {

    const [code, setCode] = React.useState("");
    const router = useRouter();

    const [timeLeft, setTimeLeft] = React.useState(45);
    const [isActive, setIsActive] = React.useState(false)
    const { mutateAsync, isError, isPending } = useVerifyCode(
        {
            onSuccess: (data: any) => {

                router.push('/account/registeraccount');
            },
            onError: (error) => {
                console.error('Error:', error);
                console.error('error', error);
            }
        }
    );
     const { mutateAsync:mutateSendOtp} = useSendOtp(
        {
            onSuccess: (data: any) => {

                // router.push('/account/registeraccount');
            },
            onError: (error) => {
                // console.error('Error:', error);
                // console.error('error', error);
            }
        }
    );
    const { email } = useAppSelector((state: RootState) => state.reducer.user.currentUser)



    React.useEffect(() => {
        let interval: NodeJS.Timeout;

        if (isActive && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft((time) => time - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            setIsActive(false);
        }

        return () => clearInterval(interval);
    }, [isActive, timeLeft]);

    React.useEffect(() => {
        startTimer()
    }, [])

    const startTimer = () => {
        setTimeLeft(45);
        setIsActive(true);
    };

    const formatTime = (seconds: number) => {
        return `${seconds}  seconds`;
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        mutateAsync({
            otp_code: code,
            user_validator: email

        })
    };

    const handleSubmitResend =()=>{
       if(timeLeft === 0){
        startTimer()
         mutateSendOtp({ user_validator: email })
       }
    };

    return (
        <>
            <Box sx={{ position: "relative", height: "90vh" }}>
                <Box sx={{ width: "100%", height: "56%" }}>
                    <img style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover"
                    }} src="/img/account/sportmen.png" alt="sporthomen" width={40} height={50} />
                </Box>

            </Box >
            <SwipeableEdgeDrawer>
                <Typography color='black' variant='xtraSmall' component={"h3"} sx={{ marginBottom: "10px" }}>Verify your account</Typography>
                <Box sx={{
                    marginBottom: "10px"
                }}>
                    <Typography color="lightGray" variant="small">Enter the 5-digit code we sent to </Typography>
                    <Typography color="lightGray" variant="small">{email}</Typography>
                </Box>
                <Box sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "15px"
                }}>
                    <form style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "14px"
                    }}
                        onSubmit={handleSubmit}
                        method="POST"
                    >

                        <OtpInput length={5} value={code} onChange={setCode} />
                        <Box sx={{
                            marginBottom: "10px",
                            display: "flex",
                            flexDirection: "column"
                        }}>
                            <Typography color="lightGray" variant="small">Didn’t get the code? 
                                <Typography color="lightGray" variant="small" sx={{textDecoration:"underline"}} onClick={handleSubmitResend}>Resend</Typography>
                            </Typography>
                            {
                                timeLeft !== 0 && <Typography color="lightGray" variant="xmedium">You can request a new one in {formatTime(timeLeft)}</Typography>
                            }
                            
                        </Box>
                        <Box sx={{
                            display: "flex",
                            justifyContent: 'space-between',
                            gap: "4px",
                            paddingTop: "13vh"
                        }}>
                            <MuiLink href={"/account"} component={ButtonCustomOutLine} type="submit" color="cyan" sx={{textDecoration:'none'}}>
                            Cancel
                            </MuiLink>
                            <ButtonCustom type="submit">Verify</ButtonCustom>
                        </Box>
                    </form>

                </Box>
            </SwipeableEdgeDrawer >
        </>
    )
}

export const ButtonCustomOutLine = styled(Button)(({ theme }) => ({

    border: `1px solid ${theme.palette.cyan.main}`,
    color: theme.palette.cyan.main,
    textTransform: "capitalize",
    width: "100%",
    borderRadius: '60px'
}))
export default withAuthRedirect(Verify);