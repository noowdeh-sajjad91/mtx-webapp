
"use client"
import React from "react"
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
import CheckBoxField from "@/app/components/Inputs/CheckBoxField"
import { useTokenLogin } from "@/api/token"
import { useDispatch } from "react-redux"
import { useRouter } from "next/navigation"
import { setToken } from "@/Store/reducers/user.reducer/user.reducer"
import { withAuthRedirect } from "@/app/components/withAuthRedirect"
// Yup schema to validate the form
const schema = Yup.object().shape({
  email: Yup.string().required().email("Please enter your email"),
  password: Yup.string()
    .required("Please enter your password")
    .min(8, "At least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])/,
      "Password must contain both lowercase and uppercase letters"
    ),
});

const Login = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const [showDialog, setShowDialog] = React.useState(false)
  const [errorText, setErrorText] = React.useState({ title: "", code: "", message: "" })
  const [showSwipeble, setShowSwipeble] = React.useState(false);
  const { isPending, mutate, isError } = useTokenLogin(
    {
      onSuccess: (data: any) => {
        // dispatch(setGmailVerifey({ email: data.user_validator }))
        dispatch(setToken({ token: data?.access, refershToken: data?.refresh, tokenEx: data?.access_expires_at, refereshTokenEx: data?.refresh_expires_at }))
        router.push('/home');
      },
      onError: (error) => {

        setShowSwipeble(true)
        setShowDialog(true)
        setErrorText({ title: error?.response?.data?.title, code: error?.response?.data?.code, message: error.response?.data?.messages[0]?.message })
        // setShowSwipeble(true)
        // setShowDialog(true)
        // setErrorText({ title: error?.response?.data?.title, code: error?.response?.data?.code })
      }
    }
  )

  const handleSubmitCallback = React.useCallback(async (values: { email: string, password: string }) => {
    if (isPending) return;

    mutate({ email: values.email, password: values.password });
  }, [mutate, isPending])
  // Formik hook to handle the form state
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
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
      </Box>


      <SwipeableEdgeDrawer>
        <Typography color='black' variant='xtraSmall' component={"h3"} sx={{ marginBottom: "5px" }}>Login to account</Typography>
        <Typography variant="small" color="lightGray" sx={{ marginBottom: "10px" }}>Please enter your information to acces your account</Typography>
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

            <TextFieldInput
              value={values.email}
              handleChange={handleChange}
              type="email"
              name="email"
              fullWidth
              label="Enter email address "
              error={errors.email}
              touched={touched.email}

            />
            <PasswordField
              fullWidth
              label="Enter password"
              name="password"
              value={values.password}
              onChange={handleChange}
              error={errors.password}
              touched={touched.password}
            />
            <Box sx={{ display: 'flex', alignItems: "center", justifyContent: "space-between" }}>
              <CheckBoxField
                lable="Remember me"
              />
              <MuiLink component={Link} href={"#"} color="cyan" underline="none">
                Forgot password?
              </MuiLink>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "3px" }}>
              <Typography color='lightGray' variant='small'>Don`t have an account? </Typography>
              <MuiLink component={Link} href={"/account/createAccount"} color="cyan" underline="none">
                Sign up
              </MuiLink>
            </Box>
            <ButtonCustom type="submit">Login </ButtonCustom>
          </form>
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
            <Typography variant="xsmall" color="secoundryM">{errorText.message}</Typography>
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
export default withAuthRedirect(Login)