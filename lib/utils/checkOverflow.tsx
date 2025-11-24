"use client"
import ThemeProviderWrapper from "@/theme/ThemeProviderWrapper";
import React from "react";

import { Box, Container } from "@mui/material";



const CheckOverflow = ({ children }: { children: React.ReactNode }) => {
    const contentRef = React.useRef<HTMLDivElement>(null);
    const [isOverflow, setIsOverflow] = React.useState(false);

 React.useEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    const checkOverflow = () => {
      setIsOverflow(el.scrollHeight > el.clientHeight);
    };

    checkOverflow();              // check on mount
    window.addEventListener("resize", checkOverflow); // check on resize

    return () => window.removeEventListener("resize", checkOverflow);
  }, []);
    return (
        <Box
            ref={contentRef}
            sx={{
                height: "91vh",
                ...(isOverflow && { overflowY: "scroll" }), // 👈 apply if overflowing
            }}>
            {children}
        </Box>
    )
}

export default CheckOverflow