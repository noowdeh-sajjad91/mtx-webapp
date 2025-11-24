// types/mui.d.ts
import '@mui/material/styles';
import path from 'path';

declare module '@mui/material/styles' {
  interface TypographyVariants {
    xxsmall: React.CSSProperties;
    xsmall: React.CSSProperties;
    small: React.CSSProperties;
    xtraSmall: React.CSSProperties;
    large: React.CSSProperties;
    xBold: React.CSSProperties;
    largeBold: React.CSSProperties;
    mediumBold: React.CSSProperties;
    medium: React.CSSProperties;
    xmedium: React.CSSProperties;
    xxl: React.CSSProperties;
  }

  interface TypographyVariantsOptions {
    xxsmall: React.CSSProperties;
    xsmall: React.CSSProperties;
    small?: React.CSSProperties;
    large?: React.CSSProperties;
    xtraSmall?: React.CSSProperties;
    xBold: React.CSSProperties;
    largeBold: React.CSSProperties;
    mediumBold: React.CSSProperties;
    medium: React.CSSProperties;
    xmedium: React.CSSProperties;
    xxl: React.CSSProperties;
  }

  interface Palette {
    black: Palette['primary'];
    gray: Palette['primary'];
    grayPlaceholder: Palette['primary'];
    cyan: Palette['primary'];
    lightGray: Palette['primary'];
    secoundryM: Palette['primary'];
    blue: Palette['primary'];
    blueLight: Palette['primary'];
    darkGray: Palette['primary'];
    red: Palette['primary'];
    darkSecounry: Palette['primary'];
    opacityGray: Palette['primary'];
  }

  interface PaletteOptions {
    black?: PaletteOptions['primary'];
    gray?: PaletteOptions['primary'];
    grayPlaceholder?: PaletteOptions['primary'];
    cyan?: PaletteOptions['primary'];
    lightGray?: PaletteOptions['primary'];
    secoundryM?: PaletteOptions['primary'];
    blue?: PaletteOptions['primary'];
    blueLight?: PaletteOptions['primary'];
    darkGray?: PaletteOptions['primary'];
    red?: PaletteOptions['primary'];
    darkSecounry?: PaletteOptions['primary'];
    opacityGray?: PaletteOptions['primary'];
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    xxsmall: true;
    xsmall: true
    small: true;
    xtraSmall: true;
    large: true;
    xBold: true;
    largeBold: true;
    mediumBold: true;
    medium: true;
    xmedium: true
    xxl: true;
  }

  interface TypographyPropsColorOverrides {
    black: true;
    cyan: true;
    secoundryM: true;
    gray: true;
    lightGray: true;
    grayPlaceholder: true
    blue: true
    darkGray: true
    blueLight: true
    red: true
    darkSecounry: true
    opacityGray: true
  }
}



