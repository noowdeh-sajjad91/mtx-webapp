
"use client"
import React from "react"
import { useRouter } from 'next/navigation'
import SwipeableEdgeDrawer from "../../components/SwipeableDrawer"
import { Box, styled, Typography } from "@mui/material"
import Image from "next/image"
import { motion, useAnimation } from 'framer-motion'
import { ButtonCustom } from "@/app/(site)/components/Swiper"
import TextFieldInput from "@/app/components/Inputs/TextFieldInput"
import PasswordField from "@/app/components/Inputs/PasswordField"
import MuiLink from "@mui/material/Link";
import Link from "next/link"
import { useFormik } from "formik";
import * as Yup from "yup";
import { useChangePassword, useRegister } from "@/api/accounts"
import { useAppSelector } from "@/Store/reducers"
import { RootState } from "@/Store/store"
import { setToken } from "@/Store/reducers/user.reducer/user.reducer"
import { useDispatch } from "react-redux"
import { withAuthRedirect } from "@/app/components/withAuthRedirect"

// Yup schema to validate the form
const schema = Yup.object().shape({

    password: Yup.string()
        .required("Please enter your password")
        .min(8, "At least 8 characters")
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])/,
            "Password must contain both lowercase and uppercase letters"
        )
        .matches(/^(?=.*[a-z])/, "Password must contain at least one lowercase letter")
        .matches(/^(?=.*[A-Z])/, "Password must contain at least one uppercase letter")
        .matches(/^(?=.*\d)/, "Password must contain at least one number")
        .matches(/^(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])/, "Must contain at least one special character:@#"),

    repeatPassword: Yup.string()
        .required("Please enter your repeatPassword")
        .oneOf([Yup.ref('password')], "repeated password matches")
    // email: Yup.string().required().email("Please enter your email"),
    // password: Yup.string().required("Please enter your password").min(3),
});

const ResetPassword = () => {
    // Formik hook to handle the form state
    const router = useRouter();
    const dispatch = useDispatch()
    const { mutateAsync, isSuccess, isError } = useChangePassword(
        {
            onSuccess: (data: any) => {
                router.push('/account/login');
            },
            onError: (error) => {
                console.error('Error:', error);
                console.error('error', error);
            }
        }
    )
    const { email } = useAppSelector((state: RootState) => state.reducer.user.currentUser)

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
            repeatPassword: ""
            // password: "",
        },

        // Pass the Yup schema to validate the form
        validationSchema: schema,

        // Handle form submission
        onSubmit: async ({ password }) => {
            // Make a request to your backend to store the data
            // console.log(email);
            mutateAsync({  user_validator: email, new_password: password })
        },
    });

    // Destructure the formik object
    const { errors, touched, values, handleChange, handleSubmit } = formik;


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
                <Link href={"/account"}>
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
                <Typography color='black' variant='xtraSmall' component={"h3"} sx={{ marginBottom: "20px" }}>Reset Passowrd</Typography>
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
                        <PasswordField
                            fullWidth
                            label="Enter your password"
                            name="password"
                            value={values.password}
                            onChange={handleChange}
                            error={errors.password}
                            touched={touched.password}
                        />
                        <PasswordField
                            fullWidth
                            label="Enter your Reapet password"
                            name="repeatPassword"
                            value={values.repeatPassword}
                            onChange={handleChange}
                            error={errors.repeatPassword}
                            touched={touched.repeatPassword}
                        />
                        <ButtonCustom type="submit">Reset password</ButtonCustom>
                    </form>
                    <Typography variant="small" color="lightGray" sx={{ textAlign: 'center' }}>
                        By creating an account, you agree to our <MuiLink component={Link} href={"#"} color="black.main" underline="none">Terms of Service</MuiLink> and <MuiLink component={Link} href={"#"} color="black.main" underline="none">Privacy Policy</MuiLink>
                    </Typography>
                </Box>
            </SwipeableEdgeDrawer >
        </>
    )
}

const SwipeModal = styled(motion.div)(({ theme }) => ({
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: "56%",
    backgroundColor: "rgba(255, 255, 255, 1)",
    borderTopRightRadius: "30px",
    borderTopLeftRadius: "30px",
    padding: "30px"
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
export default withAuthRedirect(ResetPassword)