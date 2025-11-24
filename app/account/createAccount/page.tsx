
"use client"
import React from "react"
import { useRouter } from 'next/navigation';
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
import { useSendOtp } from "@/api/token"

import { useDispatch } from "react-redux"
import { setGmailVerify } from "@/Store/reducers/user.reducer/user.reducer"
import { withAuthRedirect } from "@/app/components/withAuthRedirect";

// Yup schema to validate the form
const schema = Yup.object().shape({
  // username: Yup.string().required("Please enter your full name"),
  email: Yup.string().required().email("Please enter your email"),
  // password: Yup.string().required("Please enter your password").min(3),
});

const CreateAccount = () => {
  // Formik hook to handle the form state
  const router = useRouter()
  const dispatch = useDispatch()
  const [showSwipeble, setShowSwipeble] = React.useState(false);
  const [errorText, setErrorText] = React.useState({ title: "", code: "" })
  const [showDialog, setShowDialog] = React.useState(false)
  const { mutate, mutateAsync, isPending, isSuccess, isError } = useSendOtp({
    onSuccess: (data: any) => {
      dispatch(setGmailVerify({ email: data.user_validator }))
      router.push('/account/verify');
    },
    onError: (error) => {

      setShowSwipeble(true)
      setShowDialog(true)
      setErrorText({ title: error?.response?.data?.title, code: error?.response?.data?.code })
    }
  })

  const handleSubmitCallback = React.useCallback(async (values: { email: string }) => {
    if (isPending) return;
;
    mutate({ user_validator: values.email });
  }, [mutate, isPending]);

  const formik = useFormik({
    initialValues: {
      // username: "",
      email: "",
      // password: "",
    },

    // Pass the Yup schema to validate the form
    validationSchema: schema,

    // Handle form submission
    onSubmit: handleSubmitCallback,
  });

  // Destructure the formik object
  const { errors, touched, values, handleChange, handleSubmit } = formik;



  const handleCloseError = () => {
    setShowSwipeble(false)
    setShowDialog(false)
  }
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
        <Typography color='black' variant='xtraSmall' component={"h3"} sx={{ marginBottom: "20px" }}>Create an account</Typography>
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
            {/* <TextFieldInput
              value={values.username}
              type="text"
              name="username"
              fullWidth={true}
              handleChange={handleChange}
              label="Enter full name"
              error={errors.username}
              touched={touched.username}
            /> */}
            <TextFieldInput
              value={values.email}
              handleChange={handleChange}
              type="email"
              name="email"
              fullWidth
              label="Enter email address"
              error={errors.email}
              touched={touched.email}
            />
            {/* <PasswordField
              fullWidth
              label="Enter password"
              name="password"
              value={values.password}
              onChange={handleChange}
              error={errors.password}
              touched={touched.password}
            /> */}
            {/* <PasswordField
              fullWidth
              label="Enter Reapet password"
              name="password"
              value={values.repeatPassword}
              onChange={handleChange}
              error={errors.repeatPassword}
              touched={touched.repeatPassword}
            /> */}
            <ButtonCustom type="submit" style={{ marginTop: "5rem" }}>Sign In</ButtonCustom>
          </form>
          <Typography variant="small" color="lightGray" sx={{ textAlign: 'center' }}>
            By creating an account, you agree to our <MuiLink component={Link} href={"#"} color="black.main" underline="none">Terms of Service</MuiLink> and <MuiLink component={Link} href={"#"} color="black.main" underline="none">Privacy Policy</MuiLink>
          </Typography>
        </Box>
      </SwipeableEdgeDrawer >
      {
        showSwipeble && <BackgroundGray></BackgroundGray>

      }
      {
        isError && showDialog &&
        <SwipeableEdgeDrawer>
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: "10px" }}>
            <Typography variant="medium" color="black">{errorText.title}</Typography>
            <Typography variant="xsmall" color="secoundryM">{errorText.code}</Typography>
          </Box>
          <ButtonCustom type="submit" onClick={() => handleCloseError()}>ok</ButtonCustom>
        </SwipeableEdgeDrawer >
      }


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


const BackgroundGray = styled(Box)({
  width: "100%",
  height: "100vh",
  /* background: red, */
  zIndex: 100,
  position: "absolute",
  top: 0,
  backgroundColor: "rgba(0, 0, 0, 0.46)",
})
export default withAuthRedirect(CreateAccount)