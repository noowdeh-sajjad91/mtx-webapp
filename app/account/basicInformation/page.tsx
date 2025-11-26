
"use client"
import React from "react"
import SwipeableEdgeDrawer from "../../components/SwipeableDrawer"
import { Box, Grid, styled, Typography } from "@mui/material"
import Image from "next/image"
import { motion, useAnimation } from 'framer-motion'
import { ButtonCustom } from "@/app/(site)/components/Swiper"
import TextFieldInput from "@/app/components/Inputs/TextFieldInput"
import PasswordField from "@/app/components/Inputs/PasswordField"
import MuiLink from "@mui/material/Link";
import Link from "next/link"
import { useFormik } from "formik";
import * as Yup from "yup";
import CheckBoxField from "@/app/components/Inputs/CheckBoxField"
import DatePickerField from "@/app/components/Inputs/DatePickerField"
import SelectField from "@/app/components/Inputs/SelectField"

// Yup schema to validate the form
const schema = Yup.object().shape({
    email: Yup.string().required().email("Please enter your email"),
    password: Yup.string().required("Please enter your password").min(3),
});

const BasicIformation = () => {
    // Formik hook to handle the form state
    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },

        // Pass the Yup schema to validate the form
        validationSchema: schema,

        // Handle form submission
        onSubmit: async ({ email, password }) => {
            // Make a request to your backend to store the data
            console.log(email);

        },
    });

    // Destructure the formik object
    const { errors, touched, values, handleChange, handleSubmit } = formik;

    // DEBUG: see what's happening
    console.log("values:", values);
    console.log("errors:", errors);

    return (
        <>
        <Box sx={{ position: "relative", height: "90vh" }}>
            <Box sx={{ width: "100%", height: "56%"}}>
                <img style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover"
                }} src="/img/account/sportmen.png" alt="sporthomen" width={40} height={50} />
            </Box>
        </Box >
            <SwipeableEdgeDrawer>
                <Typography color='black' variant='xtraSmall' component={"h3"} sx={{ marginBottom: "5px" }}>basic information</Typography>
                <Box sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "15px",

                }}>
                    <form style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "14px",
                        paddingTop: "10px"
                    }}
                        onSubmit={handleSubmit}
                        method="POST"
                    >

                        {/* <DatePickerField />
                        <SelectField /> */}
                        <Box>
                            <Grid container spacing={2}>
                                <Grid size={6}>
                                    <TextFieldInput
                                        value={values.email}
                                        handleChange={handleChange}
                                        type="number"
                                        name="height"
                                        fullWidth
                                        label="Height (Cm)"
                                        error={errors.email}
                                        touched={touched.email}
                                    />
                                </Grid>
                                <Grid size={6}>
                                    <TextFieldInput
                                        value={values.email}
                                        handleChange={handleChange}
                                        type="number"
                                        name="weight"
                                        fullWidth
                                        label="Weight (Kg)"
                                        error={errors.email}
                                        touched={touched.email}
                                    />
                                </Grid>
                            </Grid>
                        </Box>
                        <TextFieldInput
                            value={values.email}
                            handleChange={handleChange}
                            type="text"
                            name="activity"
                            fullWidth
                            label="Activity "
                        // error={errors.email}
                        // touched={touched.email}
                        />
                        <TextFieldInput
                            value={values.email}
                            handleChange={handleChange}
                            type="number"
                            name="fitness"
                            fullWidth
                            label="Fitness goal"
                        // error={errors.email}
                        // touched={touched.email}
                        />
                        <ButtonCustom type="submit">Continue To Health Profile  </ButtonCustom>
                    </form>
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
export default BasicIformation