"use client";
import { ThemeProvider, createTheme } from "@mui/material";

import localFont from "next/font/local";

export const urbanist = localFont({
  src: [
    {
      path: "../public/font/static/Urbanist-SemiBold.ttf", // 👈 path relative to THIS file
      weight: "600",
      style: "normal",
    },
  ],
  variable: "--font-urbanist",
});

// const urbanist = localFont({
//   src: [
//     {
//       path: "/font/Urbanist-Regular.ttf",
//       weight: "400",
//       style: "normal",
//     },
//     {
//       path: "/font/Urbanist-Bold.ttf",
//       weight: "700",
//       style: "normal",
//     },
//   ],
//   variable: "--font-urbanist",
// });


const theme = createTheme({
  palette: {
    primary: { main: '#1976d2' },

    black: {
      main: 'rgba(17, 17, 17, 1)',
      contrastText: '#fff',
    },
    gray: {
      main: 'rgba(243, 246, 247, 1)',
      contrastText: '#fff',
    },
    grayPlaceholder: {
      main: 'rgba(178, 178, 179, 1)',
      contrastText: '#fff',
    },
    cyan: {
      main: 'rgba(0, 124, 145, 1)',
      contrastText: '#fff',
    },
    lightGray: {
      main: 'rgba(128, 128, 129, 1)',
      contrastText: '#fff',
    },
    secoundryM: {
      main: 'rgba(17, 17, 17, 0.5)',
      contrastText: '#fff',
    },
    blue: {
      main: 'rgba(55, 162, 215, 1)',
      contrastText: '#fff',
    },
    blueLight: {
      main: '#37A2D7',
      contrastText: '#fff',
    },
    darkGray: {
      main: '#F4F4F4',
      contrastText: '#fff',
    },
    red: {
      main: '#D23651',
      contrastText: '#fff',
    },
    darkSecounry: {
      main: '#8D8D8D',
      contrastText: '#fff',
    },
    opacityGray: {
      main: "rgba(244, 244, 244, 1)",
      contrastText: '#fff',
    }
  },
  typography: {
   fontFamily: "var(--font-urbanist), system-ui, sans-serif",
    xxsmall: { fontSize: '12px', fontWeight: 700 },
    xsmall: { fontSize: '12px', fontWeight: 400 },
    small: { fontSize: '14px', fontWeight: 400 },
    xtraSmall: { fontSize: '20px', fontWeight: 600 },
    large: { fontSize: '24px', fontWeight: 700 },
    medium: { fontSize: '22px', fontWeight: 700 },
    xmedium: { fontSize: '16px', fontWeight: 600 },
    xBold: { fontSize: '60px', fontWeight: 'bold' },
    largeBold: { fontSize: '24px', fontWeight: 'bold' },
    mediumBold: { fontSize: '26px', fontWeight: 'bold' },
    xxl: { fontSize: '34px', fontWeight: '700' },
  },
});



interface ThemeProviderWrapperProps {
  children: React.ReactNode;
}

export default function ThemeProviderWrapper({
  children,
}: ThemeProviderWrapperProps) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}